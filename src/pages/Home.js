import React from 'react';
import Header from '../components/Header/Header';
import ProductsCategories from '../components/ProductsCategories';
import SearchBar from '../components/Header/SearchBar';
import Footer from '../components/Footer/Footer';
import FooterBottom from '../components/Footer/FooterBottom';

export default function Home() {
  return (
    <>
      <Header />
      <SearchBar />
      <ProductsCategories />
      <Footer />
      <FooterBottom />
    </>
  );
}
