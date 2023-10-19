import Header from "../components/home/Header/Header";
import HeaderBottom from "../components/home/Header/HeaderBottom";
import Footer from "../components/home/Footer/Footer";
import FooterBottom from "../components/home/Footer/FooterBottom";
import { Outlet } from "react-router-dom";
import axios from "axios";

const IndexLayout = () => {

  const getUserGoogleAccountInfo = async() => { 
    axios({
      url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/google/success`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials":true,
      }
    }).then((result) => { 
      console.log(result.data, "message");
    }).catch(error => {
      // console.log(error.message);
    })
  }

  getUserGoogleAccountInfo()
  return (
    <div>
      <Header
        userInfo={false}
      />
      <HeaderBottom />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

export default IndexLayout;
