import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PageLayout from "../../../components/designLayouts/PageLayout";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { aboutourstory, aboutmission } from "../../../assets/images";
const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  // useEffect(() => {
  //   setPrevLocation(location.state.data);
  // }, [location]);
  return (
    <PageLayout showFooter={true}>
      <div className="mx-auto max-w-container space-y-5 px-4 text-center">
        <h1 className="font-titleFont !text-2xl font-extralight uppercase tracking-widest md:!text-3xl">
          Who We Are
          <hr className="m-auto mt-2 w-[20%]" />
        </h1>

        <p className="!text-md flex flex-col gap-2 font-light tracking-wider md:mx-20">
          Welcome to FeliExpress, founded in 2023 with a vision to transform
          online shopping. At FeliExpress, we take pride in listing a wide
          variety of products to cater to your every need. Our mission is
          simple: to bring you quality and convenience at prices lower than
          those on the market.
        </p>

        <div className="mt-5 flex cursor-pointer items-center justify-center gap-4 self-center text-primary">
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

        {/* Our story */}

        <div className="flex-col-reverse bg-bgprimary p-2 md:flex md:flex-row">
          <div className="my-auto text-left">
            {" "}
            <p className="font-titleFont !text-2xl font-extralight uppercase tracking-widest md:!text-3xl">
              Our story
            </p>
            <p className="!text-md my-3 flex flex-col items-start justify-start gap-2 align-baseline font-light tracking-wider">
              At FeliExpress, our mission is to make shopping more affordable
              for everyone. We are committed to offering convenient prices
              without compromising on quality, ensuring that you get the best
              value for your money.
            </p>
          </div>

          <img
            src={aboutourstory}
            alt="about our story"
            className="object-cover md:h-[90%] md:w-[50%]"
          />
        </div>

        <div className="flex-col-reverse p-2 md:flex md:flex-row">
          <img
            src={aboutmission}
            alt="about our  mission"
            className="my-auto object-cover text-left md:h-[90%] md:w-[50%]"
          />

          <div className="my-auto text-left">
            {" "}
            <p className="font-titleFont !text-2xl font-extralight uppercase tracking-widest md:!text-3xl">
              Our Mission
            </p>
            <p className="!text-md my-3 flex flex-col items-start justify-start gap-2 align-baseline font-light tracking-wider">
              At FeliExpress, our mission is to make shopping more affordable
              for everyone. We are committed to offering convenient prices
              without compromising on quality, ensuring that you get the best
              value for your money.
            </p>
          </div>
        </div>

        <div className="flex-col justify-center bg-bgprimary p-2 py-10 text-center">
          <p className="!text-md my-3 flex flex-col justify-center gap-2 font-light tracking-wider">
            Ready to experience affordable shopping like never before? Browse
            our wide range of products and start saving today.
          </p>

          <Link to="/shop">
            <button className="h-10 w-52 rounded-md bg-primary text-white duration-300 hover:opacity-20">
              Shop now
            </button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
