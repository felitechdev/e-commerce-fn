import React, { useState, useEffect } from "react";
import NavTitle from "./NavTitle";
import { useCurrency } from "../../../Currency/CurrencyProvider/CurrencyProvider";
import { useSearchParams } from "react-router-dom";

const Price = ({ handlefilterShow }) => {
  const { currentCurrency } = useCurrency();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOkClicked, setIsOkClicked] = useState(false);
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 0,
  });
  const [isOkDisabled, setIsOkDisabled] = useState(true);

  const handleOnChange = (e) => {
    setIsOkClicked(false);
    setPriceRange({
      ...priceRange,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (
      parseInt(priceRange.min) == parseInt(priceRange.max) ||
      parseInt(priceRange.min) > parseInt(priceRange.max)
    ) {
      setIsOkDisabled(true);
    } else {
      setIsOkDisabled(false);
    }
  }, [priceRange, priceRange.min, priceRange.max]);

  const handleSubmit = (e) => {
    setIsOkClicked(true);
    e.preventDefault();
    searchParams.set(`price[gte]`, priceRange.min);
    searchParams.set("price[lte]=", priceRange.max);
    setSearchParams(searchParams);
  };

  const handleResetSearch = (e) => {
    setIsOkClicked(false);
    searchParams.delete(`price[gte]`, priceRange.min);
    searchParams.delete("price[lte]=", priceRange.max);
    setPriceRange({
      min: 0,
      max: 0,
    });
    console.log(searchParams);
    setSearchParams(searchParams);
  };

  // http://localhost:3000/shop/?productClass=6655a5cade2c788b8f520e81&price[gte]=50000

  return (
    <div className="cursor-pointer">
      <NavTitle title="Shop by Price" icons={false} />
      <div className="font-titleFont">
        <form class="w-full max-w-lg" onSubmit={handleSubmit}>
          <div class="space-y-2 mdl:flex mdl:items-end mdl:gap-4">
            <div class="mb-6 md:mb-0 md:w-1/2">
              <label
                class="mb-2 block text-xs font-semibold tracking-wide text-gray-700"
                for="grid-first-name"
              >
                Min ({currentCurrency})
              </label>
              <input
                class="w-full appearance-none rounded border border-gray-200 bg-white px-4 py-2 leading-tight text-gray-700 placeholder:text-[#C4C4C4] focus:outline-none"
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
            <div class="md:w-1/2">
              <label
                class="mb-2 block text-xs font-semibold tracking-wide text-gray-700"
                for="grid-last-name"
              >
                Max ({currentCurrency})
              </label>
              <input
                class="w-full appearance-none rounded border border-gray-200 bg-white px-4 py-2 leading-tight text-gray-700 placeholder:text-[#C4C4C4]"
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
            {isOkClicked ? (
              <button
                type="submit"
                disabled={isOkDisabled}
                class="focus:shadow-outline !focus:border-[#1D6F2B] rounded bg-[#d43f3f] px-4 py-2 font-semibold text-white shadow focus:outline-none disabled:opacity-50"
                onClick={() => handleResetSearch()}
              >
                X
              </button>
            ) : (
              <button
                type="submit"
                disabled={isOkDisabled}
                class="focus:shadow-outline !focus:border-[#1D6F2B] rounded bg-[#1D6F2B] px-4 py-2 font-semibold text-white shadow focus:outline-none disabled:opacity-50"
                // onClick={() => handlefilterShow()}
              >
                Ok
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Price;
