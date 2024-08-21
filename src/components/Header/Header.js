import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa6";
import { motion } from "framer-motion";
import {
  FeliTechLogo_transparent,
  FeliTechWhiteLogo,
} from "../../assets/images";
import { MdLogout } from "react-icons/md";
import axios from "axios";
import { leftNavBarList } from "../../constants";
import { FiHeart } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import UserAvatarDropdown from "./UserAvatarDropdown";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Search } from "../Search/Search";
import { useCurrency } from "../Currency/CurrencyProvider/CurrencyProvider";
import Image from "../designLayouts/Image";
import { useUser } from "../../context/UserContex";
import SearchBar from "./SearchBar";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { MobileCategoryNav } from "../ProductsCategories";
import ProductClassAccordion from "../pageProps/shopPage/Accordions/ProductClass";
import ProductCategoryAccordion from "../pageProps/shopPage/Accordions/productCategory";
import ProductSubCategoryAccordion from "../pageProps/shopPage/Accordions/ProductSubCategory";
import ProductBrandAccordion from "../pageProps/shopPage/Accordions/productBrand";

// let cart = JSON.parse(localStorage.getItem("cart"));

export async function fetchCategories() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/categories`
    );

    return response.data.data.categories;
  } catch (error) {
    throw new Error("Error fetching categories");
  }
}

const Header = (props) => {
  // Get Logged in user
  const { user, onLogout } = useUser();
  const navigate = useNavigate();
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const [search, setSearch] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();
  const categoryId = searchParams.get("category");

  const {
    fromCurrency,
    toCurrency,
    setFromCurrency,
    setToCurrency,
    currentCurrency,
    handleSetCurrenctCurrency,
    currencies,
  } = useCurrency();

  const cart = useSelector((state) => state.cart);

  const cartTotal = cart.reduce((total, product) => total + product.items, 0);
  const wishlist = useSelector((state) => state.wishlist);

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;

    // Assuming you want to toggle between "From" and "To" currencies
    if (fromCurrency === selectedCurrency) {
      setFromCurrency(toCurrency);
      setToCurrency(selectedCurrency);
    } else {
      setToCurrency(selectedCurrency);
      setFromCurrency(fromCurrency);
    }
  };

  const handleSignOut = () => {
    onLogout();
    navigate("/", { replace: true });
  };

  // implementation of  Shop by Category

  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  let headerIconStyles =
    "inline-block lg:hover:text-[#1D6F2B] lg:hover:bg-[#E5E5E5] lg:hover:rounded-full py-2.5 px-2";
  return (
    <div className="w-full h-100px bg-white sticky top-0  z-50 border-b-[1px] border-b-gray-200">
      <div className="flex justify-end px-4 bg-[white] text-black py-1 md:hidden border-b-[1px] border-b-gray-200">
        <ul className="flex items-center md:max-w-[320px] lg:max-w-[400px] z-50 p-0 gap-1">
          <div className="">
            {" "}
            <Link to="/">
              <Image className=" " imgSrc={FeliTechLogo_transparent} />
            </Link>
          </div>
          <li className="">
            <span className="text-[#1D6F2B] hover:text-[#1D6F2B] mr-0 font-light  inline-block">
              <select
                value={currentCurrency}
                onChange={(e) => handleSetCurrenctCurrency(e.target.value)}
                className="p-1 bg-gray-50 border-gray-200 text-gray-700 rounded text-xs"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </span>
          </li>

          <li className="mr-3 lg:mx-6 relative ">
            <NavLink
              className={({ isActive }) => {
                return isActive
                  ? "text-[red]   font-light  align-middle"
                  : " font-light  align-middle";
              }}
              to="/wishlist/"
              state={{
                data: location.pathname.split("/")[1],
              }}
            >
              <FiHeart
                className="lg:hover:text-[#1D6F2B] lg:hover:bg-[#E5E5E5] lg:hover:rounded-full py-1.5 px-2.5"
                size={40}
              />
              {
                <p className="absolute -ml-4 mt-1 -top-1 -right-2 z-1 bg-[#1D6F2B] text-white text-[12px] w-6 h-6 rounded-full  flex justify-center items-center  font-bold  border-[0.5px] border-[#fff]">
                  {wishlist.length}
                </p>
              }
            </NavLink>
          </li>

          <li className="relative  ">
            <NavLink
              className={({ isActive }) => {
                return isActive
                  ? "text-[#1D6F2B] bg-white py-1 rounded hover:text-[#1D6F2B]  font-bold align-middle"
                  : "hover:text-[#1D6F2B]  font-bold align-middle";
              }}
              to="/cart"
              state={{
                data: location.pathname.split("/")[1],
              }}
            >
              <BsCart3 className={headerIconStyles} size={40} />
              {
                <p className="absolute -ml-4 mt-1 -top-1 -right-2 z-1 bg-[#1D6F2B] text-white text-[12px] w-6 h-6 rounded-md  flex justify-center items-center  font-bold  border-[0.5px] border-[#fff]">
                  {cartTotal}
                </p>
              }
            </NavLink>
          </li>

          <li className="ml-3">
            {" "}
            {user ? (
              <UserAvatarDropdown
                ismobileview={true}
                userInfo={user}
                isUser={true}
                logOut={onLogout}
              />
            ) : (
              <UserAvatarDropdown ismobileview={true} isUser={false} />
            )}
          </li>
        </ul>
      </div>

      <nav className="h-full px-4 max-w-container mx-auto relative gap-6 flex items-center md:items-center md:justify-between">
        <div className="flex space-x-5 ml-0">
          <div className=" hidden md:inline-block">
            {" "}
            <Link to="/">
              <div className=" ">
                <Image
                  className=" h-[100px] w-[250px] "
                  imgSrc={FeliTechLogo_transparent}
                />
              </div>
            </Link>
          </div>

          <div className="md:hidden !my-2 !m-auto">
            <SearchBar ismobileview={true} />
          </div>

          <ul className="flex items-center w-auto z-50 p-0 gap-3">
            {/* <li>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return isActive
                    ? "w-full text-[#1D6F2B] lg:hover:text-[#1D6F2B] font-bold lg:hover:bg-[#E5E5E5] lg:hover:rounded-md    hidden md:inline-block lg:py-1 lg:px-2"
                    : "w-full lg:hover:text-[#1D6F2B] font-bold lg:hover:bg-[#E5E5E5] lg:hover:rounded-md     hidden md:inline-block lg:py-1 lg:px-2";
                }}
              >
                Home
              </NavLink>
            </li> */}
          </ul>

          {search && (
            <div className="absolute top-0 w-full h-screen  bg-[#000000a3] p-3 z-20 flex gap-2">
              <Search />

              <FaTimes
                className="w-[3rem] h-[3rem] cursor-pointer   rounded-full border border-gray p-2"
                onClick={() => setSearch(false)}
              />
            </div>
          )}

          {/* <div className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-10">
            <FaSearch onClick={() => setSearch(true)} className="w-5 h-5" />
          </div> */}
          <HiMenuAlt2
            onClick={() => setSidenav(!sidenav)}
            className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
          />
          {sidenav && (
            <div
              className="fixed top-0 right-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 overflow-auto"
              style={{
                zIndex: 3000,
              }}
              onMouseMove={(e) => {
                e.stopPropagation();
              }}
              onMouseOver={(e) => {
                e.stopPropagation();
              }}
              onMouseEnter={(e) => {
                e.stopPropagation();
              }}
            >
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-[80%] h-full relative"
              >
                <div
                  className="w-full  h-full bg-primary ml-0 p-6 overflow-auto "
                  style={{
                    zIndex: 3000,
                  }}
                >
                  <img
                    className="w-40 mb-6 "
                    src={FeliTechWhiteLogo}
                    alt="logoLight"
                  />
                  <ul className="text-gray-200 flex flex-col gap-2">
                    {leftNavBarList.map((item) => (
                      <li
                        className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                        key={item._id}
                      >
                        <NavLink
                          to={item.link}
                          state={{
                            data: location.pathname.split("/")[1],
                          }}
                          onClick={() => setSidenav(false)}
                        >
                          {item.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`mt-4 bg-[#1D6F2B]  overflow-auto
                       ${
                         // categoryId  ? "hidden" : "blocks"
                         ""
                       }
                       
                    `}
                    onMouseMove={(e) => {
                      e.stopPropagation();
                    }}
                    onMouseOver={(e) => {
                      e.stopPropagation();
                    }}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <h1
                      onClick={() => setCategory(!category)}
                      className="flex justify-between text-base cursor-pointer items-center font-titleFont mb-2"
                    >
                      Shop by Category{" "}
                      <span className="text-lg">{category ? "-" : "+"}</span>
                    </h1>
                    {category && !isLoading && (
                      <motion.ul
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-sm flex flex-col gap-1"
                      >
                        <div className="flex-col w-full space-y-2  overflow-auto mdl:overflow-hidden ">
                          {" "}
                          <div className=" z-0 ">
                            <ProductClassAccordion ismobile={true} />
                          </div>
                          <div className="z-0">
                            <ProductCategoryAccordion ismobile={true} />
                          </div>
                          {categoryId && (
                            <div className="z-0">
                              <ProductSubCategoryAccordion ismobile={true} />
                            </div>
                          )}
                          <div className="z-0 ">
                            <ProductBrandAccordion ismobile={true} />
                          </div>
                        </div>
                      </motion.ul>
                    )}
                  </div>
                </div>
                <span
                  onClick={() => setSidenav(false)}
                  className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                >
                  <MdClose />
                </span>
              </motion.div>
            </div>
          )}
        </div>

        <SearchBar />

        <div className="hidden md:block">
          <ul className="flex items-center md:max-w-[320px] lg:max-w-[400px] z-50 p-0 gap-2">
            <li>
              <span className="text-[#1D6F2B] hover:text-[#1D6F2B] mr-6 font-light hidden md:inline-block">
                <select
                  value={currentCurrency}
                  onChange={(e) => handleSetCurrenctCurrency(e.target.value)}
                  className="p-1 bg-gray-50 border-gray-200 text-gray-700 rounded text-xs"
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </span>
            </li>

            {user ? (
              ""
            ) : (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return isActive
                        ? "w-full text-[#1D6F2B] text-[14px] lg:hover:text-[#1D6F2B] lg:hover:bg-[#E5E5E5] lg:hover:rounded-md   font-bold  md:inline-block lg:py-1 lg:px-2 text-center"
                        : "w-full lg:hover:text-[#1D6F2B] text-[14px] lg:hover:bg-[#E5E5E5] lg:hover:rounded-md    font-bold  md:inline-block lg:py-1 lg:px-2 text-center";
                    }}
                    to="/signin"
                  >
                    Sign in
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return isActive
                        ? "w-full text-white bg-[#1D6F2B] text-[14px] px-2 py-1 rounded-md lg:hover:text-[#1D6F2B] lg:hover:bg-[#E5E5E5] font-bold  md:inline-block lg:py-1 lg:px-2 text-center"
                        : "w-full lg:hover:text-[#1D6F2B] text-[14px] text-white bg-[#1D6F2B] px-2 py-1 rounded-md lg:hover:bg-[#E5E5E5]  font-bold  md:inline-block lg:py-1 lg:px-2 text-center";
                    }}
                    to="/signup"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
            {user ? <></> : ""}
            <li className="ml-2 lg:ml-6 relative">
              <NavLink
                className={({ isActive }) => {
                  return isActive
                    ? "text-[#1D6F2B]   font-light hidden md:inline-block align-middle"
                    : " font-light hidden md:inline-block align-middle";
                }}
                to="/wishlist/"
                state={{
                  data: location.pathname.split("/")[1],
                }}
              >
                <FiHeart
                  className="lg:hover:text-[#1D6F2B] lg:hover:bg-[#E5E5E5] lg:hover:rounded-full py-1.5 px-2.5"
                  size={40}
                />
                {
                  <p className="absolute -ml-4 mt-1 -top-1 -right-2 z-1 bg-[#1D6F2B] text-white text-[12px] w-6 h-6 rounded-full  flex justify-center items-center  font-bold  border-[0.5px] border-[#fff]">
                    {wishlist.length}
                  </p>
                }
              </NavLink>
            </li>
            <li className="relative  ">
              <NavLink
                className={({ isActive }) => {
                  return isActive
                    ? "text-[#1D6F2B] hover:text-[#1D6F2B] font-semibold align-middle"
                    : "hover:text-[#1D6F2B] font-semibold align-middle";
                }}
                to="/cart"
                state={{
                  data: location.pathname.split("/")[1],
                }}
              >
                <BsCart3 className={headerIconStyles} size={40} />
                {
                  <p className="absolute -ml-4 mt-1 -top-1 -right-2 z-1 bg-[#1D6F2B] text-white text-[12px] w-6 h-6 rounded-full  flex justify-center items-center  font-bold  border-[0.5px] border-[#fff]">
                    {cartTotal}
                  </p>
                }
              </NavLink>
            </li>

            {user ? (
              <UserAvatarDropdown userInfo={user} logOut={onLogout} />
            ) : (
              ""
            )}
          </ul>

          <HiMenuAlt2
            onClick={() => setSidenav(!sidenav)}
            className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
          />
          {sidenav && (
            <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-[80%] h-full relative"
              >
                <div className="w-full h-full bg-[#1D6F2B] p-6">
                  <img
                    className="w-28 mb-6"
                    src={FeliTechWhiteLogo}
                    alt="logoLight"
                  />
                  <ul className="text-gray-200 flex flex-col gap-2">
                    <li className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0">
                      <Link to="/" onClick={() => setSidenav(false)}>
                        {"Home"}
                      </Link>
                    </li>
                    <li className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0">
                      <Link
                        to="/shop"
                        state={{
                          data: location.pathname.split("/")[1],
                        }}
                        onClick={() => setSidenav(false)}
                      >
                        {"Shop"}
                      </Link>
                    </li>
                    <li className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0">
                      <Link
                        to="/about"
                        state={{
                          data: location.pathname.split("/")[1],
                        }}
                        onClick={() => setSidenav(false)}
                      >
                        {"About"}
                      </Link>
                    </li>
                  </ul>
                  <div className="mt-4 bg-[#1D6F2B]">
                    <h1
                      onClick={() => setCategory(!category)}
                      className="flex justify-between text-base cursor-pointer items-center font-titleFont mb-2"
                    >
                      Shop by Category{" "}
                      <span className="text-lg">{category ? "-" : "+"}</span>
                    </h1>
                    {category && (
                      <motion.ul
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-sm flex flex-col gap-1"
                      >
                        <li className="headerSedenavLi">New Arrivals</li>
                        <li className="headerSedenavLi">Gudgets</li>
                        <li className="headerSedenavLi">Accessories</li>
                        <li className="headerSedenavLi">Electronics</li>
                        <li className="headerSedenavLi">Others</li>
                      </motion.ul>
                    )}
                  </div>
                  <div className="mt-4">
                    <h1
                      onClick={() => setBrand(!brand)}
                      className="flex justify-between text-base cursor-pointer items-center font-titleFont mb-2"
                    >
                      Shop by Brand
                      <span className="text-lg">{brand ? "-" : "+"}</span>
                    </h1>
                    {brand && (
                      <motion.ul
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-sm flex flex-col gap-1"
                      >
                        <li className="headerSedenavLi">New Arrivals</li>
                        <li className="headerSedenavLi">Gudgets</li>
                        <li className="headerSedenavLi">Accessories</li>
                        <li className="headerSedenavLi">Electronics</li>
                        <li className="headerSedenavLi">Others</li>
                      </motion.ul>
                    )}
                  </div>
                </div>
                <span
                  onClick={() => setSidenav(false)}
                  className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                >
                  <MdClose />
                </span>
              </motion.div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
