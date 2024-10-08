import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavTitle from './NavTitle';
import { useSearchParams } from 'react-router-dom';

const Color = () => {
  const [showColors, setShowColors] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnClick = (colorName) => {
    searchParams.set(
      'colorMeasurementVariations.variations.colorImg.colorName',
      colorName
    );
    setSearchParams(searchParams);
  };

  const colors = [
    {
      _id: 9001,
      title: 'Green',
      base: '#22c55e',
    },
    {
      _id: 9002,
      title: 'Gray',
      base: '#a3a3a3',
    },
    {
      _id: 9003,
      title: 'Red',
      base: '#dc2626',
    },
    {
      _id: 9004,
      title: 'Yellow',
      base: '#f59e0b',
    },
    {
      _id: 9005,
      title: 'Blue',
      base: '#3b82f6',
    },
  ];

  return (
    <div>
      <div
        onClick={() => setShowColors(!showColors)}
        className='cursor-pointer'
      >
        <NavTitle title='Shop by Color' icons={true} showBrands={showColors} />
      </div>
      {showColors && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className='flex flex-col gap-4 text-sm lg:text-base text-[#767676]'>
            {colors.map((item) => (
              <li
                key={item._id}
                onClick={() =>
                  handleOnClick(item.title.toLowerCase())
                }
                className='border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 cursor-pointer'
              >
                <span
                  style={{ background: item.base }}
                  className={`w-3 h-3 bg-gray-500 rounded-full`}
                ></span>
                {item.title}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Color;
