import React, { useState, useEffect } from "react";
import Product from "../Products/Product";
import ProductsSection from "../Products/ProductsSection";
import ProductsSliderContainer from "../Products/ProductsSliderContainer";

const Recommendations = () => {
  const [apiData, setApiData] = useState([]);
  const [duplicatedData, setDuplicatedData] = useState([]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products`)
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

  useEffect(() => {
    // Fetching data from the API
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data?.data);
        } else {
          setProducts([]);
        }
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <ProductsSection heading="Recommended Products">
      <ProductsSliderContainer>
        {/* {duplicatedData.map((product, index) => {
          return (
            <div key={product.id + index} className="px-2">
              <Product productInfo={product} />
            </div>
          );
        })} */}
        {products?.products?.length > 0 &&
          products?.products?.map((product, index) => (
            <Product
              key={product.id + index} // Ensured unique keys for each product
              productInfo={product}
            />
          ))}
      </ProductsSliderContainer>
    </ProductsSection>
  );
};

export default Recommendations;
