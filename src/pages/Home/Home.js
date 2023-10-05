import React from "react";
import Banner from "../../components/Banner/Banner";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import NewArrivals1 from "../../components/home/NewArrivals/NewArrivals1";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <div className="max-w-container mx-auto px-4">
        <NewArrivals1 />
      </div>  
      <NewArrivals />
      <div className="max-w-container mx-auto px-4">
        <BestSellers />
        <YearProduct />
      </div>
    </div>
  );
};

export default Home;
