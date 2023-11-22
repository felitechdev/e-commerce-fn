import React, { useState, useEffect } from "react";
import ProductsSection from "../Products/ProductsSection";
import Product from "../Products/Product";
import axios from "axios";
import ProductsSliderContainer from "../Products/ProductsSliderContainer";

const NewArrivals = () => {
  const [apiData, setApiData] = useState([]);
  const [duplicatedData, setDuplicatedData] = useState([]);

  useEffect(() => {
    // Fetch your API data here
    axios(`${process.env.REACT_APP_BACKEND_SERVER_URL}/products`)
      .then((data) => {
        // Duplicate the API data
        setDuplicatedData([...data.data, ...data.data, ...data.data]);

        setApiData(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="w-full mx-auto">
      <ProductsSection
        heading="New Arrivals"
        styles="bg-[#F5F5F3] px-4"
      >
        <ProductsSliderContainer>
          {duplicatedData.map((product, index) => (
            <div key={product._id + index} className="px-2">
              <Product
                key={product._id + index}
                productInfo={product}
              />
            </div>
          ))}
        </ProductsSliderContainer>
      </ProductsSection>
    </div>
    
  );
};

export default NewArrivals;
