import { Row, Space, Table, Image, Typography, Input } from "antd";

import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Loader } from "../Loader/LoadingSpin";
import { useUser } from "../../../context/UserContex";

import Cookies from "js-cookie";
// import { GetMyOrders } from "../../Apis/orders";
import { GetMyOrders } from "../../../APIs/Oreders";
const { Title, Paragraph, Text } = Typography;

export const OrderTable = (...props) => {
  const [order, setOrder] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const token = Cookies.get("token");
  const { user } = useUser();
  const { orders, loadorders, errorders } = useSelector(
    (state) => state.orders
  );

  const dispatch = useDispatch();
  const columns = [
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
      width: 200,
    },

    {
      title: "Items",
      dataIndex: "itemsCount",
      key: "itemsCount",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 100,
    },
  ];

  if (user?.role === "admin") {
    columns.splice(0, 0, {
      title: "Order",
      dataIndex: "orderId",
      key: "orderId",
      width: 250,
    });

    columns.splice(3, 0, {
      title: "Phone ",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 200,
    });
  }

  useEffect(() => {
    if (loadorders == true) {
      dispatch(GetMyOrders(token))
        .unwrap()
        .then((data) => {
          console.log("data on sub orders page", data);
          if (data?.data && data?.status == "success") {
            setOrder(data?.data?.orders);
          }
        })
        .catch((error) => {});
    }
  }, [loadorders, dispatch, token]);

  // Fetch products only when the component mounts
  useEffect(() => {
    if (!order.length) {
      dispatch(GetMyOrders(token))
        .unwrap()
        .then((data) => {
          if (data?.data && data?.status == "success") {
            setOrder(data?.data?.orders);
          }
        })
        .catch((error) => {});
    }
  }, [dispatch, token]);

  useEffect(() => {
    const newData = order?.map((orderItem, index) => ({
      key: orderItem.id,
      customerId: index + 1,
      orderId: orderItem?.id,
      amount: orderItem.amount,
      address: `${orderItem?.shippingAddress?.address?.street}, ${orderItem?.shippingAddress?.city}`,
      phoneNumber: orderItem.phoneNumber,
      itemsCount: orderItem.items.length,
      status: orderItem.status,
      updatedAt: new Date(orderItem.createdAt).toLocaleDateString(),
    }));

    setFilteredData(newData);
  }, [order]);
  console.log(order, "order");

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
          dataSource={filteredData.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.published)
          )}
          size="small"
          tableLayout="fixed"
          bordered={false}
          className="w-full md:w-[40%]  custom-table  "
          scroll={{ x: 500 }}
        />
      )}
    </>
  );
};
