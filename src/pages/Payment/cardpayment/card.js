import { Button, Col, Form, Input, Modal, Row } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../../../components/designLayouts/AlertComponent";
import { useUser } from "../../../context/UserContex";
import { clearCart } from "../../../redux/Reducers/cartRecuder";
import {
  formvalidation,
  formvalidation2,
  formvalidation3,
  formvalidation4,
} from "./validation";
export const CardPayment = ({
  token,
  cartTotl,
  totalCost,
  shippingAddress,
  isModalOpen,
  deliveryPreference,
  handlecancel,
  isrepay,
  card_payload,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentdata, setPaymentdata] = useState({});

  const [isLoading2, setIsLoading2] = useState(false);
  const [error2, setError2] = useState("");
  const [isLoading3, setIsLoading3] = useState(false);
  const [error3, setError3] = useState("");

  const [pinpayload, setPinpayload] = useState({});
  const [otppayload, setOtppayload] = useState({});
  const [avspayload, setAvspayload] = useState({});
  const [activetab, setActivetab] = useState(1);
  const [successmessage, setSuccessmessage] = useState(null);
  const [errormessage, setErrormessage] = useState(null);
  // const [authmode, setAuthmode] = useState("pin");

  const [authmode, setAuthmode] = useState("avs_noauth");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  //   const { handleSubmit, control } = useForm();

  // check user

  const user = useUser().user;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleclearCart = () => {
    let existingCart = JSON.parse(localStorage.getItem("cart"));

    dispatch(clearCart());
    if (existingCart) {
      existingCart = [];
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  const handleupdatetab = (nbr) => {
    setActivetab(nbr);
  };
  const {
    control,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: "",
  });
  const onErrors = (errors) => {};

  const onSubmit = async (data) => {
    let requestData = !isrepay
      ? {
          // ...data,
          shippingAddress: shippingAddress,
          deliveryPreference: deliveryPreference.toLowerCase(),
          items: cartTotl,
          amount: totalCost,
          phoneNumber: data.paymentphoneNumber,
          email: data.email,
          payment_payload: {
            card_number: data?.cardNumber,
            fullname: data?.accountHolderName,
            phone_number: data?.paymentphoneNumber,
            cvv: data?.cvv,
            amount: totalCost,
            currency: "RWF",
            email: data?.email,
            expiry_month: data?.expiryDate.split("/")[0],
            expiry_year: data?.expiryDate.split("/")[1],
          },
        }
      : {
          order_id: card_payload?.order_id,
          payload: {
            card_number: data?.cardNumber,
            fullname: data?.accountHolderName,
            phone_number: data?.paymentphoneNumber,
            cvv: data?.cvv,
            amount: totalCost,
            currency: "RWF",
            expiry_month: data?.expiryDate.split("/")[0],
            expiry_year: data?.expiryDate.split("/")[1],
            email: data?.email,
          },
        };

    setPaymentdata(requestData);

    setIsLoading(true);
    setError("");
    try {
      const res = !isrepay
        ? await axios.post(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/payments/checkout/card`,

            requestData,
            {
              headers: {
                Authorization: ` Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
        : await axios.post(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/payments/retry-card`,

            requestData,
            {
              headers: {
                Authorization: ` Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

      console.log("response on card", res);

      if (res.data.status === "success") {
        setIsLoading(false);
      }

      if (res?.data?.data?.authorization?.mode == "pin") {
        setActivetab(2);
        setAuthmode("pin");
        setPinpayload(res?.data?.data?.payment_payload);
      }
      if (res?.data?.data?.authorization?.mode == "avs_noauth") {
        setActivetab(2);
        setAuthmode("avs_noauth");

        setPinpayload(res?.data?.data?.payment_payload);
      }

      if (res.data.status === "success" && res?.data?.data?.redirect_url) {
        setIsLoading(false);
        setActivetab(1);
        // Get the redirect link from the response
        const redirectLink = res?.data?.data?.redirect_url;

        // Open the redirect link in a new tab
        window.open(redirectLink, "_blank");
        handlecancel();
      }
    } catch (error) {
      // if (error.response.data.message === "Payment not completed.")
      //   return setError(error.response.data.message);
      // if (error.response.data.message === "Invalid phone number")
      //   return setError("Invalid phone number");

      if (error && error?.response?.status == 500) {
        setError("Unexpected error has occured. Please try again!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onsubmitPin = async (data) => {
    let enckey = await process.env.FLW_ECRYPTION_KEY;
    let requestData =
      authmode == "pin"
        ? {
            auth_mode: "pin",
            pin: data?.pin,
            payment_payload: {
              ...pinpayload,
              enckey: "FLWSECK_TEST46515e8088a2",
            },
          }
        : {
            auth_mode: "avs_noauth",

            city: data?.city,
            address: data?.address,
            zipcode: data?.zipcode,
            state: data?.state,
            country: data?.country,
            payment_payload: {
              ...pinpayload,
              enckey: "FLWSECK_TEST46515e8088a2",
            },
          };

    setIsLoading2(true);
    setError2("");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/payments/authorize-card`,
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
        setIsLoading2(false);
      }
      if (res.data.status === "success") {
        setIsLoading2(false);
        setActivetab(3);
        setOtppayload(res?.data?.data?.flw_ref);
      }
    } catch (error) {
      setError2("Unexpected error has occured. Please try again!");
    } finally {
      setIsLoading2(false);
    }
  };

  const onsubmitOtp = async (data) => {
    let requestData = {
      otp: data?.otp,
      flw_ref: otppayload,
    };

    setIsLoading3(true);
    setError3("");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/payments/validate-card`,

        requestData,
        {
          headers: {
            Authorization: ` Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.status === "success") {
        setIsLoading3(false);
      }
      if (res.data.status === "success") {
        setIsLoading3(false);
        // setActivetab(3);
        handleclearCart();
        setSuccessmessage(
          res?.data?.message ||
            "Payment successfull & Your order is successful payed. "
        );
        setTimeout(() => {
          navigate("/user/profile", { replace: true });
          handlecancel();
        }, 6000);
      }
    } catch (error) {
      setError3("Error has occured. Please try again!");
      setErrormessage("Error has occured. Please try again!");
      setTimeout(() => {
        setErrormessage("");
      }, 6000);

      // handlecancel();
    } finally {
      setIsLoading3(false);
    }
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
      <div className=" mb-10 flex justify-between items-center font-semibold w-[75%] cursor-pointer rounded-t-md m-auto  border border-primary  h-10 ">
        <h1
          onClick={() => {
            handleupdatetab(1);
          }}
          className={` ${
            activetab == 1 && "bg-primary text-white"
          } h-full w-1/3 text-center  flex items-center justify-center `}
        >
          Card Details
        </h1>
        <h1
          onClick={() => {
            handleupdatetab(2);
          }}
          className={` ${
            activetab == 2 && "bg-primary text-white"
          } h-full w-1/3 text-center  flex items-center justify-center `}
        >
          PIN /Address
        </h1>
        <h1
          onClick={() => {
            handleupdatetab(3);
          }}
          className={` ${
            activetab == 3 && "bg-primary text-white"
          } h-full w-1/3 text-center  flex items-center justify-center `}
        >
          OTP
        </h1>
      </div>

      {successmessage != null && (
        <AlertComponent
          color="success"
          type="Success!"
          message={successmessage}
        />
      )}

      {errormessage != null && (
        <AlertComponent color="failure" type="Error!" message={errormessage} />
      )}

      {activetab == 1 && (
        <Form layout={"vertical"} onFinish={handleSubmit(onSubmit, onErrors)}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
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
                defaultValue={totalCost}
                render={({ field }) => (
                  <>
                    <Form.Item label="Amount">
                      <Input
                        {...field}
                        type="number"
                        value={totalCost}
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

      {activetab == 2 && authmode == "pin" && (
        <Form
          layout={"vertical"}
          onFinish={handleSubmit(onsubmitPin, onErrors)}
        >
          <div className="flex flex-col justify-center items-center gap-2">
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Controller
                control={control}
                name="pin"
                rules={authmode == "pin" && formvalidation2.pin}
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
                disabled={isLoading2}
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

      {activetab == 2 && authmode == "avs_noauth" && (
        <Form
          layout={"vertical"}
          onFinish={handleSubmit(onsubmitPin, onErrors)}
        >
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Controller
                control={control}
                name="city"
                rules={formvalidation4.city}
                render={({ field }) => (
                  <>
                    <Form.Item label="City ">
                      <Input {...field} type="text" placeholder="kigali" />
                      <p className="text-[red]">{errors?.city?.message}</p>
                    </Form.Item>
                  </>
                )}
              />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Controller
                control={control}
                name="state"
                rules={formvalidation4.state}
                render={({ field }) => (
                  <>
                    <Form.Item label="State ">
                      <Input {...field} placeholder="Enter State" />

                      <p className="text-[red]">{errors?.state?.message}</p>
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
                name="country"
                rules={formvalidation4.country}
                render={({ field }) => (
                  <>
                    <Form.Item label="Country">
                      <Input {...field} type="text" placeholder="Rwanda" />

                      <p className="text-[red]">{errors?.country?.message}</p>
                    </Form.Item>
                  </>
                )}
              />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Controller
                control={control}
                name="address"
                rules={formvalidation4.address}
                render={({ field }) => (
                  <>
                    <Form.Item label="Address">
                      <Input {...field} type="text" placeholder="Address" />
                      <p className="text-[red]">{errors?.address?.message}</p>
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
                name="zipcode"
                rules={formvalidation4.zipcode}
                render={({ field }) => (
                  <>
                    <Form.Item
                      label="Zipcode"
                      className="w-[100%] text-red-700 !mb-2"
                    >
                      <Input
                        {...field}
                        type="number"
                        placeholder="0000"
                        className="text-gray-700 text-sm placeholder:text-sm "
                      />

                      <p className="text-[red]">{errors?.zipcode?.message}</p>
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
                disabled={isLoading2}
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
        <Form
          layout={"vertical"}
          onFinish={handleSubmit(onsubmitOtp, onErrors)}
        >
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
                disabled={isLoading3}
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
                disabled={isLoading3}
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
                {isLoading3 ? "Processing ...." : " Next"}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Modal>
  );
};
