import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <>
      <div className="flex bg-black my-10 max-w-container mx-auto px-4">
        <div className="bg-[blue]">
          <ul>
            <li>
              <NavLink to={`profile`}>OverView</NavLink>
            </li>
            <li>
              <NavLink to={`orders`}>My Orders</NavLink>
            </li>
            <li>
              <NavLink to={`password-reset`}>Password Reset</NavLink>
            </li>
            <li>
              <NavLink to={`signout`}>Logout</NavLink>
            </li>
          </ul>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default ProfileLayout;
