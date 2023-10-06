import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductMainInfo from "../../components/pageProps/productDetails/ProductMainInfo";
import ProductImages from "../../components/pageProps/productDetails/ProductImages";
import CheckoutDetails from "../../components/pageProps/productDetails/CheckoutDetails";
import ProductSecondaryInfo from "../../components/pageProps/productDetails/ProductSecondaryInfo";
import ProductsSection from "../../components/home/Products/ProductsSection";
import Slider from "react-slick";
import Product from "../../components/home/Products/Product";
import SampleNextArrow from "../../components/home/NewArrivals/SampleNextArrow";
import SamplePrevArrow from "../../components/home/NewArrivals/SamplePrevArrow";


const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);
  // For similar products testing only
  const [apiData, setApiData] = useState([]);
  const [duplicatedData, setDuplicatedData] = useState([]);

  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
  }, [location, productInfo]);


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

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Display three products on web view
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow /> ,
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
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div
          className="w-full  h-full -mt-5 xl:-mt-8 pb-10 p-4"
          
        >
          <div className="flex flex-col gap-14">
            <div className="flex gap-12">
              <ProductImages productInfo={productInfo} />
              <ProductMainInfo productInfo={productInfo} />
              <CheckoutDetails productInfo={productInfo} />
            </div>
            <ProductSecondaryInfo productInfo={productInfo} />
          </div>
          {/* For testing similar products slider only */}
          <ProductsSection
            heading="Similar Products"
          >
            <Slider {...settings}>
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
            </Slider>
          </ProductsSection>          
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
