import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const CategoryImagesCards = ({ ...props }) => {
  const {
    loading: productclassLoading,
    productclass: productclassData,
    errorMessage: productclassError,
  } = useSelector((state) => state.productclass);

  const containerRef = React.useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container && container.scrollWidth > container.clientWidth) {
      const scrollInterval = setInterval(() => {
        container.scrollLeft += 1;
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollLeft = 0;
        }
      }, 1000);

      return () => clearInterval(scrollInterval);
    }
  }, [productclassData]);

  return (
    <>
      {/* h-[142px] */}
      <ul
        className="flex space-x-5 md:space-x-8 overflow-x-auto  mt-3 scrollbar-none list-disc "
        ref={containerRef}
      >
        {!productclassLoading &&
          productclassData &&
          productclassData?.map((pclass, index) => {
            return (
              // <Link to={`/shop/?productClass=${pclass.id}`} key={index + 1}>
              <li
                key={pclass.id}
                className="w-[90px] flex-col items-center cursor-pointer justify-center h-fit space-y-2 text-center"
                onClick={() => {
                  props.setProductClass(pclass.id);
                }}
              >
                <p
                  className={`
                    ${
                      props.productClass === pclass.id
                        ? "text-[#cd5c07] underline"
                        : ""
                    }
                  text-sm hover:text-[#cd5c07] hover:underline break-words 
                  `}
                >
                  {pclass.name}
                </p>
              </li>
              // </Link>
            );
          })}
      </ul>
    </>
  );
};
