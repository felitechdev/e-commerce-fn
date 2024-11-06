import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
import { useSearchParams } from "react-router-dom";

const Color = () => {
  const [showColors, setShowColors] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [colorName, setColorName] = useState(null);

  const handleOnClick = (colorName) => {
    searchParams.set(
      "colorMeasurementVariations.variations.colorImg.colorName",
      colorName,
    );
    setSearchParams(searchParams);
  };

  const handleRemoveColor = () => {
    setColorName(null);
    searchParams.delete(
      "colorMeasurementVariations.variations.colorImg.colorName",
    );
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (
      searchParams.get(
        "colorMeasurementVariations.variations.colorImg.colorName",
      )
    ) {
      setColorName(
        searchParams.get(
          "colorMeasurementVariations.variations.colorImg.colorName",
        ),
      );
    }
  }, [searchParams]);

  const colors = [
    {
      _id: 9001,
      title: "Green",
      base: "#22c55e",
    },
    {
      _id: 9002,
      title: "Gray",
      base: "#a3a3a3",
    },
    {
      _id: 9003,
      title: "Red",
      base: "#dc2626",
    },
    {
      _id: 9004,
      title: "Yellow",
      base: "#f59e0b",
    },
    {
      _id: 9005,
      title: "Blue",
      base: "#3b82f6",
    },
  ];

  return (
    <div>
      <div
        onClick={() => setShowColors(!showColors)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Color" icons={true} Colors={showColors} />
      </div>

      <span
        className={` ${
          colorName === null
            ? "border-b-primary font-semibold text-primary"
            : ""
        } my-5 flex w-full cursor-pointer items-center gap-2 border-b-[1px] border-b-[#F0F0F0] pb-2 capitalize duration-300 hover:border-gray-400 hover:text-primeColor`}
        onClick={handleRemoveColor}
      >
        All Color
      </span>
      {showColors && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm text-[#767676] lg:text-base">
            {colors.map((item) => (
              <li
                key={item._id}
                onClick={() => handleOnClick(item.title.toLowerCase())}
                className={`border-b-[1px] ${
                  colorName === item.title.toLowerCase()
                    ? "border-b-2 border-primary font-semibold text-primary"
                    : "border-[#F0F0F0]"
                } flex cursor-pointer items-center gap-2 pb-2`}
              >
                <span
                  style={{ background: item.base }}
                  className={`h-3 w-3 rounded-full bg-gray-500`}
                ></span>
                {item.title}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Color;
