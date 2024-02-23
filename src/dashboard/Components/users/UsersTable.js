import React from 'react';

export default function UsersTable({ users }) {
  return (
    <div className='flex w-full flex-col '>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='overflow-hidden border border-s-gray-200 rounded-md'>
            <table className='min-w-full text-left text-sm font-light'>
              <thead className='border-b font-medium '>
                <tr>
                  <th scope='col' className='px-6 py-4'>
                    #
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    First
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Last
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Email
                  </th>

                  <th scope='col' className='px-6 py-4'>
                    Role
                  </th>

                  <th scope='col' className='px-6 py-4'>
                    Joined
                  </th>

                  <th scope='col' className='px-6 py-4'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <tr
                      key={user.id}
                      className='border-b dark:border-neutral-500'
                    >
                      <td className='whitespace-nowrap px-6 py-4 font-medium'>
                        {index + 1}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 capitalize'>
                        {user.firstName}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 capitalize'>
                        {user.lastName}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 capitalize'>
                        {user.email}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 capitalize'>
                        {user.role}
                      </td>

                      <td className='whitespace-nowrap px-6 py-4 capitalize'>
                        {new Intl.DateTimeFormat('en-UK').format(
                          new Date(user.createdAt)
                        )}
                      </td>

                      <td className='whitespace-nowrap px-6 py-4 capitalize'>
                        <button>Update</button>
                      </td>
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
