import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Table } from "antd";

const OrderDetail = ({ orders }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = orders.find((order) => order.id === id);

  const columns = [
    { title: "Product", dataIndex: "product", key: "product" },
    { title: "Color", dataIndex: "color", key: "color" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Size", dataIndex: "size", key: "size" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  return (
    <Card>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <h2>
        Order #{order.id} - {order.status}
      </h2>
      <Table dataSource={order.products} columns={columns} rowKey="product" />
    </Card>
  );
};

export default OrderDetail;
