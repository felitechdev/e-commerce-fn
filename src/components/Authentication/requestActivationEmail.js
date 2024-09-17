import React, { useState, useEffect } from "react";
import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Loader } from "../../dashboard/Components/Loader/LoadingSpin";
import axios from "axios";
import { set } from "js-cookie";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const RequestActivate = ({ setModel, setOpenModal, setEmailMessage }) => {
  const [isModalOpen, setIsModalOpen] = useState(setModel);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [errormessage, setErrormessage] = useState("");
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handlesubmit = async (email) => {
    setLoading(true);
    setError(false);

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/request-account-verification-email`,
        email
      );

      if (result?.data?.status === "success") {
        setEmailMessage(result.data.data);
        setOpenModal(false);
      }
    } catch (error) {
      if (error?.response?.data?.status === "fail") {
        setErrormessage(error.response.data.message);
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Request Activation Email"
        width="20rem"
        open={setModel}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          // {...formItemLayout}
          layout={"vertical"}
          form={form}
          initialValues={""}
          onValuesChange={""}
          onFinish={handlesubmit}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          {error && <p className="text-red-500 text-sm">{errormessage}</p>}

          <Button
            className="mt-2 "
            type="primary"
            htmlType="submit"
            disabled={loading}
          >
            {loading ? <Loader /> : "Request Activation Email"}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default RequestActivate;
