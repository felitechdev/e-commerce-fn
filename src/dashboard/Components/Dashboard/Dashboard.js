import { Avatar, Button, Card, Col, Image, Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Space, Table, Typography, Input } from "antd";
import { Chart } from "../Chart/Chart";
import "./styles.css";
// import type { ColumnsType, TableProps } from 'antd/es/table';
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";
import { handlecountorders } from "../../Common/handleOrderTotal";
import { useUser } from "../../../context/UserContex";

import { OrderTable } from "./OrdersTable";
import { GetMyOrders } from "../../../APIs/Oreders";

// import actions
import { fetchadminproduct } from "../../Apis/Product";
import { Loader } from "../Loader/LoadingSpin";
import { DashboardTopCard, OrdersLineCahrt } from "../Chart/DashboardTopCard";

const { Title, Paragraph, Text } = Typography;

const src =
  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [viewallsellerproducts, setViewallsellerProducts] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [seller, setSeller] = useState([]);
  const { user: userRole } = useUser();

  const { orders, loadorders, errorders } = useSelector(
    (state) => state.orders
  );
  const token = Cookies.get("token");

  const toalEarning =
    orders && orders.reduce((acc, order) => acc + order.amount, 0);
  const now = new Date();
  const today = new Date(now.setDate(now.getDate()));
  const oneDayAgo = new Date(now.setDate(now.getDate() - 1));
  const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
  const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
  const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));

  const totalOrders = orders && orders.length;
  const totalEarning =
    orders && orders.reduce((acc, order) => acc + order.amount, 0);

  const totalDailyOrders =
    orders &&
    orders.filter((order) => new Date(order.createdAt) > oneDayAgo).length;
  const totalDailyEarning =
    orders &&
    orders
      .filter((order) => new Date(order.createdAt) > oneDayAgo)
      .reduce((acc, order) => acc + order.amount, 0);

  const totalWeeklyOrders =
    orders &&
    orders.filter((order) => new Date(order.createdAt) > oneWeekAgo).length;
  const totalWeeklyEarning =
    orders &&
    orders
      .filter((order) => new Date(order.createdAt) > oneWeekAgo)
      .reduce((acc, order) => acc + order.amount, 0);

  const totalMonthlyOrders =
    orders &&
    orders.filter((order) => new Date(order.createdAt) > oneMonthAgo).length;
  const totalMonthlyEarning =
    orders &&
    orders
      .filter((order) => new Date(order.createdAt) > oneMonthAgo)
      .reduce((acc, order) => acc + order.amount, 0);

  const totalYearlyOrders =
    orders &&
    orders.filter((order) => new Date(order.createdAt) > oneYearAgo).length;
  const totalYearlyEarning =
    orders &&
    orders
      .filter((order) => new Date(order.createdAt) > oneYearAgo)
      .reduce((acc, order) => acc + order.amount, 0);

  const containerRef = useRef(null);

  // redux
  const dispatch = useDispatch();
  const { dashproduct, status, err } = useSelector(
    (state) => state.adminProduct
  );
  const { user, load } = useSelector((state) => state.userlogin);
  const navigate = useNavigate();

  const handleViewAllSellerProducts = () => {
    setViewallsellerProducts(true);
  };
  const handleViewTopSellerProducts = () => {
    setViewallsellerProducts(false);
  };

  const chartheader = [
    { name: "Orders", value: totalOrders },
    { name: "Earning", value: 1024 },
    { name: "Customers", value: 1024 },
    {
      name: "Total Earning in General",
      value: totalEarning,
    },
  ];

  const numberOfCards = 5;

  const onDownload = () => {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  const FilterByNameInput = (
    <Input.Search
      placeholder="search product by name ......."
      allowClear
      enterButton="Search"
      size="large"
      className="w-[50%] my-0"
      value={value}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const newData = products
          .map((product) => ({
            key: `${product._id}`,
            name: [
              product.productImages.productThumbnail.url,
              product.name,
              product.description,
            ],
            price: product.price,
            stock: product.stockQuantity,
            // orders: product.deliveryInfo.length,
            published: new Date(`${product.updatedAt}`).toLocaleDateString(),
            address: product.brandName,
          }))
          .filter((entry) =>
            entry.name[1].toLowerCase().includes(currValue.toLowerCase())
          );

        setFilteredData(newData);
      }}
      onSearch={() => setDataSource(filteredData)} // Set the dataSource when searching
    />
  );

  const Columns = [
    {
      // title: `Product ${FilterByNameInput}`,
      title: "Product",
      dataIndex: "name",
      key: "name",
      colSpan: "1",
      render: (_, record, index) => (
        <Space size={12} className="" key={index}>
          <div className="image-preview-container">
            <Image
              width={50}
              className="rounded-md"
              src={record.name[0]}
              // preview={{ getContainer: () => containerRef.current }}
              preview={{
                toolbarRender: (
                  _,
                  {
                    transform: { scale },
                    actions: {
                      onFlipY,
                      onFlipX,
                      onRotateLeft,
                      onRotateRight,
                      onZoomOut,
                      onZoomIn,
                    },
                  }
                ) => (
                  <Space size={12} className="mx-w-full  h-screen">
                    <DownloadOutlined onClick={onDownload} />
                    <SwapOutlined rotate={90} onClick={onFlipY} />
                    <SwapOutlined onClick={onFlipX} />
                    <RotateLeftOutlined onClick={onRotateLeft} />
                    <RotateRightOutlined onClick={onRotateRight} />
                    <ZoomOutOutlined
                      disabled={scale === 1}
                      onClick={onZoomOut}
                    />
                    <ZoomInOutlined
                      disabled={scale === 50}
                      onClick={onZoomIn}
                    />
                  </Space>
                ),
              }}
            />
          </div>
          <div className="  ">
            <Title level={5} className="w-full">
              {record.name[1]}
            </Title>
            <Text className="w-full">
              {/* {record.name[2]} */}
              <div
                dangerouslySetInnerHTML={{
                  __html: record.name[2].slice(0, 30) + "....",
                }}
              ></div>
            </Text>
          </div>
        </Space>
      ),

      width: 200,
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      // sorter: (a, b) => a.age - b.age,
    },

    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",
      alignItems: "center",
      width: 100,

      render: (_, record) => {
        const order = orders && handlecountorders(orders, record.key);
        return (
          <div className="w-full text-left ">
            <span>total: {order}</span>
          </div>
        );
      },
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",
      width: 100,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Brand Name",
      dataIndex: "address",
      key: "address",
      filter: true,
      width: 100,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {};

  // implement redux
  useEffect(() => {
    if (status) {
      dispatch(fetchadminproduct())
        .unwrap()
        .then((data) => {
          setProducts(data);
        });
    }
  }, [status, dispatch]);

  // Fetch products only when the component mounts
  useEffect(() => {
    if (!products.length) {
      dispatch(fetchadminproduct())
        .unwrap()
        .then((data) => {
          setProducts(data);
        });
    }
  }, [dispatch, products]);

  useEffect(() => {
    // Generate dataSource based on the current products state
    const newData =
      products.length > 0
        ? products.map((product) => ({
            key: product.id,
            name: [
              product.productImages.productThumbnail.url,
              product.name,
              product.description,
            ],
            price: product.price,
            stock: product.stockQuantity,
            // orders: product.deliveryInfo.length,
            published: new Date(`${product.updatedAt}`).toLocaleDateString(),
            address: product.brandName,
          }))
        : [];
    setDataSource(newData);
    setFilteredData(newData); // Update filteredData as well

    const sellerdata =
      products.length > 0
        ? products.map((product) => ({
            key: product.id,
            logo: product.productImages.productThumbnail.url,
            name: product.name,
            amount: product.price,
            stock: product.stockQuantity,
            product: product.name,
          }))
        : [];
    setSeller(sellerdata);
  }, [products, dispatch]);

  useEffect(() => {
    dispatch(GetMyOrders(token))
      .unwrap()
      .then((data) => {
        return data;
      })
      .catch((error) => {});

    setInterval(() => {
      dispatch(GetMyOrders(token))
        .unwrap()
        .then((data) => {
          return data;
        })
        .catch((error) => {});
    }, 3600000);
  }, []);

  return (
    <Layout className="space-y-6 p-2  bg-light overflow-auto">
      <div ref={containerRef} className="">
        <DashboardTopCard />
      </div>
      {/* <div className="w-full flex flex-col md:flex-row   md:space-x-4 p-3 bg-[white]"> */}
      <OrdersLineCahrt />
      {/* <OrdersLineCahrt /> */}
      {/* </div> */}

      {userRole.role == "admin" && (
        <div className=" hidden w-full  space-x-4 p-3 bg-[white]">
          {/* display loading spinner */}
          {status == "loading" ? (
            <>
              <Loader className=" text-primary flex items-center w-full justify-center" />
              <span className=" text-primary flex items-center  justify-center">
                Loading....
              </span>
            </>
          ) : (
            <div className="w-full flex  flex-col-reverse lg:flex-row space-y-1    lg:space-x-4  ">
              <Row className=" w-full lg:w-[50%] p-0   h-min     ">
                {FilterByNameInput}

                {/* <Space className="w-full p-4 mb-6 bg-tableborder rounded-md">
                {FilterByNameInput}
              </Space> */}

                <Table
                  rowClassName="even:bg-[#f1f5f9]  hover:cursor-pointer custom-table-row "
                  // rowSelection={{
                  //   type: "checkbox",
                  // }}
                  size="small"
                  tableLayout="fixed"
                  bordered={false}
                  style={{
                    marginTop: "10px",
                    position: "sticky",
                    bottom: 0,
                    top: 0,
                    left: 0,
                    zIndex: 1,

                    // border: "2px solid #838383",
                    padding: "5px",
                  }}
                  dataSource={filteredData.sort(
                    (a, b) => new Date(b.published) - new Date(a.published)
                  )}
                  columns={Columns}
                  scroll={{ x: 500 }}
                  className="w-full   "
                />
              </Row>

              <Row className=" w-full lg:w-[50%]  p-0   ">
                <OrderTable
                  style={{
                    position: "sticky",
                    bottom: 0,
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    border: "2px solid #838383",
                    padding: "10px",
                  }}
                />
              </Row>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};
