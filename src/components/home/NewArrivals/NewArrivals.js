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
        const duplicated = Array.from({ length: 10 }, (_, index) => ({
          ...data.data[index % data.data.length],
          _id: `new-id-${index}`,
        }));
        setDuplicatedData(duplicated);

        setApiData(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="w-full mx-auto">
      <ProductsSection
        heading="New Arrivals"
        subheading="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an "
        styles="bg-[#F5F5F3] px-4"
      >
        <ProductsSliderContainer>
          {duplicatedData.map((product) => (
            <div key={product._id} className="px-2">
              <Product
                _id={product._id}
                img={product.productImages.productThumbnail.url}
                productName={product.name}
                price={product.price}
                badge={product.discountPercentage > 0}
                discountPercentage={product.discountPercentage}
                discountedPrice={product.discountedPrice}
                des={product.description}
              />
            </div>
          ))}
        </ProductsSliderContainer>
      </ProductsSection>
    </div>
    
  );
};

export default NewArrivals;
