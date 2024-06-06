import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavTitle from "../shopBy/NavTitle";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProductBrand } from "../../../../dashboard/Redux/ReduxSlice/ProductBrand.slice";
import { useDispatch } from "react-redux";
import { fetchProductclass } from "../../../../dashboard/Redux/ReduxSlice/ProductClass";
const ProductBrandAccordion = ({ brands, handlefilterShow }) => {
  const [showBrand, setShowBrand] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const categoryId = searchParams.get("category");
  const subcategoryId = searchParams.get("subCategory");
  const productclassId = searchParams.get("productClass");
  const handleOnClickBrand = (brand) => {
    searchParams.set("brand", brand.id);
    setSearchParams(searchParams);
  };

  const {
    loading: productclassLoading,
    productclass: productclassData,
    errorMessage: productclassError,
  } = useSelector((state) => state.productclass);

  //   get categories from productclass
  const proctclassfilter = productclassData?.filter(
    (item) => item.id === productclassId
  );

  useEffect(() => {
    dispatch(fetchProductclass());
  }, [dispatch]);

  return (
    <div className=" text-sm bg-slate-100 border-2 py-1 rounded-md px-2 z-50   shadow-md ">
      <div
        onClick={() => setShowBrand(!showBrand)}
        className="cursor-pointer h-6"
      >
        <NavTitle title="Brands" icons={true} classname={""} />
      </div>
      {showBrand && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm  text-[#767676]">
            {!productclassLoading &&
              proctclassfilter &&
              proctclassfilter[0]?.brands?.map((item) => (
                <li
                  key={item.id}
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

export default ProductBrandAccordion;
