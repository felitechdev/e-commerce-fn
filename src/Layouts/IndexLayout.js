import Header from "../components/home/Header/Header";
import HeaderBottom from "../components/home/Header/HeaderBottom";
import Footer from "../components/home/Footer/Footer";
import FooterBottom from "../components/home/Footer/FooterBottom";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const IndexLayout = () => {
  const Dispatch = useDispatch()
  const Navigate = useNavigate()

  console.log(userInfo);
  useEffect(async() => { 
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/google/success`, { withCredentials: true })
      .catch((error) => { 
        console.log(error.message);
      })
    
    if (response && response.data) {
      sessionStorage.setItem("token", response.data.token)
      console.log(userInfo);

      Dispatch(updateUserInfo(response.data.user))
      Navigate("/accounts/")
    } 
  },[])

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
