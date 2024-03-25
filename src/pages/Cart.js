import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { emptyCart } from '../assets/images/index';
import axios from 'axios';
import { Button, Form, Input, Row, Select, Space, Col, Modal } from 'antd';
import { FaSave } from 'react-icons/fa';
import { Controller, useForm } from 'react-hook-form';
import { IoCloseSharp } from 'react-icons/io5';
import { Provinces, Districts, Sectors, Cells, Villages } from 'rwanda';

// country input to check country phone number
import PhoneInput from 'antd-phone-input';
import {
  addToCart,
  removeToCart,
  clearCart,
  clearitemCart,
} from '../redux/Reducers/cartRecuder';
import Cookies from 'js-cookie';
import ItemCard from './Default/Cart/ItemCard';
import PageLayout from '../components/designLayouts/PageLayout';

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
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onErrors = (errors) => console.log('errors on form creation', errors);

  const onSubmit = async (data) => {
    let requestData = {
      ...data,
      shippingAddress: shippingAddress,
      deliveryPreference: deliveryPreference.toLowerCase(),
      items: cartTotl,
      amount: totalCost,
    };

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/payments`,
        requestData,
        {
          headers: {
            Authorization: ` Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.status === 'success') {
        setIsLoading(false);
      }

      alert('Payment Was Successfull');
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title='Comfirm Payment MTN or AIRTEL'
      width='20rem'
      styles={{ backgroundColor: 'red' }}
      open={isModalOpen}
      closeIcon={<IoCloseSharp onClick={handlecancel} className='text-[red]' />}
      style={{ width: '70rem' }}
    >
      <Form layout={'vertical'} onFinish={handleSubmit(onSubmit, onErrors)}>
        <div className='flex justify-between space-x-2  '>
          <Controller
            control={control}
            name='paymentphoneNumber'
            rules={{ required: 'phone number is required' }}
            render={({ field }) => (
              <>
                <Form.Item label='phoneNumber' className='w-[100%] '>
                  <Input
                    {...field}
                    type='number'
                    placeholder='paymentPhoneNumber'
                  />
                  <p className='text-[red]'>
                    {errors?.paymentphoneNumber?.message}
                  </p>
                </Form.Item>
              </>
            )}
          />
        </div>

        <div className='flex  justify-end space-x-2 pr-0 mt-2'>
          <Button
            onClick={handlecancel}
            style={{
              fontWeight: 'bold',
              display: 'flex items-center justify-center space-x-5',
            }}
          >
            {' '}
            <span className='flex'>
              {' '}
              <h2 className=' flex  items-center justify-center '>
                <IoCloseSharp className='  mr-2' />
                Cancel
              </h2>
            </span>{' '}
          </Button>

          <Button
            // onClick={props.onOk}
            htmlType='submit'
            style={{
              background: '#1D6F2B',
              color: '#FFFFFF',
              fontWeight: 'bold',
              display: 'flex items-center justify-center ',
            }}
          >
            {' '}
            {isLoading ? (
              'Payment...'
            ) : (
              <span className='flex'>
                <h2 className=' flex  items-center justify-center '>
                  <FaSave className='  mr-2' />
                  Pay
                </h2>
              </span>
            )}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const [ispaymentsucces, setIspaymentsucces] = useState(false);
  const [loading, setLoadng] = useState(false);
  const [checkoutform, setCheckoutform] = useState(false);
  const token = Cookies.get('token');

  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedSector, setSelectedSector] = useState();
  const [deliveryprice, setDeliveryprice] = useState(0);

  const [fillorderform, setFillorderform] = useState(false);
  const [location, setLocation] = useState(false);
  const [nodelivery, setNodelivery] = useState(true);
  const [payAllowed, setPayAllowed] = useState(false);
  const [requestData, setRequestData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDelivery, setOrderDelivery] = useState();
  const [deliveryPreference, setDeliveryPreference] = useState('');
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

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setSelectedDistrict();
    setSelectedSector();
  };
  // close payment model
  const handlecancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    switch (selectedProvince) {
      case 'Kigali':
        setDeliveryprice(2000);
        setPrevdeliveryprice(2000);
        break;
      case 'East':
        setDeliveryprice(3000);
        setPrevdeliveryprice(3000);
        break;
      case 'South':
        setDeliveryprice(4000);
        setPrevdeliveryprice(4000);
        break;
      case 'West':
        setDeliveryprice(7000);
        setPrevdeliveryprice(7000);
        break;
      case 'North':
        setDeliveryprice(5000);
        setPrevdeliveryprice(5000);
        break;
      default:
        setDeliveryprice(0);
        setPrevdeliveryprice(0);
        break;
    }
  }, [selectedProvince]);

  useEffect(() => {
    switch (orderDelivery) {
      case 'PickUp':
        setDeliveryprice(0);
        break;
      case 'Delivery':
        setDeliveryprice(prevdeliveryprice);
        break;
      default:
        setDeliveryprice(prevdeliveryprice);
        break;
    }
  }, [orderDelivery, deliveryprice, prevdeliveryprice]);

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

    let cart = JSON.parse(localStorage.getItem('cart'));

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
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleRemoveCart = (event, productId) => {
    event.stopPropagation();

    let existingCart = JSON.parse(localStorage.getItem('cart'));
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
    localStorage.setItem('cart', JSON.stringify(existingCart));
  };

  const handleclearCart = () => {
    let existingCart = JSON.parse(localStorage.getItem('cart'));

    dispatch(clearCart());
    if (existingCart) {
      existingCart = [];
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));
  };
  const handleRemoveitemfromCart = (productId) => {
    let existingCart = JSON.parse(localStorage.getItem('cart'));

    let existingProduct = existingCart.find(
      (product) => product.id === productId
    );

    dispatch(clearitemCart(existingProduct));

    if (existingProduct) {
      existingCart = existingCart.filter(
        (product) => product.id !== existingProduct.id
      );
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));
  };

  let totalCost = cart.reduce((total, item) => {
    return total + item.price * item.items;
  }, 0);

  const cartTotl = cart.map((item) => {
    let product = {
      product: item.id,
      quantity: item.items,
      price: item.price,
      productThumbnail: item.productThumbnail.url,
      ...(item.variations && { variation: { ...item.variations } }),
      seller: item.seller,
    };

    return product;
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: '', // Set default values from profileview
  });

  const onErrors = (errors) => {
    setPayAllowed(false);
    console.log('errors on form creation', errors);
  };

  const onFinish = async (values) => {
    const payload = {};
    if (values.phoneNumber) {
      const { countryCode, areaCode, phoneNumber } = values.phoneNumber;
      const fullPhoneNumber = `+${countryCode}${areaCode}${phoneNumber}`;
      if (
        fullPhoneNumber.includes('null') ||
        fullPhoneNumber.includes('undefined')
      ) {
        return;
      } else {
        payload['phoneNumber'] = fullPhoneNumber;
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
        city: values.City,
        province: values.Province,
        district: values.District,
        sector: values.Sector,
        cell: values.Cell,
        village: values.Village,
        address: { street: values.Street },
        phoneNumber: payload.phoneNumber,
      });

      setIsModalOpen(true);
      //   await makepayment(requestData);
      //   ispaymentsucces && setCheckoutform(!checkoutform);
    }
  };

  const handleopencheckoutform = () => {
    setCheckoutform(!checkoutform);
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
      <div className='max-w-container mx-auto px-4'>
        {cart && cart.length > 0 ? (
          <div className='pb-20 '>
            <div className=''>
              <div className='w-full h-20 bg-[#F5F7F7] rounded-lg text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold'>
                <h2 className='col-span-2'>Product</h2>
                <h2>Price</h2>
                <h2>Quantity</h2>
                <h2>Product Cost</h2>
              </div>
              <div className='mt-5'>
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

              <button
                onClick={handleclearCart}
                className='py-2 px-10 rounded-lg bg-[#1D6F2B] text-white font-semibold mb-4 hover:text-white duration-300'
              >
                Clear Shopping Cart
              </button>
            </div>

            <div className='p-0 md:p-0 space-y-5  w-full  '>
              <div className=' space-y-2'>
                <Space>
                  <h1 className='font-bold'> Order Delivery : </h1>{' '}
                </Space>
                <Button
                  onClick={handlefillorderform}
                  type={fillorderform ? 'primary' : 'default'}
                >
                  Fill Order Delivery Form{' '}
                </Button>{' '}
                <Button type={location ? 'primary' : 'default'}>
                  Get my Location via Googlemap{' '}
                </Button>{' '}
                {/* <Button
                  onClick={handlenodelivery}
                  type={nodelivery ? "primary" : "default"}
                >
                  No delivey
                </Button> */}
                {/* <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Delivery fee
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    {deliveryprice} RWF
                  </span>
                </p> */}
              </div>

              {fillorderform && (
                <Form
                  layout={'vertical'}
                  onFinish={handleSubmit(onFinish, onErrors)}
                  style={{
                    width: '100%',
                    backgroundColor: '#F5F7F7',
                    padding: '10px',
                    borderRadius: '5px',
                    boxShadow: '0px 10px 20px -13px rgba(0,0,0,0.7)',
                    display: ` ${fillorderform ? 'block' : 'none'}`,
                  }}
                >
                  <div>
                    <Row
                      gutter={[16, 16]}
                      // className="flex justify-between space-x-2  "
                    >
                      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Controller
                          control={control}
                          name='country'
                          rules={{ required: 'Country is required' }}
                          defaultValue={''}
                          render={({ field }) => (
                            <>
                              <Form.Item label='Country' className=' '>
                                <Select
                                  {...field}
                                  placeholder='Select your country'
                                >
                                  <Select.Option value='Rwanda'>
                                    Rwanda
                                  </Select.Option>
                                </Select>
                                <p className='text-[red]'>
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
                          name='Province'
                          rules={{ required: 'Province is required' }}
                          defaultValue=''
                          render={({ field }) => (
                            <Form.Item label='Province' className=' '>
                              <Select
                                {...field}
                                placeholder='Select your location'
                                onChange={(value) => {
                                  field.onChange(value);
                                  // setSelectedProvince(value);
                                  handleProvinceChange(value);
                                }}
                                options={provinceselectoption}
                              />

                              <p className='text-[red]'>
                                {errors?.Province?.message}
                              </p>
                            </Form.Item>
                          )}
                        />
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Controller
                          control={control}
                          name='District'
                          rules={{ required: 'District is required' }}
                          defaultValue=''
                          render={({ field }) => (
                            <Form.Item label='District' className='  '>
                              <Select
                                {...field}
                                placeholder='Select your district'
                                onChange={(value) => {
                                  field.onChange(value);
                                  handleDistrictChange(value);
                                }}
                              >
                                {Districts(selectedProvince).map((district) => (
                                  <Select.Option
                                    key={district}
                                    value={district}
                                  >
                                    {district}
                                  </Select.Option>
                                ))}
                              </Select>

                              <p className='text-[red]'>
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
                          name='Sector'
                          rules={{ required: 'Sector is required' }}
                          defaultValue={selectedSector}
                          render={({ field }) => (
                            <Form.Item label='Sector' className=' '>
                              <Select
                                {...field}
                                placeholder='Select your sector'
                                onChange={(value) => {
                                  field.onChange(value);
                                  handleSectorChange(value);
                                }}
                              >
                                {Sectors(
                                  selectedProvince,
                                  selectedDistrict
                                )?.map((sector) => (
                                  <Select.Option key={sector} value={sector}>
                                    {sector}
                                  </Select.Option>
                                ))}
                              </Select>

                              <p className='text-[red]'>
                                {errors?.Sector?.message}
                              </p>
                            </Form.Item>
                          )}
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Controller
                          control={control}
                          name='Cell'
                          rules={{ required: 'Cell is required' }}
                          render={({ field }) => (
                            <>
                              <Form.Item label='Cell' className=' h-8'>
                                <Input
                                  {...field}
                                  type='text'
                                  placeholder='Enter your Cell'
                                />
                                <p className='text-[red]'>
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
                          name='Village'
                          rules={{ required: 'Village is required' }}
                          render={({ field }) => (
                            <>
                              <Form.Item label='Village' className=' h-8'>
                                <Input
                                  {...field}
                                  type='text'
                                  placeholder='Enter your Village'
                                />
                                <p className='text-[red]'>
                                  {errors?.Village?.message}
                                </p>
                              </Form.Item>
                            </>
                          )}
                        />
                      </Col>
                    </Row>

                    <div className='mt-5'></div>

                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Controller
                          control={control}
                          name='Street'
                          rules={{ required: 'Street is required' }}
                          render={({ field }) => (
                            <>
                              <Form.Item label='Street' className=' h-8'>
                                <Input
                                  {...field}
                                  type='text'
                                  placeholder='Street'
                                />
                                <p className='text-[red]'>
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
                          name='phoneNumber'
                          rules={{
                            required: 'Phone number is required',
                          }}
                          render={({ field }) => (
                            <>
                              <Form.Item label='Phone number' className=' h-5'>
                                <PhoneInput {...field} enableSearch />
                                <p className='text-[red]'>
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
                          name='orderDelivery'
                          rules={{
                            required: 'please select',
                          }}
                          render={({ field }) => (
                            <>
                              <Form.Item
                                label='Delivery preferences'
                                className=' h-5'
                              >
                                <Select
                                  {...field}
                                  onChange={(value) => {
                                    setDeliveryPreference(value);
                                    field.onChange(value);
                                  }}
                                  options={[
                                    {
                                      label: 'PickUp',
                                      value: 'PickUp',
                                    },
                                    {
                                      label: 'Delivery',
                                      value: 'Delivery',
                                    },
                                  ]}
                                />
                                <p className='text-[red]'>
                                  {errors?.orderDelivery?.message}
                                </p>
                              </Form.Item>
                            </>
                          )}
                        />
                      </Col>
                    </Row>

                    <div className='mt-5'></div>

                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <button
                          disabled={loading}
                          htmlType='submit'
                          className='h-10 rounded-lg bg-[#1D6F2B] text-white disabled:opacity-50 px-5 duration-300'
                        >
                          <span className='flex'>
                            <FaSave className='  mr-2' />
                            <h2>
                              {loading ? 'Processing...' : ' Proceed to pay'}
                            </h2>
                          </span>
                        </button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              )}
            </div>
            <div className='w-full gap-4 flex justify-end mt-4'>
              {/* <OrderForm
                token={token}
                cartTotl={cartTotl}
                totalCost={totalCost}
                
              /> */}
              <div className='w-[95%] md:w-[50%] flex flex-col gap-4  '>
                <h1 className='text-2xl font-semibold text-right'>
                  Cart totals
                </h1>
                <div>
                  <p className='flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium'>
                    Subtotal
                    <span className='font-semibold tracking-wide font-titleFont'>
                      {totalCost} RWF
                    </span>
                  </p>
                  <p className='flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium'>
                    Total delivery fee
                    <span className='font-semibold tracking-wide font-titleFont'>
                      {deliveryprice} RWF
                    </span>
                  </p>
                  <p className='flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium'>
                    Total
                    <span className='font-bold tracking-wide text-lg font-titleFont'>
                      {totalCost + deliveryprice} RWF
                    </span>
                  </p>
                </div>

                {/* {!checkoutform && (
                  <div className="flex justify-end">
                    <button
                      disabled={loading}
                      onClick={handleopencheckoutform}
                      className="w-52 h-10 rounded-lg bg-[#1D6F2B] text-white disabled:opacity-50 duration-300"
                    >
                      {loading ? "Processing..." : "Proceed to Checkout"}
                    </button>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className='flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20'
          >
            <div>
              <img
                className='w-80 rounded-lg p-4 mx-auto'
                src={emptyCart}
                alt='emptyCart'
              />
            </div>
            <div className='max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg'>
              <h1 className='font-titleFont text-xl font-bold uppercase'>
                Your Cart feels lonely.
              </h1>
              <p className='text-sm text-center px-10 -mt-2'>
                Your Shopping cart lives to serve. Give it purpose - fill it
                with books, electronics, videos, etc. and make it happy.
              </p>
              {/* <Link to="/shop"> */}
              <Link to='/'>
                <button className='bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300'>
                  Continue Shopping
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </PageLayout>
  );
};

export default Cart;
