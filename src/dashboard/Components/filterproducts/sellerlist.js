import { Button, Layout, Space, Typography, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { fetchSubCategory, fetchCategory } from "../../Apis/Categories";
import Cookies from "js-cookie";
import { Loader } from "../Loader/LoadingSpin";
import { fetchCompany } from "../../Apis/Company";

const { Title, Paragraph, Text } = Typography;

export const SellerList = ({ onSellersellect }) => {
  const [companys, setCompanys] = useState([]);

  const [categorys, setCategorys] = useState([]);
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [gettoken, setGettoken] = useState(null);

  // udpate state change
  const [resetCategory, setResetCategory] = useState();

  //  access redux actions
  const { categories, loadcategory, errcategory } = useSelector(
    (state) => state.category
  );

  const { company, loadcompany, errcompany } = useSelector(
    (state) => state.getcompany
  );

  const { subcategories, loadsubcategory, errsubcategory } = useSelector(
    (state) => state.subcategory
  );
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  // update get category state after crud operations
  const handleUpdatestate = (categoryId) => {
    const updatedCategories = categorys.filter(
      (category) => category.id !== categoryId
    );
    setCategorys(updatedCategories);
  };

  // implement redux
  useEffect(() => {
    if (loadcompany == true) {
      dispatch(fetchCompany(token))
        .unwrap()
        .then((data) => {
          if (data?.data?.sellers) setCompanys(data?.data?.sellers);
        })
        .catch((error) => {});
    }
  }, [loadcompany, dispatch]);

  // Fetch products only when the component mounts
  useEffect(() => {
    if (!companys.length) {
      dispatch(fetchCompany(token))
        .unwrap()
        .then((data) => {
          if (data?.data?.sellers) setCompanys(data?.data?.sellers);
        })
        .catch((error) => {});
    }
  }, [dispatch, companys, token]);

  useEffect(() => {
    const newData = companys.map((comp) => ({
      key: `${comp?.user?.id}`,
      name: comp.companyName,
      sellername: comp?.user?.firstName,
      email: comp.email,
      phone: comp.phoneNumber,
      joindate: new Date(`${comp.createdAt}`).toLocaleDateString(),
    }));
    setFilteredData(newData); // Update filteredData as well
  }, [companys]);

  useEffect(() => {
    if (token) {
      setGettoken(token);
    }
  }, [dispatch, token]);

  useEffect(() => {}, [resetCategory]);

  return (
    <div className=" ">
      {loadcompany ? (
        <>
          <Loader className=" text-primary flex items-center w-full justify-center" />
          <span className=" text-primary flex items-center  justify-center">
            Loading....
          </span>
        </>
      ) : (
        <div
          className=" mt-4  p-10 cursor-pointer "
          style={{ border: "1px solid #000", borderRadius: "8px" }}
        >
          {filteredData &&
            filteredData?.map((seller, index) => {
              console.log("sellerkry", seller.key);
              return (
                <h2
                  key={index}
                  onClick={() => onSellersellect(seller.key)}
                  className=" hover:text-primary cursor-pointer text-sm font-semibold"
                >
                  {seller.name !== undefined
                    ? seller.name
                    : seller.sellername + "  not updated profile yet"}
                </h2>
              );
            })}
        </div>
      )}
    </div>
  );
};
