import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProductBrand } from "../../../../dashboard/Redux/ReduxSlice/ProductBrand.slice";
import { useDispatch } from "react-redux";
const Brand = ({ brands, handlefilterShow }) => {
  const [showBrands, setShowBrands] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const handleOnClickBrand = (brandName) => {
    searchParams.set("brand", brandName.id);
    setSearchParams(searchParams);
  };
  // const { loading, productbrand, errorMessage } = useSelector(
  //   (state) => state.productbrand
  // );
  const handleRemoveBrand = () => {
    searchParams.delete("brand");
    setSearchParams(searchParams);
  };
  const brandId = searchParams.get("brand");
  useEffect(() => {
    dispatch(fetchProductBrand());
  }, [dispatch]);

  return (
    <div className="bg-white">
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer"
      >
        <NavTitle
          title="Shop by Brand  "
          icons={true}
          showBrands={showBrands}
        />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {brandId !== null && (
            <span
              className={`my-2 flex w-[50%] cursor-pointer items-center gap-2 rounded-md border-b-[1px] border-b-[#F0F0F0] bg-[#d43f3f] p-2 pb-2 text-center capitalize !text-white duration-300 hover:border-gray-400`}
              onClick={handleRemoveBrand}
            >
              clear filter
            </span>
          )}
          <ul className="flex flex-col gap-4 text-sm text-[#767676] lg:text-base">
            {brands &&
              brands?.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    handleOnClickBrand(item);
                  }}
                  className={`flex cursor-pointer items-center gap-2 border-b-[1px] border-b-[#F0F0F0] pb-2 capitalize duration-300 hover:border-gray-400 hover:text-primeColor ${
                    item.id === brandId
                      ? "border-b-primary font-semibold text-primary"
                      : ""
                  } `}
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Brand;
