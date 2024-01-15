import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, DatePicker, Form, Input, Modal, Tabs } from "antd";
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
// country input to check country phone number
import PhoneInput from "antd-phone-input";
import Cookies from "js-cookie";
import { Updateprofile } from "../../../../APIs/UserAPIs";

const CompanyModel = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState("1");
  const [userprofile, setUserprofile] = useState();
  const [logoFile, setLogoFile] = useState(null);
  const [userdata, setUserdata] = useState();
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");

  const [errorAlert, setErrorAlert] = useState({ status: false, message: "" });
  const [successAlert, setSuccessAlert] = useState({
    status: false,
    message: "",
  });
  // const {
  //   register,
  //   control,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm();

  // const  profileview={props.profileview}

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue, // Add setValue from useForm
  } = useForm({
    defaultValues: props.profileview, // Set default values from profileview
  });

  const {
    profile,
    loadprofile,
    errprofile,
    profileupdate,
    loadprofileupdate,
    errprofileupdate,
  } = useSelector((state) => state.userprofile);
  const dispatch = useDispatch();

  const token = Cookies.get("token");

  const onErrors = (errors) => console.log("errors on form creation", errors);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    const payload = {};

    payload.bankAccount = {};

    if (values.bank) {
      payload.bankAccount.bank = values.bank;
    }

    if (values.accountName) {
      payload.bankAccount.accountName = values.accountName;
    }

    if (values.accountNumber) {
      payload.bankAccount.accountNumber = values.accountNumber;
    }

    if (values.accountHolderName) {
      payload.bankAccount.accountHolderName = values.accountHolderName;
    }

    const fields = [
      "firstName",
      "lastName",
      "email",
      "companyName",
      "companyEmail",
      "website",
      "cardNumber",
    ];

    fields.forEach((field) => {
      if (values[field]) {
        payload[field] = values[field];
      }
    });

    // Append locations data
    // if (values.locations && values.locations.length > 0) {
    //   payload["locations"] = values.locations.map((location) => ({
    //     type: {
    //       address: location.type.address,
    //       coordinates: {
    //         type: location.type.coordinates.type,
    //         index: "2dsphere",
    //       },
    //     },
    //     geojson: true,
    //   }));
    // }

    // Append phone number
    if (values.phoneNumber) {
      const { countryCode, areaCode, phoneNumber } = values.phoneNumber;
      const fullPhoneNumber = `+${countryCode}${areaCode}${phoneNumber}`;
      payload["phoneNumber"] = fullPhoneNumber;
    }

    // Append image file (assuming logoFile is a file input)
    if (logoFile) {
      payload["logo"] = logoFile;
    }

    dispatch(Updateprofile({ data: payload, token: token }))
      .unwrap()
      .then((res) => {
        if (res.status === "success") {
          console.log(res?.data?.profile, "sucesss updartee");

          // handleupdatestateProfile
          props.andleupdatestateProfile(payload);

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
    if (profile?.data?.user) {
      setUserprofile(profile?.data?.user);
    }
  }, [profile]);

  useEffect(() => {
    // Update form values if profileview changes
    setValue("firstName", userprofile?.firstName || "");
    setValue("lastName", userprofile?.lastName || "");
    setValue("email", userprofile?.email || "");
    setValue("companyName", props.profileview?.companyName || "");
    setValue("phoneNumber", props.profileview?.phoneNumber || "");
    setValue("companyEmail", props.profileview?.companyEmail || "");
    setValue("website", props.profileview?.website || "");
    setValue("logo", props.profileview?.logo || ""); // Assuming logo is a URL or file path
    setValue("locations", props.profileview?.locations || ""); // Assuming locations is a string
    setValue("bank", props.profileview?.bankAccount?.bank || "");
    setValue("accountName", props.profileview?.bankAccount?.accountName || "");
    setValue(
      "accountHolderName",
      props.profileview?.bankAccount?.accountHolderName || ""
    );
    setValue(
      "accountNumber",
      props.profileview?.bankAccount?.accountNumber || ""
    );
    setValue("cardNumber", props.profileview?.cardNumber || ""); // Assuming cardNumber is a string
  }, [props.profileview, setValue]);

  return (
    <>
      {/* {errorAlert.status && (
        <AlertComponent
          color="failure"
          type="Error!"
          message={errorAlert.message}
        />
      )}
      {successAlert.status && (
        <AlertComponent
          color="success"
          type="Success"
          message={successAlert.message}
        />
      )} */}
      <Modal
        title="Update profile"
        width="80rem"
        open={props.isModalOpen}
        closeIcon={
          <IoCloseSharp onClick={props.handleCancel} className="text-[red]" />
        }
        style={{
          width: "70rem",
        }}
      >
        <Form
          layout={"vertical"}
          onFinish={handleSubmit(onFinish, onErrors)}
          initialValues={userprofile}
        >
          <div className="flex justify-between space-x-2 ">
            <Controller
              control={control}
              name="firstName"
              rules={{ required: "First Name is required" }}
              defaultValue={userprofile?.firstName || ""}
              render={({ field }) => (
                <>
                  <Form.Item label="First Name" className="w-[48%] ">
                    <Input {...field} placeholder="Enter First Name" />
                    <p className="text-[red]">{errors?.firstName?.message}</p>
                  </Form.Item>
                </>
              )}
            />

            <Controller
              control={control}
              name="lastName"
              rules={{ required: "Last Name is required" }}
              defaultValue={userprofile?.lastName || ""}
              render={({ field }) => (
                <>
                  <Form.Item label="Last Name" className="w-[48%]">
                    <Input {...field} placeholder="Enter Last Name" />
                    <p className="text-[red]">{errors?.lastName?.message}</p>
                  </Form.Item>
                </>
              )}
            />

            <Controller
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
            />
          </div>
          <h1 className=" font-bold">Business Info</h1> <hr className="h-2 " />
          <div className="flex justify-between space-x-2 ">
            <Controller
              control={control}
              name="companyName"
              rules={{}}
              render={({ field }) => (
                <>
                  <Form.Item label="Business Name" className="w-[48%]">
                    <Input {...field} type="text" placeholder="Business Name" />
                  </Form.Item>
                </>
              )}
            />

            <Controller
              control={control}
              name="phoneNumber"
              rules={{}}
              render={({ field }) => (
                <>
                  <Form.Item label="Business Phone number" className="w-[48%]">
                    <PhoneInput {...field} enableSearch />
                  </Form.Item>
                </>
              )}
            />

            <Controller
              control={control}
              name="companyEmail"
              rules={{}}
              render={({ field }) => (
                <>
                  <Form.Item label="Business Email" className="w-[48%]">
                    <Input {...field} type="text" placeholder="Enter Email" />
                  </Form.Item>
                </>
              )}
            />
          </div>
          <div className="flex justify-between space-x-2 ">
            <Controller
              control={control}
              name="website"
              rules={{}}
              render={({ field }) => (
                <>
                  <Form.Item label="website Url" className="w-[48%]">
                    <Input {...field} type="text" placeholder="enter url" />
                  </Form.Item>
                </>
              )}
            />
            <Controller
              control={control}
              name="logo"
              rules={{}}
              render={({ field }) => (
                <>
                  <Form.Item label="Business logo" className="w-[48%]">
                    <input
                      type="file"
                      onChange={(e) => setLogoFile(e.target.files[0])}
                      // onChange={(value) => {
                      //         field.onChange(value); // Update the form field value
                      //         setSelectedCategory(value); // Update the selected category
                      //       }}
                    />
                  </Form.Item>
                </>
              )}
            />

            <Controller
              control={control}
              name="locations"
              rules={{}}
              render={({ field }) => (
                <>
                  <Form.Item label="Business locations" className="w-[48%]">
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter locations"
                    />
                  </Form.Item>
                </>
              )}
            />
          </div>
          <div className=" flex justify-between space-x-2">
            <Controller
              control={control}
              name="bank"
              rules={{}}
              render={({ field }) => (
                <>
                  <Form.Item label="bank name" className="w-[48%]">
                    <Input {...field} type="text" placeholder="bank name" />
                  </Form.Item>
                </>
              )}
            />

            <Controller
              control={control}
              name="accountName"
              rules={{}}
              render={({ field }) => (
                <>
                  <Form.Item label="Business accountName" className="w-[48%]">
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter accountName"
                    />
                  </Form.Item>
                </>
              )}
            />
            <Controller
              control={control}
              name="accountHolderName"
              rules={{}}
              render={({ field }) => (
                <>
                  <Form.Item label="Account-holder Name " className="w-[48%]">
                    <Input
                      {...field}
                      placeholder="Enter Account-holder Name "
                    />
                  </Form.Item>
                </>
              )}
            />
          </div>
          <div className=" flex justify-between space-x-2">
            <Controller
              control={control}
              name="accountNumber"
              rules={{}}
              render={({ field }) => (
                <>
                  <Form.Item label="Business accountNumber" className="w-[48%]">
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter accountNumber"
                    />
                  </Form.Item>
                </>
              )}
            />

            <Controller
              control={control}
              name="cardNumber"
              rules={{}}
              render={({ field }) => (
                <>
                  <Form.Item label="cardNumber" className="w-[48%]">
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter cardNumber"
                    />
                  </Form.Item>
                </>
              )}
            />
          </div>
          {/* <ModalFooter onCancel={handleCancel} onOk={handleOk} /> */}
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
              {loadprofileupdate ? (
                "Loading..."
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
    </>
  );
};

export default CompanyModel;

// bankAccount: {

// },
