import React, { useState } from 'react';

const NestedList = () => {
  const [items, setItems] = useState([
    {
      text: 'women’s Fashion',
      showSubList: false,
      subItems: [
        { text: 'Dresses' },
        { text: 'Pants' },
        { text: 'Shoes' },
      ],
    },
    {
      text: 'men’s Fashion',
      showSubList: false,
      subItems: [
        { text: 'Sub-Item 3' },
        { text: 'Sub-Item 4' },
      ],
    },
    {
      text: 'Phone & telecommunications ',
      showSubList: false,
      subItems: [],
    },
    {
        text: 'Computer, office & security ',
        showSubList: false,
        subItems: [],
    },
    {
        text: 'Jewelry & Watch',
        showSubList: false,
        subItems: [],
    },
    {
        text: 'Bags & shoes',
        showSubList: false,
        subItems: [],
    },
    {
        text: 'Tools & Home improvement',
        showSubList: false,
        subItems: [],
    },
    {
        text: 'Beauty, Health & hair ',
        showSubList: false,
        subItems: [],
    },
  ]);

  const toggleSubList = (index) => {
    const updatedItems = [...items];
    updatedItems[index].showSubList = !updatedItems[index].showSubList;
    setItems(updatedItems);
  };

  return (
    <ul className="space-y-2 h-[12rem] overflow-scroll mt-2 scrollbar-hide px-2">
      {items.map((item, index) => (
        <li className="hover:text-[#1D6F2B]" key={index}>
          <span onClick={() => toggleSubList(index)}>{item.text}</span>
          {item.showSubList && item.subItems.length > 0 && (
            <ul className="w-full space-y-2 p-2 bg-white border-l border-[#]">
              {item.subItems.map((subItem, subIndex) => (
                <li className="text-black hover:text-[#1D6F2B]" key={subIndex}>{subItem.text}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NestedList;
