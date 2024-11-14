import { Button, Col, Row, Form, Input, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { updateprofileAddress } from "../../../APIs/UserAPIs";
import PhoneInput from "antd-phone-input";
import { useUser } from "../../../context/UserContex";
const PersonalAddressInfoModel = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState("1");
  const [userprofile, setUserprofile] = useState();
  const [logoFile, setLogoFile] = useState(null);
  const [userdata, setUserdata] = useState();
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const token = Cookies.get("token");
  const [errorAlert, setErrorAlert] = useState({
    status: false,
    message: "",
  });
  const [successAlert, setSuccessAlert] = useState({
    status: false,
    message: "",
  });
  const {
    register,
    control,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: props.profileview });

  const dispatch = useDispatch();

  const { user, onLogout } = useUser();

  const { address, loadaddressupdate, loadaddress, erraddress } = useSelector(
    (state) => state.myaddress,
  );

  const {
    profile,
    loadprofile,
    errprofile,
    profileupdate,
    loadprofileupdate,
    errprofileupdate,
  } = useSelector((state) => state.userprofile);

  const onErrors = (errors) => {};

  const onFinish = async (values) => {
    let payload = {};
    if (values.phoneNumber && typeof values.phoneNumber === "object") {
      const { countryCode, areaCode, phoneNumber } = values.phoneNumber;
      const fullPhoneNumber = `+${countryCode}${areaCode}${phoneNumber}`;
      if (
        fullPhoneNumber.includes("null") ||
        fullPhoneNumber.includes("undefined")
      ) {
        return;
      } else {
        payload["phoneNumber"] = fullPhoneNumber;
      }
    }

    payload = {
      ...payload,
      address: {
        district: values.district,
        sector: values.sector,
        street: values.street,
      },
    };

    dispatch(
      updateprofileAddress({ data: payload, token: token, id: user?.id }),
    )
      .unwrap()
      .then((res) => {
        reset();
        props.handleCancel();
      })
      .catch((err) => {
        setUpdateError("Update Error");
        setUpdateSuccess("");
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
      setSuccessAlert({
        status: true,
        message: updateSuccess,
      });
    } else {
      setSuccessAlert({ status: false, message: "" });
    }
  }, [updateSuccess]);

  useEffect(() => {}, []);

  useEffect(() => {
    setValue("phoneNumber", props.address?.phoneNumber);
    setValue("district", props.address?.address?.district);
    setValue("sector", props.address?.address?.sector);
    setValue("street", props.address?.address?.street);
  }, [props.address, setValue]);

  return (
    <Modal
      title="Update Personal Address Information"
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
        initialValues={props.address}
      >
        <div className="flex justify-between space-x-2">
          <Controller
            control={control}
            name="district"
            rules={{}}
            render={({ field }) => (
              <>
                <Form.Item label="District Name" className="w-[48%]">
                  <Input {...field} placeholder="Enter district Name" />
                  {/* <p className="text-[red]">{errors?.lastName?.message}</p> */}
                </Form.Item>
              </>
            )}
          />

          <Controller
            control={control}
            name="sector"
            rules={{}}
            // defaultValue={userprofile?.firstName || ""}
            render={({ field }) => (
              <>
                <Form.Item label="Sector Name" className="w-[48%]">
                  <Input {...field} placeholder="Enter sector Name" />
                  {/* <p className="text-[red]">{errors?.firstName?.message}</p> */}
                </Form.Item>
              </>
            )}
          />
        </div>

        <div>
          <Row gutter={[16, 16]} className="space-y-4 md:space-y-0">
            {" "}
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Controller
                control={control}
                name="phoneNumber"
                rules={
                  {
                    //   required: "Phone number is required",
                  }
                }
                render={({ field }) => (
                  <>
                    <Form.Item label="Phone number" className="h-5">
                      <PhoneInput {...field} enableSearch />
                      <p className="text-[red]">
                        {errors?.phoneNumber?.message}
                      </p>
                    </Form.Item>
                  </>
                )}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Controller
                control={control}
                name="street"
                rules={
                  {
                    // required: "Street is required",
                  }
                }
                render={({ field }) => (
                  <>
                    <Form.Item label="Street" className="h-8">
                      <Input
                        {...field}
                        type="text"
                        placeholder="Street"
                        className="border"
                      />
                      <p className="text-[red]">{errors?.Street?.message}</p>
                    </Form.Item>
                  </>
                )}
              />
            </Col>{" "}
          </Row>
        </div>

        <div className="mt-5 flex justify-end space-x-2 pr-0">
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
              <h2 className="flex items-center justify-center">
                <IoCloseSharp className="mr-2" />
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
            {loadaddressupdate ? (
              "updating..."
            ) : (
              <span className="flex">
                <h2 className="flex items-center justify-center">
                  <FaSave className="mr-2" />
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

export default PersonalAddressInfoModel;
