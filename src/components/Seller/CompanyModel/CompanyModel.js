import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, DatePicker, Form, Input, Modal, Tabs } from "antd";
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
// country input to check country phone number
import PhoneInput from "antd-phone-input";
import { ModalFooter } from "flowbite-react/lib/esm/components/Modal/ModalFooter";
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const { TabPane } = Tabs;

const personalDetailsFields = [
  {
    label: "First Name",
    className: "w-[48%]",
    rules: [{ required: true, message: "Please input your bank name!" }],
    placeholder: "Enter First Name",
    type: "text",
  },
  {
    label: "Last Name",
    className: "w-[48%]",
    placeholder: "Enter Last Name",
    type: "text",
  },
  { label: "Enter Phone number", className: "w-[48%]", type: "phone" },
  {
    label: "Date of birth",
    className: "w-[48%]",
    datePickerClass: "w-[100%]",
    type: "date",
  },
  // Add more fields as needed
];

const CompanyModel = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState("1");

  const [userprofile, setUserprofile] = useState();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { profile, loadprofile, errprofile } = useSelector(
    (state) => state.userprofile
  );

  const onErrors = (errors) => console.log("errors on form creation", errors);

  console.log("storeUserInfo homepage", userprofile);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (key) => {
    setActiveKey(key);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  useEffect(() => {
    if (profile?.data?.user) {
      setUserprofile(profile?.data?.user);
    }
  }, [profile]);

  return (
    <>
      <Modal
        title="Create company"
        width="50rem"
        open={props.isModalOpen}
        closeIcon={<IoCloseSharp className="text-[red]" />}
        onOk={handleOk}
        onCancel={props.handleCancel}
        style={{
          background: "red",
          width: "90%",
        }}
        okText={
          <span>
            <FaSave />
            Save
          </span>
        }
        cancelText={<span>{/* <IoCloseSharp /> Cancel */}</span>}
      >
        <Form
          // {...formItemLayout}
          layout={"vertical"}
          // initialValues={""}
          // onValuesChange={""}
          onFinish={onFinish}
        >
          <div className="flex justify-between space-x-2 ">
            {/* <Controller
          control={control}
          name="name"
          rules={validateMessages.name}
          render={({ field }) => (
            <>
              <Form.Item label="Enter category" className=" w-[100%]">
                <Input {...field} placeholder="" />
                <p className="text-[red]">{errors?.name?.message}</p>
              </Form.Item>
            </>
          )}
        /> */}

            <Controller
              control={control}
              name="firstName"
              rules={{}}
              render={({ field }) => (
                <>
                  <Form.Item label="First Name" className="w-[48%] ">
                    <Input placeholder="Enter First Name" />
                  </Form.Item>
                </>
              )}
            />

            <Controller
              control={control}
              name="lastName"
              rules={{}}
              render={({ field }) => (
                <>
                  <Form.Item label="Last Name" className="w-[48%]">
                    <Input placeholder="Enter Last Name" />
                  </Form.Item>
                </>
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{}}
              render={({ field }) => (
                <>
                  <Form.Item label="Personal Email" className="w-[48%]">
                    <Input type="text" placeholder="Enter Email" />
                  </Form.Item>
                </>
              )}
            />
          </div>

          <h1>Business Info</h1>
          <div className="flex justify-between space-x-2 ">
            {/* <Controller
          control={control}
          name="name"
          rules={validateMessages.name}
          render={({ field }) => (
            <>
              <Form.Item label="Enter category" className=" w-[100%]">
                <Input {...field} placeholder="" />
                <p className="text-[red]">{errors?.name?.message}</p>
              </Form.Item>
            </>
          )}
        /> */}

            <Controller
              control={control}
              name="companyName"
              rules={{}}
              render={({ field }) => (
                <>
                  <Form.Item label="Business Name" className="w-[48%]">
                    <Input type="text" placeholder="Business Name" />
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
                    {/* input for phone number check country */}
                    <PhoneInput enableSearch />
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
                    <Input type="text" placeholder="Enter Email" />
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
                    <Input type="text" placeholder="enter url" />
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
                    <Input type="file" />
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
                    <Input type="text" placeholder="Enter locations" />
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
                    <Input type="text" placeholder="bank name" />
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
                    <Input type="text" placeholder="Enter accountName" />
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
                    <Input placeholder="Enter Account-holder Name " />
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
                    <Input type="text" placeholder="Enter accountNumber" />
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
                    <Input type="text" placeholder="Enter cardNumber" />
                  </Form.Item>
                </>
              )}
            />
          </div>
          {/* <ModalFooter onCancel={handleCancel} onOk={handleOk} /> */}
        </Form>
      </Modal>
    </>
  );
};

export default CompanyModel;

// bankAccount: {

// },
