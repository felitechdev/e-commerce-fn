import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductMainInfo from "../../../components/pageProps/productDetails/ProductMainInfo";
import ProductImages from "../../../components/pageProps/productDetails/ProductImages";
import CheckoutDetails from "../../../components/pageProps/productDetails/CheckoutDetails";
import ProductSecondaryInfo from "../../../components/pageProps/productDetails/ProductSecondaryInfo";
import ProductsSection from "../../../components/home/Products/ProductsSection";
import Product from "../../../components/home/Products/Product";
import ProductsSliderContainer from "../../../components/home/Products/ProductsSliderContainer";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const location = useLocation();
  const [productInfo, setProductInfo] = useState(location.state.item);
  // For similar products testing only
  const [apiData, setApiData] = useState([]);
  const [duplicatedData, setDuplicatedData] = useState([]);
  const userInfo = useSelector((state) => state.userReducer.userInfo)

  useEffect(() => {
    setProductInfo(location.state.item);
  }, [location.state.item]);

  useEffect(() => {
    // Fetch your API data here
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/products`)
      .then((response) => response.json())
      .then((data) => {
        // Duplicate the API data
        setDuplicatedData([...data, ...data, ...data]);
        setApiData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto p-4 mt-10">
        <div className="w-full  h-full -mt-5 xl:-mt-8 pb-10">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col mdl:flex-row mdl:flex-wrap gap-12">
              <ProductImages productInfo={productInfo} />
              <ProductMainInfo productInfo={productInfo} />
              <CheckoutDetails productInfo={productInfo} userInfo={userInfo} />
            </div>
            <ProductSecondaryInfo productInfo={productInfo} />
          </div>
          {/* For testing similar products slider only */}
          <ProductsSection heading="Similar Products">
            <ProductsSliderContainer>
              {duplicatedData.map((product, productIndex) => (
                <div key={product._id + productIndex} className="px-2">
                  <Product
                    productInfo={product}
                  />
                </div>
              ))}
            </ProductsSliderContainer>
          </ProductsSection>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
