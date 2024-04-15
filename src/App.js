import {
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
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
// import Paymentpage from './pages/Payment/payment';
// import PaymentDone from './pages/Payment/payment';
// import CustomerOrders from './pages/orders/orders';
// import SignInForm from './components/pageProps/Authentication/SignInForm';
import SignIn from './pages/SignIn';

import SellerProfile from './pages/Account/Profile/SellerProfile';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Product from './pages/ProductDetails/Product';
import { useUser } from './context/UserContex';
import { LayoutDesign } from './dashboard/Layouts/LayoutDesign';
import {
  Company,
  Contract,
  Dashboard,
  DashProducts,
  Retailer,
  Orders,
  Category,
} from './dashboard/Components';
import ShopNow from './components/designLayouts/buttons/ShopNow';
import ActivateAccount from './pages/ActivateAccount';
import Loader from './components/loader/Loader';
import SingleOrder from './dashboard/Components/Orders/Order/singleOrder';
import VerifyPaymentPage from './pages/ProductDetails/VerifyPaymentPage';
import ForgotPassword from './pages/ForgotPassword';
import Users from './pages/Users';
import PageNotFound from './pages/PageNotFound';
import ResetPassword from './pages/ReserPassword';
import Protect from './components/Protect';

// localStorage.removeItem("selectedKey");

const App = () => {
  const { isCheckingAuth, user } = useUser();

  return (
    <>
      {isCheckingAuth ? (
        <Loader />
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='cart' element={<Cart />} />
          <Route
            path='products/:id'
            element={<Product />}
          />
          <Route path='shop' element={<Shop />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route
            path='forgot-password'
            element={<ForgotPassword />}
          />
          <Route
            path='reset-password/:resetToken'
            element={<ResetPassword />}
          />
          <Route
            path='/activate-account/:token'
            element={<ActivateAccount />}
          />
          <Route
            path='/payment-verification'
            element={<VerifyPaymentPage />}
          />
          <Route
            path='user'
            element={
              <Protect>
                <LayoutDesign />
              </Protect>
            }
          >
            <Route
              index
              element={
                user?.role === 'admin'
                  ? (localStorage.setItem(
                      'selectedKey',
                      '0'
                    ),
                    (<Navigate replace to='dashboard' />))
                  : user?.role === 'seller'
                  ? (localStorage.setItem(
                      'selectedKey',
                      '5'
                    ),
                    (<Navigate replace to='dashproduct' />))
                  : user &&
                    (localStorage.setItem(
                      'selectedKey',
                      '5'
                    ),
                    (<Navigate replace to='profile' />))
              }
            />
            <Route
              path='dashboard'
              element={<Dashboard />}
            />
            <Route path='seller' element={<Company />} />
            <Route path='contract' element={<Contract />} />
            <Route
              path='dashproduct'
              element={<DashProducts />}
            />
            <Route path='retailer' element={<Retailer />} />
            <Route
              path='profile'
              element={<SellerProfile />}
            ></Route>
            <Route path='category' element={<Category />} />
            <Route path='users' element={<Users />} />
            <Route path='order' element={<Orders />} />
            <Route
              path='order/:id'
              element={<SingleOrder />}
            />
            <Route path='*' element={<PageNotFound />} />
          </Route>

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      )}
    </>
  );
};

export default App;
