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
import { GetMyOrders } from "../../../../APIs/Oreders";
import axios from "axios";
import { statusColors } from "../../../../common/statuscolor";
import { fetchProduct } from "../../../../APIs/Product";

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
  const [ord, setOrd] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openmodel, setOpenmodel] = useState(false);
  const [orders, setOrders] = useState();
  const [usenameopenmodel, setUsernameopenmodel] = useState(false);
  const { order, loadorder, errororder } = useSelector(
    (state) => state.singleorder
  );
  const { loading, users } = useSelector((state) => state.users);

  const UserRole = user?.role;

  useEffect(() => {
    if (token) {
      dispatch(getorderDetail({ token, id }))
        .unwrap()
        .then((data) => {
          if (data) {
            setOrders(data?.order);
          }
        })
        .catch((error) => {});
    }
  }, []);

  useEffect(() => {
    if (!ord.length) {
      dispatch(GetMyOrders(token))
        .unwrap()
        .then((data) => {
          if (data?.data && data?.status == "success") {
            setOrd(data?.data?.orders);
          }
        })
        .catch((error) => {});
    }
  }, [dispatch, ord, token]);
  async function fetchProductData() {
    let products = await Promise.all(
      orders?.items?.map((item) => fetchProduct(item.product))
    );

    let sellers =
      !loading &&
      products.map(
        (product) =>
          users?.find((user) => user?._id === product?.seller?._id)?.firstName
      );
  }

  if (orders && orders.items && !loading) {
    fetchProductData();
  }
  const singleorder = ord.length > 0 ? ord : [];
  console.log("single order", orders);
  return (
    <>
      {/* min-h-[500px] */}
      <div className="bg-white border shadow-md rounded-md w-full lg:w-1/2 h-min  pb-3">
        <Button
          onClick={() => {
            const current = localStorage.getItem("selectedKey");
            if (current) {
              localStorage.removeItem("selectedKey");
            } else {
              localStorage.setItem("selectedKey", "4");
            }
            navigate("/user/order", { replace: true });
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
                <h1 className="text-md font-bold">
                  Total: {orders.amount} Rwf
                </h1>
                <p className="text-gray-400">
                  {" "}
                  Status:
                  {/* {orders.status} */}
                </p>
                <Tag
                  color={statusColors[orders.status]}
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                  className="capitalize"
                >
                  {orders.status}
                </Tag>

                <h1 className="text-md font-bold">
                  Choice : {orders?.deliveryPreference}
                </h1>
              </div>
            </div>

            <div className="flex justify-between p-4 border ">
              <div>
                <h1 className="text-md font-bold">Payment</h1>
                <h1 className="text-sm text-gray-400">
                  {`${orders?.payment_type?.details}  , 

${orders?.payment_type?.type}`}
                </h1>
              </div>
            </div>

            <div className="flex justify-between p-4 border ">
              <div>
                <h1 className="text-md font-bold">shippingAddress</h1>
                <h1 className="text-sm text-gray-400">
                  Tel : {orders?.shippingAddress?.phoneNumber}
                </h1>

                <p className="text-gray-400">
                  Street : {orders?.shippingAddress?.address?.street}
                </p>
                <p className="text-gray-400">
                  Village : {orders?.shippingAddress?.village}
                </p>
                <p className="text-gray-400">
                  Cell : {orders?.shippingAddress?.cell}
                </p>
                <p className="text-gray-400">
                  Sector : {orders?.shippingAddress?.sector}
                </p>
                <p className="text-gray-400">
                  City : {orders?.shippingAddress?.district}
                </p>
              </div>
              <div>
                {UserRole !== "seller" && (
                  <>
                    <h1 className="text-md font-bold">
                      {" "}
                      {UserRole !== "customer" ? " Cutomer" : "My phone"}
                    </h1>
                    <p className="text-gray-400">
                      Tel: {orders?.customerDetails?.phone_number}
                    </p>
                    <p className="text-gray-400">
                      Email: {orders?.customerDetails?.email}
                    </p>
                    <p className="text-gray-400">
                      Name:{orders?.customerDetails?.name}
                    </p>
                  </>
                )}
              </div>
            </div>
            {orders &&
              orders?.items.map((item, index) => (
                <div className="flex justify-between p-4 border ">
                  <div className="flex">
                    <Space size={12}>
                      <Image
                        width={100}
                        className="rounded-md border"
                        src={
                          item?.productThumbnail
                            ? item?.productThumbnail
                            : "https://via.placeholder.com/150"
                        }
                      />
                    </Space>

                    <div>
                      <div className=" ">
                        <h1 className="text-md font-bold">{item?.name}</h1>
                        <h1 className="text-md font-bold text-gray-400">
                          price: {item?.price} Rwf
                        </h1>
                        {/* <p className="text-gray-400 font-bold text-md">
                      quantity : {item.quantity}
                    </p> */}
                      </div>

                      <div>
                        <p className="text-gray-400 font-bold text-md">
                          quantity : {item.quantity}
                        </p>
                        <p className="text-gray-400 font-bold text-md">
                          color : {item?.variation?.color}
                        </p>
                        <p className="text-gray-400 font-bold text-md">
                          zize : {item?.variation?.size}
                        </p>
                      </div>

                      {UserRole == "admin" && (
                        <>
                          <h1 className="text-md font-bold">seller:{}</h1>
                          {/* <p className="text-gray-400 font-bold text-md">
                          Tel : {}
                        </p> */}
                        </>
                      )}
                    </div>
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
