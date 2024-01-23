import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUserInfo } from "../../../redux/userSlice";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BiDownArrow } from "react-icons/bi";
import { LoaderComponent } from "../../Loaders/Getloader";

const UserAvatarDropdown = (props) => {
  const Dispatch = useDispatch();
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
  const separatedRoute = location.pathname.split("/")[0];
  console.log("lovation", location, separatedRoute);

  const handleSignOut = (e) => {
    sessionStorage.removeItem("userToken");
    Cookies.remove("token");
    navigate("/", { replace: true });
    if (props.userInfo.logInType === "ByGoogle") {
      axios
        .get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/logout`)
        .then(() => {
          Dispatch(resetUserInfo());
          sessionStorage.removeItem("userToken");
          window.open(`${process.env.REACT_APP_INDEX_PAGE_URL}`, "_self");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (props.userInfo.logInType === "ByEmail") {
      navigate("/"); // And this line
      Dispatch(resetUserInfo());
      sessionStorage.removeItem("userToken");
      Cookies.remove("token");
      window.open(`${process.env.REACT_APP_INDEX_PAGE_URL}`, "_self");
    }
  };

  return (
    <>
      <li
        className="hidden  rounded-full border-2 border-white hover:border-slate-300  md:inline-block align-middle w-[40px] md:ml-4 cursor-pointer"
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
        {(!props?.userInfo?.photo && props.userInfo.firstName) ||
        props?.userInfo?.photo == "default.jpg" ? (
          <h1 className="bg-primary rounded-full text-white font-bold px-1 py-1 text-2xl text-center">
            {props.userInfo?.firstName[0]}
          </h1>
        ) : (
          <img
            src={props?.userInfo?.photo}
            className=" w-12 h-12 rounded-full border-1 border-primary shadow"
          />
        )}

        {/* <BiDownArrow />
        </div> */}
      </li>
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
                      ? "text-[#1D6F2B] w-[100%] bg-[#E5E5E5] font-semibold hidden py-1 px-1 rounded-md  md:inline-block "
                      : "font-semibold hidden md:inline-block align-middle  text-white";
                  }}
                  to="myAccount"
                  // state={{ data: location.pathname.split("/")[1] }}
                >
                  Account Settings
                </NavLink>
              </li>
            ) : (
              ""
            )}
            <li
              className="w-[100%] bottom-2 text-center py-2 px-2 text-white font-semibold lg:hover:bg-[#E5E5E5] rounded-md cursor-pointer"
              onClick={handleSignOut}
            >
              <NavLink to="" state={{ data: location.pathname.split("/")[1] }}>
                Sign out
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default UserAvatarDropdown;
