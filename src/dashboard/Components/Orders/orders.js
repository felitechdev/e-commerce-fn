import { Avatar, Button, Card, Col, Image, Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Space, Table, Typography, Input } from "antd";
import { Chart } from "../Chart/Chart";
import "./styles.css";
// import type { ColumnsType, TableProps } from 'antd/es/table';
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";

import { OrderTable } from "./OrdersTable";

// import actions
import { fetchadminproduct } from "../../Apis/Product";
import { Loader } from "../Loader/LoadingSpin";

import Cookies from "js-cookie";

const { Title, Paragraph, Text } = Typography;

export const Orders = () => {
  const { orders, loadorders, errorders } = useSelector(
    (state) => state.orders
  );

  const containerRef = useRef(null);

  return (
    <Layout className="space-y-6  bg-light overflow-auto">
      <div className="w-full flex flex-col md:flex-row   md:space-x-4 p-3 bg-[white]">
        <Row className=" w-full md:w-[100%] p-0   ">
          <OrderTable
            style={{
              position: "sticky",
              bottom: 0,
              top: 0,
              left: 0,
              zIndex: 1,
              // border: "0px solid #838383",
              padding: "10px",
            }}
          />
        </Row>
      </div>
    </Layout>
  );
};
