import { Layout, Space, Typography, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CategoryModel from "./CategoryModel/CategoryModel";
import { ActionButton } from "./ActionButton/ActionButton";
import { fetchCategory } from "../../Apis/Categories";
import Cookies from "js-cookie";
import { Loader } from "../Loader/LoadingSpin";

const { Title } = Typography;
// const token = Cookies.get("token");
const src =
  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";

export const Category = () => {
  const [categorys, setCategorys] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [gettoken, setGettoken] = useState(null);

  // udpate state change
  const [resetCategory, setResetCategory] = useState();

  //  access redux actions
  const { categories, loadcategory, errcategory } = useSelector(
    (state) => state.category
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

  // useEffect(() => {
  //   dispatch(fetchCategory());
  //   dispatch(fetchSubCategory(token));
  // }, [dispatch, token]);

  // implement redux
  useEffect(() => {
    if (loadcategory == true) {
      dispatch(fetchCategory(gettoken))
        .unwrap()
        .then((data) => {
          if (data?.data && data.status == "sucess") {
            setCategorys(data?.data?.categories);
          }
        })
        .catch((error) => {});
    }
  }, [loadcategory, dispatch, token]);

  // Fetch products only when the component mounts
  useEffect(() => {
    if (!categorys.length) {
      dispatch(fetchCategory(gettoken))
        .unwrap()
        .then((data) => {
          if (data?.data && data.status == "sucess") {
            setCategorys(data?.data?.categories);
          }
        })
        .catch((error) => {});
    }
  }, [dispatch, categorys, gettoken]);

  useEffect(() => {
    const newData = categorys?.map((category) => ({
      key: `${category.id}`,
      name: category.name,
      subcategories: category?.subCategories, //array of sub categories
      Joindate: new Date(`${category.createdAt}`).toLocaleDateString(),
    }));
    setFilteredData(newData); // Update filteredData as well
  }, [categorys]);

  useEffect(() => {
    if (token) {
      setGettoken(token);
    }
  }, [dispatch, token]);

  useEffect(() => {}, [resetCategory]);

  const Columns = [
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Space size={12}>
          <div>
            <Title level={5} className="w-full">
              {record.name}
            </Title>
          </div>
        </Space>
      ),
      width: 200,
    },
    // {
    //   title: "Date Created",
    //   dataIndex: "Joindate",
    //   key: "Joindate",
    //   width: 100,
    // },
    {
      title: "Subcategories",
      dataIndex: "subcategories",
      key: "subcategories",
      render: (_, record) => (
        <Space size={12}>
          <div className=" ">
            {record?.subcategories?.length > 0 ? (
              <ul class="list-disc">
                {record?.subcategories?.map((sub) => (
                  <li className="w-full" key={sub.id}>
                    {sub.name}
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-[red]">No subcategories available</span>
            )}
          </div>
        </Space>
      ),

      width: 100,
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      width: 100,
      render: (_, record) => (
        <ActionButton
          handleUpdatestate={handleUpdatestate}
          categoryId={record.key}
        />
      ),
    },
  ];

  return (
    <Layout className=" space-y-6  bg-light overflow-auto">
      <Space className="flex justify-between">
        <Title level={3}>Categories</Title>
        <CategoryModel />
      </Space>

      <div className=" ">
        {loadcategory ? (
          <>
            <Loader className=" text-primary flex items-center w-full justify-center" />
            <span className=" text-primary flex items-center  justify-center">
              Loading....
            </span>
          </>
        ) : (
          <Table
            rowClassName="even:bg-[#f1f5f9]   hover:cursor-pointer custom-table-row "
            size="small"
            tableLayout="fixed"
            bordered={true}
            columns={Columns}
            dataSource={filteredData}
            style={{
              position: "sticky",
              bottom: 0,
              top: 0,
              left: 0,
              zIndex: 1,
              border: "0px solid #838383",
              padding: "0px",
            }}
            scroll={{ x: 500, y: 500 }}
          />
        )}
      </div>
    </Layout>
  );
};
