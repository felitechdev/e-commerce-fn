import React from "react";
import Banner from "../../components/Banner/Banner";

import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";


import YearProduct from "../../components/home/YearProduct/YearProduct";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      
      <div className="max-w-container mx-auto px-4">
        
        <NewArrivals />
        <BestSellers />
        <YearProduct />
   
      </div>
    </div>
  );
};

export default Home;
