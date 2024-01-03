import React, { useState } from "react";
import { DatePicker, Form, Input } from "antd";
import ModalFooter from "../../Button/Modelfooter";
// country input to check country phone number
import PhoneInput from "antd-phone-input";

export const BusinessDetailsComponent = ({
  handleCancel,
  handleOk,
  onFinish,
  onFinishFailed,
}) => {
  const [form] = Form.useForm();
  return (
    <Form
      // {...formItemLayout}
      layout={"vertical"}
      form={form}
      initialValues={""}
      onValuesChange={""}
    >
      <Form.Item label="Company Name" className=" ">
        <Input placeholder="Enter Company Name" />
      </Form.Item>
      <div className="flex justify-between ">
        <Form.Item label="Company Type" className="w-[48%] ">
          <Input placeholder="Enter company Type" />
        </Form.Item>
        <Form.Item label="Pan Card Number" className="w-[48%] ">
          <Input placeholder="Enter pan-card-number" />
        </Form.Item>
      </div>
      <div className="flex justify-between ">
        <Form.Item label="Email" className="w-[48%]">
          <Input placeholder="Enter Email" />
        </Form.Item>
        <Form.Item label="Phone number" className="w-[48%]">
          {/* input for phone number check country */}
          <PhoneInput enableSearch />
        </Form.Item>
      </div>
      <div className="flex justify-between w-[90%] m-auto ">
        <Form.Item label="Website" className="w-[48%]">
          <Input placeholder="Enter Url" />
        </Form.Item>
        <Form.Item label="Company Logo" className="w-[48%]">
          <Input type="file" placeholder="Enter Url" />
        </Form.Item>
      </div>
      {/* <ModalFooter onCancel={handleCancel} onOk={handleOk} /> */}
    </Form>
  );
};
