import React, { useState, useEffect } from "react";
import NavTitle from "./NavTitle";
import { useCurrency } from "../../../Currency/CurrencyProvider/CurrencyProvider";
import { useSearchParams } from "react-router-dom";

const Price = ({ handlefilterShow }) => {
  const { currentCurrency } = useCurrency();
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 0,
  });
  const [isOkDisabled, setIsOkDisabled] = useState(true);

  const handleOnChange = (e) => {
    setPriceRange({
      ...priceRange,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if ( parseInt(priceRange.min) ==  parseInt(priceRange.max) ||  parseInt(priceRange.min) >  parseInt(priceRange.max)) {
      setIsOkDisabled(true);
    } else {
      setIsOkDisabled(false);
    }
  }, [priceRange , priceRange.min , priceRange.max]);


  const handleSubmit = (e) => {
    e.preventDefault();
    searchParams.set(`price[gte]`,priceRange.min);
    searchParams.set("price[lte]=", priceRange.max);
    setSearchParams(searchParams);
  };
  // http://localhost:3000/shop/?productClass=6655a5cade2c788b8f520e81&price[gte]=50000

  return (
    <div className="cursor-pointer">
      <NavTitle title="Shop by Price" icons={true} />
      <div className="font-titleFont">
        <form class="w-full max-w-lg" onSubmit={handleSubmit}>
          <div class=" mdl:flex mdl:gap-4 mdl:items-end space-y-2 ">
            <div class="md:w-1/2 mb-6 md:mb-0">
              <label
                class="block tracking-wide text-gray-700 text-xs font-semibold mb-2"
                for="grid-first-name"
              >
                Min ({currentCurrency})
              </label>
              <input
                class="appearance-none  w-full bg-white text-gray-700 border border-gray-200  rounded py-2 px-4 leading-tight focus:outline-none placeholder:text-[#C4C4C4]"
                id="grid-first-name"
                type="number"
                defaultValue={0}
                placeholder="Min"
                name="min"
                value={priceRange.min}
                min={0}
                onChange={handleOnChange}
              />
            </div>
            <div class=" md:w-1/2">
              <label
                class="block tracking-wide text-gray-700 text-xs font-semibold mb-2"
                for="grid-last-name"
              >
                Max ({currentCurrency})
              </label>
              <input
                class="appearance-none  w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight placeholder:text-[#C4C4C4]"
                id="grid-last-name"
                type="number"
                placeholder="Max"
                onChange={handleOnChange}
                defaultValue={0}
                name="max"
                min={1}
                value={priceRange.max}
              />
            </div>
            <button
              type="submit"
              disabled={ isOkDisabled }
              class="shadow bg-[#1D6F2B]   focus:shadow-outline focus:outline-none !focus:border-[#1D6F2B] text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
              // onClick={() => handlefilterShow()}
            >
              Ok
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Price;
