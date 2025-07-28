import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import PageLayout from "../../../components/designLayouts/PageLayout";
import { MdOutlineEmail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi"; 
import { FaLinkedin } from "react-icons/fa6";

import { TbWorld } from "react-icons/tb";
import AlertComponent from "../../../components/designLayouts/AlertComponent";

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    // setPrevLocation(location.state.data);
  }, [location]);

const [loading, setLoading] = useState(false);


const [message, setMessage] = useState(null);
const [error, setError] = useState(null);



  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
   
    setLoading(true);
    try {
      const result = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/contact-us`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          firstName: data.firstName,  
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phone.slice(1),
          message: data.message,
        }
      });

  

      if (result.status === 200) {
        setMessage( result?.data?.message || "Your message has been sent successfully");
        setLoading(false);

       document.getElementById("contact-form").reset();
      }





      
    } catch (error) {
   
      setError(error?.response?.data.message);
      setLoading(false);
      
    } finally {
      setLoading(false);

      setTimeout(() => {
        setError(null);
        setMessage(null);
      }
      , 10000);
    }

  };

  const formFields = {
    firstName: {
      type: "text",
      placeholder: "First name",
      validation: {
        required: "First name is required",
        minLength: { value: 2, message: "First name must be at least 2 characters long" },
      },
    },
    lastName: {
      type: "text",
      placeholder: "Last name",
      validation: {
        required: "Last name is required",
        minLength: { value: 2, message: "Last name must be at least 2 characters long" },
      },
    },
    email: {
      type: "email",
      placeholder: "you@example.com",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "Invalid email format",
        },
      },
    },
    phone: {
      type: "text",
      placeholder: "+250 7xxxxxxx",
      validation: {
        required: "Phone number is required",
        pattern: {
          value: /^\+2507[0-9]{8}$/,
          message:
            "Phone number must start with +250 and have 12 digits (e.g., +2507XXXXXXXX)",
        },
       
      },
    },
    message: {
      type: "textarea",
      placeholder: "Leave us a message...",
      validation: {
        required: "Message is required",
        minLength: { value: 10, message: "Message must be at least 10 characters long" },
      },
    },
  };


  return (
    <PageLayout showFooter={true}>
      <div className="mx-auto max-w-container  px-6 mb-5">
        {/* Header Section */}
        <div className="flex flex-col gap-8 rounded md:!px-28 !py-16 !text-center tracking-wider ">
          <h1 className="font-titleFont !text-2xl font-extralight uppercase tracking-widest md:!text-3xl">
            Connect With us anytime, anywhere!
            <hr className="m-auto mt-6 h-1 w-[20%] bg-primary" />
          </h1>

          <p className="!text-md flex flex-col gap-2 font-light md:mx-20">
            Have questions, need support, or want to share feedback? Contact us
            through the form below, email, phone, or your favorite social media
            platforms.
            <span className="text-xl font-semibold">We’re here to help!</span>
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-2">
          {/* Contact Info Section */}
          <div className="">
            <h2 className="mb-8 mt-6 text-2xl font-semibold md:text-3xl">
              Stay in touch
            </h2>
            <div className="flex flex-col gap-14 text-left">
              {/* Chat */}
              <div className="flex items-start gap-4">
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
              <div className="flex items-start gap-4">
                <span className="text-2xl">
                  <SlLocationPin />
                </span>
                <div>
                  <p className="font-semibold">OFFICE</p>
                  <p>Visit us at our office</p>
                  {/* <p>Kigali, Kicukiro near Simba Super Market</p> */}
                  <p>KG 182 st, Kigali</p>
                  <p>Kimironko</p>
                  {/* <p>At NZOZ' HOUSE</p> */}
                </div>
              </div>
              {/* Phone */}
              <div className="flex items-start gap-4">
                <span className="text-2xl">
                  <FiPhoneCall />
                </span>
                <div>
                  <p className="font-semibold">PHONE</p>
                  <p>MON-FRI from 8:00 am to 5:00 pm</p>
                  <p className="text-[#ea612a]">+250 798 697 197</p>
                </div>
              </div>

              {/* Social Media */}

              <div className="mt-5 flex cursor-pointer items-center gap-4 text-primary">
                <span className="text-2xl hover:text-[#ea612a]">
                  <FaInstagramSquare />
                </span>
                <span className="text-2xl hover:text-[#ea612a]">
                  <FaLinkedin />
                </span>

                <span className="text-2xl hover:text-[#ea612a]">
                  <FaFacebookSquare />
                </span>
                <span className="text-2xl hover:text-[#ea612a]">
                  <TbWorld />
                </span>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="rounded-lg border bg-gray-50 p-6">
            <h2 className="mb-6 text-3xl font-semibold">Send us a Message</h2>

            {error && message == null && (
              <AlertComponent
                color="failure"
                type="Error!"
                message={error}
              />
            )}

            {message != null && (
              <AlertComponent
                color="success"
                type="Success!"
                message={message}
              />
            )}




            <form id="contact-form" className="space-y-6 mt-2 " onSubmit={handleSubmit(onSubmit)}>
        {/* First Name and Last Name in Grid Layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {["firstName", "lastName"].map((field) => (
            <div key={field}>
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor={formFields[field].id}
              >
                {formFields[field].label}
              </label>
              <input
                {...register(field, formFields[field].validation)}
                id={formFields[field].id}
                type="text"
                placeholder={formFields[field].placeholder}
                className="w-full rounded border px-3 py-2"
              />
              {errors[field] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[field].message}
                </p>
              )}
            </div>
          ))}
        </div>
        <div>
                <label
                  className="mb-1 block text-sm font-medium"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id={formFields.email.id}
                  type="email"
                  {...register("email", formFields.email.validation)}
                  placeholder="you@gmail.com"
                  className="w-full rounded border px-3 py-2"
                />
                 {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
              </div>

        {/* Phone Number */}
        <div>
          <label
            className="mb-1 block text-sm font-medium"
            htmlFor={formFields.phone.id}
          >
            {formFields.phone.label}
          </label>
          <input
            {...register("phone", formFields.phone.validation)}
            id={formFields.phone.id}
            type="text"
            placeholder={formFields.phone.placeholder}
            className="w-full rounded border px-3 py-2"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            className="mb-1 block text-sm font-medium"
            htmlFor={formFields.message.id}
          >
            {formFields.message.label}
          </label>
          <textarea
            {...register("message", formFields.message.validation)}
            id={formFields.message.id}
            placeholder={formFields.message.placeholder}
            className="w-full resize-none rounded border px-3 py-2"
            rows="4"
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded bg-primary py-2 text-white hover:bg-green-800"
          disabled={loading}

        >
          {loading ? "Sending..." : "Send Message"}
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
