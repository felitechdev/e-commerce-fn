import React from "react";
import { Card, Badge, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { statusColors } from "../../../../common/statuscolor";
import { BiBuildingHouse } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { FaPhone } from "react-icons/fa6";
import { format, formatDistanceToNow } from "date-fns";
import { useUser } from "../../../../context/UserContex";

const OrderCard = ({ order }) => {
  const user = useUser().user;
  const navigate = useNavigate();

  const formattedDate = format(order.createdAt, "PPpp"); // e.g., "June 20th, 2020, 4:30 PM"
  const timeAgo = formatDistanceToNow(order.createdAt, { addSuffix: true }); // e.g., "about 2 months ago"

  console.log("ordercard", order);

  return (
    <Card
      className="order-card mb-3 cursor-pointer bg-[#f5fafc]"
      onClick={() => navigate(`${order.id}`)}
    >
      <div className="order-header md:flex md:space-x-3">
        <span className="flex">
          #{order.id} -{" "}
          <p className="font-semibold ml-2">
            {user?.role == "admin" &&
              order?.momo_payload &&
              order?.momo_payload?.fullname}
          </p>
        </span>

        <Tag
          color={statusColors[order.status]}
          style={{ color: "white", fontWeight: "bold" }}
          className="capitalize"
        >
          {order.status}
        </Tag>
      </div>

      <div className="order-header flex my-3 space-x-3">
        <span className="flex">
          #payment -{" "}
          <p className="font-semibold ml-2">{order.payment_type.type}</p>
        </span>

        <Tag
          style={{ color: "black", fontWeight: "bold" }}
          className="capitalize  !text-white  !bg-primary"
        >
          {order.items.length} items
        </Tag>
      </div>

      <div className="order-body  my-5">
        <d className=" block md:flex space-y-3 md:space-y-0 md:space-x-2 ">
          <div className="flex space-x-2">
            {" "}
            <span className="flex ">
              <BiBuildingHouse size={20} />
              <p className="">{order.shippingAddress.country}</p>
            </span>
            <span className="flex">
              <IoLocationSharp size={20} />
              <p className="">
                {order.shippingAddress.province} -{" "}
                {order.shippingAddress.district}
              </p>
            </span>
          </div>

          <div className="flex space-x-2">
            {user?.role == "admin" && (
              <span className="flex">
                <FaPhone size={20} />
                <p className="">{order.shippingAddress.phoneNumber}</p>
              </span>
            )}

            <span className="flex">
              <TbTruckDelivery size={20} />

              <Tag
                style={{ color: "black", fontWeight: "bold" }}
                className="capitalize !font-semibold !text-white !bg-primary "
              >
                <p className="">{order.deliveryPreference}</p>
              </Tag>
            </span>
          </div>
          {user?.role == "admin" && (
            <span className="flex">
              <IoPersonSharp size={20} />
              <p className="">
                {order?.momo_payload && order?.momo_payload?.fullname}
              </p>
            </span>
          )}
        </d>
      </div>

      <Tag
        style={{ color: "black", fontWeight: "" }}
        className="capitalize !font-semibold !text-primary !p-3"
      >
        <span>{formattedDate}</span> <span>{timeAgo}</span>
      </Tag>
    </Card>
  );
};

export default OrderCard;
