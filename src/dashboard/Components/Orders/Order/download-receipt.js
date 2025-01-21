import React from "react";

import { Button, Select, Form, Input, Modal, Upload, Col, Row } from "antd";

import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UpdateOrder } from "../../../../APIs/Oreders";
import Cookies from "js-cookie";
import { getorderDetail } from "../../../../APIs/Oreders";
import { format } from "date-fns";
import { updateOrderStatus } from "../../../../redux/Reducers/OrderReducer";

import {
  FeliTechLogo_transparent,
  FeliTechWhiteLogo,
} from "../../../../assets/images";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { add } from "date-fns";
import { useUser } from "../../../../context/UserContex";
import { fetchProduct } from "../../../../APIs/Product";
const { confirm } = Modal;

const DeliveryNotePDF = ({ myorder }) => {
  const [productnames, setProductnames] = useState([]);
  const { loading, users } = useSelector((state) => state.users);
  const user = useUser().user;
  let sellers, customer;
  async function fetchProductData() {
    let products = await Promise.all(
      myorder?.items?.map((item) => fetchProduct(item.product))
    );

    let productnames = products.map((product) => {
      return {
        id: product?.id,
        name: product?.name,
      };
    });

    setProductnames(productnames);

    sellers =
      !loading &&
      products.map(
        (product) =>
          users?.find((user) => user?._id === product?.seller)?.firstName
      );
  }

  if (user?.role === "customer") {
    customer = user;
  }

  useEffect(() => {
    if (myorder && myorder.items && !loading) {
      customer = users?.find((user) => user?.id == myorder.customer);

      fetchProductData();
    }
  }, [myorder, loading]);

  // console.log("customer", customer );

  const generatePDF = async () => {
    const doc = new jsPDF();

    // Adding the header background color
    doc.setFillColor("#1D6F2B");
    doc.rect(0, 0, doc.internal.pageSize.width, 30, "F");

    // Adding the logo image on the left (with reduced quality)
    if (FeliTechWhiteLogo) {
      doc.addImage(FeliTechWhiteLogo, "JPEG", 10, 5, 50, 20, undefined, "FAST");
    }
    // Adding the "DELIVERY NOTE" text aligned to the right
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255); // White text color
    doc.text("DELIVERY NOTE", 200, 20, { align: "right" }); // Right-aligned

    // Setting header style for tables
    const headerStyles = {
      fillColor: "#1D6F2B", // Header background color
      textColor: 255, // White text color
      halign: "start", // Center alignment for text
      valign: "middle", // Vertical alignment for text
    };

    // Adding the invoice and order details table
    doc.autoTable({
      startY: 40,
      head: [["ORDER ID", "ORDER DATE", "DELIVERY DATE"]],
      body: [
        [
          // myorder.tx_ref,
          myorder.id,
          format(myorder.createdAt, "dd/MM/yyyy HH:mm:ss"),
          "",
        ],
      ],
      headStyles: headerStyles,
      theme: "grid",
    });

    // Adding the 'INVOICE TO' and 'SHIP TO' sections
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10,
      head: [["Delived TO", "SHIP TO"]],
      body: [
        [
          `Name: ${myorder?.momo_payload?.fullname}\nEmail: ${myorder.email}\nPhone: ${myorder?.momo_payload?.phone_number}`,
          `Address: ${myorder?.shippingAddress?.street}, ${myorder?.shippingAddress?.sector}, ${myorder?.shippingAddress?.district}\nPhone: ${myorder?.shippingAddress?.phoneNumber}`,
        ],
      ],
      headStyles: headerStyles,
      theme: "grid",
    });

    // Adding the item description table
    const items = await myorder.items.map((item) => [
      item.quantity,
      // productnames.find((p) => p.id === item.product)?.name,
      item?.product?.name || "",
      item?.variation?.color || "--",
      item?.variation?.size || "--",
      item.price.toString(),
    ]);

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10,
      head: [
        [
          "QTY",
          "ITEM NAME",
          "COLOR",
          "SIZE",
          `PRICE ${
            myorder?.momo_payload?.currency
              ? myorder?.momo_payload?.currency
              : myorder?.currency
          } `,
        ],
      ],
      body: items,
      headStyles: headerStyles,
      theme: "grid",
    });

    // Adding the delivery and customer signature section
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10,
      head: [["DELIVERY BY:", "CUSTOMER:"]],
      body: [
        [
          "SIGNATURE: ____________________\nNAME: ___________________\nDATE: ___________________",
          "SIGNATURE: ___________________\nNAME: ___________________\nDATE: ___________________",
        ],
      ],
      headStyles: headerStyles,
      theme: "grid",
    });

    const company = {
      name: "FeliTechnology",
      address: "Kigali,kicukiro, sonatube KK 506 st",
      // address2: "Rwanda",
      telephone: "+250 798 697 197",
      email: "info@felitechnology.com",
      country: "Rwanda",

      city: "Kigali",
    };

    // Calculate the position to place the company details at the bottom dynamically
    const pageHeight = doc.internal.pageSize.height;
    const contentHeight = doc.autoTable.previous.finalY;
    const yPosition = Math.max(contentHeight + 20, pageHeight - 40);

    // Adding the company details at the bottom    Address Line 2: ${company.address2},
    doc.setFontSize(10);
    doc.text(
      `YOUR COMPANY NAME: ${company.name}
       \nAddress Line 1: ${company.address},
        \nTown/City: ${company.city},
          \n County: ${company.country}
         \nTelephone: ${company.telephone}
         \nE-mail: ${company.email}`,
      10,
      yPosition
    );

    doc.save("delivery_note.pdf");
  };

  return (
    <Button type="primary" onClick={generatePDF}>
      Generate Delivery Note
    </Button>
  );
};

export default DeliveryNotePDF;

export const DownloadStatus = ({ ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const token = Cookies.get("token");

  const { order, loadorder, errororder } = useSelector(
    (state) => state.updateoreder
  );

  // console.log("myorder", props.myorder);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsModalOpen(props.setModel);
  }, [props.setModel]);

  const handleCancel = () => {
    setIsModalOpen(false);
    props.openModal(false);
  };

  const handleOk = (values) => {
    if (token && values) {
      dispatch(
        UpdateOrder({
          token,
          id: props.order,
          status: values.status,
        })
      )
        .unwrap()
        .then((data) => {
          if (data?.status == "success") {
            dispatch(
              updateOrderStatus({
                orderId: props.order,
                status: values.status,
              })
            );
            props.handleupdatestate(props.order, values.status);
            handleCancel();
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Modal
        title="Generate Order Receipt"
        // width="50rem"
        open={isModalOpen}
        closeIcon={
          <IoCloseSharp onClick={handleCancel} className="text-[red]" />
        }
        style={{
          width: "30rem",
        }}
        onOk={handleOk}
        onCancel={handleCancel}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DeliveryNotePDF myorder={props.myorder} />
      </Modal>
    </div>
  );
};
