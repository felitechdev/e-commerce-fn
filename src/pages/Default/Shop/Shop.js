import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../../components/pageProps/Breadcrumbs';
import Pagination from '../../../components/pageProps/shopPage/Pagination';
import ProductBanner from '../../../components/pageProps/shopPage/ProductBanner';
import ShopSideNav from '../../../components/pageProps/shopPage/ShopSideNav';
import PageLayout from '../../../components/designLayouts/PageLayout';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  useEffect(() => {
    // Fetch data from the API
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response is an array of products
        const duplicatedData = duplicateData(data, 4); // Duplicate the data 4 times (48 products)
        setProducts(duplicatedData);
      })
      .catch((error) => {
        console.error('Error fetching data from the API:', error);
      });
  }, []);

  // Function to duplicate data
  const duplicateData = (data, numCopies) => {
    const duplicatedData = [];
    for (let i = 0; i < numCopies; i++) {
      duplicatedData.push(...data);
    }
    return duplicatedData;
  };

  return (
    <PageLayout showFooter={true}>
      <div className='max-w-container mx-auto px-4'>
        <Breadcrumbs title='Products' />
        <div className='w-full h-full flex pb-20 gap-10'>
          <div className='w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full'>
            <ShopSideNav />
          </div>
          <div className='w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10'>
            <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
            <Pagination itemsPerPage={itemsPerPage} products={products} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Shop;
