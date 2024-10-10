

import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { PiSignInBold } from "react-icons/pi";
import { IoMdArrowDropup } from "react-icons/io";

const UserAvatarDropdown = (props) => {
  const navigate = useNavigate();
  const dropDownRef = useRef();
  const avatarRef = useRef();
  const [displayDropdown, setDisplayDropdown] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(e.target) &&
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target)
      ) {
        setDisplayDropdown(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    props.logOut();
    navigate("/", { replace: true });
  };

  return (
    <div  className="">
      <li
        className={`relative  ${
          props.ismobileview
            ? "hover:border-slate-300 align-middle w-[40px] md:ml-4 cursor-pointer"
            : "hidden hover:border-slate-300 md:inline-block align-middle w-[40px] md:ml-4 cursor-pointer"
        }`}
        onClick={() => setDisplayDropdown(!displayDropdown)}
        ref={avatarRef}
      >
        {props.userInfo ? (
          (!props?.userInfo?.photo && props.userInfo?.firstName) ||
          props?.userInfo?.photo === "default.jpg" ? (
            <h1 className="bg-[#1D6F2B] grid place-content-center rounded-full text-white font-semibold px-1 py-1 h-8 w-8 text-lg">
              {props.userInfo?.firstName[0]}
            </h1>
          ) : (
            <img
              src={props?.userInfo?.photo}
              className="w-10 h-10 rounded-full border-1 border-primary shadow"
              alt="User Avatar"
            />
          )
        ) : (
          <div className="flex justify-center  text-center">
            <PiSignInBold size={30} />
          </div>
        )}

        {displayDropdown && (
          <div
            className="absolute right-0 mt-1  !text-right w-fit rounded-md py-2 px-2 border-2 bg-[#1D6F2B]"
            ref={dropDownRef}
          >
            <div className="text-[#1D6F2B] w-full flex justify-end text-2xl -mt-8 mr-0">
              <IoMdArrowDropup size={40} />
            </div>

            <ul className="text-center">
              {props.userInfo && props.userInfo.firstName ? (
                <>
                  <li className="w-full text-center py-2 px-2 hover:bg-[#E5E5E5] rounded-md cursor-pointer">
                    <NavLink
                      to="/user"
                      className=" text-white hover:text-[#1D6F2B]"
                    >
                      Settings
                    </NavLink>
                  </li>
                  <li
                    className="w-full text-center py-2 px-2 text-white  hover:bg-[#E5E5E5] rounded-md cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <NavLink
                      to=""
                      state={{ data: location.pathname.split("/")[1] }}
                      className="hover:text-[#1D6F2B] text-white  whitespace-nowrap "
                    >
                      Sign out
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="w-full text-center py-2 px-2 hover:bg-[#E5E5E5] rounded-md cursor-pointer">
                    <NavLink
                      to="/signin"
                      className=" whitespace-nowrap text-white hover:text-[#1D6F2B]"
                    >
                      Sign In
                    </NavLink>
                  </li>
                  <li className="w-full text-center py-2 px-2 text-white  whitespace-nowrap hover:bg-[#E5E5E5] rounded-md cursor-pointer">
                    <NavLink
                      to="/signup"
                      className="hover:text-[#1D6F2B] text-white"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </li>
    </div>
  );
};

export default UserAvatarDropdown;
