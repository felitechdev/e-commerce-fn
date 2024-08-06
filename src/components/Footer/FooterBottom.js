import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";
import { Link } from "react-router-dom";
const FooterBottom = () => {
  return (
    <div className="w-full bg-[#1D6F2B] group px-2">
      <div className="max-w-container mx-auto border-t-[1px] py-8">
        <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-white duration-200 text-sm">
          <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
            <AiOutlineCopyright />
          </span>
          Copyright 2024 | FELI EXPRESS | All Rights Reserved |
          <a
            href="https://felitechnology.com/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="ml-1 font-medium ">
              Powered by Felitechnology.com
            </span>
          </a>
          <Link to="/about">
            <span className="ml-1 font-medium ">About Us</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
