import React, { useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useLocation } from "react-router-dom";

const Breadcrumbs = ({ prevLocation, title }) => {
  const location = useLocation();
  const [locationPath, setLocationPath] = useState("");
  useEffect(() => {
    setLocationPath(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <div className="flex w-full flex-col gap-3 py-2 xl:py-10">
      <h1 className="font-titleFont font-semibold">{title}</h1>
      {/* <p className="text-sm font-normal text-lightText capitalize flex items-center">
        <span> {prevLocation === "" ? "Home" : prevLocation}</span>

        <span className="px-1">
          <HiOutlineChevronRight />
        </span>
        <span className="capitalize font-semibold text-primeColor">
          {locationPath}
        </span>
      </p> */}
    </div>
  );
};

export default Breadcrumbs;
