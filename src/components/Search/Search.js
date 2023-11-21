import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import { paginationItems } from "../../constants";

export const Search = () => {
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current !== null && ref.current.contains(e.target) === false) {
        return setShowCategories(false);
      }
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      // If the search query is empty, show all categories
      setFilteredProducts([]);
    } else {
      // If there's a search query, filter the categories based on productName
      const filtered = paginationItems.filter((item) =>
        item.productName.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl border-[2px]">
      <input
        ref={ref}
        className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px] border-none"
        type="text"
        onChange={handleSearch}
        value={searchQuery}
        placeholder="Search your products here"
      />
      <FaSearch className="w-5 h-5" />
      {(searchQuery || showCategories) && (
        <div
          className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
        >
          {searchQuery
            ? filteredProducts.map((item) => (
                <div
                  onClick={() => {
                    navigate(`/product/${item.productName.toLowerCase().split(" ").join("")}`, {
                      state: {
                        item: item,
                      },
                    });
                    setShowCategories(true);
                    setShowSearchBar(true);
                    setSearchQuery("");
                  }}
                  key={item._id}
                  className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                >
                  <img className="w-24" src={item.img} alt="productImg" />
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-lg">{item.productName}</p>
                    <p className="text-xs">{item.des}</p>
                    <p className="text-sm">
                      Price: <span className="text-primeColor font-semibold">${item.price}</span>
                    </p>
                  </div>
                </div>
              ))
            : paginationItems.map((item) => (
                <div
                  onClick={() => {
                    navigate(`/product/${item.productName.toLowerCase().split(" ").join("")}`, {
                      state: {
                        item: item,
                      },
                    });
                    setShowCategories(true);
                  }}
                  key={item._id}
                  className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                >
                  <img className="w-24" src={item.img} alt="productImg" />
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-lg">{item.productName}</p>
                    <p className="text-xs">{item.des}</p>
                    <p className="text-sm">
                      Price: <span className="text-primeColor font-semibold">${item.price}</span>
                    </p>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};
