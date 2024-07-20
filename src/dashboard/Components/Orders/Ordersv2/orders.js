// import { Avatar, Button, Card, Col, Image, Layout } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Row, Space, Table, Typography, Input } from "antd";
// // import "./styles.css";
// import { SearchOutlined } from "@ant-design/icons";
// import { useState, useEffect, useRef } from "react";
// // import actions

// import Cookies from "js-cookie";

// const { Title, Paragraph, Text } = Typography;
// export const OrdersV2 = () => {
//   const { orders, loadorders, errorders } = useSelector(
//     (state) => state.orders
//   );
//   const [selectedStatus, setSelectedStatus] = useState("All");
//   const containerRef = useRef(null);

//   const orderstatus = {
//     1: "awaits payment",
//     2: "pending",
//     3: "processing",
//     4: "shipped",
//     5: "delivered",
//     6: "cancelled",
//     7: "transaction failed",
//   };

//   return (
//     <Layout className="space-y-6 bg-light overflow-auto">
//       <div className="w-full flex flex-col md:flex-row   md:space-x-4  bg-[white]">
//         <Row className=" w-full md:w-[100%] p-0     ">
//           <div className="bg-gray-200 w-full text-left space-y-4 p-2">
//             <h1 className="text-xl font-bold ">Orders</h1>

//             {/* status */}

//             <div className="flex flex-row space-x-4 cursor-pointer overflow-auto">
//               {/* underline active status  */}
//               <span
//                 className={`text-sm font-semibold text-primary

//               ${selectedStatus === "All" ? "border-b-2 border-primary" : ""}

//                 `}
//                 onClick={() => setSelectedStatus("All")}
//               >
//                 All
//               </span>

//               {Object.keys(orderstatus).map((key) => (
//                 <span
//                   key={key}
//                   className={`text-sm font-semibold  text-primary

//                   ${
//                     selectedStatus === orderstatus[key]
//                       ? "border-b-2 border-primary"
//                       : ""
//                   }

//                     `}
//                   onClick={() => setSelectedStatus(orderstatus[key])}
//                 >
//                   {orderstatus[key]}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* order card */}

//         </Row>
//       </div>
//     </Layout>
//   );
// };

// // export default OrdersV2;

import React, { useState, useRef } from "react";
import { Layout, Row, Col, Typography } from "antd";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrderCard from "./order-card";
import OrderDetail from "./single-order/order";

const { Title } = Typography;

export const OrdersV2 = () => {
  const { orders } = useSelector((state) => state.orders);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const orderstatus = {
    1: "awaits payment",
    2: "pending",
    3: "processing",
    4: "shipped",
    5: "delivered",
    6: "cancelled",
    7: "transaction failed",
  };

  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  return (
    <Layout className="space-y-6 bg-light overflow-auto">
      <div className="w-full flex flex-col md:flex-row md:space-x-4 bg-white">
        <Row className="w-full md:w-[100%] p-0">
          <div className="bg-gray-200 w-full text-left space-y-4 md:space-y-6 py-3 md:py-5 mb-4 p-2">
            <h1 className="text-xl font-bold">Orders</h1>
            <div className="flex flex-row space-x-4 cursor-pointer overflow-auto">
              <span
                className={`text-sm font-semibold text-primary ${
                  selectedStatus === "All"
                    ? "border-b-2 border-primary bg-white rounded-t-md px-5"
                    : ""
                }`}
                onClick={() => setSelectedStatus("All")}
              >
                All
              </span>
              {Object.keys(orderstatus).map((key) => (
                <span
                  key={key}
                  className={`text-sm font-semibold text-primary ${
                    selectedStatus === orderstatus[key]
                      ? "border-b-2 border-primary bg-white rounded-t-md px-5"
                      : ""
                  }`}
                  onClick={() => setSelectedStatus(orderstatus[key])}
                >
                  {orderstatus[key]}
                </span>
              ))}
            </div>
          </div>
          <Col span={24}>
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </Col>
        </Row>
      </div>
    </Layout>
  );
};
