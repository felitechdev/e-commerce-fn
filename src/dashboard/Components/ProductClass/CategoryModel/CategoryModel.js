import React, { useState } from "react";
import { Button, Form, Input, Modal, Tabs } from "antd";
import { ProductClassForm } from "../AddCategory/Category";

const { TabPane } = Tabs;
const ProductclassModel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("1");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (key) => {
    setActiveKey(key);
  };

  return (
    <>
      <Button onClick={showModal}>Add Class</Button>
      <Modal
        title="Create a new product class"
        width="50rem"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ProductClassForm />
      </Modal>
    </>
  );
};

export default ProductclassModel;
