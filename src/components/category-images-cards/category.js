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
        className="flex space-x-2 overflow-x-auto scrollbar-none "
        ref={containerRef}
      >
        {!productclassLoading &&
          productclassData &&
          productclassData?.map((pclass, index) => {
            return (
              <Link to={`/shop/?productClass=${pclass.id}`} key={index + 1}>
                <div
                  key={pclass.id}
                  className="w-[110px] hover:bg-gray-200 gap-2 flex flex-col rounded p-2 h-full items-center justify-center text-center"
                >
                  <div className="w-[65px] h-[65px] border m-auto rounded-full flex items-center justify-center p-0">
                    <img
                      src={`${
                        pclass?.icon
                          ? pclass.icon
                          : "https://placehold.jp/80x80.png"
                      } `}
                      alt={pclass.name}
                      className="object-cover rounded-full w-full h-full   "
                    />
                  </div>
                  <p className="text-xs capitalize font-semibold hover:underline ">
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
