import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export const CategoryImagesCards = ({ ...props }) => {
  const {
    loading: productclassLoading,
    productclass: productclassData,
    errorMessage: productclassError,
  } = useSelector((state) => state.productclass);

  const containerRef = useRef(null);

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
      <div
        className="flex space-x-5 md:space-x-8 overflow-x-auto scrollbar-none "
        ref={containerRef}
      >
        {!productclassLoading &&
          productclassData &&
          productclassData?.map((pclass, index) => {
            return (
              <Link to={`/shop/?productClass=${pclass.id}`} key={index + 1}>
                <div
                  key={pclass.id}
                  className="w-[90px] flex-col items-center justify-center h-fit space-y-2 text-center"
                >
                  <div className="w-[55px] h-[55px] border m-auto border-black  hover:border-[#cd5c07] rounded-full flex items-center justify-center p-0">
                    <img
                      src={`${
                        pclass?.icon
                          ? pclass.icon
                          : "https://placehold.jp/80x80.png"
                      } `}
                      alt={pclass.name}
                      className="object-cover rounded-full h-full w-full"
                    />
                  </div>
                  <p className="text-sm hover:text-primary hover:underline ">
                    {pclass.name}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};
