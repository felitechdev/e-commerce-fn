import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import PageLayout from "../../../components/designLayouts/PageLayout";
import { MdOutlineEmail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { FaPhoneVolume } from "react-icons/fa6";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

import { TbWorld } from "react-icons/tb";

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    // setPrevLocation(location.state.data);
  }, [location]);

  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  // ========== Error Messages Start here ============
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");
  // ========== Error Messages End here ==============
  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setclientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessages("");
  };

  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handlePost = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your Name");
    }
    if (!email) {
      setErrEmail("Enter your Email");
    } else {
      if (!EmailValidation(email)) {
        setErrEmail("Enter a Valid Email");
      }
    }
    if (!messages) {
      setErrMessages("Enter your Messages");
    }
    if (clientName && email && EmailValidation(email) && messages) {
      setSuccessMsg(
        `Thank you dear ${clientName}, Your messages has been received successfully. Futher details will sent to you by your email at ${email}.`,
      );
    }
  };

  return (
    <PageLayout showFooter={false}>
      <div className="mx-auto max-w-container px-4">
        {/* Header Section */}
        <div className="m-2 bg-primary py-5 !text-center text-white">
          <h1 className="font-titleFont !text-2xl font-semibold md:!text-3xl">
            Connect With us anytime, anywhere!
          </h1>
          <h1 className="!text-md font-light md:mx-20">
            Have questions, need support, or want to share feedback? Contact us
            through the form below, email, phone, or your favorite social media
            platforms.
          </h1>
          <h1 className="!text-xl font-bold">We’re here to help!</h1>
        </div>

        {/* Content Section */}
        <div className="m-auto grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-2 md:px-5">
          {/* Contact Info Section */}
          <div className="space-y-10">
            <h2 className="text-2xl font-semibold">Stay in touch</h2>
            <div className="space-y-4 text-left">
              {/* Chat */}
              <div className="flex items-center gap-4">
                <span className="text-2xl">
                  {" "}
                  <MdOutlineEmail />
                </span>
                <div>
                  <p className="font-semibold">CHART TO US</p>
                  <p>Our team is always here to help</p>
                  <p className="text-[#ea612a]">info@felitechnology.com</p>
                </div>
              </div>
              {/* Office */}
              <div className="flex items-center gap-4">
                <span className="text-2xl">
                  <SlLocationPin />
                </span>
                <div>
                  <p className="font-semibold">OFFICE</p>
                  <p>Visit us at our office</p>
                  <p>Kigali, Kicukiro near Simba Super Market</p>
                  <p>At NZOZ' HOUSE</p>
                </div>
              </div>
              {/* Phone */}
              <div className="flex items-center gap-4">
                <span className="text-2xl">
                  <FaPhoneVolume />
                </span>
                <div>
                  <p className="font-semibold">PHONE</p>
                  <p>MON-FRI from 8:00 am to 5:00 pm</p>
                  <p className="text-[#ea612a]">+250 798 697 197</p>
                </div>
              </div>

              {/* Social Media */}

              <div className="flex items-center gap-4 text-[#ea612a]">
                <span className="text-2xl hover:text-primary">
                  <FaInstagram />
                </span>
                <span className="text-2xl hover:text-primary">
                  <FaLinkedinIn />
                </span>

                <span className="text-2xl hover:text-primary">
                  <FaFacebookF />
                </span>
                <span className="text-2xl hover:text-primary">
                  <TbWorld />
                </span>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="rounded-lg bg-bgprimary p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-semibold">Send us a Message</h2>
            <form className="space-y-6">
              {/* Name */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    className="mb-1 block text-sm font-medium"
                    htmlFor="firstName"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    className="w-full rounded border px-3 py-2"
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block text-sm font-medium"
                    htmlFor="lastName"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    className="w-full rounded border px-3 py-2"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  className="mb-1 block text-sm font-medium"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@gmail.com"
                  className="w-full rounded border px-3 py-2"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  className="mb-1 block text-sm font-medium"
                  htmlFor="phone"
                >
                  Phone number
                </label>
                <input
                  id="phone"
                  type="text"
                  placeholder="+250 7xxxxxxx"
                  className="w-full rounded border px-3 py-2"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="mb-1 block text-sm font-medium"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Leave us a message……"
                  className="w-full resize-none rounded border px-3 py-2"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={
                  (e) => handlePost(e)
                  // console.log("Submit Button Clicked")
                }
                className="w-full rounded bg-primary py-2 text-white hover:bg-green-800"
              >
                Submit
              </button>

              <p className="mt-4 text-sm text-gray-500">
                By contacting us, you agree to our{" "}
                <Link
                  to="/terms-and-conditions"
                  className="font-semibold text-primary"
                >
                  {" "}
                  Terms of service{" "}
                </Link>
                &{" "}
                <Link
                  to="/refund-policy"
                  className="font-semibold text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
