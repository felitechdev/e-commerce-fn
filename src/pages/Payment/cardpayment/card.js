import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CgFormatSlash } from "react-icons/cg";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Row, Select, Space, Col, Modal } from "antd";
import { IoCloseSharp } from "react-icons/io5";
import { Provinces, Districts, Sectors, Cells, Villages } from "rwanda";
import { useUser } from "../../../context/UserContex";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { formvalidation, formvalidation2, formvalidation3 } from "./validation";
export const CardPayment = ({
  token,
  cartTotl,
  totalCost,
  shippingAddress,
  isModalOpen,
  deliveryPreference,
  handlecancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [activetab, setActivetab] = useState(1);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  //   const { handleSubmit, control } = useForm();

  // check user

  const user = useUser().user;
  const navigate = useNavigate();

  const handleupdatetab = (nbr) => {
    setActivetab(nbr);
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: "",
  });
  const onErrors = (errors) => {};

  const onSubmit = async (data) => {
    let requestData = {
      // ...data,
      shippingAddress: shippingAddress,
      deliveryPreference: deliveryPreference.toLowerCase(),
      items: cartTotl,
      amount: totalCost,
      phoneNumber: data.paymentphoneNumber,
      email: data.email,
      // fullname: data?.fullname,

      payment_payload: {
        card_number: data?.cardNumber,
        fullname: data?.accountHolderName,
        phone_number: data?.paymentphoneNumber,
        cvv: data?.cvv,
        amount: data?.amount,
        currency: "RWF",
        email: data?.email,
        expiry_month: data?.expiryDate.split("/")[0],
        expiry_year: data?.expiryDate.split("/")[1],
      },
    };

    console.log("data on card details", requestData);

    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/payments/checkout/card`,
        // /api/v1/payments`,
        requestData,
        {
          headers: {
            Authorization: ` Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.status === "success") {
        setIsLoading(false);
      }

      console.log("response", res);
      // if (res.status == "success") {
      //   var link = res?.data?.meta?.authorization?.redirect;
      //   navigate(link);
      // }

      if (res.data.status === "success") {
        setIsLoading(false);
        // Get the redirect link from the response
        const redirectLink = res.data.data.meta.authorization.redirect;

        // Open the redirect link in a new tab
        // window.open(redirectLink, "_blank");
        // handlecancel();
      }
    } catch (error) {
      // if (error.response.data.message === "Payment not completed.")
      //   return setError(error.response.data.message);
      // if (error.response.data.message === "Invalid phone number")
      //   return setError("Invalid phone number");
      setError("Unexpected error has occured. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const onsubmitPin = async (data) => {
    console.log(data);
  };

  const onsubmitOtp = async (data) => {
    console.log(data);
  };

  return (
    <Modal
      width="70rem"
      styles={{
        backgroundColor: "white",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={isModalOpen}
      closeIcon={<IoCloseSharp onClick={handlecancel} className="text-[red]" />}
    >
      <div className=" mb-10 flex justify-between items-center font-bold w-[75%] cursor-pointer rounded-t-md m-auto  border border-primary  h-10 ">
        <h1
          onClick={() => {
            handleupdatetab(1);
          }}
          className={` ${
            activetab == 1 && "bg-primary"
          } h-full w-1/3 text-center  flex items-center justify-center `}
        >
          Card Details
        </h1>
        <h1
          onClick={() => {
            handleupdatetab(2);
          }}
          className={` ${
            activetab == 2 && "bg-primary"
          } h-full w-1/3 text-center  flex items-center justify-center `}
        >
          PIN
        </h1>
        <h1
          onClick={() => {
            handleupdatetab(3);
          }}
          className={` ${
            activetab == 3 && "bg-primary"
          } h-full w-1/3 text-center  flex items-center justify-center `}
        >
          OTP
        </h1>
      </div>

      {activetab == 1 && (
        <Form layout={"vertical"} onFinish={handleSubmit(onSubmit, onErrors)}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Controller
                control={control}
                name="cardNumber"
                rules={formvalidation.cardNumber}
                render={({ field }) => (
                  <>
                    <Form.Item label="Card number">
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter cardNumber"
                      />
                      <p className="text-[red]">
                        {errors?.cardNumber?.message}
                      </p>
                    </Form.Item>
                  </>
                )}
              />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Controller
                control={control}
                name="accountHolderName"
                rules={formvalidation.accountHolderName}
                render={({ field }) => (
                  <>
                    <Form.Item label="Card-holder(full name) ">
                      <Input
                        {...field}
                        placeholder="Enter Account-holder Name "
                      />

                      <p className="text-[red]">
                        {errors?.accountHolderName?.message}
                      </p>
                    </Form.Item>
                  </>
                )}
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Controller
                control={control}
                name="cvv"
                rules={formvalidation.cvv}
                render={({ field }) => (
                  <>
                    <Form.Item label="CVV">
                      <Input {...field} type="number" placeholder="111" />

                      <p className="text-[red]">{errors?.cvv?.message}</p>
                    </Form.Item>
                  </>
                )}
              />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Controller
                control={control}
                name="expiryDate"
                rules={formvalidation.expiryDate}
                render={({ field }) => (
                  <>
                    <Form.Item label="Expiry Date MM/YYY">
                      <Input {...field} type="text" placeholder="03/2030" />
                      <p className="text-[red]">
                        {errors?.expiryDate?.message}
                      </p>
                    </Form.Item>
                  </>
                )}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Controller
                control={control}
                name="email"
                rules={formvalidation.email}
                render={({ field }) => (
                  <>
                    <Form.Item
                      label="Email"
                      className="w-[100%] text-red-700 !mb-2"
                    >
                      <Input
                        {...field}
                        type="email"
                        placeholder="og@gmail.com"
                        className="text-gray-700 text-sm placeholder:text-sm "
                      />

                      <p className="text-[red]">{errors?.email?.message}</p>
                    </Form.Item>
                  </>
                )}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Controller
                control={control}
                name="amount"
                rules={formvalidation.amount}
                render={({ field }) => (
                  <>
                    <Form.Item label="Amount">
                      <Input
                        {...field}
                        type="number"
                        placeholder="enter amount"
                      />
                      <p className="text-[red]">{errors?.amount?.message}</p>
                    </Form.Item>
                  </>
                )}
              />
            </Col>
          </Row>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Button
                disabled={isLoading}
                onClick={handlecancel}
                className="flex items-center justify-center font-thin disabled:opacity-40"
                style={
                  {
                    // borderRadius: "9999px",
                  }
                }
              >
                <span className="flex">
                  <h2 className=" flex  items-center justify-center">Cancel</h2>
                </span>{" "}
              </Button>

              <Button
                disabled={isLoading}
                htmlType="submit"
                onClick={() => {
                  if (user == null) {
                    navigate("/signin", { replace: true });
                  }
                }}
                className="flex items-center justify-center disabled:opacity-40"
                style={{
                  background: "#1D6F2B",
                  color: "#FFFFFF",
                  // borderRadius: "9999px",
                }}
              >
                Next{" "}
              </Button>
            </div>
          </div>
        </Form>
      )}

      {activetab == 2 && (
        <Form layout={"vertical"} onFinish={handleSubmit(onSubmit, onErrors)}>
          <div className="flex flex-col justify-center items-center gap-2">
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Controller
                control={control}
                name="pin"
                rules={formvalidation2.pin}
                render={({ field }) => (
                  <>
                    <Form.Item label="PIN">
                      <Input {...field} type="number" placeholder="Enter pin" />
                      <p className="text-[red]">{errors?.pin?.message}</p>
                    </Form.Item>
                  </>
                )}
              />
            </Col>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex gap-2">
              <Button
                disabled={isLoading}
                onClick={handlecancel}
                className="flex items-center justify-center font-thin disabled:opacity-40"
                style={
                  {
                    // borderRadius: "9999px",
                  }
                }
              >
                <span className="flex">
                  <h2 className=" flex  items-center justify-center">Cancel</h2>
                </span>{" "}
              </Button>

              <Button
                disabled={isLoading}
                htmlType="submit"
                onClick={() => {
                  if (user == null) {
                    navigate("/signin", { replace: true });
                  }
                }}
                className="flex items-center justify-center disabled:opacity-40"
                style={{
                  background: "#1D6F2B",
                  color: "#FFFFFF",
                  // borderRadius: "9999px",
                }}
              >
                Next{" "}
              </Button>
            </div>
          </div>
        </Form>
      )}

      {activetab == 3 && (
        <Form layout={"vertical"} onFinish={handleSubmit(onSubmit, onErrors)}>
          <div className="flex flex-col justify-center items-center gap-2">
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Controller
                control={control}
                name="otp"
                rules={formvalidation3.otp}
                render={({ field }) => (
                  <>
                    <Form.Item label="OTP">
                      <Input {...field} type="number" placeholder="Enter OTP" />
                      <p className="text-[red]">{errors?.otp?.message}</p>
                    </Form.Item>
                  </>
                )}
              />
            </Col>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex gap-2">
              <Button
                disabled={isLoading}
                onClick={handlecancel}
                className="flex items-center justify-center font-thin disabled:opacity-40"
                style={
                  {
                    // borderRadius: "9999px",
                  }
                }
              >
                <span className="flex">
                  <h2 className=" flex  items-center justify-center">Cancel</h2>
                </span>{" "}
              </Button>

              <Button
                disabled={isLoading}
                htmlType="submit"
                onClick={() => {
                  if (user == null) {
                    navigate("/signin", { replace: true });
                  }
                }}
                className="flex items-center justify-center disabled:opacity-40"
                style={{
                  background: "#1D6F2B",
                  color: "#FFFFFF",
                  // borderRadius: "9999px",
                }}
              >
                Next{" "}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Modal>
  );
};
