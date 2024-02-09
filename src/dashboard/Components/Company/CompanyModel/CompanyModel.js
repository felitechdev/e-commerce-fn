import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Tabs } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
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

const CompanyModel = () => {
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
      <Button onClick={showModal}>Add company</Button>

      <Modal
        title="Create company"
        width="50rem"
        open={isModalOpen}
        closeIcon={<CloseOutlined className="text-[red]" />}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={
          <span>
            <SaveOutlined />
            Save
          </span>
        }
        cancelText={
          <span>
            <CloseOutlined /> Cancel
          </span>
        }
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
              handleCancel={handleCancel}
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
