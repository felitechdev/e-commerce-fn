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
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleSubmit, control } = useForm();

  // check user

  const user = useUser().user;
  const navigate = useNavigate();

  console.log("response", user);
  const onErrors = (errors) => {};

  const onSubmit = async (data) => {
    let requestData = {
      // ...data,
      shippingAddress: shippingAddress,
      deliveryPreference: deliveryPreference.toLowerCase(),
      items: cartTotl,
      amount: totalCost,

      //
      phoneNumber: data.paymentphoneNumber,

      email: data.email,
      fullname: data?.fullname,
    };

    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/payments/checkout/momo`,
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
        window.open(redirectLink, "_blank");

        handlecancel();
      }

      // alert("Payment was successfull!");
    } catch (error) {
      if (error.response.data.message === "Payment not completed.")
        return setError(error.response.data.message);
      if (error.response.data.message === "Invalid phone number")
        return setError("Invalid phone number");
      setError("Unexpected error has occured. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      width="70rem"
      styles={{
        backgroundColor: "white",
        position: "relative",
      }}
      open={isModalOpen}
      closeIcon={<IoCloseSharp onClick={handlecancel} className="text-[red]" />}
    >
      {error !== "Payment not completed." && (
        <Form layout={"vertical"} onFinish={handleSubmit(onSubmit, onErrors)}>
          <Controller
            control={control}
            name="paymentphoneNumber"
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <>
                <Form.Item
                  label="Phone number"
                  className="w-[100%] text-red-700 !mb-2"
                >
                  <Input
                    {...field}
                    type="number"
                    placeholder="Ex 078/9/2/3XXXXXXX"
                    className="text-gray-700 text-sm placeholder:text-sm "
                  />
                  <p className="text-red-500 text-xs">
                    {error && error !== "Payment not completed." && error}
                  </p>
                </Form.Item>
              </>
            )}
          />

          <Controller
            control={control}
            name="email"
            // rules={{ required: "Phone number is required" }}
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
                </Form.Item>
              </>
            )}
          />

          <Controller
            control={control}
            name="fullname"
            render={({ field }) => (
              <>
                <Form.Item
                  label="Full Name"
                  className="w-[100%] text-red-700 !mb-2"
                >
                  <Input
                    {...field}
                    type="text"
                    placeholder="Joseph kanye "
                    className="text-gray-700 text-sm placeholder:text-sm "
                  />
                </Form.Item>
              </>
            )}
          />

          <div className="flex flex-col gap-2">
            {/* {isLoading && (
                <span className="text-xs font-bold leadin-5 text-gray-700">
                  Follow instructions on your phone to proceed.
                </span>
              )} */}
            Make sure that the account balance is greater than {totalCost} RWF,
            otherwise the payment will not be completed.
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
                {(isLoading && "Processing...") || `Pay ${totalCost} Rwf`}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Modal>
  );
};
