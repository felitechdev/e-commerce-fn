import React from "react";

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
  EditFilled,
  DeleteFilled,
  EyeFilled,
  UnorderedListOutlined,
  filters,
  FilterFilled,
  AppstoreFilled,
} from "@ant-design/icons";
import { Columns } from "./columns";
import { useState } from "react";
import ProductModel from "./ProductModel/ProductModel";
import {
  ActionButton,
  SingleproductModel,
} from "./ActionButton copy/ActionButton";
import axios from "axios";
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
import { CategoryImagesCards } from "./Category-Filter";
import { SellerFilters } from "./Seller-Filter";
import { set } from "js-cookie";
const { Title, Paragraph, Text } = Typography;

export async function searchproduct(name) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/search?name=${name}`
    );

    return response.data.data.products;
  } catch (error) {
    return [];
  }
}

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
  const [productClass, setProductClass] = useState("");
  const [SellerId, setSellerId] = useState("");
  const [Arrivarls, setArrivals] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [issearch, setIssearch] = useState(false);
  const [searchProduct, setSearchProduct] = useState([]);
  const [totalProduct, setTotalProduct] = useState(10);
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

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIssearch(true);
      searchproduct(searchQuery).then((data) => {
        const newData =
          data.length > 0
            ? (userRole == "seller"
                ? data?.filter((product) => product?.seller == user?.id)
                : data
              ).map((product) => {
                return {
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
                  published: new Date(
                    `${product.updatedAt}`
                  ).toLocaleDateString(),
                  address: product?.brandName,
                  category: product?.category,
                  productClass: product?.productClass,

                  seller: product?.seller,
                  featured: product?.featured?.isFeatured ? true : false,
                };
              })
            : [];

        setSearchProduct(newData);

        // setFilteredData(newData);
        // setDataSource(newData);
        // setFilteredProducts(data);
      });
    } else {
      setIssearch(false);
      setSearchProduct([]);
    }
  }, [searchQuery]);

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
  // const [searchQuery, setSearchQuery] = useState("");
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
      setSellerId("");
      setProductClass("");
      setArrivals(false);
      setIsViewAllChecked(true);
    } else {
      setIsViewAllChecked(false);
    }
  };

  useEffect(() => {
    if (Arrivarls || SellerId !== "" || productClass !== "") {
      setIsViewAllChecked(false);
    } else {
      setIsViewAllChecked(true);
    }
  }, [Arrivarls, SellerId, productClass]);

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
    setArrivals(true);
  };

  useEffect(() => {
    if (activeFilter === "NewArrivals") {
      setArrivals(true);
    } else {
      setArrivals(false);
    }
  }, [activeFilter]);

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

  const getItems = (record) => [
    {
      label: (
        <span
          className="font-semibold text-primary"
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
          className="font-semibold text-primary"
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

  // Fetch products only when the component mounts
  useEffect(() => {
    dispatch(
      fetchadminproduct({
        page: 1,
        pageSize: 10,
        productClass,
        SellerId,
        Arrivarls,
      })
    )
      .unwrap()
      .then((data) => {
        setTotalProduct(data?.totalProducts);
        setProducts(data?.data?.products);
      });
  }, [productClass, dispatch, SellerId, Arrivarls]);

  // useEffect(() => {
  //   if (!loading) {
  //     dispatch(fetchadminproduct({ page: 1, pageSize: 10, productClass }))
  //       .unwrap()
  //       .then((data) => setProducts(data))
  //       .catch((err) => console.error(err));
  //   }
  // }, [dispatch, loading, productClass]);

  useEffect(() => {
    // Generate dataSource based on the current products state
    const newData =
      products.length > 0
        ? (userRole == "seller"
            ? products?.filter((product) => product?.seller == user?.id)
            : products
          ).map((product) => {
            return {
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
              category: product?.category,
              productClass: product?.productClass,

              seller: product?.seller,
              featured: product?.featured?.isFeatured ? true : false,
            };
          })
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
                    onClick={() => handleFilterClickactive("NewArrivals")}
                  >
                    New Arrivals
                  </h3>
                </div>

                {activeFilter === "Category" && (
                  <CategoryImagesCards
                    productClass={productClass}
                    setProductClass={setProductClass}
                  />
                )}
                {activeFilter === "Seller" && (
                  <SellerFilters
                    SellerId={SellerId}
                    setSellerId={setSellerId}
                  />
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
                dataSource={
                  !issearch ? filteredData : searchProduct
                  // filteredProducts
                  //   .sort(
                  //   (a, b) => new Date(b.published) - new Date(a.published)
                  // )
                }
                // columns={Columns}
                columns={Columns({
                  onDownload,
                  handleUpdatestate,
                  handlecountorders,
                  src,
                  stock,
                })}
                // onChange={onChange}

                pagination={{
                  total: totalProduct,
                  defaultPageSize: 10,
                  current: currentpage,
                  defaultCurrent: 1,
                  style: {},
                  onChange: (page, pageSize) => {
                    setCurrentpage(page);
                    dispatch(
                      fetchadminproduct({
                        page: page,
                        pageSize: pageSize,
                        productClass,
                        SellerId,
                        Arrivarls,
                      })
                    )
                      .unwrap()
                      .then((data) => {
                        setTotalProduct(data?.totalProducts);
                        setProducts(data?.data?.products);
                      });
                  },
                }}
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
                  {filteredData.map((product) => {
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
                          <div className="font-semibold text-primary text-lg">
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
