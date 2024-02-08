import Header from '../components/Header/Header';
import HeaderBottom from '../components/Header/SearchBar';
import Footer from '../components/home/Footer/Footer';
import FooterBottom from '../components/Footer/FooterBottom';
import { Outlet } from 'react-router-dom';

const IndexLayout = () => {
  return (
    <div>
      <Header userInfo={false} />
      <HeaderBottom />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

export default IndexLayout;
