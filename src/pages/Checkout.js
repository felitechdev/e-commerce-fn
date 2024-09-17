import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CgFormatSlash } from "react-icons/cg";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Row, Select, Space, Col, Modal } from "antd";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { emptyCart } from "../assets/images/index";
import MtnIcon from "../assets/images/MTN.png";
import CardIcon from "../assets/images/visacard.png";
import AdvertiseImage from "../assets/images/checkoutimage.png";
import MotivationWord from "../assets/images/specialsale-removedbg.png";
import AirtelIcon from "../assets/images/Airtel.png";
import { FaSave } from "react-icons/fa";
import { Provinces, Districts, Sectors, Cells, Villages } from "rwanda";
import { useUser } from "../context/UserContex";
import { useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";
// country input to check country phone number
import PhoneInput from "antd-phone-input";
import {
  addToCart,
  removeToCart,
  clearCart,
  clearitemCart,
} from "../redux/Reducers/cartRecuder";
import Cookies, { set } from "js-cookie";
import ItemCard, { ItemCardCheckout } from "./Default/Cart/ItemCard";
import PageLayout from "../components/designLayouts/PageLayout";
import { Loader } from "../dashboard/Components/Loader/LoadingSpin";
import { CardPayment } from "./Payment/cardpayment/card";
import { SignInFormModal } from "../components/Authentication/Signinmodal";
export const OrderForm = ({
  token,
  cartTotl,
  totalCost,
  shippingAddress,
  isModalOpen,
  deliveryPreference,
  handlecancel,
  isrepay,
  momo_payload,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      width="20rem"
      styles={{
        backgroundColor: "red",
        position: "relative",
      }}
      open={isModalOpen}
      closeIcon={<IoCloseSharp onClick={handlecancel} className="text-[red]" />}
    ></Modal>
  );
};

const Checkout = () => {
  const dispatch = useDispatch();
  const [ispaymentsucces, setIspaymentsucces] = useState(false);
  const [loading, setLoadng] = useState(false);
  const [checkoutform, setCheckoutform] = useState(false);
  const token = Cookies.get("token");
  const user = useUser().user;
  // const { handleSubmit, control, setValue, getValues } = useForm();
  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedSector, setSelectedSector] = useState();
  const [deliveryprice, setDeliveryprice] = useState(0);
  const [isdelivery, setIsdelivery] = useState(false);
  const [isdeliveryapproved, setIsdeliveryapproved] = useState(false);

  const [showOrderForm, setShowOrderForm] = useState(false);
  const [fillorderform, setFillorderform] = useState(false);
  const [location, setLocation] = useState(false);
  const [nodelivery, setNodelivery] = useState(true);
  const [payAllowed, setPayAllowed] = useState(false);
  const [requestData, setRequestData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDelivery, setOrderDelivery] = useState();
  const [deliveryPreference, setDeliveryPreference] = useState("");
  const [prevdeliveryprice, setPrevdeliveryprice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isNouser, setIsNouser] = useState(false);

  const navigate = useNavigate();
  const handlefillorderform = () => {
    setFillorderform(true);
    setLocation(false);
    setNodelivery(false);
  };
  const handlenodelivery = () => {
    setDeliveryprice(0);
    setFillorderform(false);
    setLocation(false);
    setNodelivery(true);
  };
  const handlelocation = () => {
    setFillorderform(true);
    setLocation(false);
    setNodelivery(false);
  };

  const handleShowOrderForm = () => {
    setShowOrderForm(true);
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setSelectedDistrict();
    setSelectedSector();
  };
  // close payment model
  const handlecancel = () => {
    setIsModalOpen(false);
  };

  const [cardpay, setCardpay] = useState(false);
  const handlecardpay = () => {
    setCardpay(true);
  };
  const cancelCardpay = () => {
    setCardpay(false);
  };

  useEffect(() => {
    switch (selectedProvince) {
      case "Kigali":
        setDeliveryprice(0);
        setPrevdeliveryprice(0);
        break;
      case "East":
        setDeliveryprice(0);
        setPrevdeliveryprice(0);
        break;
      case "South":
        setDeliveryprice(0);
        setPrevdeliveryprice(0);
        break;
      case "West":
        setDeliveryprice(0);
        setPrevdeliveryprice(0);
        break;
      case "North":
        setDeliveryprice(0);
        setPrevdeliveryprice(0);
        break;
      default:
        setDeliveryprice(0);
        setPrevdeliveryprice(0);
        break;
    }
  }, [selectedProvince]);

  useEffect(() => {
    switch (orderDelivery) {
      case "PickUp":
        setDeliveryprice(0);
        break;
      case "Delivery":
        setDeliveryprice(prevdeliveryprice);
        break;
      default:
        setDeliveryprice(prevdeliveryprice);
        break;
    }
  }, [orderDelivery]);
  // , deliveryprice, prevdeliveryprice

  useEffect(() => {
    if (selectedProvince !== "Kigali" && deliveryPreference === "Delivery") {
      setIsdelivery(true);
    } else {
      setIsdelivery(false);
    }
  }, [deliveryPreference, selectedProvince]);

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setSelectedSector();
  };

  const handleSectorChange = (value) => {
    setSelectedSector(value);
  };

  let provinceselectoption = Provinces()?.map((province) => {
    return {
      value: province,
      label: province,
    };
  });

  const cart = useSelector((state) => state.cart);
  const handleAddCart = (event, productId) => {
    event.stopPropagation();

    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) {
      cart = [];
    }

    let existingProduct = cart.find((product) => product.id === productId);

    if (existingProduct) {
      existingProduct.items += 1;
    }
    // Dispatch the addToCart action to update the Redux state
    dispatch(addToCart(existingProduct));

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleRemoveCart = (event, productId) => {
    event.stopPropagation();

    let existingCart = JSON.parse(localStorage.getItem("cart"));
    let existingProduct = existingCart.find(
      (product) => product.id === productId
    );

    // Dispatch the removeToCart action to update the Redux state
    dispatch(removeToCart(existingProduct));
    // Update localStorage
    if (existingProduct.items > 1) {
      existingProduct.items -= 1;
    } else {
      existingCart = existingCart.filter(
        (product) => product.id !== existingProduct.id
      );
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  const handleclearCart = () => {
    let existingCart = JSON.parse(localStorage.getItem("cart"));

    dispatch(clearCart());
    if (existingCart) {
      existingCart = [];
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };
  const handleRemoveitemfromCart = (productId) => {
    let existingCart = JSON.parse(localStorage.getItem("cart"));

    let existingProduct = existingCart.find(
      (product) => product.id === productId
    );

    dispatch(clearitemCart(existingProduct));

    if (existingProduct) {
      existingCart = existingCart.filter(
        (product) => product.id !== existingProduct.id
      );
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  let totalCost = cart.reduce((total, item) => {
    return total + Math.trunc(item.price) * item.items;
  }, 0);

  const cartTotl = cart.map((item) => {
    let product = {
      product: item.id,
      quantity: item.items,
      price: Math.trunc(item.price),
      productThumbnail: item.productThumbnail.url,
      ...(item.variations && {
        variation: { ...item.variations },
      }),
      seller: item.seller,
    };

    return product;
  });

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    defaultValues: "", // Set default values from profileview
  });

  const onErrors = (errors) => {
    if (errors) {
      setPayAllowed(false);
    }
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    const payload = {};
    if (values.phoneNumber) {
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
    if (values) {
      let requestData = {
        amount: totalCost,
        currency: values.Currency,
        email: values.email,
        phoneNumber: payload.phoneNumber,
        items: cartTotl,
        shippingAddress: {
          // province: values.Province,
          district: values.District,
          sector: values.Sector,
          street: values.Street,
          phoneNumber: payload.phoneNumber,
        },
        deliveryPreference: values.orderDelivery.toLowerCase(),
      };

      // setPayAllowed(true);
      setDeliveryPreference(values.orderDelivery);

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/payments/pay`,
          requestData,
          {
            headers: {
              Authorization: ` Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.data.status === "success") {
          setError("");
          setIsLoading(false);
        }

        console.log("response on pay", res);

        let redirectLink;

        if (res.data.status === "success") {
          setIsLoading(false);
          redirectLink = res.data?.data?.link;

          window.open(redirectLink, "_blank");
          // handlecancel();
          // handleclearCart();
        }

        // alert("Payment was successfull!");
      } catch (error) {
        console.log("on pay error", error);
        if (error.response?.data?.message === "Payment not completed.")
          return setError(error.response?.data?.message);
        if (error.response?.data?.message === "Invalid phone number")
          return setError("Invalid phone number");
        setError("Unexpected error has occured. Please try again!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Load saved form data from localStorage on mount
  useEffect(() => {
    const savedFormData = JSON.parse(
      localStorage.getItem("shippingInfoFormData")
    );
    if (savedFormData) {
      Object.keys(savedFormData).forEach((key) => {
        setValue(key, savedFormData[key]);
      });
    }
  }, [setValue]);

  // Save form data to localStorage on change
  useEffect(() => {
    const formData = getValues();
    localStorage.setItem("shippingInfoFormData", JSON.stringify(formData));
  });

  return (
    <PageLayout>
      {isdelivery && (
        <div className="fixed bottom-0 p-2 z-50 pb-5 bg-[#fbe8e8] rounded-md w-[90%] md:w-1/3 right-5 md:right-20 shadow-lg border border-red-500">
          <button
            className="font-bold text-[red] absolute flex items-center justify-center -top-3 bg-[#fbe8e8] border-2   -right-3 p-2 rounded-full "
            onClick={() => {
              setIsdelivery(false);
            }}
          >
            X
          </button>
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">
              Need Assistance with Delivery?
            </h3>
            <p className="mb-4">
              If you are located outside Kigali and need delivery, please
              contact us via:
            </p>
            <p className="mb-2">
              <span className="font-bold">Phone:</span> +250 798 697 197
            </p>
            <p className="mb-2">
              <span className="font-bold">Email:</span>
              <a
                href="mailto:info@felitechnology.com"
                className="text-blue-500 underline"
              >
                info@felitechnology.com
              </a>
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Please contact us to get the delivery price before you proceed
              with your order. We are here to help! Reach out to us for any
              queries or assistance.
            </p>
          </div>
        </div>
      )}
      <div className="max-w-container mx-auto px-4  ">
        {cart && cart.length > 0 && (
          <div className="pb-20">
            <div className="flex flex-col-reverse md:flex-row  justify-between items-start gap-8">
              {/* bg-[#F5F7F7] */}
              <div className=" w-[100%] md:w-[40%] bg-[#F5F7F7] rounded text-primeColor   place-content-center px-2 md:px-2 text-lg font-titleFont ">
                <h2 className="mt-2">Ordered products</h2>

                <div className="mt-5">
                  {cart.map((item) => (
                    <div key={item.id}>
                      <ItemCardCheckout
                        itemInfo={item}
                        handleAddCart={handleAddCart}
                        handleRemoveCart={handleRemoveCart}
                        handleRemoveitemfromCart={handleRemoveitemfromCart}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="gap-4 flex  w-[100%] md:w-[25%] bg-[#F5F7F7] p-3 rounded shadow overflow-hidden">
                <div className="flex flex-col w-full gap-4">
                  <h1 className="text-2xl font-semibold text-gray-700">
                    Summary
                  </h1>
                  <div className="border rounded">
                    <p className="flex flex-wrap items-center justify-between border-b py-1.5 text-lg px-4 font-medium">
                      <span>Subtotal</span>
                      <span className="font-semibold tracking-wide font-titleFont">
                        {totalCost.toLocaleString()} RWF
                      </span>
                    </p>
                    {/* <p className="flex items-center justify-between border-b py-1.5 text-lg px-4 font-medium">
                      Delivery fee
                      <span className="font-semibold tracking-wide font-titleFont">
                        {deliveryprice} RWF
                      </span>
                    </p> */}
                    <p className="flex  flex-wrap items-center justify-between py-1.5 text-lg px-4 font-medium mb-6">
                      Total
                      <span className="font-bold tracking-wide text-lg font-titleFont">
                        {(totalCost + deliveryprice).toLocaleString()} RWF
                      </span>
                    </p>
                  </div>

                  {/* {!checkoutform && (
                    <button
                      disabled={loading}
                      onClick={handlefillorderform}
                      className="rounded-full py-2 bg-[#1D6F2B] text-white disabled:opacity-50 duration-300 hidden md:inline-block "
                    >
                      {loading ? "Processing..." : "Proceed to Checkout"}
                    </button>
                  )} */}
                </div>
              </div>

              <div className="relative block md:hidden lg:block ">
                <img src={AdvertiseImage} className="w-[100%] rounded" />
                <div className="absolute bottom-10 left-0 right-0 mx-5 pb-2 rounded-md bg-gray-300 opacity-60  ">
                  <img src={MotivationWord} />
                  <div className="w-full text-center -mt-9">
                    {" "}
                    <button
                      onClick={() => {
                        navigate("/", { replace: true });
                      }}
                      className="h-10 rounded-full bg-[#1D6F2B] ml-1/2 text-white  px-5 "
                    >
                      <span className="flex items-center tracking-widest">
                        <span className="mr-2">Continue Shopping</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F7F7] mt-4">
              <Form
                layout={"vertical"}
                onFinish={
                  cardpay ? handleSubmit() : handleSubmit(onFinish, onErrors)
                }
                style={{
                  width: "100%",
                  border: "1px solid rgb(229, 231, 235)",
                  padding: "20px",
                  borderRadius: "5px",
                  // display: ` ${fillorderform ? "block" : "none"}`,
                }}
              >
                <div>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                      <Controller
                        control={control}
                        name="Province"
                        rules={{
                          required: "Province is required",
                        }}
                        defaultValue=""
                        render={({ field }) => (
                          <Form.Item label="Province" className=" ">
                            <Select
                              {...field}
                              placeholder="Select your location"
                              onChange={(value) => {
                                field.onChange(value);
                                // setSelectedProvince(value);
                                handleProvinceChange(value);
                              }}
                              options={provinceselectoption}
                            />

                            <p className="text-[red]">
                              {errors?.Province?.message}
                            </p>
                          </Form.Item>
                        )}
                      />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                      <Controller
                        control={control}
                        name="District"
                        rules={{
                          required: "District is required",
                        }}
                        defaultValue=""
                        render={({ field }) => (
                          <Form.Item label="District" className="  ">
                            <Select
                              {...field}
                              placeholder="Select your district"
                              onChange={(value) => {
                                field.onChange(value);
                                handleDistrictChange(value);
                              }}
                            >
                              {Districts(selectedProvince).map((district) => (
                                <Select.Option key={district} value={district}>
                                  {district}
                                </Select.Option>
                              ))}
                            </Select>

                            <p className="text-[red]">
                              {errors?.District?.message}
                            </p>
                          </Form.Item>
                        )}
                      />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                      <Controller
                        control={control}
                        name="Sector"
                        rules={{
                          required: "Sector is required",
                        }}
                        defaultValue={selectedSector}
                        render={({ field }) => (
                          <Form.Item label="Sector" className=" ">
                            <Select
                              {...field}
                              placeholder="Select your sector"
                              onChange={(value) => {
                                field.onChange(value);
                                handleSectorChange(value);
                              }}
                            >
                              {Sectors(selectedProvince, selectedDistrict)?.map(
                                (sector) => (
                                  <Select.Option key={sector} value={sector}>
                                    {sector}
                                  </Select.Option>
                                )
                              )}
                            </Select>

                            <p className="text-[red]">
                              {errors?.Sector?.message}
                            </p>
                          </Form.Item>
                        )}
                      />
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                      <Controller
                        control={control}
                        name="Street"
                        rules={{}}
                        render={({ field }) => (
                          <>
                            <Form.Item label="Street" className=" h-8">
                              <Input
                                {...field}
                                type="text"
                                placeholder="Street"
                                className="border"
                              />
                              <p className="text-[red]">
                                {errors?.Street?.message}
                              </p>
                            </Form.Item>
                          </>
                        )}
                      />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                      <Controller
                        control={control}
                        name="phoneNumber"
                        rules={{
                          required: "Phone number is required",
                        }}
                        render={({ field }) => (
                          <>
                            <Form.Item label="Phone number" className=" h-5">
                              <PhoneInput {...field} enableSearch />
                              <p className="text-[red]">
                                {errors?.phoneNumber?.message}
                              </p>
                            </Form.Item>
                          </>
                        )}
                      />
                    </Col>{" "}
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                      {" "}
                      <Controller
                        control={control}
                        name="email"
                        rules={{ required: "email is required" }}
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
                    </Col>
                  </Row>
                  <div className="mt-5"></div>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                      <Controller
                        control={control}
                        name="orderDelivery"
                        rules={{
                          required: "please select",
                        }}
                        render={({ field }) => (
                          <>
                            <Form.Item
                              label="Delivery preferences"
                              className=" h-5 mt-4 md:mt-auto"
                            >
                              <Select
                                {...field}
                                onChange={(value) => {
                                  setDeliveryPreference(value);
                                  setOrderDelivery(value);
                                  field.onChange(value);
                                }}
                                options={[
                                  {
                                    label: "PickUp",
                                    value: "PickUp",
                                  },
                                  {
                                    label: "Delivery",
                                    value: "Delivery",
                                  },
                                ]}
                              />
                              <p className="text-[red]">
                                {errors?.orderDelivery?.message}
                              </p>
                            </Form.Item>
                          </>
                        )}
                      />
                    </Col>
                  </Row>
                  <div className="mb-12"></div>

                  <SignInFormModal
                    isNouser={isNouser}
                    setIsNouser={setIsNouser}
                  />

                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                      <div className=" flex items-center">
                        <Button
                          disabled={isLoading}
                          htmlType="submit"
                          onClick={() => {
                            if (user == null) {
                              // navigate("/signin", { replace: true });

                              setIsNouser(true);
                            }
                          }}
                          className="h-10  px-20 flex bg-black items-center rounded-md bg-gradient-custom text-white disabled:opacity-50  duration-300"
                          style={{ background: "#1D6F2B", color: "#FFFFFF" }}
                        >
                          {(isLoading && "Processing...") ||
                            `Pay ${totalCost.toLocaleString()} Rwf`}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Form>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Checkout;
