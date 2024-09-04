// import React from "react";
// import { AiOutlineCopyright } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import { FeliTechWhiteLogo } from "../../assets/images";
// const FooterBottom = () => {
//   return (
//     <div className="w-full bg-[#1D6F2B] group px-2">
//       <div className="max-w-container mx-auto border-t-[1px] py-8">
//         <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-white duration-200 text-sm">
//           <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
//             <AiOutlineCopyright />
//           </span>
//           Copyright 2024 | FELI EXPRESS | All Rights Reserved |
//           <a
//             href="https://felitechnology.com/"
//             target="_blank"
//             rel="noreferrer"
//           >
//             <span className="ml-1 font-medium ">
//               Powered by Felitechnology.com
//             </span>
//           </a>
//           <Link to="/about">
//             <span className="ml-1 font-medium ">About Us</span>
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default FooterBottom;

import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FeliTechWhiteLogo } from "../../assets/images";
import { whatsappIcon, FeliTechLogo_transparent } from "../../assets/images";
import { applestore } from "../../assets/images";
import { playstore } from "../../assets/images";
import { mtn, aitel, mastercard, visa } from "../../assets/images";

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
        className="flex space-x-5 md:space-x-8 overflow-x-auto scrollbar-none "
        ref={containerRef}
      >
        {!productclassLoading &&
          productclassData &&
          productclassData?.map((pclass, index) => {
            return (
              <Link to={`/shop/?productClass=${pclass.id}`} key={index + 1}>
                <div
                  key={pclass.id}
                  className="w-[90px] flex-col items-center justify-center h-fit space-y-2 text-center"
                >
                  <p className="text-sm hover:text-[#cd5c07] hover:underline break-words ">
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
    <div className="bg-primary w-[100%]">
      <section className="bg-[#1D6F2B] text-white px-4 py-8 cursor-pointer max-w-container mx-auto">
        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me//+250798697197"
          target="_blank"
          className="fixed text-white z-50 right-4 bottom-10 w-12 h-12 hover:animate-bounce"
        >
          <img src={whatsappIcon} className="w-full h-full" alt="WhatsApp" />
        </a>

        <div className="max-w-container mx-auto grid grid-cols-1  md:grid-cols-4 gap-2">
          <div className="flex flex-col  items-center md:items-start">
            <h3 className="medium2_text mx-auto">Explore</h3>
            <ul className="border-t  mx-auto border-white py-4">
              <li>
                <Link to="/">Search</Link>
              </li>
              <li>
                <Link to="/">About us</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="medium2_text mx-auto">About</h3>
            <ul className="border-t  mx-auto border-white py-4 ">
              <li>
                <Link to="/">Delivery</Link>
              </li>
              <li>
                <Link to="/">Returns</Link>
              </li>
              <li>
                <Link to="/">Tems</Link>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="medium2_text mx-auto">Connect</h3>
            <div className="flex space-x-2 border-t  mx-auto border-white py-4">
              <div className="flex  items-center justify-start space-x-2 ">
                {" "}
                <a
                  href="https://web.facebook.com/FeliTechnology"
                  className="text-white bg-[#3CB043] rounded-full shadow-white shadow-md p-2 border border-white"
                >
                  <FaFacebookF />
                </a>
                {/* <p>Facebook</p> */}
              </div>
              <div className="flex  items-center justify-start space-x-2 ">
                {" "}
                <a
                  href="https://www.linkedin.com/company/feli-technology"
                  className="text-white bg-[#3CB043] rounded-full shadow-white shadow-md p-2 border border-white"
                >
                  <FaLinkedinIn />
                </a>{" "}
                {/* <p>Linkedin</p> */}
              </div>
              <div className="flex  items-center justify-start space-x-2 ">
                {" "}
                <a
                  href="#"
                  className="text-white bg-[#3CB043] rounded-full shadow-white shadow-md p-2 border border-white"
                >
                  <FaTwitter />
                </a>{" "}
                {/* <p>Twitter</p> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="medium2_text mx-auto">Payment methods</h3>
            <div className="flex space-x-2 justify-center items-center border-t  mx-auto border-white py-4">
              <img src={mtn} alt="MTN" className="w-14 h-8 object-fill" />
              <img src={aitel} alt="Airtel" className="w-14 h-8 object-fill" />
              <img src={visa} alt="Visa" className="w-14 h-10 object-fill" />
              <img
                src={mastercard}
                alt="MasterCard"
                className="w-14 h-10 object-fill"
              />
            </div>
          </div>
        </div>

        {/* Our Categories */}
        <div className=" max-w-container mx-auto flex flex-col   justify-start  mt-8 border-t border-white py-4 space-y-4 md:space-y-0">
          <h3 className="medium2_text">Our Categories</h3>
          <CategoryImagesCards />
          {/* <ul className="flex flex-wrap  gap-8 ">
            <li>
              <Link to="/">Clothes</Link>
            </li>
            <li>
              <Link to="/">Electronics</Link>
            </li>
            <li>
              <Link to="/">Home appliances</Link>
            </li>
            <li>
              <Link to="/">Watches & Jewelry</Link>
            </li>
            <li>
              <Link to="/">Shoes</Link>
            </li>
            <li>
              <Link to="/">Hair extensions & Wigs</Link>
            </li>
          </ul> */}
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col  md:gap-40 md:flex-row justify-between items-center mt-8 border-t border-white py-4 space-y-4 md:space-y-0">
          <div className="flex justify-center items-center">
            <img
              src={FeliTechWhiteLogo}
              alt="Felitechnology Logo"
              className="  mb-4 w-[120px] h-[50px]"
            />
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="medium2_text">Who we are</h3>
            <p>
              We are felitechnology, trying to make an effort to put the right
              people for you to get the best results. Just insight.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
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
          </div>
        </div>
      </section>
      <div className="w-[100%] bg-[#498952]">
        <div className=" flex flex-col md:flex-row  justify-between text-white px-4 py-8 cursor-pointer max-w-container mx-auto bg-[#498952]">
          <div className="flex  justify-center items-center space-x-2">
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
          <div className="flex  justify-center items-center space-x-2">
            <h3 className="">Browse by Category</h3>
            <div className="flex md:space-x-4 space-x-2">
              <div className="flex items-center space-x-2">
                <img src={playstore} className="w-7 h-7" alt="Google Play" />
                <p className="text-black md:medium_text">Google Play</p>
              </div>
              <div className="flex items-center space-x-2">
                <img src={applestore} className="w-7 h-7" alt="App Store" />
                <p className="text-black md:medium_text">App Store</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
