import React, { useState, useEffect } from "react";
import ProductsSection from "../Products/ProductsSection";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import axios from "axios";

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

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Display six products on web view
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768, // Breakpoint for mobile view
        settings: {
          slidesToShow: 1, // Display one product on mobile view
        },
      },
    ],
  };
  return (
    <ProductsSection
      heading="New Arrivals"
      subheading="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an "
      bg_color="bg-[#F5F5F3]"
    >
      <Slider {...settings} className="max-w-container mx-auto">
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
      </Slider>
    </ProductsSection>
  );
};

export default NewArrivals;
