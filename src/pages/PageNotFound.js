import React from "react";
import {} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import { AiFillHome, AiTwotoneMeh } from "react-icons/ai";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80 space-y-3">
        <div className="bg-primary opacity-90 h-16 flex items-center justify-center text-white text-4xl font-semibold rounded-t-lg">
          <AiTwotoneMeh /> <AiTwotoneMeh className="text-white" />
        </div>

        <div className="p-8 bg-primary  opacity-90 text-white">
          <h2 className="text-4xl font-semibold ">404</h2>

          <h2 className="font-semibold text-2xl "> Page not found</h2>
        </div>

        <div
          className=" bg-primary flex items-center justify-center text-white space-x-4 h-12 rounded-b-lg cursor-pointer hover:bg-primary-dark transition-all duration-300 ease-in-out"
          onClick={
            () => navigate("/")

            //  (window.location.href = "/")
          }
        >
          {" "}
          <AiFillHome size={30} />
          <p className="text-center ">Back To Home</p>
        </div>
      </div>
      <br />
    </div>
  );
};

export default PageNotFound;
