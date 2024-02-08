import React from 'react';
import ProductsCategories from '../components/ProductsCategories';
import PageLayout from '../components/designLayouts/PageLayout';

export default function Home() {
  return (
    <>
      <PageLayout>
        <ProductsCategories />
      </PageLayout>
    </>
  );
}
