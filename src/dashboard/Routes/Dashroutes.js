import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  Category,
  Company,
  Contract,
  Dashboard,
  Product,
  Retailer,
} from "../Components";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="company" element={<Company />} />
      <Route path="contract" element={<Contract />} />
      <Route path="product" element={<Product />} />
      <Route path="retailer" element={<Retailer />} />
      <Route path="category" element={<Category />} />
    </Routes>
  );
};

export default DashboardRoutes;
