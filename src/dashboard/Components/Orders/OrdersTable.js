import { Row, Space, Table, Image, Typography, Input } from "antd";

import { DeleteFilled, EyeFilled, EditFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getorderDetail } from "../../../APIs/Oreders";
import { useNavigate, Navigate } from "react-router-dom";

import { Loader } from "../Loader/LoadingSpin";

import Cookies from "js-cookie";
import { fetchorders } from "../../Apis/orders";

const { Title, Paragraph, Text } = Typography;

export const OrderTable = (...props) => {
  const [order, setOrder] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const token = Cookies.get("token");
  const navigate = useNavigate();

  const { orders, loadorders, errorders } = useSelector(
    (state) => state.orders
  );
  const dispatch = useDispatch();
  const columns = [
    {
      title: "#",
      dataIndex: "customerId",
      key: "customerId",
      width: 100,
    },
    // {
    //   title: "Order",
    //   dataIndex: "orderId",
    //   key: "orderId",
    //   width: 100,
    // },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 100,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 400,
    },
    {
      title: "Phone ",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 200,
    },
    {
      title: "Items",
      dataIndex: "itemsCount",
      key: "itemsCount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // width: 100,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 100,
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      width: 100,
      render: (_, record) => (
        <>
          {/* <EditFilled className=" text-icon2 mr-2" /> */}
          <EyeFilled
            className=" text-icon1 mr-2"
            onClick={() => {
              console.log("record", record);
              navigate(`${record.key}`);
            }}
          />
          {/* <DeleteFilled className=" text-icon3" /> */}
        </>
      ),
    },
  ];

  // 'awaits payment',
  // 'pending',
  // 'processing',
  // 'shipped',
  // 'delivered',
  // 'cancelled',
  // 'transaction failed',

  useEffect(() => {
    if (loadorders == true) {
      dispatch(fetchorders(token))
        .unwrap()
        .then((data) => {
          if (data?.data && data?.status == "success") {
            setOrder(data?.data?.orders);
          }
        })
        .catch((error) => {
          console.log("error on sub orders page", error);
        });
    }
  }, [loadorders, dispatch, token]);

  // Fetch products only when the component mounts
  useEffect(() => {
    if (!order.length) {
      dispatch(fetchorders(token))
        .unwrap()
        .then((data) => {
          if (data?.data && data?.status == "success") {
            setOrder(data?.data?.orders);
          }
        })
        .catch((error) => {});
    }
  }, [dispatch, order, token]);

  console.log("order", order);

  useEffect(() => {
    const newData = order?.map((orderItem, index) => ({
      key: orderItem.id ? orderItem.id : orderItem._id,
      // customerId: orderItem.customer,
      // orderId: orderItem.id,
      customerId: index + 1,
      // orderId: index + 1,
      amount: orderItem.amount,
      address: `${orderItem?.shippingAddress?.address?.street}, ${orderItem?.shippingAddress?.city}`,
      phoneNumber: orderItem.phoneNumber,
      itemsCount: orderItem.items.length,
      status: orderItem.status,
      updatedAt: new Date(orderItem.updatedAt).toLocaleDateString(),
    }));

    setFilteredData(newData);
  }, [order]);
  return (
    <>
      {loadorders ? (
        <>
          <Loader className=" text-primary flex items-center w-full justify-center" />
        </>
      ) : (
        <Table
          rowClassName="even:bg-[#f1f5f9]   hover:cursor-pointer custom-table-row "
          columns={columns}
          dataSource={filteredData}
          size="small"
          tableLayout="fixed"
          bordered={false}
          className="w-full md:w-[90%]  custom-table   "
          scroll={{ x: 500 }}
        />
      )}
    </>
  );
};
