// import { useNavigate } from "react-router-dom";
// import { DeleteFilled, EyeFilled, EditFilled } from "@ant-design/icons";
// import { useUser } from "../../../context/UserContex";

// import { ActionMenuButton } from "../Button/AvtionButton";
// import UpdateRole from "./userActions/updatemodel";

// import DeleteUserAccountConfirmation from "./userActions/deleteUserAccount";
// import React, { useState, useEffect } from "react";
// import { Modal } from "antd";
// import { ExclamationCircleFilled } from "@ant-design/icons";

// import axios from "axios";

// import Cookies from "js-cookie";

// const { confirm } = Modal;

// export default function UsersTable({ users }) {
//   const navigate = useNavigate();
//   const [openModal, setOpenModal] = React.useState(false);
//   const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
//   const [userId, setUserId] = React.useState();

//   const user = useUser().user;

//   const getItems = (record) => [
//     user?.role == "admin" && {
//       label: <span className="font-bold text-primary">Update</span>,
//       key: "edit",
//       icon: <EditFilled className=" text-icon2 mr-2" />,
//       onClick: async () => {
//         // await openModal(true, record);
//         setOpenModal(true);
//         setUserId(record);
//       },
//     },
//     {
//       label: <span className="font-bold text-primary">Deactivate </span>,
//       key: "view",
//       icon: <EditFilled className=" text-icon3 mr-2" />,
//       onClick: () => {
//         // navigate(`${record.id}`);
//       },
//     },

//     {
//       label: <span className="font-bold text-primary">Activate </span>,
//       key: "activate",
//       icon: <EditFilled className=" text-icon1 mr-2" />,
//       onClick: () => {
//         // navigate(`${record.id}`);
//       },
//     },

//     // delete user

//     {
//       label: <span className="font-bold text-primary">Delete</span>,

//       key: "delete",
//       icon: <DeleteFilled className=" text-icon3 mr-2" />,
//       onClick: () => {
//         setOpenDeleteModal(true);
//         setUserId(record);
//       },
//     },
//   ];

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [err, setErr] = useState("");
//   const [onSuccess, setOnSuccess] = useState(null);
//   const token = Cookies.get("token");

//   const [userList, setUserList] = useState(users);

//   const handleDelete = async (id) => {
//     try {
//       setLoading(true);
//       const response = await axios({
//         url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/delete-account/${id}`,
//         method: "DELETE",
//         headers: {
//           "content-type": "application/json",
//           Authorization: token && `Bearer ${token}`,
//         },
//       });

//       if (response?.data && response.status === 200) {
//         setOnSuccess("Account deleted successfully!");
//         setLoading(false);
//         // redirect to login page
//         setTimeout(() => {
//           // window.location.href = "/login";
//           setOpenDeleteModal(false);
//         }, 500);

//         // update the user list
//         const newUsers = users.filter((user) => user.id !== id);
//         setUserList(newUsers);
//       } else {
//         setError(true);
//         setErr("Error deleting account.");
//       }
//     } catch (err) {
//       setError(true);
//       setErr(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showDeleteConfirm = (id) => {
//     confirm({
//       title: "Are you sure delete this Account ?",
//       icon: <ExclamationCircleFilled />,
//       content: (
//         <span>
//           {loading ? (
//             <p>loading...</p>
//           ) : error ? (
//             `Error: ${err}`
//           ) : (
//             onSuccess !== null && <p>{onSuccess}</p>
//           )}
//         </span>
//       ),
//       okText: "Yes",
//       okType: "danger",
//       cancelText: "No",
//       onOk: () => handleDelete(id),
//       onCancel() {
//         setOpenDeleteModal(false);
//       },
//     });
//   };

//   useEffect(() => {
//     if (openDeleteModal) {
//       showDeleteConfirm(userId.id);
//     }
//   }, [openDeleteModal]);

//   return (
//     <div className="flex w-full flex-col  relative ">
//       <div className=" absolute -top-10 left-1/2 right-1/2 bg-primary">
//         {" "}
//         <input type="text" placeholder="search by user name or email" />
//       </div>
//       <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
//         <div className="inline-block min-w-full sm:px-6 lg:px-8">
//           <div className="overflow-hidden border border-s-gray-200 rounded-md">
//             <table className="min-w-full text-left text-sm font-light">
//               <thead className="border-b font-medium ">
//                 <tr>
//                   <th scope="col" className="px-6 py-4">
//                     #
//                   </th>
//                   <th scope="col" className="px-6 py-4">
//                     First
//                   </th>
//                   <th scope="col" className="px-6 py-4">
//                     Last
//                   </th>
//                   <th scope="col" className="px-6 py-4">
//                     Email
//                   </th>

//                   <th scope="col" className="px-6 py-4">
//                     Role
//                   </th>

//                   <th scope="col" className="px-6 py-4">
//                     Joined
//                   </th>

