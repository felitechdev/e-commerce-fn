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
import axios from "axios";

const ProductDetails = () => {
  const location = useLocation();
  const [DBProductInfo, setDBProductInfo] = useState({});
  const [cartItemInfo, setCartItemInfo] = useState({
    productDBId: location.state.productId,
    quantity: 0,
    colorId: "",
    size: "",
  })

  const [apiData, setApiData] = useState([]);
  const [duplicatedData, setDuplicatedData] = useState([]);

  const userInfo = useSelector((state) => state.userReducer.userInfo)

  useEffect(() => {

    const fetchProductInfo = async () => {
      try {
        const productInfo = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/product/${location.state.productId}`)
        setDBProductInfo(productInfo.data);
        setCartItemInfo({
          ...cartItemInfo,
          imagePreview: productInfo.data.productImages.productThumbnail.url,
        })
      } catch (error) {
        console.error("Error fetching data:", error)
      } 
    }

    const fetchRelatedProducts = async () => { 
      try {
        const products = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/products`)
        setDuplicatedData([...products.data, ...products.data, ...products.data]);
        setApiData(products.data);
      } catch (error) {
        console.error("Error fetching data:", error)
      }
      
    } 

    fetchProductInfo()
    fetchRelatedProducts()
  }, [location.state.productId]);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto p-4 mt-10">
        <div className="w-full  h-full -mt-5 xl:-mt-8 pb-10">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col mdl:flex-row mdl:flex-wrap gap-12">
              {Object.keys(DBProductInfo).length > 0 ? <>
                <ProductImages
                  DBProductInfo={DBProductInfo}
                  userInfo={userInfo}
                  cartItemInfo={cartItemInfo}
                  setCartItemInfo={setCartItemInfo} />
                <ProductMainInfo
                  DBProductInfo={DBProductInfo}
                  cartItemInfo={cartItemInfo}
                  setCartItemInfo={setCartItemInfo}
                />
                <CheckoutDetails
                  DBProductInfo={DBProductInfo}
                  userInfo={userInfo}
                  cartItemInfo={cartItemInfo}
                  setCartItemInfo={setCartItemInfo}
                />
                <ProductSecondaryInfo DBProductInfo={DBProductInfo} />
              </> : ""}
            </div>
            
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
