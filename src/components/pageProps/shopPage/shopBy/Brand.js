import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavTitle from './NavTitle';
import { useSearchParams } from 'react-router-dom';

const Brand = ({ brands }) => {
  const [showBrands, setShowBrands] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnClickBrand = (brandName) => {
    searchParams.set('brandName', brandName);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <div
        onClick={() => setShowBrands(!showBrands)}
        className='cursor-pointer'
      >
        <NavTitle title='Shop by Brand' icons={true} />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className='flex flex-col gap-4 text-sm lg:text-base text-[#767676]'>
            {brands?.map((item) => (
              <li
                key={item}
                onClick={() => handleOnClickBrand(item)}
                className='border-b-[1px] capitalize border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300 cursor-pointer'
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Brand;
