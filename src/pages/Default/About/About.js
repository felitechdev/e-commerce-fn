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
    <PageLayout showFooter={true}>
      <div className="max-w-container mx-auto text-center px-4">
        <Breadcrumbs title="About Us" prevLocation={prevLocation} />
        <div className="max-w-[600px] text-center  m-auto text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">
            Welcome to Feli Express – Your Premier Online Shopping Destination
            in Rwanda!
          </span>{" "}
          At Feli Express, we are redefining the way you shop online. Our
          mission is to bring you an unparalleled shopping experience, where
          quality meets efficiency. Based in the heart of Rwanda, we are proud
          to offer a diverse range of high-quality products, all available at
          your fingertips.
          <br />
          <span className="text-primeColor font-semibold text-lg">
            Our Vision{" "}
          </span>
          <br />
          Our vision is to create a seamless and enjoyable online shopping
          experience for everyone. We are committed to providing top-notch
          products and exceptional customer service. Whether you're searching
          for the latest trends, unique finds, or everyday essentials, Feli
          Express is your go-to destination for all your shopping needs.
          <br />{" "}
          <span className="text-primeColor font-semibold text-lg">
            Why Choose Us?
          </span>
          <br />{" "}
          <span className="text-primeColor font-semibold text-lg">
            Quality You Can Trust:{" "}
          </span>
          <br />
          We partner with reputable brands and suppliers to ensure that every
          product on our platform meets the highest standards of quality.
          <br />{" "}
          <span className="text-primeColor font-semibold text-lg">
            Unmatched Convenience:
          </span>{" "}
          Shopping with us is effortless. Our user-friendly website and mobile
          app provide a seamless shopping experience, allowing you to browse,
          shop, and track your orders from the comfort of your home. Enjoy a
          hassle-free process with easy navigation and secure payment options.{" "}
          <Link to="/shop">
            <button className="w-52 h-10 bg-primary text-white hover:opacity-20 duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
