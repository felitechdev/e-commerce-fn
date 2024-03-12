import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../../../components/pageProps/Breadcrumbs';
import Pagination from '../../../components/pageProps/shopPage/Pagination';
import ProductBanner from '../../../components/pageProps/shopPage/ProductBanner';
import ShopSideNav from '../../../components/pageProps/shopPage/ShopSideNav';
import PageLayout from '../../../components/designLayouts/PageLayout';
import ShopProducts from './ShopProducts.js';

const Shop = () => {
  return (
    <PageLayout showFooter={true}>
      <div className='max-w-container mx-auto px-4'>
        {/* <Breadcrumbs title='Products' /> */}
        <div className='w-full h-full flex pb-20 gap-10'>
          <div className='w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full'>
            <ShopSideNav />
          </div>
          <div className='w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10'>
            <ProductBanner />
            <ShopProducts />
            {/* <Pagination /> */}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Shop;
