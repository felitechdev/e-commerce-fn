import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '../../dashboard/Components/Loader/LoadingSpin';

import './NestedList.css';

// change i made
const NestedList = ({
  onCategorySelect,
  subcategoryListClassName,
  isviewAllselected,
}) => {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const handleCategoryExpand = (index, show) => {
    setCategories((prevCategories) =>
      prevCategories.map((item, i) => ({
        ...item,
        showSubList: i === index ? show : false,
      }))
    );
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/categories`
        );

        if (response.status === 200) {
          const categories = response.data?.data?.categories.map((item) => ({
            categoryid: item.id,
            categoryname: item.name,
            showSubList: false,
            subcategories: item.subCategories,
          }));
          setCategories(categories);
        }
      } catch (error) {
        console.log('onCategorySelect error', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // disble active catecory style
  useEffect(() => {
    if (isviewAllselected) {
      setActiveIndex(null);
    }
  }, []);

  return (
    <ul className='space-y-2 h-[12rem] overflow-scroll mt-2 scrollbar-hide px-2 '>
      {isLoading && (
        <div className='flex justify-center p-16'>
          <Loader />
        </div>
      )}

      {!isLoading &&
        categories &&
        categories.map((item, index) => (
          <li
            className={`hover:text-primary hover:font-bold ${
              index === activeIndex && !isviewAllselected
                ? 'text-[#1D6F2B] font-bold'
                : 'text-black '
            }`}
            key={index}
          >
            <span
              className=' hover:text-[#1D6F2B] capitalize'
              onClick={() => {
                setActiveIndex(index);
                setActiveSubcategory();
                handleCategoryExpand(index, false);
                onCategorySelect(
                  {
                    categoryname: item.categoryname,
                    categoryId: item.categoryid,
                  },
                  { subcategoryname: null, subcategoryId: null }
                );
              }}
            >
              {item.categoryname}
            </span>
            {/* {item.subcategories && item.subcategories.length > 0 ? (
              <FontAwesomeIcon
                className='float-right h-3 mt-1'
                icon={faAngleRight}
                style={{ color: '#000000' }}
                onClick={() => handleCategoryExpand(index, true)}
              />
            ) : (
              ''
            )} */}
            {item.showSubList && item.subcategories.length > 0 && (
              <div
                className={` flex w-[20rem] ${subcategoryListClassName}  ${
                  item.showSubList ? 'fade-in' : 'fade-out'
                }`}
              >
                <div className='w-full'>
                  <ul className='w-full space-y-2 p-2 shadow bg-white font-semibold rounded-md border border-gray-100'>
                    {item.subcategories.map((subItem, subIndex) => (
                      <li
                        // className="text-black hover:text-[#1D6F2B]"
                        className={`text-black hover:text-[#1D6F2B] capitalize ${
                          subItem.id === activeSubcategory ? 'text-primary' : ''
                        }`}
                        key={subIndex}
                        onClick={() => {
                          onCategorySelect(
                            {
                              categoryname: null,
                              categoryId: null,
                            },
                            {
                              subcategoryname: subItem.name,
                              subcategoryId: subItem.id,
                            }
                          );
                          setActiveSubcategory(subItem.id);
                        }}
                      >
                        {subItem.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='w-1/3'>
                  {/* Additional content for sub-category */}
                </div>
              </div>
            )}
          </li>
        ))}
    </ul>
  );
};

export default NestedList;
