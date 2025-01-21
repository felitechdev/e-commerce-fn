import React, { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import {
  SaveOutlined,
  DownloadOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Card, Badge, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { statusColors } from "../../../../common/statuscolor";
import { BiBuildingHouse } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { FaPhone } from "react-icons/fa6";
import { format, formatDistanceToNow } from "date-fns";
import { useUser } from "../../../../context/UserContex";
import { ActionMenuButton } from "../../Button/AvtionButton";
import { DeleteFilled, EyeFilled, EditFilled } from "@ant-design/icons";
import { UpdateOrderStatus } from "../Order/updateorderstatus";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { set } from "js-cookie";
import { RepayOrder } from "../Order/repay-order";
import { DownloadStatus } from "../Order/download-receipt";
import Cookies from "js-cookie";
import axios from "axios";

const OrderCard = ({ order }) => {
  const user = useUser().user;
  const [orderstatus, setOrderstatus] = useState(order.status);
  const navigate = useNavigate();
  const [orderid, setOrderid] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isreceiptopen, setIsreceiptopen] = useState(false);
  const [ispayopen, setIspayopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copy, setCopy] = useState({
    value: order.id || order?._id,
    copied: false,
  });
  const { orders, loadorders, errorders } = useSelector(
    (state) => state.orders
  );

  const token = Cookies.get("token");

  useEffect(() => {
    setCopy({ value: order.id || order?._id, copied: false });
  }, []);

  const formattedDate = format(order.createdAt, "PPpp"); // e.g., "June 20th, 2020, 4:30 PM"
  const timeAgo = formatDistanceToNow(order.createdAt, { addSuffix: true }); // e.g., "about 2 months ago"

  const openModal = async (state, id) => {
    setOrderid(id);
    setIsModalOpen(state);
  };
  const openPayModal = async (state, id) => {
    setOrderid(id);
    setIspayopen(state);
  };

  const openReceiptModal = async (state, id) => {
    setOrderid(id);
    setIsreceiptopen(state);
  };

  const getItems = (record) => [
    // {
    //   label: <span className="font-semibold text-primary">View</span>,
    //   key: "view",
    //   icon: <EyeFilled className=" text-icon1 mr-2" />,
    //   onClick: () => {
    //     navigate(`${record.key}`);
    //   },
    // },
    // || user?.role == "customer"
    user?.role == "admin" && {
      label: <span className="font-semibold text-primary">Update</span>,
      key: "edit",
      icon: <EditFilled className=" text-icon2 mr-2" />,
      onClick: async () => {
        await openModal(true, record);
      },
    },

    user?.role == "admin" && {
      label: <span className="font-semibold text-primary">Delivery Note</span>,
      key: "download",
      icon: <DownloadOutlined className=" text-primary font-semibold mr-2" />,
      onClick: async () => {
        await openReceiptModal(true, record);
      },
    },
  ];

  const onSubmit = async (id) => {
    let redirectLink;
    setLoading(true);
    // setError("");
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/payments/retry/${id}`,
        {
          headers: {
            Authorization: ` Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      redirectLink = await res?.data?.data?.link;

      if (res?.data.status === "success") {
        setLoading(false);
        window.open(redirectLink, "_blank");
      }
    } catch (error) {
      setLoading(false);

      // if (error.response?.data?.message === "Payment not completed.")
      //   return setError(error.response?.data?.message);
      // if (error.response?.data?.message === "Invalid phone number")
      //   return setError("Invalid phone number");
      // setError("Unexpected error has occured. Please try again!");
    } finally {
      // setIsLoading(false);
    }
  };

  const handleupdatestate = async (id, status) => {
    const updatedOrder =
      (await orders) && orders.find((order) => order.id|| order?._id === id);
    setOrderstatus(status);
  };

  return (
    <Card
      className="order-card mb-3 cursor-pointer bg-[#f5fafc]"
      onClick={() => navigate(`${order.id || order?._id}`)}
    >
      <div>
        {" "}
        <div className="order-header md:flex md:space-x-3">
          <span className=" font-semibold  block md:flex ">
            <span className="flex space-x-4">
              {" "}
              <span> #{order.id ||  order?._id}</span>
              <div className="relative">
                <CopyToClipboard
                  text={order.id || order?._id}
                  onCopy={(e) => {
                    setCopy({ value: order.id|| order?._id, copied: true });
                  }}
                >
                  <FaRegCopy
                    size={30}
                    className=" rounded-full  cursor-pointer  text-primary hover:text-white hover:bg-primary p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCopy({ value: order.id|| order?._id, copied: true });

                      setTimeout(() => {
                        setCopy({ value: order.id|| order?._id, copied: false });
                      }, 5000);
                    }}
                  ></FaRegCopy>
                </CopyToClipboard>
              </div>
              {copy.copied ? (
                // <span style={{ color: "red" ,  }}>Copied.</span>
                <p className="bg-black z-50 !-ml-16 md:ml-0 rounded-md text-white p-1">
                  id copied
                </p>
              ) : null}
            </span>
            <p className="ml-0 md:ml-5">
              {user?.role == "admin" &&
                order?.momo_payload &&
                order?.momo_payload?.fullname}
            </p>
          </span>

          <div className="flex items-center space-x-2">
            <Tag
              // color={statusColors[orderstatus]}
              style={{
                color: `${statusColors[orderstatus]}`,
                fontWeight: "bold",
              }}
              className={`capitalize border-2 !border-[${statusColors[orderstatus]}] `}
            >
              {orderstatus}
            </Tag>

            {orderstatus == "awaits payment" && (
              <button
                disabled={loading}
                className=""
                onClick={(e) => {
                  e.stopPropagation();
                  onSubmit(order.id || order?._id);

                  // setIspayopen(true);
                }}
              >
                {!loading ? (
                  <Tag
                    style={{ color: "black", fontWeight: "bold" }}
                    className="capitalize  !text-white p-1  !bg-primary "
                  >
                    Repay
                    {/* api/v1/payments/retry-momo */}
                  </Tag>
                ) : (
                  <Tag
                    style={{ color: "black", fontWeight: "bold" }}
                    className="capitalize  !text-white p-1  !bg-primary "
                  >
                    Processing ...
                  </Tag>
                )}

                {/* <RepayOrder
                  setModel={ispayopen}
                  order={order}
                  setIspayopen={setIspayopen}
                  openModal={openPayModal}
                  handleupdatestate={handleupdatestate}
                /> */}
              </button>
            )}
          </div>
        </div>
        <div className="order-header flex my-3 space-x-3">
          {order?.payment_type && (
            <span className="flex">
              #payment -{" "}
              <p className="font-semibold ml-2">{order?.payment_type?.type}</p>
            </span>
          )}

          <Tag
            style={{ color: "", fontWeight: "bold" }}
            className="capitalize  !text-primary  !border-primary"
          >
            {order.items.length} items
          </Tag>
        </div>
      {
        user.role !=="seller"&&  <div className="order-body  my-5">
        <d className=" block md:flex space-y-3 md:space-y-0 md:space-x-2 ">
          <div className="flex space-x-2">
            {" "}
            <span className="flex ">
              <BiBuildingHouse size={20} />
              <p className="">{order?.shippingAddress?.district}</p>
            </span>
            <span className="flex">
              <IoLocationSharp size={20} />
              <p className="">
                {order?.shippingAddress?.sector} -{" "}
                {order?.shippingAddress?.street}
              </p>
            </span>
          </div>

          <div className="flex space-x-2">
            {user?.role == "admin" && (
              <span className="flex">
                <FaPhone size={20} />
                <p className="">{order?.shippingAddress?.phoneNumber}</p>
              </span>
            )}

            <span className="flex">
              <TbTruckDelivery size={20} />

              <Tag
                style={{ color: "black", fontWeight: "bold" }}
                className="capitalize !font-semibold !text-[red] !border-primary "
              >
                <p className="">{order.deliveryPreference}</p>
              </Tag>
            </span>
          </div>
          {user?.role == "admin" && (
            <span className="flex">
              <IoPersonSharp size={20} />
              <p className="">
                {order?.momo_payload && order?.momo_payload?.fullname}
              </p>
            </span>
          )}
        </d>
      </div>
      }
        <Tag
          style={{ color: "black", fontWeight: "" }}
          className="capitalize !font-semibold !text-primary !p-3"
        >
          <span>{formattedDate}</span> <span>{timeAgo}</span>
        </Tag>{" "}
      </div>
      <UpdateOrderStatus
        setModel={isModalOpen}
        order={order.id || order?._id}
        openModal={openModal}
        handleupdatestate={handleupdatestate}
      />

      <DownloadStatus
        setModel={isreceiptopen}
        order={order.id || order?._id}
        openModal={openReceiptModal}
        myorder={order}
      />

      {user?.role == "admin" && (
        <div
          className="absolute top-5 right-0"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {" "}
          <ActionMenuButton items={getItems(order)} />
        </div>
      )}
    </Card>
  );
};

export default OrderCard;
