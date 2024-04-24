import { useState } from "react";
import axios from "axios";
import { HiChevronRight } from "react-icons/hi2";
import { Loader } from "../../dashboard/Components/Loader/LoadingSpin";
import MenuIconWhite from "../../assets/images/menu-white.png";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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

export default function HomePageCategories() {
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleMouseEnter = (element) => {
    setHoveredCategory(element);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div
      className="hidden lg:flex flex-col gap-2 w-full bg-[#D9D9D970] h-full relative rounded"
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-3 p-2 rounded-t  bg-[#1D6F2B]">
        <img src={MenuIconWhite} className="w-5 h-5" />
        <h3 className=" text-white text-lg font-bold">Categories</h3>
      </div>

      {isLoading && (
        <div className="flex justify-center p-16">
          <Loader />
        </div>
      )}

      {!isLoading && (
        <div className="flex relative rounded h-full overflow-auto">
          <ul className="w-full flex flex-col rounded-b">
            {categories?.map((category) => (
              <li
                className={`flex gap-4 cursor-pointer font-semibold items-center justify-between hover:bg-[#1D6F2B] hover:text-white ${
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
      )}

      {hoveredCategory && (
        <div className=" bg-gray-200 text-gray-700 pt-6  b-0 absolute min-h-full rounded left-full z-50">
          <ul className="min-w-52 flex gap-2 flex-col">
            {categories
              .find((cat) => {
                return cat.id === hoveredCategory;
              })
              .subCategories.map((subCat) => (
                <li
                  key={subCat.id}
                  className="w-full px-4 hover:underline font-medium cursor-pointer"
                >
                  <Link
                    to={`shop/?category=${hoveredCategory}&subcategory=${subCat.id}`}
                    className="capitalize flex"
                  >
                    {subCat.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
