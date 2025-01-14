import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import MenuIcon from "../../assets/images/menu.png";
import MenuIconWhite from "../../assets/images/menu-white.png";
import { FaSearch } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import Flex from "../designLayouts/Flex";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import HomePageCategories from "../homePageCategories/HomePageCategories";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../ProductsCategories";
import DisplayCurrency from "../Currency/DisplayCurrency/DisplayCurrency";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";

export async function searchproduct(name) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/search?name=${name}&fields=name,price,seller,discountPercentage,createdAt,colorMeasurementVariations,hasColors,hasMeasurements,productImages.productThumbnail.url`,
    );

    return response.data.data.products;
  } catch (error) {
    return [];
  }
}

const SearchBar = ({ ismobileview }) => {
  // const { data: products } = useQuery({
  //   queryKey: ["products-search"],
  //   queryFn: ({ pageParam = 1 }) => {
  //     return fetchProducts(pageParam);
  //   },
  // });

  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef();

  // useEffect(() => {
  //   document.body.addEventListener('click', (e) => {
  //     if (
  //       ref?.current !== null &&
  //       ref?.current.contains(e.target) === false
  //     ) {
  //       return setShowCategories(false);
  //     }
  //   });
  // }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoriesMenuClick = () => {
    return setShowCategories(!showCategories);
  };

  // useEffect(() => {
  //   const filtered = products?.filter((item) =>
  //     item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setFilteredProducts(filtered);
  // }, [products, searchQuery]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchproduct(searchQuery).then((data) => {
        setFilteredProducts(data);
      });
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  return (
    <div
      className={` ${
        ismobileview ? " w-[300px] " : "hidden w-[35%]   rounded-md md:block"
      }`}
    >
      <div className="relative m-auto flex h-[35px] w-full items-center justify-between gap-2 rounded-md p-0 text-sm text-primeColor md:h-[35px] lg:w-[100%]">
        <input
          className="p-3 !md:w-[95%] mr-3 h-full !w-[100%] flex-1 rounded-full border-gray-400 text-sm outline-none placeholder:text-[14px] placeholder:text-[#C4C4C4]"
          type="text"
          onChange={handleSearch}
          value={searchQuery}
          placeholder=" What are you looking for?"
        />
        {!searchQuery ? (
          <div className="absolute right-0 flex h-full w-20 items-center justify-center rounded-r-full bg-primary md:w-20">
            <CiSearch size={20} className="text-white" />
          </div>
        ) : (
          <div className="absolute right-0 flex h-full w-20 items-center justify-center rounded-r-full bg-primary md:w-20">
            <RxCross2
              size={20}
              className="text-white"
              onClick={() => setSearchQuery("")}
            />
          </div>
        )}

        {searchQuery && (
          <div
            className={`scrollbar-hide absolute left-0 top-16 z-50 mx-auto h-96 w-full cursor-pointer overflow-y-scroll bg-white shadow-2xl`}
          >
            {searchQuery &&
              filteredProducts.map((item) => (
                <div
                  onClick={() => {
                    navigate(`/products/${item.id}`);

                    setShowSearchBar(true);
                    setSearchQuery("");
                  }}
                  key={item.id}
                  className="mb-3 flex w-full items-start gap-3 break-words bg-gray-100 px-2"
                >
                  <img
                    className="h-24 w-24 rounded-md border object-fill"
                    src={item?.productImages?.productThumbnail?.url}
                    alt=""
                  />
                  <div className="flex flex-col gap-1 overflow-auto">
                    <p className="md:text-md text-sm font-medium">
                      {item.name.length > 80
                        ? item.name.slice(0, 80) + "..."
                        : item.name}
                    </p>
                    <p
                      className="overflow-auto break-words text-xs"
                      dangerouslySetInnerHTML={{
                        __html: item?.description?.slice(0, 80),
                      }}
                    ></p>
                    <p className="flex text-sm">
                      Price:{" "}
                      {/* <span className="text-primeColor font-semibold">
                            {item.currency} {item.price}
                          </span> */}
                      <div>
                        {item.discountPercentage <= 0 && (
                          <div className="font-semibold text-[#1D6F2B]">
                            <DisplayCurrency product={item} isDiscount={true} />
                          </div>
                        )}
                        {item.discountPercentage > 0 && (
                          <>
                            <div className="font-semibold text-[#1D6F2B]">
                              <DisplayCurrency
                                product={item}
                                isDiscount={true}
                              />
                            </div>

                            <div className="font-semibold text-[#00000080] line-through">
                              <DisplayCurrency
                                product={item}
                                isDiscount={false}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
