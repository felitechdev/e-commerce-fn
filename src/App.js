import {
  Routes,
  Route,
} from "react-router-dom";
import About from "./pages/Default/About/About";
import Cart from "./pages/Default/Cart/Cart";
import Contact from "./pages/Default/Contact/Contact";
import Home from "./pages/Default/Home/Home";
import Journal from "./pages/Default/Journal/Journal";
// import Offer from "./pages/Default/Offer/Offer";
import Payment from "./pages/Default/payment/Payment";
import ProductDetails from "./pages/Default/ProductDetails/ProductDetails";
import Shop from "./pages/Default/Shop/Shop";
import UserLayout from "./Layouts/UserLayout";
import IndexLayout from "./Layouts/IndexLayout";
import UserHome from "./pages/Account/Home/UserHome";
import Authentication from "./pages/Authentication";
import Loader from "./components/loader/Loader";
import { useEffect, useState } from "react";
import axios from "axios";
import { logIn } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const Dispatch = useDispatch()
  
  const storeUserInfo = useSelector((state) => state.userReducer.userInfo.profile)
  useEffect(() => { 
    const checkForGoogleUserInfo = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/google/success`, { withCredentials: true })
      .catch((error) => { 
        console.log({ error: error.message });
      })
    
      if (response && response.data) {
        sessionStorage.setItem("token", response.data.token)
        console.log("yes");
        Dispatch(logIn({profile: response.data.user, logInType: "ByGoogle"}))
      } 
    }
    checkForGoogleUserInfo()
  },[])
  
  return ( 
    <>
      <Loader />
      <Routes>
        {storeUserInfo && Object.keys(storeUserInfo).length > 0 ? (
            <Route path="/accounts/" element={<UserLayout />}>
              <Route path="" element={<UserHome />}></Route>
              <Route path="shop" element={<Shop />}></Route>
              <Route path="about" element={<About />}></Route>
              <Route path="contact" element={<Contact />}></Route>
              <Route path="journal" element={<Journal />}></Route>
              {/* ==================== Header Navlink End here ===================== */}
              {/* <Route path="offer" element={<Offer />}></Route> */}
              <Route path="product/:_id" element={<ProductDetails />}></Route>
              <Route path="cart" element={<Cart />}></Route>
              <Route path="paymentgateway" element={<Payment />}></Route>
            </Route>
        
        ) : (
            <>
              <Route path="/" element={<IndexLayout />}>
                {/* ==================== Header Navlink Start here =================== */}
                <Route index element={<Home />}></Route>
                <Route path="shop" element={<Shop />}></Route>
                <Route path="about" element={<About />}></Route>
                <Route path="contact" element={<Contact />}></Route>
                <Route path="journal" element={<Journal />}></Route>
                {/* ==================== Header Navlink End here ===================== */}
                {/* <Route path="offer" element={<Offer />}></Route> */}
                <Route path="product/:_id" element={<ProductDetails />}></Route>
                <Route path="cart" element={<Cart />}></Route>
                <Route path="paymentgateway" element={<Payment />}></Route>
              </Route>
          </>
        )}    
        <Route path="signup" element={<Authentication openForm={{signin: false, signup: true}}/>}></Route>
        <Route path="signin" element={<Authentication openForm={{signin: true, signup: false}}/>}></Route>
      </Routes>
    </>
    
  );
};

export default App;
