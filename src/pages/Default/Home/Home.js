import React from "react";
import Banner from "../../../components/Banner/Banner";
import AllProducts from "../../../components/home/AllProducts/AllProducts";
import NewArrivals from "../../../components/home/ProductsSections/NewArrivals";
import YearProduct from "../../../components/home/YearProduct/YearProduct";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <NewArrivals />
      <div className="max-w-container mx-auto px-4">
        <AllProducts />
        <YearProduct />
      </div>
    </div>
  );
};

export default Home;
