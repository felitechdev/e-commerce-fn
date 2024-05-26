import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavTitle from "../shopBy/NavTitle";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProductBrand } from "../../../../dashboard/Redux/ReduxSlice/ProductBrand.slice";
import { useDispatch } from "react-redux";
import { fetchProductclass } from "../../../../dashboard/Redux/ReduxSlice/ProductClass";
const ProductClassAccordion = ({ brands, handlefilterShow }) => {
  const [showBrands, setShowBrands] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  // const handleOnClickBrand = (productclass) => {
  //   searchParams.set("productClass", productclass.id);
  //   setSearchParams(searchParams);
  // };

  const handleOnClickBrand = (productclass) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("productClass", productclass.id);
    setSearchParams(newSearchParams);
  };

  const {
    loading: productclassLoading,
    productclass: productclassData,
    errorMessage: productclassError,
  } = useSelector((state) => state.productclass);

  useEffect(() => {
    dispatch(fetchProductclass());
  }, [dispatch]);

  console.log("showBrands", showBrands);

  return (
    <div className=" text-sm bg-slate-200 px-2 z-50   shadow-md">
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer h-6 "
      >
        <NavTitle title="ProductClass " icons={true} classname={""} />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm  text-[#767676]">
            {!productclassLoading &&
              productclassData &&
              productclassData?.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    handleOnClickBrand(item);
                  }}
                  className="border-b-[1px] capitalize border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300 cursor-pointer"
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

export default ProductClassAccordion;
