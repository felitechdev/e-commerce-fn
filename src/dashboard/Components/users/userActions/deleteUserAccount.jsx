import React, { useState } from "react";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useUser } from "../../../../context/UserContex";
import axios from "axios";
import { DeleteFilled } from "@ant-design/icons";
import Cookies from "js-cookie";

const { confirm } = Modal;

const DeleteUserAccountConfirmation = ({
  openDeleteModal,
  setOpenDeleteModal,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [err, setErr] = useState("");
  const [onSuccess, setOnSuccess] = useState(null);
  const token = Cookies.get("token");
  console.log(
    "id",
    id,
    "token",
    token,
    "userToken",

    "openDeleteModal",
    openDeleteModal,
    "setOpenDeleteModal",
    setOpenDeleteModal
  );

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/delete-account/${id.id}`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: token && `Bearer ${token}`,
        },
      });

      if (response?.data && response.status === 200) {
        setOnSuccess("Account deleted successfully!");
        // redirect to login page
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else {
        setError(true);
        setErr("Error deleting account.");
      }
    } catch (err) {
      setError(true);
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this Account ?",
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
      onOk: handleDelete,
      onCancel() {
        setOpenDeleteModal(false);
      },
    });
  };

  return (
    <div className=" cursor-pointer md:flex items-center md:border p-1  md:space-x-2 font-bold text-[red] ">
      {openDeleteModal && showDeleteConfirm}
    </div>
  );
};

export default DeleteUserAccountConfirmation;
