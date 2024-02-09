import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LayoutDesign } from "../Layouts/LayoutDesign";
import Authentication from "../Components/Authentication/Auth";
import DashboardRoutes from "./Dashroutes";
import { useDispatch, useSelector } from "react-redux";
import { GetMyprofile } from "../Apis/User";
import Cookies from "js-cookie";
import { Loader } from "../Components/Loader/LoadingSpin";
import { FeliTechWhiteLogo } from "../assets/images";

const Routers = () => {
  const [user, setUser] = useState();
  const token = Cookies.get("token");
  const { profile, loadprofile, errprofile } = useSelector(
    (state) => state.userprofile
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (loadprofile == true) {
      dispatch(GetMyprofile(token))
        .unwrap()
        .then((data) => {
          if (data?.data && data.status == "success") {
            setUser(data?.data?.user);
          }
        })
        .catch((error) => {});
    }
  }, [loadprofile, dispatch, token]);

  // Fetch user only when the component mounts
  useEffect(() => {
    if (!user) {
      dispatch(GetMyprofile(token))
        .unwrap()
        .then((data) => {
          if (data?.data && data.status == "success") {
            setUser(data?.data?.user);
          }
        })
        .catch((error) => {});
    }
  }, [dispatch, user, token]);

  // if (errprofile && errprofile.message == "jwt expired, Please login again") {
  //   Cookies.remove("token");
  // }

  return (
    <>
      {/* {(errprofile &&
        errprofile?.message == "jwt expired, Please login again") ||
        (errprofile?.message === "jwt malformed, Please login again" && (
          <Router>
            <Routes>
              <Route path="/" element={<Authentication />} />
            </Routes>
          </Router>
        ))} */}
      {
        // If user is not logged in, redirect to login page
        loadprofile ? (
          <div className="flex items-center justify-center h-screen">
            <img
              className="w-28 mb-6"
              src={FeliTechWhiteLogo}
              alt="logoLight"
            />
            {/* <Loader className="text-primary  text-2xl" /> */}
          </div>
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<Authentication />} />

              {user && (
                <Route
                  path="/dashboard/*"
                  element={
                    // Render LayoutDesign and include DashboardRoutes directly
                    <LayoutDesign userprofile={user}>
                      <DashboardRoutes />
                    </LayoutDesign>
                  }
                />
              )}
            </Routes>
          </Router>
        )
      }
    </>
  );
};

export default Routers;
