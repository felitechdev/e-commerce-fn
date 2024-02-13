import { Button, Form, Input, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { Updateprofilenames } from "../../../../src/APIs/UserAPIs";

import { useUser } from "../../../context/UserContex";

const PersonalInfoModel = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState("1");
  const [userprofile, setUserprofile] = useState();
  const [logoFile, setLogoFile] = useState(null);
  const [userdata, setUserdata] = useState();
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const token = Cookies.get("token");
  const [errorAlert, setErrorAlert] = useState({ status: false, message: "" });
  const [successAlert, setSuccessAlert] = useState({
    status: false,
    message: "",
  });
  const {
    register,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: props.profileview });

  const dispatch = useDispatch();

  const { user, onLogout } = useUser();

  const { userenameupdate, loadusername, errusername } = useSelector(
    (state) => state.usernameupdate
  );

  const {
    profile,
    loadprofile,
    errprofile,
    profileupdate,
    loadprofileupdate,
    errprofileupdate,
  } = useSelector((state) => state.userprofile);

  const onErrors = (errors) => console.log("errors on form creation", errors);

  const onFinish = async (values) => {
    const payload = {};

    const fields = ["firstName", "lastName"];

    fields.forEach((field) => {
      if (values[field]) {
        payload[field] = values[field];
      }
    });

    dispatch(Updateprofilenames({ data: payload, token: token }))
      .unwrap()
      .then((res) => {
        console.log("response on update", res);
        if (res?.message) {
          console.log(res?.data?.profile, "sucesss updartee");
          // handleupdatestateProfile
          props.handleupdatestateProfile(payload);

          // close model
          props.handleCancel();
          setUpdateError("");
          setUpdateSuccess(res?.data?.profile);
        }
      })
      .catch((err) => {
        setUpdateError("Update Error");
        setUpdateSuccess("");
        console.log("Update error response", err);
      });
  };

  useEffect(() => {
    if (updateError !== "") {
      setErrorAlert({ status: true, message: updateError });
    } else {
      setErrorAlert({ status: false, message: "" });
    }
  }, [updateError]);

  useEffect(() => {
    if (updateSuccess !== "") {
      setSuccessAlert({ status: true, message: updateSuccess });
    } else {
      setSuccessAlert({ status: false, message: "" });
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (props.profileview) {
      setUserprofile(props.profileview);
    }
  }, [props.profileview]);

  useEffect(() => {
    // Update form values if profileview changes
    setValue("firstName", user?.firstName || "");
    setValue("lastName", user?.lastName || "");
    // setValue("email", userprofile?.email || "");
  }, [props.profileview, setValue]);

  return (
    <Modal
      title="Update Personal Information"
      width="80rem"
      open={props.isModalOpen}
      closeIcon={
        <IoCloseSharp onClick={props.handleCancel} className="text-[red]" />
      }
      style={{ width: "70rem" }}
    >
      <Form
        layout={"vertical"}
        onFinish={handleSubmit(onFinish, onErrors)}
        initialValues={props.profileview}
      >
        <div className="flex justify-between space-x-2 ">
          <Controller
            control={control}
            name="firstName"
            rules={{}}
            // defaultValue={userprofile?.firstName || ""}
            render={({ field }) => (
              <>
                <Form.Item label="First Name" className="w-[48%] ">
                  <Input {...field} placeholder="Enter First Name" />
                  {/* <p className="text-[red]">{errors?.firstName?.message}</p> */}
                </Form.Item>
              </>
            )}
          />

          <Controller
            control={control}
            name="lastName"
            rules={{}}
            // defaultValue={userprofile?.lastName || ""}
            render={({ field }) => (
              <>
                <Form.Item label="Last Name" className="w-[48%]">
                  <Input {...field} placeholder="Enter Last Name" />
                  {/* <p className="text-[red]">{errors?.lastName?.message}</p> */}
                </Form.Item>
              </>
            )}
          />

          {/* <Controller
            control={control}
            name="email"
            rules={{}}
            defaultValue={profile ? userprofile?.email : ""}
            render={({ field }) => (
              <>
                <Form.Item label="Personal Email" className="w-[48%]">
                  <Input {...field} type="text" placeholder="Enter Email" />
                </Form.Item>
              </>
            )}
          /> */}
        </div>

        <div className="flex  justify-end space-x-2 pr-0 mt-2">
          <Button
            onClick={props.handleCancel}
            style={{
              fontWeight: "bold",
              display: "flex items-center justify-center space-x-5",
            }}
          >
            {" "}
            <span className="flex">
              {" "}
              <h2 className=" flex  items-center justify-center ">
                <IoCloseSharp className="  mr-2" />
                Cancel
              </h2>
            </span>{" "}
          </Button>

          <Button
            // onClick={props.onOk}
            htmlType="submit"
            style={{
              background: "#1D6F2B",
              color: "#FFFFFF",
              fontWeight: "bold",
              display: "flex items-center justify-center ",
            }}
          >
            {" "}
            {loadusername ? (
              "updating..."
            ) : (
              <span className="flex">
                <h2 className=" flex  items-center justify-center ">
                  <FaSave className="  mr-2" />
                  Submit
                </h2>
              </span>
            )}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default PersonalInfoModel;
