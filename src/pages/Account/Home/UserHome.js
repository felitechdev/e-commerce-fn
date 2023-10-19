import React from "react";
import Banner from "../../../components/Banner/Banner";
import NewArrivals from "../../../components/home/ProductsSections/NewArrivals";
import YearProduct from "../../../components/home/YearProduct/YearProduct";
import Recommendations from "../../../components/home/ProductsSections/Recommendations";
import AllProducts from "../../../components/home/AllProducts/AllProducts";

const UserHome = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <div className="max-w-container mx-auto px-4">
        <Recommendations />
      </div>  
      <NewArrivals />
      <div className="max-w-container mx-auto px-4">
        <AllProducts />
        <YearProduct />
      </div>
    </div>
  );
};

export default UserHome;
