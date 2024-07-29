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
  const { loading, productbrand, errorMessage } = useSelector(
    (state) => state.productbrand
  );

  useEffect(() => {
    dispatch(fetchProductBrand());
  }, [dispatch]);

  return (
    <div className="bg-white">
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Brand " icons={true} />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {!loading &&
              productbrand &&
              productbrand?.map((item) => (
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

export default Brand;
