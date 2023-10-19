import Header from "../components/home/Header/Header";
import HeaderBottom from "../components/home/Header/HeaderBottom";
import Footer from "../components/home/Footer/Footer";
import FooterBottom from "../components/home/Footer/FooterBottom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserLayout = () => {
  const storeUserInfo = useSelector((state) => state.userReducer.userInfo)

  return (
    <div>
      <Header
        userInfo={storeUserInfo}
      />
      <HeaderBottom />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

export default UserLayout;
