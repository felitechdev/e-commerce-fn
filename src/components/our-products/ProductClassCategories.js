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
          {productclassData?.map((productClass) => {
            const shouldHideSection =
              sectionHasProducts[productClass.id] === false;

            return (
              <div
                key={productClass.id}
                className={shouldHideSection ? "hidden" : ""}
              >
                <div className="product-class border-b-2">
                  <h2 className="medium2_text capitalize mr-3">
                    {productClass.name}
                  </h2>
                  <div
                    className="  md:w-[50%] categories caregory_text capitalize space-x-4 overflow-auto !no-scrollbar"
                    ref={containerRef}
                  >
                    {productClass.categories.map((category) => (
                      <span
                        key={`${productClass.id}-${category.id}`}
                        className={`category-name !text-sm  ${
                          categoryIds[productClass.id] === category.id
                            ? "!text-primary font-medium border px-2 "
                            : ""
                        }`}
                        onClick={() =>
                          handleCategoryClick(productClass.id, category.id)
                        }
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>

                <ProductSection
                  key={`${productClass.id}`}
                  productClassId={productClass.id}
                  category={categoryIds[productClass.id]}
                  setIsSectionHasProduct={(hasProducts) =>
                    handleSectionProductStatus(productClass.id, hasProducts)
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
