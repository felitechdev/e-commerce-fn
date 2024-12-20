import React, { useEffect } from "react";
import { fetchUsers } from "../redux/Reducers/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import UsersTable from "../dashboard/Components/users/UsersTable";
import { Loader } from "../dashboard/Components/Loader/LoadingSpin";
import { Typography } from "antd";
const { Title, Paragraph, Text } = Typography;

export default function Users() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalElements, setTotalElements] = React.useState(50);

  const [userlist, setUserlist] = React.useState([]);

  // const { loading, users } = useSelector((state) => state.users);
  const { loading, users, totalCount } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers({ page, pageSize }));
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    if (totalCount) {
      setTotalElements(totalCount);
    }
  }, [totalCount]);

  return (
    <div className="w-full flex flex-col">
      <div className="mb-4">
        <h1 className="bold_text">Users</h1>
      </div>
      {loading && !users?.length && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
      {users.length > 0 && (
        <UsersTable
          users={users}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalElements={totalElements}
        />
      )}
    </div>
  );
}
