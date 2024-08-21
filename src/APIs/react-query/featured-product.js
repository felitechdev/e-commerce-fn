import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import axios from "axios";
export async function featuredproducts() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/?featured=true`
    );
    console.log("response ", response.data);
    return response.data;
  } catch (error) {
    return [];
  }
}

export const useFetchfeaturedproduct = () => {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: featuredproducts,
  });
};
