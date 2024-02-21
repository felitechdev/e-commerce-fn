import React from "react";
import { useState, useEffect, Navigate } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Tag } from "antd";
import { FaArrowCircleLeft } from "react-icons/fa";

import { Space, Image } from "antd";
import { UserRole } from "../../../../common/checkusertole";
import { FaUser } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { EyeFilled } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useUser } from "../../../../context/UserContex";
import { getorderDetail } from "../../../../APIs/Oreders";
import axios from "axios";
import { statusColors } from "../../../../common/statuscolor";

const SingleOrder = () => {
  const [isLoading, setLoading] = useState(true);
  const token = Cookies.get("token");
  // const [user, onSetProfile] = useUser();
  const user = useUser().user;
  const dispatch = useDispatch();
  const setUser = useUser().setUser;
  const navigate = useNavigate();
  const onSetProfile = useUser().onSetProfile;
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openmodel, setOpenmodel] = useState(false);
  const [orders, setOrders] = useState();
  const [usenameopenmodel, setUsernameopenmodel] = useState(false);
  const { order, loadorder, errororder } = useSelector(
    (state) => state.singleorder
  );

  const UserRole = user?.role;

  //    const response = await dispatch(
  //                 getorderDetail({ token, id: record.key })
  //               );
  //               console.log("response", response, "id ", record.key);

  useEffect(() => {
    if (token) {
      dispatch(getorderDetail({ token, id }))
        .unwrap()
        .then((data) => {
          console.log("data", data);
          if (data) {
            setOrders(data?.order);
          }
        })
        .catch((error) => {});
    }
  }, []);

  const duplicatedItems = orders?.items?.reduce((acc, item) => {
    return [...acc, { ...item }, { ...item }];
  }, []);

  return (
    <>
      {/* min-h-[500px] */}
      <div className="bg-white border shadow-md rounded-md w-full lg:w-1/2 h-min  pb-3">
        <Button
          onClick={async () => {
            const current = localStorage.getItem("selectedKey");
            if (current) {
              localStorage.removeItem("selectedKey");
            } else {
              localStorage.setItem("selectedKey", "4");
              return navigate("/user/order", { replace: true });
            }
          }}
        >
          <FaArrowCircleLeft />
        </Button>
        <hr className="mt-0" />

        {orders && (
          <>
            <div className="flex justify-between p-4 border ">
              <div>
                <h1 className="text-md font-bold">Order ID : {orders.id}</h1>
                <p className="text-gray-400">
                  Order Date :
                  {new Date(`${orders.createdAt}`).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h1 className="text-md font-bold">Total: {orders.amount}</h1>
                <p className="text-gray-400">
                  {" "}
                  Status:
                  {/* {orders.status} */}
                </p>
                <Tag
                  color={statusColors[orders.status]}
                  style={{ color: "white", fontWeight: "bold" }}
                  className="capitalize"
                >
                  {orders.status}
                </Tag>
              </div>
            </div>
            <div className="flex justify-between p-4 border ">
              <div>
                <h1 className="text-md font-bold">shippingAddress</h1>
                <p className="text-gray-400">
                  Street : {orders?.shippingAddress?.address?.street}
                </p>
                <p className="text-gray-400">
                  City : {orders?.shippingAddress?.city}
                </p>
              </div>
              <div>
                {UserRole !== "seller" && (
                  <>
                    <h1 className="text-md font-bold">
                      {" "}
                      {UserRole !== "customer" ? " Cutomer" : "My phone"}
                    </h1>
                    <p className="text-gray-400">Tel: {orders.phoneNumber}</p>
                  </>
                )}
              </div>
            </div>

            {duplicatedItems?.map((item, index) => (
              <div className="flex justify-between p-4 border ">
                <div className="flex">
                  <Space size={12}>
                    <Image
                      width={100}
                      className="rounded-md border"
                      src={
                        "http://res.cloudinary.com/hervebu/image/upload/v1702558866/Feli%20Technology%20Inv.%20Group/macbook%20pro/otherImages/ic1rdxfjwamklholwwyd.jpg"
                      }
                    />
                  </Space>

                  <div className="ml-2 ">
                    <h1 className="text-md font-bold">{"Product Name"}</h1>
                    <h1 className="text-md font-bold text-gray-400">
                      price : {item.price}
                    </h1>
                    {/* <p className="text-gray-400 font-bold text-md">
                      quantity : {item.quantity}
                    </p> */}
                  </div>
                </div>
                <div>
                  <h1 className="text-md font-bold">seller:{}</h1>
                  {UserRole == "admin" && (
                    <p className="text-gray-400 font-bold text-md">Tel : {}</p>
                  )}
                  <p className="text-gray-400 font-bold text-md">
                    quantity : {item.quantity}
                  </p>
                  <p className="text-gray-400 font-bold text-md">color : {}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default SingleOrder;
