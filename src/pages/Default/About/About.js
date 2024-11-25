import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import PageLayout from "../../../components/designLayouts/PageLayout";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  // useEffect(() => {
  //   setPrevLocation(location.state.data);
  // }, [location]);
  return (
    <PageLayout showFooter={false}>
      <div className="mx-auto max-w-container px-4 text-center">
        <Breadcrumbs title="About Us" prevLocation={prevLocation} />
        <div className="m-auto mb-2 max-w-[600px] text-center text-base text-lightText">
          <span className="text-lg font-semibold text-primeColor">
            Welcome to Feli Express – Your Premier Online Shopping Destination
            in Rwanda!
          </span>{" "}
          At Feli Express, we are redefining the way you shop online. Our
          mission is to bring you an unparalleled shopping experience, where
          quality meets efficiency. Based in the heart of Rwanda, we are proud
          to offer a diverse range of high-quality products, all available at
          your fingertips.
          <br />
          <span className="text-lg font-semibold text-primeColor">
            Our Vision{" "}
          </span>
          <br />
          Our vision is to create a seamless and enjoyable online shopping
          experience for everyone. We are committed to providing top-notch
          products and exceptional customer service. Whether you're searching
          for the latest trends, unique finds, or everyday essentials, Feli
          Express is your go-to destination for all your shopping needs.
          <br />{" "}
          <span className="text-lg font-semibold text-primeColor">
            Why Choose Us?
          </span>
          <br />{" "}
          <span className="text-lg font-semibold text-primeColor">
            Quality You Can Trust:{" "}
          </span>
          <br />
          We partner with reputable brands and suppliers to ensure that every
          product on our platform meets the highest standards of quality.
          <br />{" "}
          <span className="text-lg font-semibold text-primeColor">
            Unmatched Convenience:
          </span>{" "}
          Shopping with us is effortless. Our user-friendly website and mobile
          app provide a seamless shopping experience, allowing you to browse,
          shop, and track your orders from the comfort of your home. Enjoy a
          hassle-free process with easy navigation and secure payment options.{" "}
          <Link to="/shop">
            <button className="h-10 w-52 bg-primary text-white duration-300 hover:opacity-20">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
