import React, { useState, useEffect } from "react";
import Product from "../Products/Product";
import ProductsSection from "../Products/ProductsSection";
import ProductsGridContainer from "../Products/ProductsGridContainer";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../APIs/Product";
import { LoaderComponent } from "../../Loaders/Getloader";

const CategoryFilteredProducts = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [productstate, setProductstate] = useState([]);
  const [loading, setLoading] = useState(false);
  const { product, status, err } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetching data from the API based on selectedCategory(category or subcategory)

    const url =
      selectedCategory.category.categoryId ||
      selectedCategory.subcategory.subcategoryId
        ? selectedCategory.category.categoryId
          ? `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/category/${selectedCategory.category.categoryId}`
          : `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/subcategory/${selectedCategory.subcategory.subcategoryId}`
        : `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, [selectedCategory]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts())
        .unwrap()
        .then((data) => {
          setProductstate(data);
          if (data) {
            setLoading(false);
          }
        })
        .catch((error) => {});
    }
  }, [status, dispatch]);

  // Fetch user only when the component mounts
  useEffect(() => {
    if (!productstate.length) {
      dispatch(fetchProducts())
        .unwrap()
        .then((data) => {
          setProductstate(data);
          if (data) {
            setLoading(false);
          }
        })
        .catch((error) => {});
    }
  }, [dispatch, productstate]);

  const prod =
    productstate &&
    productstate.length > 0 &&
    productstate.filter((item) => {
      return item?.category?.id == selectedCategory.category.categoryId;
    });

  return (
    <ProductsSection
      heading={
        selectedCategory.category.categoryname ||
        selectedCategory.subcategory.subcategoryname
      }
    >
      {status === "loading" ? (
        <di className="w-[100%] flex justify-center  items-center t">
          <LoaderComponent className="text-primary" />
        </di>
      ) : prod.length > 0 ? (
        <ProductsGridContainer>
          {prod.map((product, index) => (
            <Product
              key={product.id + index} // Ensured unique keys for each product
              productInfo={product}
            />
          ))}
        </ProductsGridContainer>
      ) : (
        /* products.length > 0 ? (
        <ProductsGridContainer>
          {products.map((product, index) => (
            <Product
              key={product.id + index} // Ensured unique keys for each product
              productInfo={product}
            />
          ))}
        </ProductsGridContainer>
      ) */
        <p className=" text-center font-semibold">
          There are no products in these category.
        </p>
      )}
    </ProductsSection>
  );
};

export default CategoryFilteredProducts;
