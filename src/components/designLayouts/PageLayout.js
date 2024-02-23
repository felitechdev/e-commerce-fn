import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchBar from '../Header/SearchBar';
import FooterBottom from '../Footer/FooterBottom';

export default function PageLayout({ children, showFooter, userInfo }) {
  return (
    <>
      <Header userInfo={userInfo} />
      <div className='mt-6'>{children}</div>

      {showFooter && (
        <>
          {/* <Footer /> */}
          <FooterBottom />
        </>
      )}
    </>
  );
}
