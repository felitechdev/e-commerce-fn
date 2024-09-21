import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "antd";
import { FaUser } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { EyeFilled } from "@ant-design/icons";
import { CustomerOrderTable } from "./orderTable";
import { GetMyOrders } from "../../APIs/Oreders";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { LoaderComponent } from "../../components/Loaders/Getloader";

const CustomerOrders = () => {
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userprofile, setUserprofile] = useState();
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(false);
  const [openmodel, setOpenmodel] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const { orders, loadorders, errororders } = useSelector(
    (state) => state.orders
  );

  const token = Cookies.get("token");

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleopenmodel = () => {
    setOpenmodel(true);
  };

  // view orders
  useEffect(() => {
    if (loadorders == true) {
      dispatch(GetMyOrders(token))
        .unwrap()
        .then((data) => {
          if (data?.data && data.status == "success") {
            setOrder(data?.data?.orders);
            setLoading(false);
          }
        })
        .catch((error) => {});
    }
  }, [loadorders, dispatch, token]);

  // Fetch orders only when the component mounts
  useEffect(() => {
    if (!order) {
      dispatch(GetMyOrders(token))
        .unwrap()
        .then((data) => {
          if (data?.data && data.status == "success") {
            setOrder(data?.data?.orders);
            setLoading(false);
          }
        })
        .catch((error) => {});
    }
  }, [dispatch, order, token]);

  return (
    <>
      <div className="bg-white border shadow-lg rounded-md w-full min-h-[500px] pb-3">
        <div className="rounded-t-md flex justify-between space-x-3 font-normal pl-0  px-0 text-xl h-14">
          <div className="flex justify-between w-full font-semibold text-base h-full cursor-pointer">
            <div
              className={`text-center flex items-center justify-center  flex-grow h-full ${
                activeTab === "All"
                  ? "border-b-4 bg-secondary border-primary"
                  : ""
              }`}
              onClick={() => setActiveTab("All")}
            >
              All
            </div>
            <div
              className={`text-center flex items-center justify-center flex-grow h-full ${
                activeTab === "Pending Payment"
                  ? "border-b-4 border-primary bg-secondary"
                  : ""
              }`}
              onClick={() => setActiveTab("Pending Payment")}
            >
              Pending Payment
            </div>
            <div
              className={`text-center flex items-center justify-center flex-grow h-full ${
                activeTab === "In Transit"
                  ? "border-b-4 border-primary bg-secondary"
                  : ""
              }`}
              onClick={() => setActiveTab("In Transit")}
            >
              In Transit
            </div>
            <div
              className={`text-center flex items-center justify-center flex-grow h-full ${
                activeTab === "Feed back"
                  ? "border-b-4 border-primary bg-secondary"
                  : ""
              }`}
              onClick={() => setActiveTab("Feed back")}
            >
              Feed back
            </div>
          </div>
        </div>
        <hr className="mt-0" />
        {activeTab === "All" && (
          <div className="flex justify-center">
            {/* No orders message */}
            {!order && !loadorders && (
              <div className="flex items-center justify-center w-full h-48">
                <h1 className="font-semibold text-2xl">No orders</h1>
              </div>
            )}

            {/* Orders table */}
            {order && order.length > 0 && !loadorders && (
              <table className="w-[99%] mt-5">
                <tr className="bg-secondary h-10">
                  <th className="w-1/5">#</th>
                  <th className="w-1/5">Order Date</th>
                  <th className="w-1/5">Order Status</th>
                  <th className="w-1/5">Order Total</th>
                  <th className="w-1/5">Action</th>
                </tr>

                {order.map((item, index) => (
                  <CustomerOrderTable
                    key={index}
                    id={index + 1}
                    createdat={item.createdAt}
                    status={item.status}
                    total={item.amount}
                  />
                ))}
              </table>
            )}

            {/* Loader */}
            {loadorders && (
              <div className="flex items-center justify-center w-full h-48">
                <LoaderComponent className="text-primary" />
              </div>
            )}
          </div>
        )}
        {activeTab === "Pending Payment" && <div>Pending Payment data</div>}
        {activeTab === "In Transit" && <div>In Transit data</div>}
        {activeTab === "Feed back" && <div>Feed back data</div>}
      </div>
    </>
  );
};

export default CustomerOrders;
