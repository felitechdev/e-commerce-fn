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
import { applestore } from "../../assets/images";
import { playstore } from "../../assets/images";
const FooterBottom = () => {
  return (
    <section className="bg-[#1D6F2B] text-white px-2 cursor-pointer">
      <div className="max-w-container mx-auto py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8  max-w-fit m-auto  ">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="medium2_text">Shopping with us</h3>
            <ul>
              <li>
                <Link to="/">Making payments</Link>
              </li>
              <li>
                <Link to="/">Delivery Options</Link>
              </li>
              <li>
                <Link to="/">Buyers Protection</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start md:mx-10">
            <h3 className="medium2_text">Customer Service</h3>
            <ul>
              <li>
                <Link to="/">Help center</Link>
              </li>
              <li>
                <Link to="/">Translation service</Link>
              </li>
              <li>
                <Link to="/">Terms and conditions</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="medium2_text">Collaborate with us</h3>
            <ul>
              <li>
                <Link to="/">Help center</Link>
              </li>
              <li>
                <Link to="/">Translation service</Link>
              </li>
              <li>
                <Link to="/">Terms and conditions</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className=" max-w-container  md:px-12 lg:px-14 grid grid-cols-2 md:grid-cols-4 gap-4   m-auto  ">
          <div className="flex justify-center items-center">
            <img
              src={FeliTechWhiteLogo}
              alt="Felitechnology Logo"
              className="  mb-4"
            />
          </div>

          <div className="flex flex-col items-center justify-center  space-y-2 ">
            <h3 className="medium2_text"> About</h3>
            <p className="text-center md:text-left">
              We are felitechnology. Trying to make an effort to put the right
              people for you to get the best results. Just insight.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 ">
            <h3 className="medium2_text"> Contact </h3>
            <div className="flex space-x-4 px-3">
              <button className="bg-[#3CB043] text-white py-2 px-4 rounded-full shadow-lg">
                Insights
              </button>
              <button className="bg-[#3CB043] text-white py-2 px-4 rounded-full shadow-lg">
                Contact
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <div className="flex flex-col justify-start space-y-2 ">
              <h3 className="medium2_text"> Get intouch with us </h3>
              <div className="flex  items-center justify-start space-x-2 ">
                <a
                  href="https://web.facebook.com/FeliTechnology"
                  className="text-white bg-[#3CB043] rounded-full shadow-white shadow-md p-2 border border-white"
                >
                  <FaFacebookF />
                </a>

                <p>Facebook</p>
              </div>
              <div className="flex  items-center justify-start space-x-2 ">
                {" "}
                <a
                  href="https://www.linkedin.com/company/feli-technology"
                  className="text-white bg-[#3CB043] rounded-full shadow-white shadow-md p-2 border border-white"
                >
                  <FaLinkedinIn />
                </a>{" "}
                <p>Linkedin</p>
              </div>
              <div className="flex  items-center justify-start space-x-2 ">
                {" "}
                <a
                  href="#"
                  className="text-white bg-[#3CB043] rounded-full shadow-white shadow-md p-2 border border-white"
                >
                  <FaTwitter />
                </a>{" "}
                <p>Twitter</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" m-auto flex  justify-around items-center mt-8 border-t pt-8">
          <div className="flex flex-col justify-center items-center space-y-2 ">
            <h3 className="medium2_text"> Felitechnology Language sites </h3>
            <p> English, Kinyarwanda</p>
          </div>

          <div className="flex flex-col justify-center items-center  space-y-2 ">
            <h3 className="medium2_text"> Browse by Category </h3>

            <div className=" flex md:flex-row  md:space-x-4">
              <img src={playstore} className="w-7 h-7" alt="Google Play" />{" "}
              <p className="text-black medium_text">Google Play</p>
              <img src={applestore} className="w-7 h-7" alt="App Store" />{" "}
              <p className="text-black medium_text">App Store</p>
            </div>
          </div>
        </div>
      </div>
      {/* <FooterBottom /> */}
    </section>
  );
};

export default FooterBottom;
