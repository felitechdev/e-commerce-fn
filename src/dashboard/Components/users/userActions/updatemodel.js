import React, { useState, useEffect } from "react";
import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Loader } from "../../Loader/LoadingSpin";
import axios from "axios";
import { set } from "js-cookie";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { updateuserRole } from "../../../../redux/Reducers/usersSlice";
// import "../styles.css";

const UpdateRole = ({ setModel, setOpenModal, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(setModel);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handlesubmit = async (values) => {
    setLoading(true);
    setError(false);

    try {
      console.log("values", values, id);
      const result = await axios.patch(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/users/${id.id}`,
        values,
        {
          headers: {
            Authorization: token && `Bearer ${token}`,
          },
        }
      );
      if (result?.data?.status === "success") {
        dispatch(updateuserRole({ userid: id.id, role: values.role }));
        setOpenModal(false);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Update Role"
        width="20rem"
        open={setModel}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h1 className="font-bold">
          User :{id?.firstName} Current role :{id?.role}
        </h1>
        <Form
          // {...formItemLayout}
          layout={"vertical"}
          form={form}
          initialValues={""}
          onValuesChange={""}
          onFinish={handlesubmit}
        >
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select
              options={[
                { label: "Admin", value: "admin" },
                { label: "Customer", value: "customer" },
                { label: "seller", value: "seller" },
              ]}
            />
          </Form.Item>

          <Button
            className="mt-2 "
            type="primary"
            htmlType="submit"
            disabled={loading}
          >
            {loading ? <Loader /> : "Update"}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateRole;
