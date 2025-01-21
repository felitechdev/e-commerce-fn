// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Row, Col, Button, Table, Tag, Space, Image } from "antd";
// import { useNavigate, useParams } from "react-router-dom";
// import { FaArrowCircleLeft } from "react-icons/fa";
// import Cookies from "js-cookie";
// import { useUser } from "../../../../../context/UserContex";
// import { getorderDetail } from "../../../../../APIs/Oreders";
// import { GetMyOrders } from "../../../../../APIs/Oreders";
// import { statusColors } from "../../../../../common/statuscolor";
// import { fetchProduct } from "../../../../../APIs/Product";
// import { RepayOrder } from "../../Order/repay-order";

// const OrderDetail = () => {
//   const token = Cookies.get("token");
//   const user = useUser().user;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [ord, setOrd] = useState([]);
//   const [orders, setOrders] = useState();
//   const [productnames, setProductnames] = useState([]);
//   const { loading, users } = useSelector((state) => state.users);
//   const UserRole = user?.role;

//   useEffect(() => {
//     if (token) {
//       dispatch(getorderDetail({ token, id }))
//         .unwrap()
//         .then((data) => {
//           if (data) {
//             setOrders(data?.order);
//           }
//         })
//         .catch((error) => {});
//     }
//   }, [dispatch, token, id]);

//   useEffect(() => {
//     if (!ord.length) {
//       dispatch(GetMyOrders(token))
//         .unwrap()
//         .then((data) => {
//           if (data?.data && data?.status === "success") {
//             setOrd(data?.data?.orders);
//           }
//         })
//         .catch((error) => {});
//     }
//   }, [dispatch, ord, token]);

//   let sellers, customer;
//   async function fetchProductData() {
//     let products = await Promise.all(
//       orders?.items?.map((item) => fetchProduct(item.product))
//     );

//     let productnames = await products.map((product) => {
//       return {
//         id: product?.id,
//         name: product?.name,
//       };
//     });

//     setProductnames(productnames);

//     sellers =
//       !loading &&
//       products.map(
//         (product) =>
//           users?.find((user) => user?._id === product?.seller)?.firstName
//       );
//   }

//   if (user?.role === "customer") {
//     customer = user;
//   }

//   useEffect(() => {
//     if (orders && orders.items && !loading) {
//       customer = users?.find((user) => user?.id == orders.customer);

//       fetchProductData();
//     }
//   }, [orders, loading]);

//   const columns = [
//     {
//       title: "Products",
//       dataIndex: "name",
//       key: "name",
//       render: (text, record) => {
//         return (
//           <div className="flex ">
//             <h3 className="font-semibold capitalize">
//               {record?.product?.name || "No product name"}
//             </h3>
//           </div>
//         );
//       },
//     },

//     {
//       title: "Image",
//       dataIndex: "name",
//       key: "name",
//       render: (text, record) => (
//         <Image
//           width={50}
//           src={record.productThumbnail || "https://via.placeholder.com/150"}
//         />
//       ),
//     },
//     {
//       title: "Color",
//       dataIndex: ["variation", "color"],
//       key: "color",
//       render: (color) => (
//         <div className="flex items-center space-x-2">
//           {color ? (
//             <>
//               <span
//                 className={`bg-[${color.toLowerCase()}] w-5 h-5 rounded-full`}
//               ></span>
//               <span>{color}</span>
//             </>
//           ) : (
//             <span>No color </span>
//           )}
//         </div>
//       ),
//     },
//     { title: "Quantity", dataIndex: "quantity", key: "quantity" },
//     { title: "Size", dataIndex: ["variation", "size"], key: "size" },
//     { title: "Price", dataIndex: "price", key: "price" },
  
//   ];


//   // {
//   //   "status": "success",
//   //   "data": {
//   //   "order": [
//   //   {
//   //   "_id": "66e929f78646f02c0567e971",
//   //   "items": [
//   //   {
//   //   "itemDetails": {
//   //   "id": "66e82c43f129995bbf792a3f",
//   //   "name": "muvura sofa barn wood chair",
//   //   "description": "<p>Muvura sofa. Complete the rustic transformation of your living room to the great outdoors with our Giant Grove Reclaimed Barn Wood Recliner.</p><p>&nbsp;</p><p><strong>Features</strong></p><p>&nbsp;</p><ul><li>Made from reclaimed barn wood.</li><li>Hand carved pine tree design.</li><li>Choice of leather fabric or premium genuine leather seat cushions.</li><li>&nbsp;</li></ul>",
//   //   "price": 2592000,
//   //   "seller": "66681c28f2a062c1c8b35e56",
//   //   "thumbnail": "https://res.cloudinary.com/dccszmlim/image/upload/v1726491538/felitechnology_E-commerce_HAHA/ryekpp2ubp8zp1szmwpa.jpg"
//   //   },
//   //   "quantity": 1,
//   //   "sellerPaymentStatus": "due"
//   //   }
//   //   ],
//   //   "transactionId": null,
//   //   "status": "awaits payment",
//   //   "tx_ref": "fc7a27f4-4f24-4d3c-89e4-5040e1eb7aa9",
//   //   "createdAt": "2024-09-17T07:04:23.652Z"
//   //   }
//   //   ]
//   //   }
//   //   }

