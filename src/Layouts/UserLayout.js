import Header from '../components/Header/Header';
import HeaderBottom from '../components/Header/SearchBar';
import Footer from '../components/home/Footer/Footer';
import FooterBottom from '../components/Footer/FooterBottom';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateUserCart } from '../redux/userSlice';
import Cookies from 'js-cookie';

const UserLayout = (props) => {
  const [userprofile, setUserprofile] = useState();
  const [user, setUser] = useState();
  const storeUserInfo = useSelector((state) => state.userReducer.userInfo);
  const token = Cookies.get('token');
  const { profile, loadprofile, errprofile } = useSelector(
    (state) => state.userprofile
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (storeUserInfo) {
      setUser(storeUserInfo);
    }
  }, [storeUserInfo]);

  useEffect(() => {
    if (profile?.data?.user) {
      setUserprofile(profile?.data?.user);
    }
  }, [profile]);

  return (
    <div>
      {/* <Header userInfo={storeUserInfo} account={props.account} /> */}
      <Header userInfo={userprofile} />
      <HeaderBottom />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

export default UserLayout;
