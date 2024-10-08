import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavTitle from "../shopBy/NavTitle";
import { useSelector } from "react-redux";
import { useSearchParams, Link } from "react-router-dom";
import { fetchProductBrand } from "../../../../dashboard/Redux/ReduxSlice/ProductBrand.slice";
import { useDispatch } from "react-redux";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";

import { fetchProductclass } from "../../../../dashboard/Redux/ReduxSlice/ProductClass";
const ProductClassAccordion = (props) => {
  const [showBrands, setShowBrands] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [clickCount, setClickCount] = useState(0);
  const [selectedProductClass, setSelectedProductClass] = useState(null);
  const [isdropdownOpen, setIsdropdownOpen] = useState(false);
  const [dropdownState, setDropdownState] = useState({}); // State to track dropdowns
  
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


  const handleOnClickCategory = (category) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("productClass", category.productClass);
    newSearchParams.set("category", category.id);
    setSearchParams(newSearchParams);
  };
  const categoryId = searchParams.get("category");
  const productClassId = searchParams.get("productClass");

  const handleOnClickBrand2 = (productclass) => {
    setClickCount(clickCount + 1);
  
  };

  const toggleDropdown = (id) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle dropdown for the specific item
    }));
  };


  const {
    loading: productclassLoading,
    productclass: productclassData,
    errorMessage: productclassError,
  } = useSelector((state) => state.productclass);

  useEffect(() => {
    dispatch(fetchProductclass());
  }, [dispatch]);

  const handleDropdown = (
e
  ) => {
    e.preventDefault();
    setIsdropdownOpen(!isdropdownOpen);

  };


  console.log("productclassData", productclassData);

  //  get brands from productclass
  useEffect(() => {
    if (productclassData && productClassId && productClassId !== "") {
    
      let pclass=   productclassData.find((item) => item.id === productClassId)

      props.setBrandOfProductClass && props.setBrandOfProductClass(pclass?.brands)
      
    }
  },[productclassData, productClassId]);




 

  return (
    <div className=" text-sm  py-2 rounded-md px-2 z-50   shadow-md">
      {/* <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer h-6 "
      >
        <NavTitle title="Category1 " icons={true} classname={""} />
      </div> */}
      {true && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm  py-2  ">
            {!productclassLoading &&
              productclassData &&
              productclassData?.map((item) =>
                props.ismobile == false ? (
                  <>
                  <li
                    key={item}
                   
                    className={`border-b-[1px] capitalize border-b-[#F0F0F0] pb-2 flex items-center justify-between gap-2 hover:text-primeColor hover:border-gray-400 duration-300 cursor-pointer
                      
                      

                      ${
                        item.id === productClassId
                          ? " border-b-primary text-primary font-semibold"
                          : ""
                      }
                      
                      
                      `}
                  >
                    <span  className=" space-x-2  flex items-center " 

                     onClick={() => {
                          handleOnClickBrand(item);
                     }}
                    
                    
                    >  <img
                      src={`${
                      item?.icon
                        ? item.icon
                        : "https://placehold.jp/80x80.png"
                      } `}
                    alt=""
                    className="h-5 w-5 object-cover"
                  />
                  <h1>  {item.name} </h1>
                   </span>
                   
                    {true &&
                    
                     dropdownState[item.id] ?
                    
                    <BiCaretUp className="text-black text-xl "  key={item.id}  onClick={(e) =>{
                      toggleDropdown(item.id)
                    }}/>:
                    
                    <BiCaretDown className="text-black text-xl "  key={item.id}

                    onClick={(e) =>{
                      toggleDropdown(item.id)
                    }}
                    
                    
                    />
                    
                    
                    }
                  </li>

                  {dropdownState[item.id] && (
                    <ul className="flex flex-col gap-4 text-sm py-2 list-disc text-[#767676] ml-2">
                      {item?.categories.map((subitem) => (
                        <li
                          key={subitem.id}
                          className={`border-b-[1px] list-disc capitalize border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300 cursor-pointer
                            ${subitem.id === categoryId ? "border-b-primary text-primary font-semibold" : ""}
                          `}
                          onClick={() => handleOnClickCategory(subitem)}
                        >
                          {subitem.name}
                        </li>
                      ))}
                    </ul>
                  )}

                  </>
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
