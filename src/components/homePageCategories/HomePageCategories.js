import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HiChevronRight } from "react-icons/hi2";
import { Loader } from "../../dashboard/Components/Loader/LoadingSpin";
import MenuIconWhite from "../../assets/images/menu-white.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchProductclass } from "../../dashboard/Redux/ReduxSlice/ProductClass";

export async function fetchCategories() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/categories`
    );

    return response.data.data.categories;
  } catch (error) {
    throw new Error("Error fetching categories");
  }
}

//  dumy data for sub-sub-category
const sub_sub_category = [
  "Drawing Tablet",
  "Graphic Tablet",
  "Pen Tablet ",

  "Digital Graphic Tablet Digital Graphic Tablet",
  "Digital Pen Tablet",
  "Digital Drawing Tablet",
  "Digital Graphic Tablet",
  "Digital Pen Tablet",
];

export default function HomePageCategories() {
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const dispatch = useDispatch();

  const {
    loading: productclassLoading,
    productclass: productclassData,
    errorMessage: productclassError,
  } = useSelector((state) => state.productclass);

  useEffect(() => {
    dispatch(fetchProductclass());
  }, [dispatch]);

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredproductclass, setHoveredproductclass] = useState(null);
  const [hoveredSubCategory, setHoveredSubCategory] = useState(null);

  const handleMouseEnter = (element) => {
    setHoveredCategory(element);
  };

  const handlemoauseEnterproductclass = (element) => {
    setHoveredproductclass(element);
  };

  const handleMouseEnterSub = (element) => {
    setHoveredSubCategory(element);
  };

  const handleMouseLeaveSub = () => {
    setHoveredSubCategory(null);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const handleMouseLeaveproductclass = () => {
    setHoveredproductclass(null);
  };

  console.log("categories", categories);

  return (
    <div
      className="hidden lg:flex flex-col gap-2 w-full bg-[#D9D9D970] h-full relative rounded"
      onMouseLeave={handleMouseLeaveproductclass}
    >
      <div className="flex items-center gap-3 p-2 rounded-t  bg-[#1D6F2B]">
        <img src={MenuIconWhite} className="w-5 h-5" />
        {/* <h3 className=" text-white text-lg font-bold">Categories</h3> */}

        <h3 className=" text-white text-lg font-bold">Product Class</h3>
      </div>

      {productclassLoading && (
        <div className="flex justify-center p-16">
          <Loader />
        </div>
      )}

      {!productclassLoading && (
        <div className="flex relative rounded h-full overflow-auto">
          <ul className="w-full flex flex-col rounded-b">
            {productclassData?.map((category) => (
              <li
                className={`flex gap-4 cursor-pointer  font-medium  hover:font-semibold items-center justify-between hover:bg-[#1D6F2B] hover:text-white text-[14px] ${
                  hoveredproductclass === category.name &&
                  "bg-[#1D6F2B] text-white "
                }`}
                key={category.name}
                onMouseEnter={() => handlemoauseEnterproductclass(category.id)}
                onMouseOver={() => handlemoauseEnterproductclass(category.id)}
              >
                <Link
                  to={`shop/?productClass=${hoveredproductclass}`}
                  className="capitalize-first w-full  p-2"
                >
                  {category.name}
                </Link>{" "}
                {hoveredproductclass === category.id && <HiChevronRight />}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* {!productclassLoading && (
        <div className="flex relative rounded h-full overflow-auto">
          <ul className="w-full flex flex-col rounded-b">
            {categories?.map((category) => (
              <li
                className={`flex gap-4 cursor-pointer  font-medium  hover:font-semibold items-center justify-between hover:bg-[#1D6F2B] hover:text-white text-[14px] ${
                  hoveredCategory === category.name &&
                  "bg-[#1D6F2B] text-white "
                }`}
                key={category.name}
                onMouseEnter={() => handleMouseEnter(category.id)}
              >
                <Link
                  to={`shop/?category=${hoveredCategory}`}
                  className="capitalize-first w-full  p-2"
                >
                  {category.name}
                </Link>{" "}
                {hoveredCategory === category.id && <HiChevronRight />}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {hoveredproductclass && (
        // bg-gray-200
        <div className=" bg-gray-200 shadow-md ml-0      py-6  w-[700px]  sm:w-[1000px]     b-0 absolute min-h-full rounded left-full z-10 text-[13px] ">
          {/* <ul className="min-w-52 flex gap-2 flex-col"> */}
          <ul className="  grid grid-cols-4 gap-2 ">
            {productclassData
              .find((cat) => {
                return cat.id === hoveredproductclass;
              })
              .categories.map((Cat) => (
                <div className="  flex-col  text-center justify-start  items-center">
                  <li
                    key={Cat.id}
                    // className="w-full px-4 hover:underline font-medium cursor-pointer"
                    className="w-full hover:bg-[#1D6F2B] hover:text-white px-4 flex justify-start hover:underline font-bold cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(Cat.id)}
                  >
                    <Link
                      // to={`shop/?category=${hoveredCategory}&subcategory=${subCat.id}`}
                      to={`shop/?productClass=${hoveredproductclass}&category=${Cat.id}`}
                      className="capitalize flex"
                    >
                      {Cat.name}
                    </Link>
                  </li>

                  <div>
                    {categories
                      .find((cat) => cat.id === Cat.id)
                      .subCategories?.map((subCat) => (
                        <li
                          class="list-disc"
                          key={subCat.id}
                          className="w-full hover:bg-[#1D6F2B] hover:text-white px-4 flex text-gray-700 justify-start hover:underline font-medium cursor-pointer"
                          onMouseEnter={() => handleMouseEnterSub(subCat.id)}
                        >
                          <Link
                            to={`shop/?productClass=${hoveredproductclass}&category=${hoveredCategory}&subCategory=${subCat.id}`}
                            className="capitalize flex"
                          >
                            {subCat.name}
                          </Link>
                        </li>
                      ))}

                    {/* <ul className=" px-4 flex-col justify-start ">
                      {sub_sub_category.map((sub) => {
                        return (
                          <li className=" hover:underline hover:text-black text-left text-sm text-gray-500">
                            {sub}
                          </li>
                        );
                      })}
                    </ul> */}
                  </div>
                </div>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// {
//   hoveredCategory && (
//     // bg-gray-200
//     <div className=" bg-gray-200 shadow-md ml-2  text-gray-700 pt-6  w-[700px]  sm:w-[1000px]     b-0 absolute min-h-full rounded left-full z-10 text-[13px] ">
//       {/* <ul className="min-w-52 flex gap-2 flex-col"> */}
//       <ul className="  grid grid-cols-4 gap-2 ">
//         {categories
//           .find((cat) => {
//             return cat.id === hoveredCategory;
//           })
//           .subCategories.map((subCat) => (
//             <div className="  flex-col  text-center justify-start  items-center">
//               <li
//                 key={subCat.id}
//                 // className="w-full px-4 hover:underline font-medium cursor-pointer"
//                 className="w-full px-4 flex justify-start hover:underline font-bold cursor-pointer"
//                 onMouseEnter={() => handleMouseEnterSub(subCat.id)}
//               >
//                 <Link
//                   to={`shop/?category=${hoveredCategory}&subcategory=${subCat.id}`}
//                   className="capitalize flex"
//                 >
//                   {subCat.name}
//                 </Link>
//               </li>

//               <div>
//                 <ul className=" px-4 flex-col justify-start ">
//                   {sub_sub_category.map((sub) => {
//                     return (
//                       <li className=" hover:underline hover:text-black text-left text-sm text-gray-500">
//                         {sub}
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             </div>
//           ))}
//       </ul>
//     </div>
//   );
// }
