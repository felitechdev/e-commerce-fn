import {
  Button,
  DatePicker,
  Dropdown,
  Select,
  Form,
  Input,
  Modal,
  Upload,
} from "antd";

import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UpdateOrder } from "../../../../APIs/Oreders";
import Cookies from "js-cookie";
import { getorderDetail } from "../../../../APIs/Oreders";
import { updateOrderStatus } from "../../../../redux/Reducers/OrderReducer";

const { confirm } = Modal;

export const UpdateOrderStatus = ({ ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const token = Cookies.get("token");

  const { order, loadorder, errororder } = useSelector(
    (state) => state.updateoreder
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setIsModalOpen(props.setModel);
  }, [props.setModel]);

  const handleCancel = () => {
    setIsModalOpen(false);
    props.openModal(false);
  };

  const handleOk = (values) => {
    if (token && values) {
      dispatch(
        UpdateOrder({
          token,
          id: props.order,
          status: values.status,
        })
      )
        .unwrap()
        .then((data) => {
          if (data?.status == "success") {
            dispatch(
              updateOrderStatus({
                orderId: props.order,
                status: values.status,
              })
            );
            props.handleupdatestate(props.order, values.status);
            handleCancel();
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Modal
        title="Update Order Status"
        // width="50rem"
        open={isModalOpen}
        closeIcon={
          <IoCloseSharp onClick={handleCancel} className="text-[red]" />
        }
        style={{
          width: "30rem",
        }}
        onOk={handleOk}
        onCancel={handleCancel}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleOk}
          initialValues={"awaits payment"}
        >
          <Form.Item label="" name="status">
            <Select placeholder="Input placeholder">
              <Select.Option value="awaits payment">
                awaits payment
              </Select.Option>
              <Select.Option value="pending">pending</Select.Option>
              <Select.Option value="processing">processing</Select.Option>
              <Select.Option value="shipped">shipped</Select.Option>
              <Select.Option value="delivered">delivered</Select.Option>
              <Select.Option value="cancelled">cancel</Select.Option>
              <Select.Option value="transaction failed">
                transaction failed
              </Select.Option>
            </Select>
          </Form.Item>

          <div className="flex  justify-end space-x-2 pr-0 mt-2">
            <Button
              onClick={handleCancel}
              style={{
                fontWeight: "bold",
                display: "flex items-center justify-center space-x-5",
              }}
            >
              <span className="flex">
                {" "}
                <h2 className=" flex  items-center justify-center ">
                  <IoCloseSharp className="  mr-2" />
                  Cancel
                </h2>
              </span>{" "}
            </Button>

            <Button
              htmlType="submit"
              style={{
                background: "#1D6F2B",
                color: "#FFFFFF",
                fontWeight: "bold",
                display: "flex items-center justify-center ",
              }}
            >
              <span className="flex">
                <h2 className=" flex  items-center justify-center ">
                  <FaSave className="  mr-2" />
                  {loadorder ? "Loading..." : "Update"}
                </h2>
              </span>
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
