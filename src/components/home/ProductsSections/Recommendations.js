import React, { useState, useEffect } from "react";
import Product from "../Products/Product";
import ProductsSection from "../Products/ProductsSection";
import ProductsSliderContainer from "../Products/ProductsSliderContainer";

const Recommendations = () => {
  const [apiData, setApiData] = useState([]);
  const [duplicatedData, setDuplicatedData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/products`)
      .then((response) => response.json())
      .then((data) => {
        const duplicated = Array.from({ length: 10 }, (_, index) => ({
          ...data[index % data.length],
          _id: `new-id-${index}`,
        }));
        setDuplicatedData(duplicated);
        setApiData(data);
      })
      .catch((error) =>
        console.error("Error fetching data: on recommended prodduct", error)
      );
  }, []);

  return (
    <ProductsSection heading="Recommended Products">
      <ProductsSliderContainer>
        {duplicatedData.map((product, index) => {
          return (
            <div key={product._id + index} className="px-2">
              <Product productInfo={product} />
            </div>
          );
        })}
      </ProductsSliderContainer>
    </ProductsSection>
  );
};

export default Recommendations;
