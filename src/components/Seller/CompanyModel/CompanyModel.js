import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Tabs } from "antd";
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

import { PersonalDetailsComponent } from "./Tabs/personDetails";
import { BusinessDetailsComponent } from "./Tabs/BusinessDetails";
import { BankDetailsComponent } from "./Tabs/BankDetails";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const { TabPane } = Tabs;

const personalDetailsFields = [
  {
    label: "First Name",
    className: "w-[48%]",
    rules: [{ required: true, message: "Please input your bank name!" }],
    placeholder: "Enter First Name",
    type: "text",
  },
  {
    label: "Last Name",
    className: "w-[48%]",
    placeholder: "Enter Last Name",
    type: "text",
  },
  { label: "Enter Phone number", className: "w-[48%]", type: "phone" },
  {
    label: "Date of birth",
    className: "w-[48%]",
    datePickerClass: "w-[100%]",
    type: "date",
  },
  // Add more fields as needed
];

const CompanyModel = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState("1");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (key) => {
    setActiveKey(key);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title="Create company"
        width="50rem"
        open={props.isModalOpen}
        closeIcon={<IoCloseSharp className="text-[red]" />}
        onOk={handleOk}
        onCancel={props.handleCancel}
        okText={
          <span>
            <FaSave />
            Save
          </span>
        }
        cancelText={<span>{/* <IoCloseSharp /> Cancel */}</span>}
      >
        {/* change tabs while creating company */}
        <Tabs
          tabBarStyle={{
            background: "#f0f0f0",
            color: "black",
            fontWeight: "bold",
          }}
          activeKey={activeKey}
          onChange={onChange}
        >
          <TabPane
            tab={
              <span
                className={
                  activeKey === "1"
                    ? " bg-white  text-[#1D6F2B] "
                    : "text-[black]"
                }
              >
                Personal Details
              </span>
            }
            key="1"
          >
            <PersonalDetailsComponent
              handleCancel={handleCancel}
              handleOk={handleOk}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            />
          </TabPane>

          <TabPane
            tab={
              <span
                className={
                  activeKey === "2"
                    ? " bg-white  text-[#1D6F2B] "
                    : "text-[black]"
                }
              >
                Business Details
              </span>
            }
            key="2"
          >
            <BusinessDetailsComponent
              handleCancel={handleCancel}
              handleOk={handleOk}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            />
          </TabPane>

          <TabPane
            tab={
              <span
                className={
                  activeKey === "3"
                    ? " bg-white  text-[#1D6F2B] "
                    : "text-[black]"
                }
              >
                Bank Details
              </span>
            }
            key="3"
          >
            <BankDetailsComponent
              handleCancel={props.handleCancel}
              handleOk={handleOk}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            />
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default CompanyModel;
