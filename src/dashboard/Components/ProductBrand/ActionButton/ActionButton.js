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
import { deleteProductBrand } from "../../../Redux/ReduxSlice/ProductBrand.slice";
import { ProductClassForm } from "../AddCategory/Category";

const { confirm } = Modal;

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
      title: "Are you sure delete this Brand?",
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
          dispatch(deleteProductBrand({ id: categoryId, token: token }))
            .unwrap()
            .then((response) => {
              if (response.status === 204) {
                setOnSuccess("Brand deleted successfully");

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
        title="Brand"
        width="50rem"
        open={isModalOpen}
        closeIcon={
          <CloseOutlined onClick={handleCancelUppdate} className="text-[red]" />
        }
      >
        <ProductClassForm
          openUPdate={true}
          categoryId={props.categoryId}
          name={props.name}
          productclass={props.productclass}
        />
      </Modal>
      <div className="flex justify-start  space-x-5 text-lg  ">
        <EditFilled className=" text-icon2 mr-2" onClick={() => handleOpen()} />
        <DeleteFilled
          onClick={() => ShowDeleteConfirm(props.categoryId)}
          className=" text-icon3"
        />
      </div>
    </>
  );
};
