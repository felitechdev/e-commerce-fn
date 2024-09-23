import React, { useState, useRef, useEffect } from "react";
import { Layout, Row, Col, Typography } from "antd";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import OrderCard from "./order-card";
import OrderDetail from "./single-order/order";
import { Loader } from "../../Loader/LoadingSpin";

import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { GetMyOrders } from "../../../../APIs/Oreders";
import Pagination from "../../pagination/pagination";
import axios from "axios";


export const DashBoardSearch = ({
  handleSearch,
  searchQuery,
  setSearchQuery,
  placeholder,
}) => {
  return (
    <div className="relative w-full lg:w-[400px] h-[30px] md:h-[35px] text-base   text-primeColor  flex items-center gap-2 justify-between p-0 rounded-md border-[1px] mb-2">
      <input
        className="flex-1 h-full rounded-md !w-[90%] !md:w-[85%]   outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px] border-none"
        type="text"
        onChange={handleSearch}
        value={searchQuery}
        placeholder={placeholder}
      />
      {!searchQuery ? (
        <div className=" absolute rounded-r-md bg-primary h-full justify-end items-center flex right-0 w-[20%] md:w-[15%] ">
          {" "}
          <FaSearch className=" w-5 h-5  m-auto text-white " />
        </div>
      ) : (
        <div className=" absolute bg-primary rounded-r-md h-full justify-end items-center flex right-0 w-[20%] md:w-[15%] ">
          <FaWindowClose
            className="  font-semibold   m-auto text-lg text-white "
            onClick={() => setSearchQuery("")}
          />
        </div>
      )}
    </div>
  );
};

const { Title } = Typography;

export const OrdersV2 = () => {
  const [order, setOrder] = useState([]);
  const { orders, loadorders, totalCount } = useSelector(
    (state) => state.orders
  );
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [totalElements, setTotalElements] = React.useState(50);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [issearch, setIssearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const orderstatus = {
    1: "awaits payment",
    2: "pending",
    3: "processing",
    4: "shipped",
    5: "delivered",
    6: "cancelled",
    7: "transaction failed",
  };

  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  async function searchorder(name) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/orders/search?query=${name}`,

        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
       
      );
  
      return response.data;
    } catch (error) {
      return [];
    }
  }


  const filteredOrders =
    selectedStatus === "All"
      ? order
      : order?.filter((order) => order.status === selectedStatus);
  const totalPages = Math.ceil(totalElements / pageSize);
  // useEffect(() => {
  //   if (loadorders == true) {
  //     dispatch(GetMyOrders({ page, pageSize, token }))
  //       .unwrap()
  //       .then((data) => {
  //         if (data?.data && data?.status == "success") {
  //           setOrder(data?.data?.orders);
  //         }
  //       })
  //       .catch((error) => {});
  //   }
  // }, [loadorders, dispatch, token, page, pageSize]);

  // useEffect(() => {
  //   if (!order.length) {
  //     dispatch(GetMyOrders({ page, pageSize, token , selectedStatus }))
  //       .unwrap()
  //       .then((data) => {
  //         if (data?.data && data?.status == "success") {
  //           setOrder(data?.data?.orders);
  //         }
  //       })
  //       .catch((error) => {});
  //   }
  // }, [dispatch, token, page, pageSize, selectedStatus]);

  useEffect(() => {
    dispatch(GetMyOrders({ page, pageSize, token , selectedStatus }))
      .unwrap()
      .then((data) => {
        if (data?.data && data?.status == "success") {
          setOrder(data?.data?.orders);
        }
      })
      .catch((error) => {});
  }, [dispatch, page, pageSize , selectedStatus]);

  useEffect(() => {
    if (totalCount) {
      setTotalElements(totalCount);
    }
  }, [totalCount]);

  useEffect(() => {
    if (searchQuery.length > 0) {

      setIssearch(true);
      searchorder(searchQuery).then((data) => {
        console.log("data", data?.data?.orders);
        if (data?.data?.orders) {
          setOrder(data?.data?.orders);
        }
      
      
      });
    } else {
      setIssearch(false);
      setOrder(orders);
     
    }
  }, [searchQuery]);


  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  // const Orders = filteredOrders.filter((item) =>
  //   item.id.toLowerCase().includes(searchQuery)
  // );

  return (
    <Layout className="space-y-6 p-2 bg-light overflow-auto">
      <div className="w-full flex flex-col md:flex-row md:space-x-4 bg-white">
        <Row className="w-full md:w-[100%] p-0">
          <div className="bg-gray-200 w-full text-left space-y-0 md:space-y-6 py-3 md:py-5 mb-4 p-2">
            <div className="flex items-center space-x-2">
              <h1 className="bold_text"> Orders</h1>

              <DashBoardSearch
                handleSearch={handleSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder={"Search by orderId"}
              />

              {/* <div className=" my-2 left-1/3 border-none  right-1/2  rounded-t-md">
                <input
                  type="text"
                  className="rounded-t-md  text-black bg-white border-2 border-primary"
                  placeholder="Search by orderId"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div> */}
            </div>

            <div className="flex flex-row space-x-4 cursor-pointer overflow-auto">
              <span
                className={`text-sm font-semibold text-primary ${
                  selectedStatus === "All"
                    ? "border-b-2 border-primary bg-white rounded-t-md px-2 md:px-5"
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
                      ? "border-b-2 border-primary bg-white rounded-t-md px-2 md:px-5"
                      : ""
                  }`}
                  onClick={() => setSelectedStatus(orderstatus[key])}
                >
                  {orderstatus[key]}
                </span>
              ))}
            </div>
          </div>

          {loadorders ? (
            <>
              <Loader className=" text-primary flex items-center w-full justify-center" />
            </>
          ) : (
            <Col span={24}>
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </Col>
          )}
        </Row>
      </div>

    {!issearch &&   <Pagination page={page} setPage={setPage} totalPages={totalPages} />}
    </Layout>
  );
};