//                   <th scope="col" className="px-6 py-4">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {userList.map((user, index) => {
//                   return (
//                     <tr
//                       key={user.id}
//                       className="border-b dark:border-neutral-500"
//                     >
//                       <td className="whitespace-nowrap px-6 py-4 font-medium">
//                         {index + 1}
//                       </td>
//                       <td className="whitespace-nowrap px-6 py-4 capitalize">
//                         {user.firstName}
//                       </td>
//                       <td className="whitespace-nowrap px-6 py-4 capitalize">
//                         {user.lastName}
//                       </td>
//                       <td className="whitespace-nowrap px-6 py-4 capitalize">
//                         {user.email}
//                       </td>
//                       <td className="whitespace-nowrap px-6 py-4 capitalize">
//                         {user.role}
//                       </td>

//                       <td className="whitespace-nowrap px-6 py-4 capitalize">
//                         {new Intl.DateTimeFormat("en-UK").format(
//                           new Date(user.createdAt)
//                         )}
//                       </td>

//                       <td className="whitespace-nowrap px-6 py-4 capitalize">
//                         <button onClick={() => {}}>
//                           <ActionMenuButton items={getItems(user)} />
//                         </button>
//                       </td>
//                       <UpdateRole
//                         setModel={openModal}
//                         setOpenModal={setOpenModal}
//                         id={userId}
//                       />

//                       {/* {openDeleteModal && showDeleteConfirm(userId.id)} */}
//                       {openDeleteModal && <div></div>}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { DeleteFilled, EyeFilled, EditFilled } from "@ant-design/icons";
import { useUser } from "../../../context/UserContex";
import { ActionMenuButton } from "../Button/AvtionButton";
import UpdateRole from "./userActions/updatemodel";
import DeleteUserAccountConfirmation from "./userActions/deleteUserAccount";
import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";

const { confirm } = Modal;

export default function UsersTable({ users }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [userId, setUserId] = React.useState();

  const user = useUser().user;

  const getItems = (record) => [
    user?.role == "admin" && {
      label: <span className="font-bold text-primary">Update</span>,
      key: "edit",
      icon: <EditFilled className=" text-icon2 mr-2" />,
      onClick: async () => {
        setOpenModal(true);
        setUserId(record);
      },
    },
    {
      label: <span className="font-bold text-primary">Deactivate </span>,
      key: "view",
      icon: <EditFilled className=" text-icon3 mr-2" />,
      onClick: () => {
        // navigate(`${record.id}`);
      },
    },
    {
      label: <span className="font-bold text-primary">Activate </span>,
      key: "activate",
      icon: <EditFilled className=" text-icon1 mr-2" />,
      onClick: () => {
        // navigate(`${record.id}`);
      },
    },
    {
      label: <span className="font-bold text-primary">Delete</span>,
      key: "delete",
      icon: <DeleteFilled className=" text-icon3 mr-2" />,
      onClick: () => {
        setOpenDeleteModal(true);
        setUserId(record);
      },
    },
  ];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [err, setErr] = useState("");
  const [onSuccess, setOnSuccess] = useState(null);
  const token = Cookies.get("token");

  const [userList, setUserList] = useState(users);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/delete-account/${id}`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: token && `Bearer ${token}`,
        },
      });

      if (response?.data && response.status === 200) {
        setOnSuccess("Account deleted successfully!");
        setLoading(false);
        setTimeout(() => {
          setOpenDeleteModal(false);
        }, 500);

        const newUsers = users.filter((user) => user.id !== id);
        setUserList(newUsers);
      } else {
        setError(true);
        setErr("Error deleting account.");
      }
    } catch (err) {
      setError(true);
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this Account?",
      icon: <ExclamationCircleFilled />,
      content: (
        <span>
          {loading ? (
            <p>loading...</p>
          ) : error ? (
            `Error: ${err}`
          ) : (
            onSuccess !== null && <p>{onSuccess}</p>
          )}
        </span>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
      onCancel() {
        setOpenDeleteModal(false);
      },
    });
  };

  useEffect(() => {
    if (openDeleteModal) {
      showDeleteConfirm(userId.id);
    }
  }, [openDeleteModal]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredUsers = userList.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="flex w-full flex-col relative">
      <div className=" absolute -top-10 left-1/3 border-none right-1/2 bg-primary rounded-t-md">
        <input
          type="text"
          className="rounded-t-md text-black bg-white border-2 border-primary"
          placeholder="Search by username or email"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden border border-s-gray-200 rounded-md">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    First
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Last
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Joined
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => {
                  return (
                    <tr
                      key={user.id}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 capitalize">
                        {user.firstName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 capitalize">
                        {user.lastName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 capitalize">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 capitalize">
                        {user.role}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 capitalize">
                        {new Intl.DateTimeFormat("en-UK").format(
                          new Date(user.createdAt)
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 capitalize">
                        <button onClick={() => {}}>
                          <ActionMenuButton items={getItems(user)} />
                        </button>
                      </td>
                      <UpdateRole
                        setModel={openModal}
                        setOpenModal={setOpenModal}
                        id={userId}
                      />
                      {openDeleteModal && <div></div>}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
