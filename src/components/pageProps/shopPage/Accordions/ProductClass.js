import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavTitle from "../shopBy/NavTitle";
import { useSelector } from "react-redux";
import { useSearchParams, Link } from "react-router-dom";
import { fetchProductBrand } from "../../../../dashboard/Redux/ReduxSlice/ProductBrand.slice";
import { useDispatch } from "react-redux";
import { fetchProductclass } from "../../../../dashboard/Redux/ReduxSlice/ProductClass";
const ProductClassAccordion = (props) => {
  const [showBrands, setShowBrands] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [clickCount, setClickCount] = useState(0);
  const [selectedProductClass, setSelectedProductClass] = useState(null);
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

  const categoryId = searchParams.get("productClass");

  const handleOnClickBrand2 = (productclass) => {
    setClickCount(clickCount + 1);
    // if (clickCount === 0) {
    //   setSelectedProductClass(productclass.id);
    //   setClickCount(1);
    //   // Update props here
    // } else if (clickCount === 1 && productclass.id === selectedProductClass) {
    //   const newSearchParams = new URLSearchParams();
    //   newSearchParams.set("productClass", productclass.id);
    //   setSearchParams(newSearchParams);
    //   // Navigate to new page
    //   props.history.push(`/shop/?productClass=${productclass.id}`);
    // }
  };

  const {
    loading: productclassLoading,
    productclass: productclassData,
    errorMessage: productclassError,
  } = useSelector((state) => state.productclass);

  useEffect(() => {
    dispatch(fetchProductclass());
  }, [dispatch]);

  return (
    <div className=" text-sm bg-slate-100 border-2 py-2 rounded-md px-2 z-50   shadow-md">
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer h-6 "
      >
        <NavTitle title="Category1 " icons={true} classname={""} />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm  py-2  text-[#767676]">
            {!productclassLoading &&
              productclassData &&
              productclassData?.map((item) =>
                props.ismobile == false ? (
                  <li
                    key={item}
                    onClick={() => {
                      handleOnClickBrand(item);
                    }}
                    className={`border-b-[1px] capitalize border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300 cursor-pointer
                      
                      

                      ${
                        item.id === categoryId
                          ? " border-b-primary text-primary font-semibold"
                          : ""
                      }
                      
                      
                      `}
                  >
                    {item.name}
                  </li>
                ) : (
                  <>
                    {clickCount < 1 && (
                      <li
                        key={item}
                        onClick={() => {
                          handleOnClickBrand2(item);
                        }}
                        className={`border-b-[1px] capitalize border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300 cursor-pointer
                          
                          
                          ${
                            item.id === categoryId
                              ? " border-b-primary text-primary font-semibold"
                              : ""
                          }
                          
                          
                          `}
                      >
                        {" "}
                        {item.name}
                      </li>
                    )}

                    {clickCount >= 1 && (
                      <Link
                        to={`/shop/?productClass=${item.id}`}
                        className={`border-b-[1px] capitalize  border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300 cursor-pointer ${
                          item.id === categoryId
                            ? " border-b-primary text-primary font-semibold"
                            : ""
                        }`}
                        onClick={() => {
                          if (props.ismobile && props.isSidebar)
                            props.setSidenav(false);
                        }}
                      >
                        {item.name}
                      </Link>
                    )}
                  </>
                )
              )}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default ProductClassAccordion;
