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
        className="flex w-full space-x-2 overflow-x-auto scrollbar-none"
        ref={containerRef}
      >
        {!productclassLoading &&
          productclassData &&
          productclassData?.map((pclass, index) => {
            return (
              <Link to={`/shop/?productClass=${pclass.id}`} key={index + 1}>
                <div
                  key={pclass.id}
                  className="flex h-full w-[110px] flex-col items-center justify-center gap-2 rounded p-2 text-center hover:bg-gray-200"
                >
                  <div className="m-auto flex h-[65px] w-[65px] items-center justify-center rounded-full border p-0">
                    <img
                      src={`${
                        pclass?.icon
                          ? pclass.icon
                          : "https://placehold.jp/80x80.png"
                      } `}
                      alt={pclass.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-semibold capitalize hover:underline">
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
