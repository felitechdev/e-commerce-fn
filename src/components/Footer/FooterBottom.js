import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FeliTechWhiteLogo } from "../../assets/images";
import { whatsappIcon, FeliTechLogo_transparent } from "../../assets/images";
import { applestore } from "../../assets/images";
import { playstore } from "../../assets/images";
import { mtn, aitel, mastercard, visa } from "../../assets/images";
import { FaXTwitter } from "react-icons/fa6";

import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

export const CategoryImagesCards = ({ ...props }) => {
  const {
    loading: productclassLoading,
    productclass: productclassData,
    errorMessage: productclassError,
  } = useSelector((state) => state.productclass);

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container && container.scrollWidth > container.clientWidth) {
      const scrollInterval = setInterval(() => {
        container.scrollLeft += 1;
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollLeft = 0;
        }
      }, 1000);

      return () => clearInterval(scrollInterval);
    }
  }, [productclassData]);

  return (
    <>
      {/* h-[142px] */}
      <div
        className="flex space-x-5 overflow-x-auto scrollbar-none md:space-x-8"
        ref={containerRef}
      >
        {!productclassLoading &&
          productclassData &&
          productclassData?.map((pclass, index) => {
            return (
              <Link to={`/shop/?productClass=${pclass.id}`} key={index + 1}>
                <div
                  key={pclass.id}
                  className="h-fit w-[90px] flex-col items-center justify-center space-y-2 text-center"
                >
                  <p className="break-words text-sm hover:text-[#cd5c07] hover:underline">
                    {pclass.name}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

const FooterBottom = () => {
  return (
    <div className="w-[100%] bg-[#022c22]">
      <section className="mx-auto max-w-container cursor-pointer px-4 py-8 text-white">
        {/* WhatsApp Floating Button */}

        <div className="mx-auto grid max-w-container grid-cols-1 gap-2 text-center md:grid-cols-3">
          <div className="flex justify-around md:hidden">
            <div className="flex flex-col items-center md:items-start">
              <h3 className="medium2_text mx-auto">Explore</h3>
              <ul className="mx-auto py-4">
                {/* <li>
                  <Link to="/">Search</Link>
                </li> */}
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/refund-policy">Refund</Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions">Terms & Conditions</Link>
                </li>
              </ul>
            </div>

            <div className="hidden flex-col items-center md:items-start">
              <h3 className="medium2_text mx-auto">About</h3>
              <ul className="mx-auto border-t border-white py-4">
                <li>
                  <Link to="/refund-policy">Refund</Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden max-w-fit flex-col items-start md:flex md:items-start">
            <h3 className="medium2_text">Explore</h3>
            <ul className="mx-auto space-y-3 py-4 text-left">
              <li className="hover:underline">
                <Link to="/about">About Us</Link>
              </li>
              <li className="hover:underline">
                <Link to="/contact">Contact Us</Link>
              </li>
              <li className="hover:underline">
                <Link to="/refund-policy">Refund</Link>
              </li>
              <li className="hover:underline">
                <Link to="/terms-and-conditions">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div className="hidden items-center md:items-start">
            <h3 className="medium2_text mx-auto">About</h3>
            <ul className="mx-auto border-t border-white py-4">
              {/* <li>
                <Link to="/">Delivery</Link>
              </li>
              <li>
                <Link to="/">Returns</Link>
              </li> */}
              <li>
                <Link to="/refund-policy">Refund</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div className="mx-auto flex w-fit flex-col items-center md:items-start">
            <h3 className="medium2_text">Connect</h3>
            <div className="mx-auto flex-col space-y-4 py-4">
              <div className="flex items-center justify-start space-x-2">
                {" "}
                <a
                  href="https://web.facebook.com/FeliTechnology"
                  target="_blank"
                  className="flex items-center space-x-2"
                >
                  {" "}
                  <p className="rounded-full border border-white bg-[#3CB043] p-2 text-white shadow-md shadow-white">
                    {" "}
                    <FaFacebookF />
                  </p>
                  <p>Facebook</p>
                </a>
              </div>
              <div className="flex items-center justify-start space-x-2">
                {" "}
                <a
                  href="https://www.linkedin.com/company/feli-technology"
                  target="_blank"
                  className="flex items-center space-x-2"
                >
                  <p className="rounded-full border border-white bg-[#3CB043] p-2 text-white shadow-md shadow-white">
                    {" "}
                    <FaLinkedinIn />
                  </p>
                  <p>Linkedin</p>
                </a>{" "}
              </div>

              <div className="flex items-center justify-start space-x-2">
                <a
                  href="https://www.instagram.com/feli_technology/"
                  target="_blank"
                  className="flex items-center space-x-2"
                >
                  <p className="rounded-full border border-white bg-[#3CB043] p-2 text-white shadow-md shadow-white">
                    <FaInstagram />
                  </p>
                  <p>Instagram</p>
                </a>
              </div>

              <div className="flex items-center justify-start space-x-2">
                <a
                  href="#"
                  target="_blank"
                  className="flex items-center space-x-2"
                >
                  {" "}
                  <p className="rounded-full border border-white bg-[#3CB043] p-2 text-white shadow-md shadow-white">
                    <FaXTwitter />
                  </p>
                  <p>X</p>
                </a>
              </div>
            </div>
          </div>
          {/* <div className="hidden max-w-fit flex-col items-center md:flex md:items-start"></div> */}
          <div className="mx-auto max-w-fit items-center md:mr-0 md:flex md:flex-col md:items-start">
            <h3 className="medium2_text mx-auto">Payment methods</h3>
            <div className="flex items-center justify-center py-4 md:flex-col md:space-x-0 md:space-y-3">
              <img src={mtn} alt="MTN" className="h-8 w-14 object-fill" />
              <img src={aitel} alt="Airtel" className="h-8 w-14 object-fill" />
              <img src={visa} alt="Visa" className="h-10 w-14 object-fill" />
              <img
                src={mastercard}
                alt="MasterCard"
                className="h-10 w-14 object-fill"
              />
            </div>
          </div>
        </div>

        {/* Our Categories */}
        <div className="mx-auto mt-8 hidden max-w-container flex-col justify-start space-y-4 border-t border-white py-4 md:space-y-0">
          <h3 className="medium2_text">Our Categories</h3>
          <CategoryImagesCards />
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 hidden flex-col items-center justify-between space-y-4 border-t border-white py-4 md:flex-row md:gap-40 md:space-y-0">
          <div className="flex items-center justify-center">
            <img
              src={FeliTechWhiteLogo}
              alt="Felitechnology Logo"
              className="mb-4 h-[50px] w-[120px]"
            />
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="medium2_text">Who we are</h3>
            <p>
              We are felitechnology, trying to make an effort to put the right
              people for you to get the best results. Just insight.
            </p>
          </div>

          {/* <div className="flex flex-col items-center md:items-start">
            <h3 className="medium2_text">Subscribe</h3>
            <p>
              Sign up to unlock exclusive discounts and one-of-a-kind
              promotions.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="border border-white text-black w-full p-2 rounded-md"
            />
          </div> */}
        </div>
      </section>
      <div className="bottomfotter w-[100%] bg-[#498952]">
        <div className="mx-auto flex max-w-container cursor-pointer flex-col justify-between px-4 py-8 text-white md:flex-row">
          <div className="flex items-center justify-center space-x-2">
            <h3 className="">Powered by </h3>
            <h3 className="medium2_text">
              <a
                href="https://felitechnology.com/"
                target="_blank"
                rel="noreferrer"
              >
                Felitechnology
              </a>
            </h3>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <h3 className="">Browse by Category</h3>
            <div className="flex space-x-2 md:space-x-4">
              <div className="flex items-center space-x-2">
                <img src={playstore} className="h-7 w-7" alt="Google Play" />
                <p className="md:medium_text text-black">Google Play</p>
              </div>
              <div className="flex items-center space-x-2">
                <img src={applestore} className="h-7 w-7" alt="App Store" />
                <p className="md:medium_text text-black">App Store</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
