import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import MenuIcon from '../../assets/images/menu.png';
import MenuIconWhite from '../../assets/images/menu-white.png';
import { FaSearch } from 'react-icons/fa';
import Flex from '../designLayouts/Flex';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { paginationItems } from '../../constants';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef();
  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if (ref.current !== null && ref.current.contains(e.target) === false) {
        return setShowCategories(false);
      }
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const { products } = useSelector((state) => state.product);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoriesMenuClick = () => {
    return setShowCategories(!showCategories);
  };

  let prod =
    (products &&
      products.length > 0 &&
      products.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )) ||
    [];

  useEffect(() => {
    const filtered = paginationItems.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(prod);
  }, [searchQuery]);

  return (
    // <div className="hidden md:block w-full bg-[#F5F5F3] relative">
    <div className='hidden md:block w-full relative  '>
      <div className='max-w-container mx-auto'>
        <Flex className='flex pt-5  lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24'>
          <div
            onClick={() => handleCategoriesMenuClick()}
            ref={ref}
            className={
              'relative  border-box cursor-pointer items-center gap-2 text-[#1D6F2B] '
            }
          >
            <div
              className={`lg:hidden flex py-4 px-6 items-center gap-2 rounded-md ${
                // showCategories ? `bg-[#1D6F2B] text-white` : ""
                showCategories ? `bg-[black] text-white` : ''
              }`}
            >
              <img
                src={showCategories ? MenuIconWhite : MenuIcon}
                className='w-5 h-5'
              />
              <p className='text-[14px] font-semibold'>Categories</p>
            </div>

            {showCategories && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='absolute top-14 z-50 bg-[#FFF] min-w-[200px] text-[#1D6F2B] h-auto p-4 pb-6 border-[2px] rounded-md'
              >
                <li className='text-[#000] px-4 py-1 border-b-[1px] border-b-[#fff] hover:border-b-[#1D6F2B] hover:text-[#000] duration-300 cursor-pointer'>
                  Accessories
                </li>
                <li className='text-[#000] px-4 py-1 border-b-[1px] border-b-[#fff] hover:border-b-[#1D6F2B] hover:text-[#000] duration-300 cursor-pointer'>
                  Furniture
                </li>
                <li className='text-[#000] px-4 py-1 border-b-[1px] border-b-[#fff] hover:border-b-[#1D6F2B] hover:text-[#000] duration-300 cursor-pointer'>
                  Electronics
                </li>
                <li className='text-[#000] px-4 py-1 border-b-[1px] border-b-[#fff] hover:border-b-[#1D6F2B] hover:text-[#000] duration-300 cursor-pointer'>
                  Clothes
                </li>
                <li className='text-[#000] px-4 py-1 border-b-[1px] border-b-[#fff] hover:border-b-[#1D6F2B] hover:text-[#000] duration-300 cursor-pointer'>
                  Bags
                </li>
                <li className='text-[#000] px-4 py-1 border-b-[1px] border-b-[#fff] hover:border-b-[#1D6F2B] hover:text-[#000] duration-300 cursor-pointer'>
                  Home appliances
                </li>
              </motion.ul>
            )}
          </div>
          <div className='relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl border-[2px]'>
            <input
              className='flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px] border-none'
              type='text'
              onChange={handleSearch}
              value={searchQuery}
              placeholder='Search your products here'
            />
            <FaSearch className='w-5 h-5 ' />
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
              >
                {searchQuery &&
                  filteredProducts.map((item) => (
                    <div
                      onClick={() => {
                        navigate(`/products/${item.id}`);

                        setShowSearchBar(true);
                        setSearchQuery('');
                      }}
                      key={item.id}
                      className='max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3'
                    >
                      <img
                        className='w-24'
                        src={item?.productImages?.productThumbnail?.url}
                        alt='productImg'
                      />
                      <div className='flex flex-col gap-1'>
                        <p className='font-semibold text-lg'>{item.name}</p>
                        <p className='text-xs'>{item.description}</p>
                        <p className='text-sm'>
                          Price:{' '}
                          <span className='text-primeColor font-semibold'>
                            {/* ${item.price} */}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className='flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative'></div>
        </Flex>
      </div>
    </div>
  );
};

export default SearchBar;
