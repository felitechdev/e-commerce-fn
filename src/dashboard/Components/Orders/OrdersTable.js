import { Row, Space, Table, Image, Typography, Tag, Input } from "antd";

import { DeleteFilled, EyeFilled, EditFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getorderDetail } from "../../../APIs/Oreders";
import { useNavigate, Navigate } from "react-router-dom";
import { ActionMenuButton } from "../Button/AvtionButton";
import { UpdateOrderStatus } from "./Order/updateorderstatus";
import { statusColors } from "../../../common/statuscolor";
import { GetMyOrders } from "../../../APIs/Oreders";
import { useUser } from "../../../context/UserContex";
import { Loader } from "../Loader/LoadingSpin";
import Cookies from "js-cookie";

const { Title, Paragraph, Text } = Typography;

export const OrderTable = (...props) => {
  const [order, setOrder] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [orderid, setOrderid] = useState();
  const [value, setValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useUser().user;
  const UserRole = user?.role;

  const openModal = async (state, id) => {
    setOrderid(id);
    setIsModalOpen(state);
  };

  const token = Cookies.get("token");
  const navigate = useNavigate();

  const { orders, loadorders, errorders } = useSelector(
    (state) => state.orders
  );
  const dispatch = useDispatch();

  const getItems = (record) => [
    {
      label: <span className="font-semibold text-primary">View</span>,
      key: "view",
      icon: <EyeFilled className=" text-icon1 mr-2" />,
      onClick: () => {
        navigate(`${record.key}`);
      },
    },
    // || user?.role == "customer"
    user?.role == "admin" && {
      label: <span className="font-semibold text-primary">Update</span>,
      key: "edit",
      icon: <EditFilled className=" text-icon2 mr-2" />,
      onClick: async () => {
        await openModal(true, record);
      },
    },
  ];

  const handleupdatestate = async (id, status) => {
    const updatedOrder =
      (await orders) && orders.find((order) => order.id === id);
    setFilteredData((prevData) =>
      prevData.map((orderItem) => {
        if (orderItem.key === id) {
          return {
            ...orderItem,
            status: status,
          };
        }
        return orderItem;
      })
    );
  };
  const columns = [
    {
      title: "#",
      dataIndex: "customerId",
      key: "customerId",
      width: 50,
    },
    {
      title: "Order",
      dataIndex: "orderId",
      key: "orderId",
      width: 100,
    },
    // {
    //   title: "Customer",
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
      title: "Items",
      dataIndex: "itemsCount",
      key: "itemsCount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // width: 100,
      render: (status) => (
        <Tag
          color={statusColors[status]}
          style={{ color: "white", fontWeight: "bold" }}
          className="capitalize"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "OrderDate",
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
          <ActionMenuButton items={getItems(record)} />
        </>
      ),
    },
  ];

  if (user?.role === "admin" || user?.role === "customer") {
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
          if (data?.data && data?.status == "success") {
            setOrder(data?.data?.orders);
          }
        })
        .catch((error) => {
          console.log(" error on load orders", error);
        });
    }
  }, [loadorders, dispatch, token]);

  useEffect(() => {
    if (!order.length) {
      dispatch(GetMyOrders(token))
        .unwrap()
        .then((data) => {
          if (data?.data && data?.status == "success") {
            setOrder(data?.data?.orders);
          }
        })
        .catch((error) => {
          console.log(" error on load orders", error);
        });
    }
  }, [dispatch, token]);

  const FilterByNameInput = (
    <Input.Search
      placeholder="search orderID ......."
      allowClear
      enterButton="Search"
      size="large"
      className="w-[80%] md:w-[50%] my-2"
      value={value}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);

        const newData =
          !loadorders && orders.length > 0
            ? orders
                ?.map((orderItem, index) => ({
                  key: orderItem.id ? orderItem.id : orderItem._id,
                  // customerId: orderItem.customer,
                  orderId: orderItem.id,
                  customerId: index + 1,
                  // orderId: index + 1,
                  amount: orderItem.amount,
                  address: `${orderItem?.shippingAddress?.address?.street} , ${orderItem?.shippingAddress?.village} , ${orderItem?.shippingAddress?.cell}  , ${orderItem?.shippingAddress?.sector} , ${orderItem?.shippingAddress?.district} `,
                  phoneNumber: `${orderItem?.shippingAddress?.phoneNumber} / ${
                    orderItem?.customerDetails?.phone_number != undefined
                      ? orderItem?.customerDetails?.phone_number
                      : ""
                  } `,
                  itemsCount: orderItem.items.length,
                  status: orderItem.status,

                  updatedAt:
                    // new Date(orderItem.updatedAt).toLocaleDateString() ||
                    new Date(orderItem.createdAt).toLocaleDateString(),
                }))

                .filter((entry) =>
                  entry.orderId.toLowerCase().includes(currValue.toLowerCase())
                )
            : [];

        setFilteredData(newData);
      }}
      onSearch={() => {}} // Set the dataSource when searching
    />
  );

  useEffect(() => {
    const newData =
      !loadorders && orders.length > 0
        ? orders?.map((orderItem, index) => ({
            key: orderItem.id ? orderItem.id : orderItem._id,
            // customerId: orderItem.customer,
            orderId: orderItem.id,
            customerId: index + 1,
            // orderId: index + 1,
            amount: orderItem.amount,
            address: `${orderItem?.shippingAddress?.address?.street} , ${orderItem?.shippingAddress?.village} , ${orderItem?.shippingAddress?.cell}  , ${orderItem?.shippingAddress?.sector} , ${orderItem?.shippingAddress?.district} `,
            phoneNumber: `${orderItem?.shippingAddress?.phoneNumber} / ${
              orderItem?.customerDetails?.phone_number != undefined
                ? orderItem?.customerDetails?.phone_number
                : ""
            } `,
            itemsCount: orderItem.items.length,
            status: orderItem.status,

            updatedAt:
              // new Date(orderItem.updatedAt).toLocaleDateString() ||
              new Date(orderItem.createdAt).toLocaleDateString(),
          }))
        : [];

    setFilteredData(newData);
  }, [orders, loadorders]);

  return (
    <>
      <UpdateOrderStatus
        setModel={isModalOpen}
        order={orderid}
        openModal={openModal}
        handleupdatestate={handleupdatestate}
      />
      {loadorders ? (
        <>
          <Loader className=" text-primary flex items-center w-full justify-center" />
        </>
      ) : (
        <>
          <div className="flex  w-full justify-start space-x-5 ">
            {FilterByNameInput}
          </div>
          <Table
            rowClassName="even:bg-[#f1f5f9]   hover:cursor-pointer custom-table-row "
            columns={columns}
            dataSource={filteredData}
            size="small"
            tableLayout="fixed"
            bordered={false}
            className="w-full md:w-[90%]  custom-table   "
            // scroll={{}}

            scroll={{ x: 1500 }}
          />
        </>
      )}
    </>
  );
};