//   let sellerColumns = [


//     {

//     }

//   ]


//   if (user.role === "admin") {
//     columns.push({
//       title: "Seller Payment",
//       dataIndex: "sellerPaymentStatus",
//       key: "sellerPaymentStatus",
//       render: (text, record) => {
//         return (
//           <div>
//             <Tag
//               color={statusColors[record.sellerPaymentStatus]}
//               style={{ color: "black", fontWeight: "bold" }}
//               className="capitalize"
//             >
//               {record.sellerPaymentStatus}
//             </Tag>
//           </div>
//         );
//       },
//     });
//   }

  

//   if (user?.role === "admin" || user?.role === "customer") {
//   console.log("orders", orders.items ,UserRole);}  else
//   {

//     console.log("single order", orders[0].items);

//   }

  

//   return (
//     <Col span={24}>
//       {orders && (
//         <div className=" mb-3  cursor-pointer !p-2 bg-[#f5fafc]">
//           <Button onClick={() => navigate(-1)}>Back</Button>
//           <h2>
//             Order #{orders?.id} -
//             <Tag
//               color={statusColors[orders.status]}
//               style={{ color: "white", fontWeight: "bold" }}
//               className="capitalize"
//             >
//               {orders.status}
//             </Tag>
//             {orders.status == "awaits payment" && (
//               <div
//                 onClick={(e) => {
//                   e.stopPropagation();
//                 }}
//               >
//                 {/* <Tag
//                   style={{ color: "black", fontWeight: "bold" }}
//                   className="capitalize  !text-white  !bg-primary"
//                 >
//                   Repay
        
//                 </Tag> */}

//                 <RepayOrder />
//               </div>
//             )}
//           </h2>

//           <div className=" block bg-white  overflow-auto  m-0  md:flex ">
//             <div className="flex  m-3 flex-row space-x-4 cursor-pointer overflow-auto">
//               <div>
//                 <span
//                   className={`text-sm font-semibold   bg-white rounded-t-md "

//                 `}
//                 >
//                   Names
//                 </span>
//                 <p>
//                   {orders?.momo_payload?.fullname ||
//                     customer?.firstName + customer?.lastName}
//                 </p>
//               </div>

//               <div>
//                 <span
//                   className={`text-sm font-semibold   bg-white rounded-t-md "

//                 `}
//                 >
//                   Country
//                 </span>
//                 <p>{orders?.shippingAddress?.country}</p>
//               </div>

//               <div>
//                 <span
//                   className={`text-sm font-semibold   bg-white rounded-t-md "

//                 `}
//                 >
//                   City
//                 </span>
//                 <p>
//                   {orders?.shippingAddress?.province} -
//                   {orders?.shippingAddress?.district}
//                 </p>
//               </div>
//             </div>

//              if (user?.role === "admin" || user?.role === "customer") {
//    <Table
//               dataSource={orders.items}
//               columns={columns}
//               rowKey="product"
//               style={{ width: "100%" }}
//             /> } else {

//             }
//           </div>
//         </div>
//       )}
//     </Col>
//   );
// };

// export default OrderDetail;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Button, Table, Tag, Image } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useUser } from "../../../../../context/UserContex";
import { getorderDetail, GetMyOrders } from "../../../../../APIs/Oreders";
import { statusColors } from "../../../../../common/statuscolor";
import { fetchProduct } from "../../../../../APIs/Product";
import { RepayOrder } from "../../Order/repay-order";

