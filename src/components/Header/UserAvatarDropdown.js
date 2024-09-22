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
    document.body.addEventListener("click", (e) => {
      if (avatarRef.current && avatarRef.current.contains(e.target) === false) {
        if (
          dropDownRef.current &&
          dropDownRef.current.contains(e.target) === false
        ) {
          return setDisplayDropdown(false);
        }
      }
    });
  }, []);

  const handleSignOut = () => {
    props.logOut();
    navigate("/", { replace: true });
  };

  return (
    <>
      <li
        className={` ${
          props.ismobileview
            ? " hover:border-slate-300  align-middle w-[40px] md:ml-4 cursor-pointer"
            : "hidden hover:border-slate-300  md:inline-block align-middle w-[40px] md:ml-4 cursor-pointer"
        }`}
        onClick={() => setDisplayDropdown(!displayDropdown)}
        ref={avatarRef}
      >
        {/* <img
          className="inline-block w-[40px] rounded-full"
          // src={props.userInfo.profile.profileImageUrl}
          src={props.userInfo.photo}
          alt={`${props.userInfo.firstName}'s account settings`}
        /> */}
        {/* <div className="flex"> */}
        {props.userInfo ? (
          (!props?.userInfo?.photo && props.userInfo?.firstName) ||
          props?.userInfo?.photo == "default.jpg" ? (
            <h1 className="bg-[#1D6F2B] grid place-content-center rounded-full text-white font-semibold px-1 py-1 h-8 w-8 text-lg">
              {props.userInfo?.firstName[0]}
            </h1>
          ) : (
            <img
              src={props?.userInfo?.photo}
              className=" w-10 h-10 rounded-full border-1 border-primary shadow"
            />
          )
        ) : (
          <div className=" flex justify-center   text-center">
            <PiSignInBold size={30} className=" " />
          </div>
        )}
      </li>
      {displayDropdown && (
        <div
          className="absolute top-[50px] !text-right md:top-[75px] right-2 w-40 rounded-md py-2 px-2 border-2 bg-[#1D6F2B]"
          ref={dropDownRef}
        >
          <div className="text-[#1D6F2B] w-full   flex justify-end text-2xl -mt-8 mr-0">
            {" "}
            <IoMdArrowDropup size={40} />
          </div>

          <ul className="text-center">
            {props.userInfo && props.userInfo.firstName ? (
              // User is authenticated, show user settings and sign out
              <>
                <li className="w-[100%] text-center py-2 px-2 hover:bg-[#E5E5E5] rounded-md cursor-pointer">
                  <NavLink
                    to="/user"
                    className="font-medium text-white hover:text-[#1D6F2B]"
                  >
                    Settings
                  </NavLink>
                </li>
                <li
                  className="w-[100%] text-center py-2 px-2 text-white font-semibold hover:bg-[#E5E5E5] rounded-md cursor-pointer"
                  onClick={handleSignOut}
                >
                  <NavLink
                    to=""
                    state={{ data: location.pathname.split("/")[1] }}
                    className="hover:text-[#1D6F2B] text-white font-medium"
                  >
                    Sign out
                  </NavLink>
                </li>
              </>
            ) : (
              // User is not authenticated, show sign in and sign up
              <>
                <li className="w-[100%] text-center py-2 px-2 hover:bg-[#E5E5E5] rounded-md cursor-pointer">
                  <NavLink
                    to="/signin"
                    className="font-semibold text-white hover:text-[#1D6F2B]"
                  >
                    Sign In
                  </NavLink>
                </li>
                <li className="w-[100%] text-center py-2 px-2 text-white font-semibold hover:bg-[#E5E5E5] rounded-md cursor-pointer">
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
      {/*       
      {displayDropdown && (
        <div
          className="absolute top-[75px] right-2 w-40 rounded-md  py-2 px-2 border-2 bg-[#1D6F2B]"
          ref={dropDownRef}
        >
          <ul className="  text-center">
            {props.userInfo.firstName ? (
              <li className="w-[100%] text-center py-2 px-2 hover:bg-[#E5E5E5]   rounded-md cursor-pointer ">
                <NavLink
                  className={({ isActive }) => {
                    return isActive
                      ? "text-[#1D6F2B] w-[100%] bg-[#E5E5E5] hover:text-[black]  font-semibold  py-1 px-1 rounded-md   "
                      : "font-semibold  align-middle hover:text-[#1D6F2B]   text-white";
                  }}
                  to="/user"
                  replace={true}
                >
                  Settings
                </NavLink>
              </li>
            ) : (
              ""
            )}
            <li
              className="w-[100%] bottom-2 text-center py-2 px-2 text-white font-semibold hover:bg-[#E5E5E5] rounded-md cursor-pointer"
              onClick={handleSignOut}
            >
              <NavLink
                to=""
                state={{ data: location.pathname.split("/")[1] }}
                className="hover:text-[#1D6F2B] text-white"
              >
                Sign out
              </NavLink>
            </li>
          </ul>
        </div>
      )} */}
    </>
  );
};

export default UserAvatarDropdown;
