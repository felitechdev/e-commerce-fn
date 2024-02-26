import React from "react";
import {} from "@ant-design/icons";

import { AiTwotoneMeh } from "react-icons/ai";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80 space-y-3">
        <div className="bg-primary opacity-90 h-16 flex items-center justify-center text-white text-4xl font-bold rounded-t-lg">
          <AiTwotoneMeh /> <AiTwotoneMeh className="text-white" />
        </div>

        <div className="p-8 bg-primary  opacity-90 text-white">
          <h2 className="text-4xl font-bold ">404</h2>

          <h2 className="font-bold text-2xl "> Page not found</h2>
        </div>
      </div>
      <br />
    </div>
  );
};

export default PageNotFound;
