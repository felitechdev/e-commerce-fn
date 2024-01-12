import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./NestedList.css";
import axios from "axios";

// change i made
const NestedList = ({ onCategorySelect, subcategoryListClassName }) => {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCategoryExpand = (index, show) => {
    const updatedCategories = categories.map((item, i) => {
      if (i === index) {
        return { ...item, showSubList: show };
      } else {
        return { ...item, showSubList: false };
      }
    });
    setCategories(updatedCategories);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/categories`)
      .then((data) => {
        if (data.status == 200) {
          const categories = data?.data?.data?.categories.map((item) => {
            return {
              categoryid: item.id,
              categoryname: item.name,
              showSubList: false,
              subcategories: item.subCategories,
            };
          });
          setCategories(categories);
        }
      })
      .catch((error) => {
        console.log("onCategorySelect  error", error);
      });
  }, []);

  return (
    <ul className="space-y-2 h-[12rem] overflow-scroll mt-2 scrollbar-hide px-2 ">
      {categories &&
        categories.map((item, index) => (
          <li
            className={`hover:text-[#1D6F2B] ${
              index === activeIndex ? "text-primary font-bold" : ""
            }`}
            key={index}
          >
            <span
              className="text-black hover:text-[#1D6F2B]"
              onClick={() => {
                setActiveIndex(index);
                handleCategoryExpand(index, false);
                onCategorySelect(
                  {
                    categoryname: item.categoryname,
                    categoryId: item.categoryid,
                  },
                  { subcategoryname: null, subcategoryId: null }
                );
              }}
            >
              {item.categoryname}
            </span>
            {item.subcategories && item.subcategories.length > 0 ? (
              <FontAwesomeIcon
                className="float-right h-3 mt-1"
                icon={faAngleRight}
                style={{ color: "#000000" }}
                onClick={() => handleCategoryExpand(index, true)}
              />
            ) : (
              ""
            )}
            {item.showSubList && item.subcategories.length > 0 && (
              <div
                className={` flex w-[20rem] ${subcategoryListClassName}  ${
                  item.showSubList ? "fade-in" : "fade-out"
                }`}
              >
                <div className="w-full">
                  <ul className="w-full space-y-2 p-2 shadow bg-white rounded-md border border-gray-100">
                    {item.subcategories.map((subItem, subIndex) => (
                      <li
                        className="text-black hover:text-[#1D6F2B]"
                        key={subIndex}
                        onClick={() => {
                          onCategorySelect(
                            {
                              categoryname: null,
                              categoryId: subItem.category,
                            },
                            {
                              subcategoryname: subItem.name,
                              subcategoryId: subItem.id,
                            }
                          );
                        }}
                      >
                        {subItem.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-1/3">
                  {/* Additional content for sub-category */}
                </div>
              </div>
            )}
          </li>
        ))}
    </ul>
  );
};

export default NestedList;
