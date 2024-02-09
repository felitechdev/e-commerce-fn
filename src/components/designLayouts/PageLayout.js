import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchBar from "../Header/SearchBar";
import FooterBottom from "../Footer/FooterBottom";

export default function PageLayout({
  children,
  showFooter,
  showSearchBar,
  userInfo,
}) {
  return (
    <>
      <Header userInfo={userInfo} />
      {showSearchBar && (
        <>
          <SearchBar />
        </>
      )}
      {children}

      {showFooter && (
        <>
          <Footer />
          <FooterBottom />
        </>
      )}
    </>
  );
}
