import Header from "../components/home/Header/Header";
import HeaderBottom from "../components/home/Header/HeaderBottom";
import Footer from "../components/home/Footer/Footer";
import FooterBottom from "../components/home/Footer/FooterBottom";
import { Outlet } from "react-router-dom";
import axios from "axios";

const IndexLayout = () => {

  const getUserGoogleAccountInfo = async () => { 
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/google/success`, { withCredentials: true })
      .catch((error) => { 
        console.log(error, "message");
      })
    if (response && response.data) { 
      console.log(response.data);
    }

    // console.log(userInfo);
    // if (userInfo) {
    //   console.log(typeof(userInfo)); 
    //   console.log(userInfo.data, "message");
    //   console.log(userInfo.response, "message");
    // }
      

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
