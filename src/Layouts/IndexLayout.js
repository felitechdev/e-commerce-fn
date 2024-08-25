import Header from "../components/Header/Header";
import HeaderBottom from "../components/Header/SearchBar";

import FooterBottom from "../components/Footer/FooterBottom";
import { Outlet } from "react-router-dom";

const IndexLayout = () => {
  return (
    <div>
      <Header userInfo={false} />
      <HeaderBottom />
      <Outlet />

      <FooterBottom />
    </div>
  );
};

export default IndexLayout;
