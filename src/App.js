import {
  Routes,
  Route,
} from "react-router-dom";
import About from "./pages/Default/About/About";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import Cart from "./pages/Default/Cart/Cart";
import Contact from "./pages/Default/Contact/Contact";
import Home from "./pages/Default/Home/Home";
import Journal from "./pages/Default/Journal/Journal";
import Offer from "./pages/Default/Offer/Offer";
import Payment from "./pages/Default/payment/Payment";
import ProductDetails from "./pages/Default/ProductDetails/ProductDetails";
import Shop from "./pages/Default/Shop/Shop";
import UserLayout from "./Layouts/UserLayout";
import IndexLayout from "./Layouts/IndexLayout";
import UserHome from "./pages/Account/Home/UserHome";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexLayout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="shop" element={<Shop />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path="journal" element={<Journal />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="offer" element={<Offer />}></Route>
        <Route path="product/:_id" element={<ProductDetails />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="paymentgateway" element={<Payment />}></Route>
      </Route>
      <Route path="/accounts/" element={<UserLayout />}>
        <Route path="" element={<UserHome />}></Route>
        <Route path="shop" element={<Shop />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path="journal" element={<Journal />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="offer" element={<Offer />}></Route>
        <Route path="product/:_id" element={<ProductDetails />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="paymentgateway" element={<Payment />}></Route>
      </Route>
      <Route path="signup" element={<SignUp />}></Route>
      <Route path="signin" element={<SignIn />}></Route>
    </Routes>
  );
};

export default App;
