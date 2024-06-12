// https://staging-w5ij.onrender.com/

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavTitle from "../shopBy/NavTitle";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProductBrand } from "../../../../dashboard/Redux/ReduxSlice/ProductBrand.slice";
import { useDispatch } from "react-redux";
import { fetchProductclass } from "../../../../dashboard/Redux/ReduxSlice/ProductClass";
import axios from "axios";
export async function fetchSubCategories() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/subcategories`
    );

    return response.data?.data?.subCategories;
  } catch (error) {
    throw new Error("Error fetching categories");
  }
}
const ProductSubCategoryAccordion = ({ brands, handlefilterShow }) => {
  const [showsubCategory, setShowsubCategory] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [subcategories, setSubcategories] = useState([]);
  const dispatch = useDispatch();
  const categoryId = searchParams.get("category");
  const subcategoryId = searchParams.get("subCategory");
  const productclassId = searchParams.get("productClass");
  const handleOnClickBrand = (subcategory) => {
    searchParams.set("subCategory", subcategory?.id);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    fetchSubCategories().then((data) => {
      if (data) {
        setSubcategories(data);
      }
    });
  }, []);

  const subcategory =
    categoryId &&
    subcategories.length != null &&
    subcategories.filter((sub) => sub.category.id == categoryId);

  return (
    <div className=" text-sm bg-slate-100 border-2 py-1 rounded-md px-2 z-50   shadow-md ">
      <div
        onClick={() => setShowsubCategory(!showsubCategory)}
        className="cursor-pointer h-6"
      >
        <NavTitle title="SubCategory" icons={true} classname={""} />
      </div>
      {showsubCategory && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm  text-[#767676]">
            {categoryId &&
              subcategory.length > 0 &&
              subcategory?.map((item) => (
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

export default ProductSubCategoryAccordion;
