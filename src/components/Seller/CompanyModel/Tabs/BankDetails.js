import React, { useState } from "react";
import { DatePicker, Form, Input } from "antd";
import ModalFooter from "../../Button/Modelfooter";

export const BankDetailsComponent = ({
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
      <div className="flex justify-between ">
        <Form.Item label="Bank Name" className="w-[48%] ">
          <Input placeholder="Enter bank name" />
        </Form.Item>
        <Form.Item label="Branch" className="w-[48%]">
          <Input placeholder="Branch" />
        </Form.Item>
      </div>
      <div className="flex justify-between ">
        <Form.Item label="Account-holder Name " className="w-[48%]">
          <Input placeholder="Enter Account-holder Name " />
        </Form.Item>
        <Form.Item label="Account number" className="w-[48%]">
          <Input placeholder="Enter Account number" />
        </Form.Item>
      </div>
      <ModalFooter onCancel={handleCancel} onOk={handleOk} />
    </Form>
  );
};
