import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const CategoryImagesCards = ({ ...props }) => {
  const {
    loading: productclassLoading,
    productclass: productclassData,
    errorMessage: productclassError,
  } = useSelector((state) => state.productclass);

  return (
    <>
      {/* h-[142px] */}
      <div className=" flex space-x-10  overflow-x-auto  ">
        {!productclassLoading &&
          productclassData &&
          productclassData?.map((pclass, index) => {
            return (
              <Link to={`/shop/?productClass=${pclass.id}`} key={index + 1}>
                <div
                  key={pclass.id}
                  className=" w-[88px] h-fit space-y-2 text-center "
                >
                  <img
                    src="https://placehold.jp/88x99.png"
                    alt={pclass.name}
                    className=" object-cover h-90"
                  />
                  <p className="text-sm">{pclass.name}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};
