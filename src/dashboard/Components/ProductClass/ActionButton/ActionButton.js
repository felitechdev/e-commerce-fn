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
import { deletecategory, fetchCategory } from "../../../Apis/Categories";
import { ProductClassForm } from "../AddCategory/Category";
import { deleteProductClass } from "../../../Redux/ReduxSlice/ProductClass";
const { confirm } = Modal;

const UpdateModel = ({ setModel }) => {
  const [isModalOpen, setIsModalOpen] = useState(setModel);
  const [form] = Form.useForm();

  const normFile = (e) => {
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
  };
  const handleClick = () => {
    <UpdateModel setModel={true} />;
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const handleCancelUppdate = () => {
    setIsModalOpen(false);
  };

  const ShowDeleteConfirm = (categoryId) => {
    confirm({
      title: "Are you sure delete this Class?",
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
          dispatch(deleteProductClass({ id: categoryId }))
            .unwrap()
            .then((response) => {
              console.log("response", response);
              if (response.res.status === 200) {
                setOnSuccess("ProductClass deleted ");

                // dispatch(fetchCategory());
                // pass category id to update state instead of dispatch
                props.handleUpdatestate(categoryId);
                resolve(response);
              }
            })
            .catch((error) => {
              setErr(error.message);

              reject();
            });
        }).catch((error_1) => {});
      },
      onCancel() {
        handleCancel();
      },
    });
  };

  return (
    <>
      <Modal
        title="ProductClass"
        width="50rem"
        open={isModalOpen}
        closeIcon={
          <CloseOutlined onClick={handleCancelUppdate} className="text-[red]" />
        }
      >
        <ProductClassForm openUPdate={true} categoryId={props.categoryId} />
      </Modal>
      <div div className="flex justify-start  space-x-5 text-lg  ">
        <EditFilled className=" text-icon2 mr-2" onClick={() => handleOpen()} />
        <DeleteFilled
          onClick={() => ShowDeleteConfirm(props.categoryId)}
          className=" text-icon3"
        />
      </div>
    </>
  );
};
