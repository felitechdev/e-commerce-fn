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
import AirtelIcon from "../assets/images/Airtel.png";
import { FaSave } from "react-icons/fa";
import { Provinces, Districts, Sectors, Cells, Villages } from "rwanda";
import { useUser } from "../context/UserContex";
import { useNavigate } from "react-router-dom";
// country input to check country phone number
import PhoneInput from "antd-phone-input";
import {
  addToCart,
  removeToCart,
  clearCart,
  clearitemCart,
} from "../redux/Reducers/cartRecuder";
import Cookies from "js-cookie";
import ItemCard from "./Default/Cart/ItemCard";
import PageLayout from "../components/designLayouts/PageLayout";
import { Loader } from "../dashboard/Components/Loader/LoadingSpin";
import { AdBanner } from "../components/Banner/Banner";

const OrderForm = ({
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
      email: "oliviertech@yopmail.com",
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
        },
      );
      if (res.data.status === "success") {
        setIsLoading(false);
      }

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
      width="20rem"
      styles={{
        backgroundColor: "red",
        position: "relative",
      }}
      open={isModalOpen}
      closeIcon={<IoCloseSharp onClick={handlecancel} className="text-[red]" />}
    >
      {error && error === "Payment not completed." && (
        <div className="flex flex-col justify-start rounded">
          <h4 className="mb-4 text-sm text-gray-700">
            Payment was not completed. Deal to complete!
          </h4>
          <div className="mb-1 flex items-center gap-3">
            <img src={MtnIcon} className="block h-4" />
            <p>
              <span class="inline-flex items-center bg-green-50 px-2 text-xs font-semibold tracking-widest text-green-700 ring-1 ring-inset ring-green-600/20">
                *182*7*1#
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <img src={AirtelIcon} className="block h-4" />
            <p>
              <span class="inline-flex items-center bg-green-50 px-2 text-xs font-semibold tracking-widest text-green-700 ring-1 ring-inset ring-green-600/20">
                *182*7*1#
              </span>
            </p>
          </div>
        </div>
      )}

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
                  className="!mb-2 w-[100%] text-red-700"
                >
                  <Input
                    {...field}
                    type="number"
                    placeholder="Ex 078/9/2/3XXXXXXX"
                    className="text-sm text-gray-700 placeholder:text-sm"
                  />
                  <p className="text-xs text-red-500">
                    {error && error !== "Payment not completed." && error}
                  </p>
                </Form.Item>
              </>
            )}
          />

          <div className="flex flex-col gap-2">
            {isLoading && (
              <span className="leadin-5 text-xs font-semibold text-gray-700">
                Follow instructions on your phone to proceed.
              </span>
            )}

            <div className="flex gap-2">
              <Button
                disabled={isLoading}
                onClick={handlecancel}
                className="flex items-center justify-center font-thin disabled:opacity-40"
                style={{
                  borderRadius: "9999px",
                }}
              >
                <span className="flex">
                  <h2 className="flex items-center justify-center">Cancel</h2>
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
                  borderRadius: "9999px",
                }}
              >
                {(isLoading && "Processing...") || "Pay"}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Modal>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const [ispaymentsucces, setIspaymentsucces] = useState(false);
  const [loading, setLoadng] = useState(false);
  const [checkoutform, setCheckoutform] = useState(false);
  const token = Cookies.get("token");

  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedSector, setSelectedSector] = useState();
  const [deliveryprice, setDeliveryprice] = useState(0);

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

  const navigate = useNavigate();

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
      (product) => product.id === productId,
    );

    // Dispatch the removeToCart action to update the Redux state
    dispatch(removeToCart(existingProduct));
    // Update localStorage
    if (existingProduct.items > 1) {
      existingProduct.items -= 1;
    } else {
      existingCart = existingCart.filter(
        (product) => product.id !== existingProduct.id,
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
      (product) => product.id === productId,
    );

    dispatch(clearitemCart(existingProduct));

    if (existingProduct) {
      existingCart = existingCart.filter(
        (product) => product.id !== existingProduct.id,
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
  } = useForm({
    defaultValues: "", // Set default values from profileview
  });

  const onErrors = (errors) => {
    if (errors) {
      setPayAllowed(false);
    }
  };

  const onFinish = async (values) => {
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

    let requestData = {
      amount: totalCost,
      currency: values.Currency,
      phoneNumber: payload.phoneNumber,

      items: cartTotl,
      shippingAddress: {
        country: values.Country,
        city: values.City,
        address: {
          street: values.street,
        },
      },
    };
    if (values) {
      setPayAllowed(true);

      setRequestData({
        country: values.country,
        city: values.District,
        province: values.Province,
        district: values.District,
        sector: values.Sector,
        cell: values.Cell,
        village: values.Village,

        address: {
          street: values.Street,

          // coordinates:{}
        },
        phoneNumber: payload.phoneNumber,
      });

      setIsModalOpen(true);
      //   await makepayment(requestData);
      //   ispaymentsucces && setCheckoutform(!checkoutform);
    }
  };

  return (
    <PageLayout>
      <OrderForm
        token={token}
        cartTotl={cartTotl}
        totalCost={totalCost}
        isModalOpen={isModalOpen}
        shippingAddress={requestData}
        deliveryPreference={deliveryPreference}
        handlecancel={handlecancel}
      />
      <div className="mx-auto max-w-container px-4">
        {!cart ||
          (!cart.length && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center gap-4 pb-20 mdl:flex-row"
            >
              <div>
                <img
                  className="mx-auto w-80 rounded-lg p-4"
                  src={emptyCart}
                  alt="emptyCart"
                />
              </div>
              <div className="flex max-w-[500px] flex-col items-center gap-4 rounded-md bg-white p-4 py-8 shadow-lg">
                <h1 className="font-titleFont text-xl font-semibold uppercase">
                  Your Cart feels lonely.
                </h1>
                <p className="-mt-2 px-10 text-center text-sm">
                  Your Shopping cart lives to serve. Give it purpose - fill it
                  with books, electronics, videos, etc. and make it happy.
                </p>
                {/* <Link to="/shop"> */}
                <Link to="/">
                  <button className="font-titleFont cursor-pointer rounded-md bg-primeColor px-8 py-2 text-lg font-semibold text-gray-200 duration-300 hover:bg-black hover:text-white active:bg-gray-900">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}

        {cart && cart.length > 0 && (
          <div className="pb-20">
            <div className="flex flex-col-reverse items-start justify-between gap-8 md:flex-row">
              <div className="w-[100%] md:w-[60%]">
                <div className="font-titleFont hidden h-20 w-full grid-cols-5 place-content-center rounded bg-[#F5F7F7] px-6 text-lg font-semibold text-primeColor lgl:grid">
                  <h2 className="col-span-2">Product</h2>
                  <h2>Price</h2>
                  <h2>Quantity</h2>
                  <h2>Product Cost </h2>
                </div>
                <div className="mt-5">
                  {cart.map((item) => (
                    <div key={item.id}>
                      <ItemCard
                        itemInfo={item}
                        handleAddCart={handleAddCart}
                        handleRemoveCart={handleRemoveCart}
                        handleRemoveitemfromCart={handleRemoveitemfromCart}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex w-full justify-between">
                  <button
                    onClick={handleclearCart}
                    className="mb-4 rounded-full bg-[#1D6F2B] px-6 py-1 text-white duration-300 hover:text-white"
                  >
                    Clear Cart
                  </button>

                  {!checkoutform && (
                    <button
                      disabled={loading}
                      // onClick={handlefillorderform}
                      onClick={() => {
                        navigate("/checkout", { replace: true });
                      }}
                      className="mb-4 block w-[50%] rounded-full bg-[#1D6F2B] py-1 text-white duration-300 disabled:opacity-50 md:hidden"
                    >
                      {loading ? "Processing..." : "Proceed to Checkout"}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex w-[100%] gap-4 overflow-hidden rounded bg-[#F5F7F7] p-3 shadow md:w-[38%]">
                <div className="flex w-full flex-col gap-4">
                  <h1 className="medium_text text-gray-700">Cart totals</h1>
                  <div className="rounded border">
                    <p className="flex items-center justify-between border-b px-4 py-1.5 font-medium">
                      <span>Subtotal</span>
                      <span className="font-semibold tracking-wide">
                        {totalCost.toLocaleString()} RWF
                      </span>
                    </p>
                    {/* <p className="flex items-center justify-between border-b py-1.5 text-lg px-4 font-medium">
                      Delivery fee
                      <span className="font-semibold tracking-wide font-titleFont">
                        {deliveryprice} RWF
                      </span>
                    </p> */}
                    <p className="mb-6 flex items-center justify-between px-4 py-1.5 text-lg font-medium">
                      Total
                      <span className="font-titleFont text-lg font-semibold tracking-wide">
                        {(totalCost + deliveryprice).toLocaleString()} RWF
                      </span>
                    </p>
                  </div>

                  {!checkoutform && (
                    <button
                      disabled={loading}
                      // onClick={handlefillorderform}

                      onClick={() => {
                        navigate("/checkout", { replace: true });
                      }}
                      className="hidden rounded-full bg-[#1D6F2B] py-2 text-white duration-300 disabled:opacity-50 md:inline-block"
                    >
                      {loading ? "Processing..." : "Proceed to Checkout"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {fillorderform && (
              <Form
                layout={"vertical"}
                onFinish={handleSubmit(onFinish, onErrors)}
                style={{
                  width: "100%",
                  border: "1px solid rgb(229, 231, 235)",
                  padding: "20px",
                  borderRadius: "5px",
                  display: ` ${fillorderform ? "block" : "none"}`,
                }}
              >
                <div>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                      <Controller
                        control={control}
                        name="country"
                        rules={{
                          required: "Country is required",
                        }}
                        defaultValue={"Rwanda"}
                        render={({ field }) => (
                          <>
                            <Form.Item label="Country">
                              <Select
                                {...field}
                                placeholder="Select your country"
                              >
                                <Select.Option
                                  value="Rwanda"
                                  className="border"
                                >
                                  Rwanda
                                </Select.Option>
                              </Select>
                              <p className="text-[red]">
                                {errors?.country?.message}
                              </p>
                            </Form.Item>
                          </>
                        )}
                      />
                    </Col>

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
                          <Form.Item label="District" className=" ">
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
                  </Row>
                  <Row gutter={[16, 16]}>
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
                                ),
                              )}
                            </Select>

                            <p className="text-[red]">
                              {errors?.Sector?.message}
                            </p>
                          </Form.Item>
                        )}
                      />
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                      <Controller
                        control={control}
                        name="Cell"
                        rules={{
                          required: "Cell is required",
                        }}
                        render={({ field }) => (
                          <>
                            <Form.Item label="Cell" className="h-8">
                              <Input
                                {...field}
                                type="text"
                                placeholder="Enter your Cell"
                              />
                              <p className="text-[red]">
                                {errors?.Cell?.message}
                              </p>
                            </Form.Item>
                          </>
                        )}
                      />
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                      <Controller
                        control={control}
                        name="Village"
                        rules={{
                          required: "Village is required",
                        }}
                        render={({ field }) => (
                          <>
                            <Form.Item label="Village" className="h-8">
                              <Input
                                {...field}
                                type="text"
                                placeholder="Enter your Village"
                              />
                              <p className="text-[red]">
                                {errors?.Village?.message}
                              </p>
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
                        name="Street"
                        rules={{
                          required: "Street is required",
                        }}
                        render={({ field }) => (
                          <>
                            <Form.Item label="Street" className="h-8">
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
                        name="orderDelivery"
                        rules={{
                          required: "please select",
                        }}
                        render={({ field }) => (
                          <>
                            <Form.Item
                              label="Delivery preferences"
                              className="mt-4 h-5 md:mt-auto"
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
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                      <button
                        disabled={loading}
                        htmlType="submit"
                        className="h-10 rounded-full bg-[#1D6F2B] px-5 text-white duration-300 disabled:opacity-50"
                      >
                        <span className="flex items-center tracking-widest">
                          <span className="mr-2">Pay With</span>
                          <span>
                            <img src={MtnIcon} className="w-14 rounded" />
                          </span>
                          <CgFormatSlash
                            style={{
                              color: "#ffffff",
                              fontSize: "1.8rem",
                            }}
                          />
                          <span>
                            <img src={AirtelIcon} className="w-14 rounded" />
                          </span>
                        </span>
                      </button>
                    </Col>
                  </Row>
                </div>
              </Form>
            )}
          </div>
        )}
      </div>
      <AdBanner />
    </PageLayout>
  );
};

export default Cart;
