import { Button, DatePicker, Dropdown, Form, Input, Modal, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  ExclamationCircleFilled,
  PlusOutlined,
  DeleteFilled,
  EyeFilled,
  EditFilled,
  CloseOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { deleteproduct } from "../../../Apis/Product";

const { confirm } = Modal;

const UpdateModel = ({ setModel }) => {
  const [isModalOpen, setIsModalOpen] = useState(setModel);
  const [form] = Form.useForm();

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Create company"
        width="50rem"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" initialValues={{}}>
          <Form.Item
            label=""
            name="fileList"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Company Name" name="companyName">
            <Input placeholder="Input placeholder" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Input placeholder" />
          </Form.Item>
          <Form.Item label="Phone number" name="phoneNumber">
            <Input placeholder="+250 788 284 364" />
          </Form.Item>
          <Form.Item label="Joined date" name="joinedDate">
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export const ActionButton = (props) => {
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [err, setErr] = useState(null);
  const [onSuccess, setOnSuccess] = useState(null);
  const [isupdate, setIsupdate] = useState(false);

  // reducer state
  const { deletedCategory, loading, error } = useSelector(
    (state) => state.deletecat
  );
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setShowUpdateModel(true);
    console.log("Edit Action");
  };
  const handleClick = () => {
    <UpdateModel setModel={true} />;
    console.log("Action");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOpen = () => {
    console.log("Action");
    setIsModalOpen(true);
  };
  const handleCancelUppdate = () => {
    setIsModalOpen(false);
  };

  const ShowDeleteConfirm = (productId) => {
    console.log("productId", productId);
    confirm({
      title: "Are you sure delete this Product?",
      icon: <ExclamationCircleFilled />,
      content: (
        <span>
          {loading ? (
            <p>loading...</p>
          ) : error ? (
            `Error: ${err}`
          ) : (
            onSuccess !== null && <p>{onSuccess}</p>
          )}
        </span>
      ),
      okText: "Yes",
      okType: "danger",

      cancelText: "No",
      async onOk() {
        return await new Promise((resolve, reject) => {
          dispatch(deleteproduct({ id: productId, token: token }))
            .unwrap()
            .then((response) => {
              if (response.status === 201) {
                setOnSuccess("Product deleted successfully");
                console.log("deleted", response);
                // pass category id to update state instead of dispatch
                props.handleUpdatestate(productId);
                resolve(response);
              }
            })
            .catch((error) => {
              setErr(error.message);
              console.log("error while deleting product ffffon", error);
              reject();
            });
        }).catch((error_1) => {
          console.log("Oops errors!", error_1);
        });
      },
      onCancel() {
        handleCancel();
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <Modal
        title="Product"
        width="50rem"
        open={isModalOpen}
        closeIcon={
          <CloseOutlined onClick={handleCancelUppdate} className="text-[red]" />
        }
      >
        {/* <ProductCatery openUPdate={true} productId={props.productId} /> */}
      </Modal>
      <div div className="flex justify-center  space-x-5 text-xl items-center">
        {/* <EditFilled className=" text-icon2 mr-2" onClick={() => handleOpen()} /> */}
        <DeleteFilled
          onClick={() => ShowDeleteConfirm(props.productId)}
          className=" text-icon3"
        />
        <EditFilled className=" text-icon2 mr-2" />
        <EyeFilled className=" text-icon1 mr-2" />

        {/* <ActionButton /> */}
      </div>
    </>
  );
};
