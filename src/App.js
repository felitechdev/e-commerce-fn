import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useUser } from "./context/UserContex";
import About from "./pages/Default/About/About";
import Contact from "./pages/Default/Contact/Contact";
import Shop from "./pages/Default/Shop/Shop";
import Home from "./pages/Home";

import Protect from "./components/Protect";
import OTP from "./pages/Otp-2FA";
import SignIn from "./pages/SignIn";

import {
  Category,
  Company,
  Contract,
  DashProducts,
  Dashboard,
  OrdersV2,
  ProductClass,
  Retailer,
} from "./dashboard/Components";

import { ProductBrand } from "./dashboard/Components/ProductBrand/ProductBrand";
import { LayoutDesign } from "./dashboard/Layouts/LayoutDesign";
import SellerProfile from "./pages/Account/Profile/SellerProfile";
import ActivateAccount from "./pages/ActivateAccount";
import Cart from "./pages/Cart";
import ForgotPassword from "./pages/ForgotPassword";
import PageNotFound from "./pages/PageNotFound";
import Product from "./pages/ProductDetails/Product";
import VerifyPaymentPage from "./pages/ProductDetails/VerifyPaymentPage";
import ResetPassword from "./pages/ReserPassword";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";

import { useDispatch } from "react-redux";
import { FeliTechLogo_transparent } from "./assets/images";
import OrderDetail from "./dashboard/Components/Orders/Ordersv2/single-order/order";
import Checkout from "./pages/Checkout";
import { Wishlist } from "./pages/Wishlist";
import OathCallBack from "./components/OathCallBack";

const App = () => {
  const { isCheckingAuth, user } = useUser();

  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem("prevPath", location.pathname);
  }, [location.pathname]);

  //  if user is on checkout keep checkout

  if (isCheckingAuth) {
    return (
      <div className="fixed left-0 top-0 z-50 flex h-screen w-full flex-wrap items-center justify-center bg-white">
        <img
          className="w-[200px] animate-ping"
          src={FeliTechLogo_transparent}
        />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="otp" element={<OTP />} />
      <Route path="cart" element={<Cart />} />
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="auth/callback" element={<OathCallBack />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="products/:id" element={<Product />} />
      <Route path="shop" element={<Shop />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:resetToken" element={<ResetPassword />} />
      <Route path="/activate-account/:token" element={<ActivateAccount />} />
      <Route path="/payment-verification" element={<VerifyPaymentPage />} />
      <Route
        path="user"
        element={
          <Protect>
            <LayoutDesign />
          </Protect>
        }
      >
        <Route
          index
          element={
            <Navigate
              replace
              to={
                user?.role === "admin"
                  ? "dashboard"
                  : user?.role === "seller"
                    ? "dashproduct"
                    : "profile"
              }
            />
          }
        />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="seller" element={<Company />} />
        <Route path="contract" element={<Contract />} />
        <Route path="dashproduct" element={<DashProducts />} />
        <Route path="retailer" element={<Retailer />} />
        <Route path="profile" element={<SellerProfile />} />
        <Route path="productclass" element={<ProductClass />} />
        <Route path="brand" element={<ProductBrand />} />
        <Route path="category" element={<Category />} />
        <Route path="users" element={<Users />} />
        <Route path="order" element={<OrdersV2 />} />
        <Route path="order/:id" element={<OrderDetail />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
