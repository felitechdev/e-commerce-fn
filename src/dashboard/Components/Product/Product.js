import {
  Button,
  Image,
  Layout,
  Space,
  Table,
  Typography,
  Input,
  Tag,
  Row,
  Col,
} from "antd";
import { Checkbox } from "antd";
import { Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
// import type { TableProps } from 'antd/es/table';
import { useEffect } from "react";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  SearchOutlined,
  UndoOutlined,
  StarFilled,
  CloseOutlined,
  EditFilled,
  DeleteFilled,
  EyeFilled,
  UnorderedListOutlined,
  filters,
  FilterFilled,
  AppstoreFilled,
} from "@ant-design/icons";

import { useState } from "react";
import ProductModel from "./ProductModel/ProductModel";
import {
  ActionButton,
  SingleproductModel,
} from "./ActionButton copy/ActionButton";
import { CategoryList } from "../filterproducts/categorylist";
import { useNavigate } from "react-router-dom";
// import actions
import { fetchadminproduct } from "../../Apis/Product";
import { Loader } from "../Loader/LoadingSpin";
import "./style.css";
import { SellerList } from "../filterproducts/sellerlist";
import { useUser } from "../../../context/UserContex";
import { ActionMenuButton } from "../Button/AvtionButton";
import UpdateProductModel from "./ProductModel/updateproductModel";
import { DashBoardSearch } from "../Orders/Ordersv2/orders";

const { Title, Paragraph, Text } = Typography;

