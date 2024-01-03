import React, { useState } from "react";
import { DatePicker, Form, Input } from "antd";
import ModalFooter from "../../Button/Modelfooter";
// country input to check country phone number
import PhoneInput from "antd-phone-input";

export const PersonalDetailsComponent = ({
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
      // initialValues={""}
      // onValuesChange={""}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div className="flex justify-between ">
        <Form.Item
          label="First Name"
          className="w-[48%] "
          rules={[
            {
              required: true,
              message: "Please input your bank name!",
            },
          ]}
        >
          <Input placeholder="Enter First Name" />
        </Form.Item>
        <Form.Item label="Last Name" className="w-[48%]">
          <Input placeholder="Enter Last Name" />
        </Form.Item>
      </div>
      <div className="flex justify-between ">
        <Form.Item label="Enter Phone number" className="w-[48%]">
          {/* input for phone number check country */}
          <PhoneInput enableSearch />
        </Form.Item>
        <Form.Item label="Enter Location" className="w-[48%]">
          <Input type="text" placeholder="Enter Location" />
        </Form.Item>
      </div>
      <div className="flex justify-between ">
        <Form.Item label="Email" className="w-[48%]">
          <Input type="text" placeholder="Enter Email" />
        </Form.Item>
        <Form.Item label="Date of birth" className="w-[48%]">
          <DatePicker className="w-[100%]" />
        </Form.Item>
      </div>
      <div className="flex justify-between  space-x-4">
        <Form.Item label="City" className="w-[48%]">
          <Input type="text" placeholder="Stocks" />
        </Form.Item>
        <Form.Item label="Country" className="w-[48%]">
          <Input type="text" placeholder="Enter your country" />
        </Form.Item>
        <Form.Item label="Zip-code" className="w-[48%]">
          <Input type="text" placeholder="Enter your Zip-code" />
        </Form.Item>
      </div>
      <Form.Item label="Description" className="w-[100%]">
        <Input placeholder="Enter Description " />
      </Form.Item>

      {/* <ModalFooter onCancel={handleCancel} onOk={handleOk} /> */}
    </Form>
  );
};
