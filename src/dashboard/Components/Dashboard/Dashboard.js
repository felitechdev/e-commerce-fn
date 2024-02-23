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
import { useState, useEffect, useRef } from "react";
import { handlecountorders } from "../../Common/handleOrderTotal";

import { OrderTable } from "./OrdersTable";

// import actions
import { fetchadminproduct } from "../../Apis/Product";
import { Loader } from "../Loader/LoadingSpin";

import Cookies from "js-cookie";

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

  const { orders, loadorders, errorders } = useSelector(
    (state) => state.orders
  );

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

  const category = [
    { name: "Orders", value: 1024 },
    { name: "Earning", value: 1024 },
    { name: "Customers", value: 1024 },
    { name: "Total Earning", value: 1024 },
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
                  __html: record.name[2].slice(0, 20) + "....",
                }}
              ></div>
            </Text>
          </div>
        </Space>
      ),

      width: 200,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      alignItems: "center",
      width: 100,
      // sorter: (a, b) => a.age - b.age,
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

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // // implement redux
  // useEffect(() => {
  //   if (status == "idle") {
  //     dispatch(fetchadminproduct())
  //       .unwrap()
  //       .then((data) => {
  //         setProducts(data);
  //       });
  //   }

  //   // if (product && status == "success") {
  //   setProducts(product);
  //   // }

  //   // check if user is admin first
  //   // if (user && user.data.user.role == "admin") {
  //   //   console.log("woooo you are add", user.data.user.role);
  //   // } else {
  //   // navigate("/");
  //   // }
  // }, [dispatch]);

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
          console.log("Products fetched", data);
          setProducts(data);
        });
    }
  }, [dispatch, products]);

  useEffect(() => {
    // Generate dataSource based on the current products state
    const newData = products.map((product) => ({
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
    }));
    setDataSource(newData);
    setFilteredData(newData); // Update filteredData as well

    const sellerdata = products.map((product) => ({
      key: product.id,
      logo: product.productImages.productThumbnail.url,
      name: product.name,
      amount: product.price,
      stock: product.stockQuantity,
      product: product.name,
    }));
    setSeller(sellerdata);
  }, [products, dispatch]);

  return (
    <Layout className="space-y-6  bg-light overflow-auto">
      <div ref={containerRef} className=" border border-2-[red]"></div>
      <div className="w-full flex flex-col md:flex-row   md:space-x-4 p-3 bg-[white]">
        <Row className=" w-full md:w-[60%] p-3 bg-[#e2e8f0] ">
          <Row className="w-full p-4 mb-6 bg-tableborder rounded-md">
            {category.map((items, index) => (
              <Col className="text-center" span={6}>
                <Title level={5}>{items.value}</Title>
                <Text>{items.name}</Text>
              </Col>
            ))}
          </Row>
          <Chart />
        </Row>
        {/* display loading spinner */}
        {status == "loading" ? (
          <Loader className=" text-primary w-full  flex items-center justify-center" />
        ) : (
          <Card
            className="h-[26rem] w-full md:w-[40%]   overflow-auto"
            title="Top Seller"
            extra={<Space>Report</Space>}
            style={{
              border: "2px solid #838383",
            }}
            actions={[
              <Button
                style={{}}
                onClick={
                  viewallsellerproducts
                    ? handleViewTopSellerProducts
                    : handleViewAllSellerProducts
                }
              >
                {viewallsellerproducts
                  ? " View Top Sellers"
                  : "View All Sellers"}
              </Button>,
            ]}
          >
            {viewallsellerproducts
              ? [...products]
                  .sort((a, b) => b.published - a.published)
                  .map((product) => (
                    <Card type="inner" key={product._id}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          margin: 0,
                          borderBottom: "2px solid #838383",
                        }}
                      >
                        <Avatar
                          style={{
                            width: 50,
                            height: 50,
                            backgroundColor: "#000",
                            marginLeft: " 3px",
                          }}
                          src={product.productImages.productThumbnail.url}
                        />
                        <div className="ml-[2px] mt-0 flex-1 ">
                          <div className="flex justify-between items-center">
                            <Text className="  w-[30%]   font-bold text-center ">
                              {product.brandName}
                            </Text>
                            <Col className=" w-[30%] text-start  h-10  ">
                              <Text className="font-bold">delivery</Text>
                              {/* <Paragraph className="text-sm">
                                {product.deliveryInfo.length}
                              </Paragraph> */}
                            </Col>
                            <Row style={{ alignItems: "center" }}>
                              <Col span={16}>{product.stockQuantity}</Col>
                              <Col span={16}>Stocks</Col>
                            </Row>
                            <Button>{product.price}</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
              : [...products]

                  //  .sort((a, b) => b.deliveryInfo.length - a.deliveryInfo.length)
                  .sort((a, b) => b.published - a.published)
                  .slice(0, 5)
                  .map((product) => (
                    <Card type="inner" key={product._id}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          margin: 0,
                          borderBottom: "2px solid #838383",
                        }}
                      >
                        <Avatar
                          style={{
                            width: 50,
                            height: 50,
                            backgroundColor: "#000",
                            marginLeft: " 3px",
                          }}
                          src={product.productImages.productThumbnail.url}
                        />
                        <div className="ml-[2px] mt-0 flex-1 ">
                          <div className="flex justify-between items-center">
                            <Text className="  w-[30%]   font-bold text-center ">
                              {product.brandName}
                            </Text>
                            <Col className=" w-[30%] text-start  h-10  ">
                              <Text className="font-bold">delivery</Text>
                              <Paragraph className="text-sm">
                                {/* {product.deliveryInfo.length} */}
                              </Paragraph>
                            </Col>
                            <Row style={{ alignItems: "center" }}>
                              <Col span={16}>{product.stockQuantity}</Col>
                              <Col span={16}>Stocks</Col>
                            </Row>
                            <Button>{product.price}</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
          </Card>
        )}
      </div>
      <div className="w-full flex flex-col md:flex-row md:space-x-4 p-3 bg-[white]">
        {/* display loading spinner */}
        {status == "loading" ? (
          <>
            <Loader className=" text-primary flex items-center w-full justify-center" />
            <span className=" text-primary flex items-center  justify-center">
              Loading....
            </span>
          </>
        ) : (
          <div className="w-full flex flex-col-reverse lg:flex-row   md:space-x-4  bg-[white]">
            <Row className=" w-full lg:w-[60%] p-0     ">
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
                  position: "sticky",
                  bottom: 0,
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  // border: "2px solid #838383",
                  padding: "5px",
                }}
                dataSource={filteredData}
                columns={Columns}
                scroll={{ x: 500 }}
                className="w-full   "
              />
            </Row>

            <Row className=" w-full lg:w-[40%]  p-0   ">
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
    </Layout>
  );
};
