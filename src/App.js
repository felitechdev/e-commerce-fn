import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import About from './pages/Default/About/About';
import Contact from './pages/Default/Contact/Contact';
import Home from './pages/Home';
// import Journal from './pages/Default/Journal/Journal';
// import Payment from './pages/Default/payment/Payment';
// import ProductDetails from './pages/Default/ProductDetails/ProductDetails';
import Shop from './pages/Default/Shop/Shop';
// import UserLayout from './Layouts/UserLayout';
// import IndexLayout from './Layouts/IndexLayout';
// import UserHome from './components/ProductsCategories';
// import Authentication from './pages/Authentication';
// import Loader from './components/loader/Loader';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { logIn } from './redux/userSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import cookiejar from 'axios-cookiejar-support';
// import Cookies from 'js-cookie';
// import ActivateAccount from './pages/ActivateAccount';
// import SellerProfile from './pages/Account/Profile/SellerProfile';
// import ProfileLayout from './Layouts/ProfileLayout';
// import { GetMyprofile } from './APIs/UserAPIs';
import { FeliTechLogo_transparent, FeliTechWhiteLogo } from './assets/images';
// import Paymentpage from './pages/Payment/payment';
// import PaymentDone from './pages/Payment/payment';
// import CustomerOrders from './pages/orders/orders';
// import SignInForm from './components/pageProps/Authentication/SignInForm';
import SignIn from './pages/SignIn';

import SellerProfile from './pages/Account/Profile/SellerProfile';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails/Product';
import Product from './pages/ProductDetails/Product';
import PageLayout from './components/designLayouts/PageLayout';
import { useUser } from './context/UserContex';
import { LayoutDesign } from './dashboard/Layouts/LayoutDesign';
import {
  Category,
  Company,
  Contract,
  Dashboard,
  DashProducts,
  Retailer,
  Orders,
} from './dashboard/Components';
import ShopNow from './components/designLayouts/buttons/ShopNow';
import ActivateAccount from './pages/ActivateAccount';

const App = () => {
  const { isCheckingAuth, user } = useUser();
  // const [user, setUser] = useState();
  // const token = Cookies.get("token");
  // const { profile, loadprofile, errprofile } = useSelector(
  //   (state) => state.userprofile
  // );

  // axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   if (loadprofile == true) {
  //     dispatch(GetMyprofile(token))
  //       .unwrap()
  //       .then((data) => {
  //         if (data?.data && data.status == "success") {
  //           setUser(data?.data?.user);
  //         }
  //       })
  //       .catch((error) => {});
  //   }
  // }, [loadprofile, dispatch, token]);

  // // Fetch user only when the component mounts
  // useEffect(() => {
  //   if (!user) {
  //     dispatch(GetMyprofile(token))
  //       .unwrap()
  //       .then((data) => {
  //         if (data?.data && data.status == "success") {
  //           setUser(data?.data?.user);
  //         }
  //       })
  //       .catch((error) => {});
  //   }
  // }, [dispatch, user, token]);

  return (
    <>
      {isCheckingAuth ? (
        <div className='flex items-center justify-center h-screen'>
          <img className='w-28 mb-6' src={FeliTechWhiteLogo} alt='logoLight' />
        </div>
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='cart' element={<Cart />} />
          <Route path='products/:id' element={<Product />} />
          <Route path='shop' element={<Shop />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route
            path='/activate-account/:token'
            element={<ActivateAccount />}
          />
          <Route path='user' element={<LayoutDesign />}>
            <Route
              index
              element={
                user?.role === 'admin' ? (
                  <Navigate replace to='dashboard' />
                ) : (
                  user?.role === 'seller' && (
                    <Navigate replace to='dashproduct' />
                  )
                )
              }
            />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='seller' element={<Company />} />
            <Route path='contract' element={<Contract />} />
            <Route path='dashproduct' element={<DashProducts />} />
            <Route path='retailer' element={<Retailer />} />
            <Route path='profile' element={<SellerProfile />}></Route>
            <Route path='category' element={<Category />} />
            <Route path='order' element={<Orders />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default App;
