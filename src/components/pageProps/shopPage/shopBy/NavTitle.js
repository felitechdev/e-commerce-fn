import React from 'react';
import { BiCaretDown } from 'react-icons/bi';

const NavTitle = ({ title, icons }) => {
  return (
    <div className='flex items-center justify-between pb-5'>
      {icons ? (
        <>
          <h2 className='font-bold text-lg underline lg:text-xl text-primeColor'>
            {title}
          </h2>
          {icons && <BiCaretDown />}
        </>
      ) : (
        <>
          <h2 className='font-bold text-lg lg:text-xl text-primeColor'>
            {title}
          </h2>
        </>
      )}
    </div>
  );
};

export default NavTitle;
