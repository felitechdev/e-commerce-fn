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
                  <div className="w-[88px] h-[88px] border-2 border-[#cd5c07] rounded-full flex items-center justify-center p-5  ">
                    <img
                      src="https://placehold.jp/80x80.png"
                      alt={pclass.name}
                      className=" object-fill  "
                    />
                  </div>
                  <p className="text-sm">{pclass.name}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};
