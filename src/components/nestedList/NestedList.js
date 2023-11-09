import React, { useState } from 'react';
import './NestedList.css';

const NestedList = () => {
  const [items, setItems] = useState([
    {
      text: "Women's Fashion",
      showSubList: false,
      subItems: [
        { text: 'Dresses' },
        { text: 'Pants' },
        { text: 'Shoes' },
        { text: 'Shoes' },
        { text: 'Shoes' },
      ],
    },
    {
      text: "Men's Fashion",
      showSubList: false,
      subItems: [
        { text: 'Sub-Item 3' },
        { text: 'Sub-Item 4' },
      ],
    },
    // ... (other items)
  ]);

  const handleCategoryClick = (index) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, showSubList: !item.showSubList };
      } else {
        return { ...item, showSubList: false };
      }
    });
    setItems(updatedItems);
  };

  return (
    <ul className="space-y-2 h-[12rem] overflow-scroll mt-2 scrollbar-hide px-2">
      {items.map((item, index) => (
        <li className="hover:text-[#1D6F2B]" key={index}>
          <span className='text-black' onClick={() => handleCategoryClick(index)}>{item.text}</span>
          {item.showSubList && item.subItems.length > 0 && (
            <div className={`absolute top-0 left-[17.5rem] flex w-[20rem] ${item.showSubList ? 'fade-in' : 'fade-out'}`}>
              <div className="w-full">
                <ul className="w-full space-y-2 p-2 shadow bg-white rounded-md border border-gray-100">
                  {item.subItems.map((subItem, subIndex) => (
                    <li className="text-black hover:text-[#1D6F2B]" key={subIndex}>{subItem.text}</li>
                  ))}
                </ul>
              </div>
              <div className="w-1/3">
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
