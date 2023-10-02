import React, { useState, useEffect } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";

const BestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://smiling-neckerchief-eel.cyclic.app/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Duplicate the products (e.g., repeat 3 times)
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <div className="w-full pb-20v">
      <Heading heading="Most Popular" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {duplicatedProducts.map((product, index) => (
          <Product
            key={product._id + index} // Ensure unique keys for each product
            img={product.productImages.productThumbnail.url}
            productName={product.name}
            price={product.price}
            color={product.colorName}
            badge={true} // You can change this based on your data
            des={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;