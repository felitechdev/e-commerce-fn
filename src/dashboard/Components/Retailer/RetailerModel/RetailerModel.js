import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { PlusOutlined, CloseOutlined, SaveOutlined } from "@ant-design/icons";
import ModalFooter from "../../Button/Modelfooter";
import { RetailerFormInput } from "../../Inputs/RetailerInput";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const RetailerModel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) => {
    if (!option || !option.label) {
      return false;
    }
    return option.label.toLowerCase().includes(input.toLowerCase());
  };

  const fields = [
    { label: "Name", placeholder: "Enter name", type: "text" },
    { label: "Email", placeholder: "Enter Email", type: "text" },
    { label: "Phone number", type: "phone" },
    {
      label: "Joined date",
      placeholder: "select Date",
      datePickerClass: "w-[100%]",
      type: "date",
    },
    {
      label: "Status",
      type: "select",
      options: [
        { value: "jack", label: "Jack" },
        { value: "lucy", label: "Lucy" },
        { value: "tom", label: "Tom" },
      ],
    },
  ];

  return (
    <>
      <Button onClick={showModal}>Add retailer</Button>
      <Modal
        title={
          <div
            className="absolute w-[100%] left-0 top-0"
            style={{
              backgroundColor: "#f0f0f0",
              padding: "12px",
              margin: "0px",
            }}
          >
            Add retailer
          </div>
        }
        className=""
        width="50rem"
        open={isModalOpen}
        onOk={() => {}}
        onCancel={handleCancel}
        closeIcon={
          <CloseOutlined className="text-[white] bg-[red] font-bolder p-2 rounded absolute -top-2 -right-2 " />
        }
        okText={<span>Add a retailer</span>}
        cancelText={<span>Close</span>}
      >
        <Form
          layout={"vertical"}
          form={form}
          initialValues={""}
          onValuesChange={""}
        >
          <RetailerFormInput fields={fields} />

          <ModalFooter onCancel={handleCancel} onOk={handleOk} />
        </Form>
      </Modal>
    </>
  );
};

export default RetailerModel;
