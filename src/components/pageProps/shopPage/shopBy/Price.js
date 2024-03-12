import React, { useState } from 'react';
import NavTitle from './NavTitle';
import { useCurrency } from '../../../Currency/CurrencyProvider/CurrencyProvider';
import { useSearchParams } from 'react-router-dom';

const Price = () => {
  const { currentCurrency } = useCurrency();
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: null,
  });

  const handleOnChange = (e) => {
    setPriceRange({
      ...priceRange,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchParams.set('price[gte]', priceRange.min);
    searchParams.set('price[lte]', priceRange.max);
    setSearchParams(searchParams);
  };

  return (
    <div className='cursor-pointer'>
      <NavTitle title='Shop by Price' icons={false} />
      <div className='font-titleFont'>
        <form class='w-full max-w-lg' onSubmit={handleSubmit}>
          <div class='flex gap-4 items-end'>
            <div class='md:w-1/2 mb-6 md:mb-0'>
              <label
                class='block tracking-wide text-gray-700 text-xs font-bold mb-2'
                for='grid-first-name'
              >
                Min ({currentCurrency})
              </label>
              <input
                class='appearance-none  w-full bg-white text-gray-700 border border-gray-200  rounded py-2 px-4 leading-tight focus:outline-none placeholder:text-[#C4C4C4]'
                id='grid-first-name'
                type='number'
                placeholder='Min'
                name='min'
                value={priceRange.min}
                min={0}
                onChange={handleOnChange}
              />
            </div>
            <div class=' md:w-1/2'>
              <label
                class='block tracking-wide text-gray-700 text-xs font-bold mb-2'
                for='grid-last-name'
              >
                Max ({currentCurrency})
              </label>
              <input
                class='appearance-none  w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight placeholder:text-[#C4C4C4]'
                id='grid-last-name'
                type='number'
                placeholder='Max'
                onChange={handleOnChange}
                name='max'
                min={1}
                value={priceRange.max}
              />
            </div>
            <button class='shadow bg-[#1D6F2B]  hover:bg-[#1d6f2ba4] focus:shadow-outline focus:outline-none !focus:border-[#1D6F2B] text-white font-bold py-2 px-4 rounded'>
              Ok
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Price;
