import React from 'react';
import Brand from './shopBy/Brand';
import Category from './shopBy/Category';
import Color from './shopBy/Color';
import Price from './shopBy/Price';

const ShopSideNav = () => {
  return (
    <div className='w-full px-6 flex flex-col gap-6'>
      <Price />
      <Brand />
      <Category icons={true} />
      <Color />
    </div>
  );
};

export default ShopSideNav;
