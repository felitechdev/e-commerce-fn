import React, { useEffect } from 'react';
import { fetchUsers } from '../redux/Reducers/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import UsersTable from '../dashboard/Components/users/UsersTable';
import { Loader } from '../dashboard/Components/Loader/LoadingSpin';

export default function Users() {
  const { loading, users } = useSelector(
    (state) => state.users
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className='w-full flex flex-col'>
      <div className='mb-4'>
        <h2 className='text-gray-700 text-3xl font-[600] self-start '>
          Users
        </h2>
      </div>
      {loading && !users?.length && (
        <div className='flex justify-center'>
          <Loader />
        </div>
      )}
      {users.length > 0 && <UsersTable users={users} />}
    </div>
  );
}
