import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { ProductSection } from "./ProductSection";
import { Loader } from "../../dashboard/Components/Loader/LoadingSpin";

export const ProductClassCategories = () => {
  const [categoryIds, setCategoryIds] = useState({});
  const [sectionHasProducts, setSectionHasProducts] = useState({});
  const containerRef = useRef(null);
  const {
    loading,
    productclass: productclassData,
    errorMessage,
  } = useSelector((state) => state.productclass);

  const handleCategoryClick = (productClassId, categoryId) => {
    setCategoryIds((prevCategoryIds) => ({
      ...prevCategoryIds,
      [productClassId]: categoryId,
    }));
  };

  const handleSectionProductStatus = (productClassId, hasProducts) => {
    setSectionHasProducts((prevState) => ({
      ...prevState,
      [productClassId]: hasProducts,
    }));
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scrollInterval = setInterval(() => {
        container.scrollLeft += 1;
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollLeft = 0;
        }
      }, 50); // Adjust the interval for slower scrolling

      return () => clearInterval(scrollInterval);
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center">
          <Loader fontSize={38} />
        </div>
      ) : (
        <div className="product-class-section cursor-pointer">
          {productclassData?.map((productClass, index) => {
            const shouldHideSection =
              sectionHasProducts[productClass.id] === false;

            return (
              <div
                key={productClass.id}
                className={shouldHideSection ? "hidden" : ""}
              >
                <div className="product-class mb-5 py-1 text-sm">
                  <h2 className="mr-3 text-base font-semibold capitalize">
                    {productClass.name}
                  </h2>
                  {/* <div
                    className="categories caregory_text !no-scrollbar hidden space-x-4 overflow-auto py-2 capitalize md:w-[50%]"
                    ref={containerRef}
                  >
                    {productClass.categories.map((category) => (
                      <span
                        key={`${productClass.id}-${category.id}`}
                        className={`category-name !text-sm ${
                          categoryIds[productClass.id] === category.id
                            ? "px-2 font-medium !text-primary"
                            : ""
                        }`}
                        onClick={() =>
                          handleCategoryClick(productClass.id, category.id)
                        }
                      >
                        {category.name}
                      </span>
                    ))}
                  </div> */}
                </div>
{/* 
                <ProductSection
                  key={`${productClass.id}`}
                  productClassId={productClass.id}
                  category={categoryIds[productClass.id]}
                  setIsSectionHasProduct={(hasProducts) =>
                    handleSectionProductStatus(productClass.id, hasProducts)
                  }
                /> */}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
