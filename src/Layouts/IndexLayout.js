import Header from "../components/home/Header/Header";
import HeaderBottom from "../components/home/Header/HeaderBottom";
import Footer from "../components/home/Footer/Footer";
import FooterBottom from "../components/home/Footer/FooterBottom";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../redux/userSlice";

const IndexLayout = () => {
  const [userInfo, setUserInfo] = useState("")
  const Dispatch = useDispatch()
  console.log(userInfo);
  useEffect(async() => { 
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/google/success`, { withCredentials: true })
      .catch((error) => { 
        console.log(error.message);
      })
    
    if (response && response.data) { 
      sessionStorage.setItem("token", response.data.token)
      console.log(userInfo);
      setUserInfo(response.data.user)
      Dispatch(updateUserInfo(response.data.user))
    } 
  },[])

  return (
    <div>
      <Header
        userInfo={userInfo ? userInfo : false}
      />
      <HeaderBottom />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

export default IndexLayout;
