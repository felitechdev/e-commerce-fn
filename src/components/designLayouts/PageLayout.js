import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchBar from "../Header/SearchBar";
import FooterBottom from "../Footer/FooterBottom";
import { whatsappIcon, FeliTechLogo_transparent } from "../../assets/images";
import Image from "./Image";
export default function PageLayout({ children, showFooter, userInfo }) {
  return (
    <main className="">
      <Header userInfo={userInfo} />
      <div className="mt-6">{children}</div>

      {showFooter && (
        // <div className="max-w-container mx-auto">
        <FooterBottom />
        // </div>
      )}

      <a
        href="https://wa.me//+250798697197"
        target="_blank"
        className="fixed bottom-10 right-4 z-50 h-12 w-12 text-white hover:animate-bounce"
      >
        <img src={whatsappIcon} className="h-full w-full" alt="WhatsApp" />
      </a>
    </main>
  );
}