export const DashProducts = () => {
  const [products, setProducts] = useState([]);
  const [src, setSrc] = useState("");
  const [prodName, setProdName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedsellerId, setSelectedsellerId] = useState(null);
  const [isViewAllChecked, setIsViewAllChecked] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedlist, setSelectedlist] = useState(true);
  // handle update product model
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [productId, setProductId] = useState(null);
  const handleclose = () => {
    setShowUpdateModel(false);
  };
  // handle view sible product
  const [singleId, setSingleId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const handleCancelview = () => {
    setIsModalOpen(false);
  };

  // redux
  const dispatch = useDispatch();
  const { dashproduct, loading, err } = useSelector(
    (state) => state.adminProduct
  );

  const { orders, loadorders, errorders } = useSelector(
    (state) => state.orders
  );
  // const { user, load } = useSelector((state) => state.userlogin);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { user, onLogout } = useUser();
  const userRole = user?.role;

  useEffect(() => {}, [filteredData]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  const filteredProducts = filteredData.filter(
    (product) =>
      product.name[1].toLowerCase().toLowerCase().includes(searchQuery)
    //  ||
    // user.email.toLowerCase().includes(searchQuery)
  );

  const FilterByNameInput = (
    <DashBoardSearch
      handleSearch={handleSearch}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      placeholder={"Search by name"}
    />
  );

  // select list or drid display
  const handleDisplay = () => {
    setSelectedlist(!selectedlist);
  };

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

  // update get product state after delete crud operations
  const handleUpdatestate = (productId) => {
    const updated = filteredData.filter((product) => product.key !== productId);
    setFilteredData(updated);
  };

  //- handle filter open   on category
  const handleFilterClick = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsViewAllChecked(false); // Uncheck the checkbox
  };
  const handleViewAll = (e) => {
    if (e.target.checked) {
      setSelectedCategoryId(null);
      setSelectedsellerId(null);
      setIsViewAllChecked(true); // Check the checkbox
    }
  };
  const handleFilterClickactive = (filter) => {
    if (filter === activeFilter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  //- handle filter open   on seller

  const handleSellerSelect = (sellerId) => {
    setSelectedsellerId(sellerId);
    setIsViewAllChecked(false); // Uncheck the checkbox
  };

  const handleNewArrivals = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const filteredProducts = products.filter(
      (product) => new Date(product.updatedAt) >= oneWeekAgo
    );

    setFilteredData(filteredProducts);
  };

  if (activeFilter === "NewArrivals") {
    handleNewArrivals();
  }

  // -calcurate order fo each product
  const handlecountorders = (productId) => {
    const itemId = productId; //- Item to calculate the total quantity
    let totalQuantity = 0;

    const ordered = orders?.map((order) => {
      order.items.forEach((item) => {
        if (item.product === itemId) {
          totalQuantity += item.quantity;
        }
      });

      return {
        ...order,
        totalQuantity: totalQuantity,
      };
    });

    return totalQuantity;
  };

  const Columns = [
    {
      // title: `Product ${FilterByNameInput}`,
      title: "Product",
      dataIndex: "name",
      key: "name",
      colSpan: "1",
      render: (_, record, index) => (
        <Space size={12} className="" key={index}>
          <Image
            width={50}
            className="rounded-md"
            src={record.name[0]}
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
                    onReset,
                  },
                  // actions: {
                  //   onFlipY,
                  //   onFlipX,
                  //   onRotateLeft,
                  //   onRotateRight,
                  //   onZoomOut,
                  //   onZoomIn,
                  //   onClose,
                  // },
                }
              ) => (
                <Space size={12} className="toolbar-wrapper">
                  <DownloadOutlined onClick={() => onDownload(src)} />
                  <SwapOutlined rotate={90} onClick={onFlipY} />
                  <SwapOutlined onClick={onFlipX} />
                  <RotateLeftOutlined onClick={onRotateLeft} />
                  <RotateRightOutlined onClick={onRotateRight} />
                  <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                  <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                  <UndoOutlined onClick={onReset} />
                </Space>
              ),
            }}
          />

          <div className=" overflow-auto ">
            <strong className="w-full">{record.name[1]}</strong>

            {/* display value as html */}
            {/* <div
              className="w-full overflow-auto  "
              dangerouslySetInnerHTML={{
                __html: record.name[2].slice(0, 30) + "...",
              }}
            /> */}
          </div>
        </Space>
      ),

      width: 100,
    },
    {
      title: "Stock",
      dataIndex: { stock },
      key: "Stock",
      width: 60,
      render: (_, record) => (
        <div className="w-full text-start">
          <span>{record.stock} units</span>
        </div>
      ),
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      width: 100,
      render: (_, record) => (
        <div className="w-full text-start">
          <span>{record.price.toLocaleString()} RWF</span>
        </div>
      ),
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      width: 100,
      render: (_, record) => (
        <div className="w-full text-start">
          <span>
            {record?.commission ? record?.commission * 100 + "%" : "No "}
          </span>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      width: 100,
      render: (_, record) => (
        <>
          <ActionButton
            handleUpdatestate={handleUpdatestate}
            productId={record.key}
          />
          {/* <EditFilled className=" text-icon2 mr-2" />
          <EyeFilled className=" text-icon1 mr-2" />
          <DeleteFilled className=" text-icon3" /> */}

          {/* <ActionButton /> */}
        </>
      ),
    },
    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",
      width: 30,
      render: (_, record) => {
        const orders = handlecountorders(record.key);

        return (
          <div className="w-full text-start">
            <span>total: {orders}</span>
          </div>
        );
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 50,
      render: (_, record) => (
        <div className="w-full text-start">
          <span>
            **
            <StarFilled className="text-icon1" />
          </span>
        </div>
      ),
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",
      width: 100,
      // sorter: (a, b) => a.age - b.age,
    },
  ];

  const getItems = (record) => [
    {
      label: (
        <span
          className="font-bold text-primary"
          onClick={() => {
            setShowUpdateModel(true);
            setProductId(record.key);
          }}
        >
          Update
        </span>
      ),
      key: "update",
      icon: (
        <>
          <EditFilled
            className=" text-icon2 mr-2"
            onClick={() => {
              setShowUpdateModel(true);
              setProductId(record.key);
            }}
          />
        </>
      ),
    },

    {
      label: (
        <span
          className="font-bold text-primary"
          onClick={() => {
            setIsModalOpen(true);
            setSingleId(record.key);
          }}
        >
          View more
        </span>
      ),
      key: "view",
      icon: (
        <EyeFilled
          className=" text-icon1 mr-2"
          onClick={() => {
            setIsModalOpen(true);
            setSingleId(record.key);
          }}
        />
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {};
  //  handle update product state after create product
  const handlecreateproduct = (data) => {
    setProducts((prevProducts) => [...prevProducts, data]);
  };

  //- filter product by category
  useEffect(() => {
    let filteredProducts;
    if (selectedCategoryId) {
      filteredProducts = dashproduct.filter(
        (product) => product?.category?.id == selectedCategoryId
      );
    } else {
      filteredProducts = dashproduct;
      setIsViewAllChecked(true); // Check the checkbox
    }

    const formattedFilteredProducts =
      filteredProducts.length > 0
        ? (userRole == "seller"
            ? filteredProducts?.filter((product) => product?.seller == user?.id)
            : filteredProducts
          ).map((product) => ({
            key: product.id,
            name: [
              product.productImages?.productThumbnail?.url,
              product.name,
              product.description,
            ],
            price: product.price,
            commission: product?.seller_commission,
            stock: product.stockQuantity,
            orders: handlecountorders(product.id),
            published: new Date(`${product.updatedAt}`).toLocaleDateString(),
            address: product?.brandName,
            category: product?.category?.id,
            seller: product?.seller,
          }))
        : [];

    setFilteredData(formattedFilteredProducts);
  }, [selectedCategoryId]);

  //- filter product by seller
  useEffect(() => {
    let filteredProducts;

    if (selectedsellerId) {
      filteredProducts = dashproduct.filter(
        (product) => product?.seller?.id == selectedsellerId
      );
    } else {
      filteredProducts = dashproduct;
      setIsViewAllChecked(true); // Check the checkbox
    }

    const formattedFilteredProducts =
      filteredProducts.length > 0
        ? (userRole == "seller"
            ? filteredProducts?.filter((product) => product?.seller == user?.id)
            : filteredProducts
          ).map((product) => ({
            key: product.id,
            name: [
              product.productImages?.productThumbnail?.url,
              product.name,
              product.description,
            ],
            price: product.price,
            commission: product?.seller_commission,
            stock: product.stockQuantity,
            orders: handlecountorders(product.id),
            published: new Date(`${product.updatedAt}`).toLocaleDateString(),
            address: product?.brandName,
            category: product?.category?.id,
            seller: product?.seller,
          }))
        : [];

    setFilteredData(formattedFilteredProducts);
  }, [selectedsellerId]);

  // implement redux
  useEffect(() => {
    if (loading) {
      dispatch(fetchadminproduct())
        .unwrap()
        .then((data) => {
          setProducts(data);
        });
    }
  }, [loading, dispatch]);

  // Fetch products only when the component mounts
  useEffect(() => {
    if (!products.length) {
      dispatch(fetchadminproduct())
        .unwrap()
        .then((data) => {
          setProducts(data);
        });
    }
  }, [dispatch]);

  useEffect(() => {
    // Generate dataSource based on the current products state
    const newData =
      products.length > 0
        ? (userRole == "seller"
            ? products?.filter((product) => product?.seller == user?.id)
            : products
          ).map((product) => ({
            key: product.id,
            name: [
              product.productImages?.productThumbnail?.url,
              product.name,
              product.description,
            ],
            price: product.price,
            stock: product.stockQuantity,
            commission: product?.seller_commission,
            orders: handlecountorders(product.id),
            published: new Date(`${product.updatedAt}`).toLocaleDateString(),
            address: product?.brandName,
            category: product?.category?.id,
            seller: product?.seller,
          }))
        : [];
    setDataSource(newData);
    setFilteredData(newData);
  }, [products]);

  return (
    <Layout className="space-y-6 p-2    overflow-auto bg-[white]">
      {/* handle open update product model  */}

      {showUpdateModel && productId && (
        <UpdateProductModel
          handleclose={handleclose}
          Id={productId}
          isModalOpen={showUpdateModel}
        />
      )}

      {isModalOpen && singleId && (
        <SingleproductModel
          Id={singleId}
          isModalOpen={isModalOpen}
          handleCancelUppdate={handleCancelview}
        />
      )}

      <Space className="flex justify-between">
        <Space className="flex justify-between">
          <h1 className="bold_text"> All Products</h1>
        </Space>
        <div className="flex justify-center space-x-5">
          <UnorderedListOutlined
            onClick={handleDisplay}
            className={`${
              selectedlist ? "text-primary border-b-4 border-b-secondary" : ""
            }text-lg md:text-2xl `}
          />
          <AppstoreFilled
            onClick={handleDisplay}
            className={`${
              !selectedlist ? "text-primary border-b-4 border-b-secondary" : ""
            } text-lg md:text-2xl `}
          />

          <ProductModel handlecreateproduct={handlecreateproduct} />
        </div>
      </Space>

      <div>
        {/* display loading spinner */}
        {loading ? (
          <>
            <Loader className=" text-primary flex items-center justify-center" />
            <span className=" text-primary flex items-center  justify-center">
              Loading....
            </span>
          </>
        ) : (
          <>
            <div className="flex  w-full justify-start space-x-5 ">
              {FilterByNameInput}
              <FilterFilled
                className="text-[green] text-2xl"
                onClick={handleFilterClick}
              />
            </div>

            {isFilterVisible && (
              <Card
                title="Filter by "
                headStyle={{
                  backgroundColor: "#838383",
                  fontWeight: "bold",
                }}
                style={{
                  border: "0px solid #000",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  <Checkbox onChange={handleViewAll} checked={isViewAllChecked}>
                    View All
                  </Checkbox>
                  {userRole !== "seller" && (
                    <h3
                      className={`filterOption p-x-10 rounded-sm ${
                        activeFilter === "Seller"
                          ? "underline bg-primary text-[white] px-5"
                          : ""
                      }`}
                      onClick={() => handleFilterClickactive("Seller")}
                    >
                      Seller
                    </h3>
                  )}
                  <h3
                    className={`filterOption p-x-10 rounded-sm ${
                      activeFilter === "Category"
                        ? "underline bg-primary text-[white] px-5"
                        : ""
                    }`}
                    onClick={() => handleFilterClickactive("Category")}
                  >
                    Category
                  </h3>

                  <h3
                    className={`filterOption p-x-10 rounded-sm ${
                      activeFilter === "NewArrivals" ? "underline" : ""
                    }`}
                    onClick={() => handleFilterClick("NewArrivals")}
                  >
                    New Arrivals
                  </h3>
                </div>

                {activeFilter === "Category" && (
                  <CategoryList onCategorySelect={handleCategorySelect} />
                )}
                {activeFilter === "Seller" && (
                  <SellerList onSellersellect={handleSellerSelect} />
                )}
              </Card>
            )}

            {selectedlist ? (
              <Table
                rowClassName=" hover:cursor-pointer"
                size="small"
                tableLayout="fixed"
                bordered={false}
                style={{
                  position: "sticky",
                  bottom: 0,
                  top: 0,
                  left: 0,
                  zIndex: 1,
                }}
                dataSource={filteredProducts.sort(
                  (a, b) => new Date(b.published) - new Date(a.published)
                )}
                columns={Columns}
                onChange={onChange}
                scroll={{ x: 1500, y: 1200 }}
              />
            ) : (
              <div className="mt-5 ">
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                  }}
                  className="w-full "
                >
                  {filteredProducts.map((product) => {
                    return (
                      <Col
                        className="gutter-row text-center "
                        key={product.key}
                        // span={4}
                        md={6}
                        sml={12}
                        xsm={24}
                      >
                        <div
                          style={{}}
                          className=" rounded    shadow-md  p-2 m-3"
                        >
                          <Image
                            width="80%"
                            className="rounded-md !h-[250px]  "
                            src={product.name[0]}
                            preview={false}
                          />
                          <div className=" font-medium text-xl">
                            {product.name[1]}
                          </div>

                          <span className="bg-primary rounded-full opacity-70 text-[red] absolute top-5  right-10 ">
                            <ActionMenuButton items={getItems(product)} />
                          </span>

                          <div
                            className="font-medium  overflow-auto break-words px-5   "
                            dangerouslySetInnerHTML={{
                              __html: product?.name[2]?.slice(0, 150) + "...",
                            }}
                          />
                          <div className="font-bold text-primary text-lg">
                            $ {product.price}
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};
