import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductDetailsImages from "../../components/pageProps/productDetails/ProductDetailsImages";
import CheckoutDetails from "../../components/pageProps/productDetails/CheckoutDetails";

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);

  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
  }, [location, productInfo]);

  const containerStyle = {
    boxShadow: "0px 4px 4px 0px #00000040", // Box shadow properties
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: "#fff", // Set your desired background color
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
          <div className="flex gap-12">
            <ProductDetailsImages />
            <ProductInfo productInfo={productInfo} />
            <CheckoutDetails productInfo={productInfo} />
          </div>
          {/* <div className="h-full"></div> */}
          {/* <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full object-cover"
              src={productInfo.img}
              alt={productInfo.productName}
            />
          </div> */}
          
          {/* <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            
          </div> */}
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
