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
import { DashBoardSearch } from "../Orders/Ordersv2/orders";
import Pagination from "../pagination/pagination";
const { confirm } = Modal;

export default function UsersTable({
  users,
  page,
  setPage,
  pageSize,
  setPageSize,
  totalElements,
}) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openDeactivateModal, setOpenDeactivateModal] = React.useState(false);
  const [userId, setUserId] = React.useState();

  const user = useUser().user;

  const totalPages = Math.ceil(totalElements / pageSize);

  const getItems = (record) => [
    user?.role == "admin" && {
      label: <span className="font-semibold text-primary">Update</span>,
      key: "edit",
      icon: <EditFilled className="mr-2 text-icon2" />,
      onClick: async () => {
        setOpenModal(true);
        setUserId(record);
      },
    },

    record.active && {
      label: <span className="font-semibold text-primary">Deactivate </span>,
      key: "view",
      icon: <EditFilled className="mr-2 text-icon3" />,
      onClick: () => {
        // navigate(`${record.id}`);
        setOpenDeactivateModal(true);
        setUserId(record);
      },
    },
    {
      label: <span className="font-semibold text-primary">Activate </span>,
      key: "activate",
      icon: <EditFilled className="mr-2 text-icon1" />,
      onClick: () => {
        // navigate(`${record.id}`);
      },
    },
    {
      label: <span className="font-semibold text-primary">Delete</span>,
      key: "delete",
      icon: <DeleteFilled className="mr-2 text-icon3" />,
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
  const [issearch, setIssearch] = useState(false);
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
      setUserId();
      setOpenDeleteModal(false);
      setLoading(false);
      setOnSuccess(null);
      setError(false);
      setErr("");
    }
  };

  const handleDeactivate = async (id) => {
    try {
      setLoading(true);
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/deactivate-account/${id}`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: token && `Bearer ${token}`,
        },
      });

      if (response?.data && response.status === 200) {
        setOnSuccess("Account Deactivated successfully!");
        setLoading(false);
        setTimeout(() => {
          setOpenDeleteModal(false);
        }, 500);

        const newUsers = users.filter((user) => user.id !== id);
        setUserList(newUsers);
      } else {
        setError(true);
        setErr("Error on Deactivating account.");
      }
    } catch (err) {
      setError(true);
      setErr(err.message);
    } finally {
      setUserId();
      setOnSuccess(null);
      setError(false);
      setErr("");
      setOpenDeactivateModal(false);
      setLoading(false);
    }
  };

  async function searchuser(name) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/users/search?query=${name}`,

        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return [];
    }
  }

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

  const showDeactivateConfirm = (id) => {
    confirm({
      title: "Are you sure deactivate this Account?",
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
      onOk: () => handleDeactivate(id),
      onCancel() {
        setOpenDeactivateModal(false);
      },
    });
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIssearch(true);
      searchuser(searchQuery).then((data) => {
        if (data?.data?.users) {
          setUserList(data?.data?.users);
        }
      });
    } else {
      setIssearch(false);
      setUserList(users);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (openDeleteModal) {
      showDeleteConfirm(userId.id || userId._id);
    }
  }, [openDeleteModal]);

  useEffect(() => {
    if (openDeactivateModal) {
      showDeactivateConfirm(userId.id || userId._id);
    }
  }, [openDeactivateModal]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // let filteredUsers = userList.filter(
  //   (user) =>
  //     user.firstName.toLowerCase().includes(searchQuery) ||
  //     user.email.toLowerCase().includes(searchQuery)
  // );
  useEffect(() => {
    setUserList(users);
  }, users);

 

  return (
    <div className="relative flex w-full flex-col">
      <DashBoardSearch
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={"Search by username or email"}
      />
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-md border border-s-gray-200">
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
                    Active
                  </th>

<th scope="col" className="px-6 py-4">
                    2FA Enabled
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
                {userList.map((user, index) => {
                  return (
                    <tr
                      key={user?.id}
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
                        {user.active ? (
                          <div className="h-5 w-5 rounded-full text-green-500">
                            yes
                          </div>
                        ) : (
                          <span className="h-5 w-5 rounded-full text-red-500">
                            No
                          </span>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 capitalize">
                        {user.twoFactorAuthEnabled ? (
                          <span className="h-5 w-5 rounded-full bg-[green-500] text-green-500">
                          
                          </span>
                        ) : (
                          <span className="h-5 w-5 rounded-full text-red-500">
                            No
                          </span>
                        )}
                      </td>

                      


                      <td className="whitespace-nowrap px-6 py-4 capitalize">
                        {user.role}
                      </td>
                      {user?.createdAt && (
                        <td className="whitespace-nowrap px-6 py-4 capitalize">
                          {new Intl.DateTimeFormat("en-UK").format(
                            new Date(user?.createdAt),
                          )}
                        </td>
                      )}
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

          {!issearch && (
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          )}
        </div>
      </div>
    </div>
  );
}
