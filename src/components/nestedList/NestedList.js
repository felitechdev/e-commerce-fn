import React, { useState } from 'react';

const NestedList = ({props}) => {
  const [items, setItems] = useState(props);

  const toggleSubList = (index) => {
    const updatedItems = [...items];
    updatedItems[index].showSubList = !updatedItems[index].showSubList;
    setItems(updatedItems);
  };

  return (
    <ul className="space-y-2 h-[12rem] overflow-scroll mt-2 scrollbar-hide px-2">
      {items.map((item, index) => (
        <li className="hover:text-[#1D6F2B]" key={index}>
          <span className='text-black' onClick={() => toggleSubList(index)}>{item.text}</span>
          {item.showSubList && item.subItems.length > 0 && (
            <ul className="w-full space-y-2 p-2 border-l border-[#FFF]">
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