const OrderDetail = () => {
  const token = Cookies.get("token");
  const user = useUser().user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [ord, setOrd] = useState([]);
  const [orders, setOrders] = useState();
  const [productnames, setProductnames] = useState([]);
  const { loading, users } = useSelector((state) => state.users);
  const UserRole = user?.role;

  useEffect(() => {
    if (token) {
      dispatch(getorderDetail({ token, id }))
        .unwrap()
        .then((data) => {
          if (data) {
            setOrders(data?.order);
          }
        })
        .catch((error) => {});
    }
  }, [dispatch, token, id]);

  useEffect(() => {
    if (!ord.length) {
      dispatch(GetMyOrders(token))
        .unwrap()
        .then((data) => {
          if (data?.data && data?.status === "success") {
            setOrd(data?.data?.orders);
          }
        })
        .catch((error) => {});
    }
  }, [dispatch, ord, token]);

  let sellers, customer;
  async function fetchProductData() {
    let products = await Promise.all(
      orders?.items?.map((item) => fetchProduct(item.product))
    );

    let productnames = await products.map((product) => {
      return {
        id: product?.id,
        name: product?.name,
      };
    });

    setProductnames(productnames);

    sellers =
      !loading &&
      products.map(
        (product) =>
          users?.find((user) => user?._id === product?.seller)?.firstName
      );
  }

  if (user?.role === "customer") {
    customer = user;
  }

  useEffect(() => {
    if (orders && orders.items && !loading) {
      customer = users?.find((user) => user?.id == orders.customer);

      fetchProductData();
    }
  }, [orders, loading]);

  const columns = [
    {
      title: "Products",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return (
          <div className="flex ">
            <h3 className="font-semibold capitalize">
              {record?.product?.name || "No product name"}
            </h3>
          </div>
        );
      },
    },
    {
      title: "Image",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Image
          width={50}
          src={record.productThumbnail || "https://via.placeholder.com/150"}
        />
      ),
    },
    {
      title: "Color",
      dataIndex: ["variation", "color"],
      key: "color",
      render: (color) => (
        <div className="flex items-center space-x-2">
          {color ? (
            <>
              <span
                className={`bg-[${color.toLowerCase()}] w-5 h-5 rounded-full`}
              ></span>
              <span>{color}</span>
            </>
          ) : (
            <span>No color </span>
          )}
        </div>
      ),
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Size", dataIndex: ["variation", "size"], key: "size" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  const sellerColumns = [
    {
      title: "Products",
      dataIndex: ["itemDetails", "name"],
      key: "name",
      render: (text, record) => {
        return (
          <div className="flex ">
            <h3 className="font-semibold capitalize">
              {record?.itemDetails?.name || "No product name"}
            </h3>
          </div>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: ["itemDetails", "price"],
      key: "price",
    },
    {
      title: "Seller Payment",
      dataIndex: "sellerPaymentStatus",
      key: "sellerPaymentStatus",
      render: (text, record) => {
        return (
          <div>
            <Tag
              color={statusColors[record.sellerPaymentStatus]}
              style={{ color: "black", fontWeight: "bold" }}
              className="capitalize"
            >
              {record.sellerPaymentStatus}
            </Tag>
          </div>
        );
      },
    },
  ];

  if (user.role === "admin") {
    columns.push({
      title: "Seller Payment",
      dataIndex: "sellerPaymentStatus",
      key: "sellerPaymentStatus",
      render: (text, record) => {
        return (
          <div>
            <Tag
              color={statusColors[record.sellerPaymentStatus]}
              style={{ color: "black", fontWeight: "bold" }}
              className="capitalize"
            >
              {record.sellerPaymentStatus}
            </Tag>
          </div>
        );
      },
    });
  }

  return (
    <Col span={24}>
      {orders && (
        <div className="mb-3 cursor-pointer !p-2 bg-[#f5fafc]">
          <Button onClick={() => navigate(-1)}>Back</Button>
          <h2>
            Order #{orders?.id ?? orders[0]._id}
            <Tag
              color={statusColors[orders.status]}
              style={{ color: "white", fontWeight: "bold" }}
              className="capitalize"
            >
              {orders.status}
            </Tag>
            {orders.status === "awaits payment" && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <RepayOrder />
              </div>
            )}
          </h2>

          <div className="block bg-white overflow-auto m-0 md:flex">
            {
              user.role!=="seller" && <div className="flex m-3 flex-row space-x-4 cursor-pointer overflow-auto">
              <div>
                <span className="text-sm font-semibold bg-white rounded-t-md">
                  Names
                </span>
                <p>
                  {orders?.momo_payload?.fullname ||
                    customer?.firstName + customer?.lastName}
                </p>
              </div>

              <div>
                <span className="text-sm font-semibold bg-white rounded-t-md">
                  Country
                </span>
                <p>{orders?.shippingAddress?.country}</p>
              </div>

              <div>
                <span className="text-sm font-semibold bg-white rounded-t-md">
                  City
                </span>
                <p>
                  {orders?.shippingAddress?.province} -
                  {orders?.shippingAddress?.district}
                </p>
              </div>
            </div>
            }

            <Table
              dataSource={user.role === "seller" ? orders[0].items : orders.items}
              columns={user.role === "seller" ? sellerColumns : columns}
              rowKey="product"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      )}
    </Col>
  );
};

export default OrderDetail;