import { Layout, Space, Typography, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductclassModel from "./CategoryModel/CategoryModel";
import { ActionButton } from "./ActionButton/ActionButton";
import { fetchCategory } from "../../Apis/Categories";
import Cookies from "js-cookie";
import { Loader } from "../Loader/LoadingSpin";
import { fetchProductBrand } from "../../Redux/ReduxSlice/ProductBrand.slice";

const { Title } = Typography;

export const ProductBrand = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [gettoken, setGettoken] = useState(null);

  // udpate state change
  const [resetproductclass, setResetproductclass] = useState();

  //  access redux actions
  const { categories, loadcategory, errcategory } = useSelector(
    (state) => state.category
  );

  const token = Cookies.get("token");
  const dispatch = useDispatch();

  // update get category state after crud operations
  const handleUpdatestate = (categoryId) => {};

  const { loading, productbrand, errorMessage } = useSelector(
    (state) => state.productbrand
  );

  useEffect(() => {
    dispatch(fetchProductBrand());
  }, [dispatch]);

  useEffect(() => {
    const newData = productbrand?.map((productbrand) => ({
      key: `${productbrand.id}`,
      name: productbrand.name,
      createdAt: productbrand.createdAt,
      updatedAt: productbrand.updatedAt,
      productClass: productbrand.productClass,
    }));
    setFilteredData(newData);
  }, [productbrand]);

  const Columns = [
    {
      title: "Product Brand",
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

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => (
        <Space size={12}>
          <div>{record.createdAt}</div>
        </Space>
      ),
      width: 200,
    },

    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_, record) => (
        <Space size={12}>
          <div>{record.updatedAt}</div>
        </Space>
      ),
      width: 200,
    },

    // {
    //   title: "Categories",
    //   dataIndex: "categories",
    //   key: "categories",
    //   render: (_, record) => (
    //     <Space size={12}>
    //       <div className=" ">
    //         {record?.categories?.length > 0 ? (
    //           <ul>
    //             {record?.categories?.map((cat) => (
    //               <li key={cat.id}>{cat.name}</li>
    //             ))}
    //           </ul>
    //         ) : (
    //           <span>No categories available</span>
    //         )}
    //       </div>
    //     </Space>
    //   ),
    //   width: 100,
    // },

    // {
    //   title: "Brands",
    //   dataIndex: "brands",
    //   key: "brands",
    //   render: (_, record) => (
    //     <Space size={12}>
    //       <div className=" ">
    //         {record?.brands?.length > 0 ? (
    //           <ul>
    //             {record?.brands?.map((brand) => (
    //               <li key={brand.id}>{brand.name}</li>
    //             ))}
    //           </ul>
    //         ) : (
    //           <span>No brands available</span>
    //         )}
    //       </div>
    //     </Space>
    //   ),
    //   width: 100,
    // },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      width: 100,
      render: (_, record) => (
        <ActionButton
          handleUpdatestate={handleUpdatestate}
          categoryId={record.key}
          name={record.name}
          productclass={record.productClass}
        />
      ),
    },
  ];

  return (
    <Layout className=" space-y-6  bg-light overflow-auto">
      <Space className="flex justify-between">
        <Title level={3}>ProductBrand</Title>
        <ProductclassModel />
      </Space>

      <div className=" ">
        {loading ? (
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
