import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../../APIs/Product';
import SkeletonSpinner from '../../components/SkeletonSpinner';
import ProductImages from './ProductImages';
import ProductMainInfo from './ProductMainInfo';
import CheckoutDetails from './CheckoutDetails';
import ProductPreview from '../../components/home/Products/Product';
import ProductsSliderContainer from '../../components/home/Products/ProductsSliderContainer';
import ProductsSection from '../../components/home/Products/ProductsSection';
import ProductSecondaryInfo from './ProductSecondaryInfo';
import { useSelector } from 'react-redux';

export default function ProductDetails() {
  const { id } = useParams();
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [DBProductInfo, setDBProductInfo] = useState(null);
  // // For similar products testing only
  const [similarProducts, setSmilarProducts] = useState([]);

  const [cartItemInfo, setCartItemInfo] = useState({
    productDBId: id,
    quantity: 0,
    colorId: '',
    size: '',
  });

  // Fetch Product
  useEffect(() => {
    async function getProduct() {
      try {
        setIsLoading(true);
        const DBProductInfo = await fetchProduct(id);

        setDBProductInfo(DBProductInfo);
        setCartItemInfo({
          ...cartItemInfo,
          imagePreview: DBProductInfo.productImages.productThumbnail.url,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    getProduct();
  }, [id]);

  // Fetch Similar Products
  useEffect(() => {
    // TODO: Fetch real similar products
    // Fetch your API data here
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products`)
      .then((response) => response.json())
      .then((data) => {
        setSmilarProducts(data.data.products);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='w-full mx-auto border-b-[1px] border-b-gray-300'>
      <div className='max-w-container mx-auto p-4 mt-10'>
        <div className='w-full  h-full -mt-5 xl:-mt-8 pb-10'>
          <div className='flex flex-col gap-14'>
            <div className='flex flex-col mdl:flex-row mdl:flex-wrap gap-12 items-center'>
              {isLoading && <SkeletonSpinner />}

              {!isLoading &&
              DBProductInfo &&
              Object.keys(DBProductInfo).length > 0 ? (
                <>
                  <ProductImages
                    DBProductInfo={DBProductInfo}
                    userInfo={userInfo}
                    cartItemInfo={cartItemInfo}
                    setCartItemInfo={setCartItemInfo}
                  />
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
                </>
              ) : (
                ''
              )}
            </div>
          </div>
          {/* For testing similar products slider only */}
          <ProductsSection heading='Similar Products'>
            <ProductsSliderContainer>
              {similarProducts.map((product) => {
                return (
                  <div key={product._id} className='px-2'>
                    <ProductPreview productInfo={product} />
                  </div>
                );
              })}
            </ProductsSliderContainer>
          </ProductsSection>
        </div>
      </div>
    </div>
  );
}
