import React, { useState, useEffect } from "react";
import Product from "../Products/Product";
import ProductsSection from "../Products/ProductsSection";
import ProductsSliderContainer from "../Products/ProductsSliderContainer";

const NewArrivals = () => {
  const [apiData, setApiData] = useState([]);
  const [duplicatedData, setDuplicatedData] = useState([]);

  useEffect(() => {
    // Fetch your API data here
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/products`)
      .then((response) => response.json())
      .then((data) => {
        // Duplicate the API data
        const duplicated = Array.from({ length: 10 }, (_, index) => ({
          ...data[index % data.length],
          _id: `new-id-${index}`,
        }));
        setDuplicatedData(duplicated);
        setApiData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <ProductsSection>
      <ProductsSliderContainer>
        {duplicatedData.map((product) => (
          <div key={product._id} className="px-2">
            <Product
              _id={product._id}
              img={
                product.productImages &&
                product.productImages.productThumbnail &&
                product.productImages.productThumbnail.url
              }
              productName={product.name}
              price={product.price}
              color={
                product.colorImages &&
                product.colorImages[0] &&
                product.colorImages[0].colorName
              }
              badge={product.discountPercentage > 0}
              discountPercentage={product.discountPercentage}
              discountedPrice={product.discountedPrice}
              des={product.description}
            />
          </div>
        ))}
      </ProductsSliderContainer>
    </ProductsSection>
  );
};

export default NewArrivals;
