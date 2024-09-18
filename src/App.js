// import { Navigate, Route, Routes } from "react-router-dom";
// import About from "./pages/Default/About/About";
// import Contact from "./pages/Default/Contact/Contact";
// import Shop from "./pages/Default/Shop/Shop";
// import Home from "./pages/Home";

// import SignIn from "./pages/SignIn";

// import Protect from "./components/Protect";
// import Loader from "./components/loader/Loader";
// import { useUser } from "./context/UserContex";
// import {
//   Category,
//   Company,
//   Contract,
//   DashProducts,
//   Dashboard,
//   Orders,
//   OrdersV2,
//   Retailer,
//   ProductClass,
// } from "./dashboard/Components";

// import SingleOrder from "./dashboard/Components/Orders/Order/singleOrder";
// import { LayoutDesign } from "./dashboard/Layouts/LayoutDesign";
// import SellerProfile from "./pages/Account/Profile/SellerProfile";
// import ActivateAccount from "./pages/ActivateAccount";
// import Cart from "./pages/Cart";
// import ForgotPassword from "./pages/ForgotPassword";
// import PageNotFound from "./pages/PageNotFound";
// import Product from "./pages/ProductDetails/Product";
// import VerifyPaymentPage from "./pages/ProductDetails/VerifyPaymentPage";
// import ResetPassword from "./pages/ReserPassword";
// import SignUp from "./pages/SignUp";
// import Users from "./pages/Users";
// import { ProductBrand } from "./dashboard/Components/ProductBrand/ProductBrand";

// import { FeliTechLogo_transparent } from "./assets/images";
// import Checkout from "./pages/Checkout";
// import { Wishlist } from "./pages/Wishlist";
// import OrderDetail from "./dashboard/Components/Orders/Ordersv2/single-order/order";

// // localStorage.removeItem("selectedKey");

// const App = () => {
//   const { isCheckingAuth, user } = useUser();

//   return (
//     <>
//       {isCheckingAuth ? (
//         <div className="fixed top-0 left-0 w-full h-screen bg-white z-50 flex justify-center items-center flex-wrap ">
//           <div className="w-full flex justify-center">
//             <img
//               className="w-[200px] animate-ping"
//               src={FeliTechLogo_transparent}
//             />
//           </div>
//         </div>
//       ) : (
//         // <Loader />

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="signin" element={<SignIn />} />
//           <Route path="signup" element={<SignUp />} />
//           <Route path="cart" element={<Cart />} />
//           <Route path="wishlist" element={<Wishlist />} />
//           <Route path="checkout" element={<Checkout />} />
//           <Route path="products/:id" element={<Product />} />
//           <Route path="shop" element={<Shop />} />
//           <Route path="about" element={<About />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="forgot-password" element={<ForgotPassword />} />
//           <Route
//             path="reset-password/:resetToken"
//             element={<ResetPassword />}
//           />
//           <Route
//             path="/activate-account/:token"
//             element={<ActivateAccount />}
//           />
//           <Route path="/payment-verification" element={<VerifyPaymentPage />} />
//           <Route
//             path="user"
//             element={
//               <Protect>
//                 <LayoutDesign />
//               </Protect>
//             }
//           >
//             <Route
//               index
//               element={
//                 user?.role === "admin"
//                   ? (localStorage.setItem("selectedKey", "0"),
//                     (<Navigate replace to="dashboard" />))
//                   : user?.role === "seller"
//                   ? (localStorage.setItem("selectedKey", "7"),
//                     (<Navigate replace to="dashproduct" />))
//                   : user &&
//                     (localStorage.setItem("selectedKey", "7"),
//                     (<Navigate replace to="profile" />))
//               }
//             />
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="seller" element={<Company />} />
//             <Route path="contract" element={<Contract />} />
//             <Route path="dashproduct" element={<DashProducts />} />
//             <Route path="retailer" element={<Retailer />} />
//             <Route path="profile" element={<SellerProfile />}></Route>
//             <Route path="productclass" element={<ProductClass />} />
//             <Route path="brand" element={<ProductBrand />} />

//             <Route path="category" element={<Category />} />

//             <Route path="users" element={<Users />} />
//             {/* <Route path="order" element={<Orders />} /> */}
//             <Route path="order" element={<OrdersV2 />} />
//             {/* <Route path="order/:id" element={<SingleOrder />} /> */}
//             <Route path="order/:id" element={<OrderDetail />} />
//             <Route path="*" element={<PageNotFound />} />
//           </Route>

//           <Route path="*" element={<PageNotFound />} />
//         </Routes>
//       )}
//     </>
//   );
// };

// export default App;

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "./context/UserContex";
import About from "./pages/Default/About/About";
import Contact from "./pages/Default/Contact/Contact";
import Shop from "./pages/Default/Shop/Shop";
import Home from "./pages/Home";

import SignIn from "./pages/SignIn";
import OTP from "./pages/Otp-2FA";
import Protect from "./components/Protect";

import {
  Category,
  Company,
  Contract,
  DashProducts,
  Dashboard,
  Orders,
  OrdersV2,
  Retailer,
  ProductClass,
} from "./dashboard/Components";

import SingleOrder from "./dashboard/Components/Orders/Order/singleOrder";
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
import { ProductBrand } from "./dashboard/Components/ProductBrand/ProductBrand";

import { FeliTechLogo_transparent } from "./assets/images";
import Checkout from "./pages/Checkout";
import { Wishlist } from "./pages/Wishlist";
import OrderDetail from "./dashboard/Components/Orders/Ordersv2/single-order/order";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getprofileAddress } from "./APIs/UserAPIs";

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
      <div className="fixed top-0 left-0 w-full h-screen bg-white z-50 flex justify-center items-center flex-wrap ">
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
