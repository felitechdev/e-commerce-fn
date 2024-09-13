import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const fetchUsers = async () => {
  const Token = Cookies.get("token");

  const res = await axios(
    `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/users?role=seller`,
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
  );

  return res.data.data.users;
};

export const SellerFilters = ({ SellerId, setSellerId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null); // Ref for auto-scrolling

  useEffect(() => {
    // Fetch users on component mount
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    const container = containerRef.current;
    let scrollInterval;

    if (container && users.length > 0) {
      scrollInterval = setInterval(() => {
        container.scrollLeft += 1;

        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollLeft = 0;
        }
      }, 3000);
    }

    return () => clearInterval(scrollInterval);
  }, [users]);

  return (
    <div className="overflow-x-auto whitespace-nowrap mt-3" ref={containerRef}>
      <div className="flex flex-wrap gap-3">
        {!loading &&
          users?.map((user, index) => (
            <div
              key={user.id}
              className={`${
                SellerId === user.id ? "text-[#cd5c07] underline" : ""
              } w-fit m-auto relative text-sm hover:text-[#cd5c07] hover:underline break-words`}
              onClick={() => setSellerId(user.id)}
            >
              <div className="block text-center border  rounded-md  p-2 overflow-hidden">
                <img
                  src={
                    user.photo && user.photo !== "default.jpg"
                      ? user.photo
                      : "https://placehold.jp/90x90.png"
                  }
                  className="w-[60px] h-[60px] object-cover m-auto rounded-full border border-primary1"
                  alt="Seller Image"
                />
                <p className="text-xs">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs font-semibold break-words">
                  {user.email}
                </p>
                <p className="text-xs">
                  Verified: {user.verified ? "Yes" : "No"}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
