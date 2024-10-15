import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Spinner } from "../../assets/images/Spinner.svg";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Button, Form, Input, Row, Select, Space, Col, Modal } from "antd";
import { IoCloseSharp } from "react-icons/io5";

import AlertComponent from "../designLayouts/AlertComponent";
import { useUser } from "../../context/UserContex";
import { checkAuthentication } from "../../APIs/UserAPIs";

export const Enable2FaModal = ({
  showEnable2fa,
  setShowEnable2fa,

  res,
  setIs2faCancelled
}) => {
  const { onLogin } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [is2faclosed, setIs2faclosed] = useState(false);
  const enableTwoFactorAuth = async () => {
    setLoading(true);
    try {
      const result = await axios.patch(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/enable-2fa`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (result.status === 200) {
        setLoading(false);
        alert("2FA enabled successfully");
        setShowEnable2fa(false);
        setIs2faclosed(true);
        if (res?.role === "customer") {
          navigate("/", { replace: true });
        } else {
          navigate("/user", { replace: true });
        }
      }
    } catch (err) {
      setLoading(false);
      alert("Failed to enable 2FA");
    }
  };

  const handlecancel1 = async () => {
    const token = await Cookies.get("token");

    // const response = await checkAuthentication(token).then((res) => res?.data?.user);

    console.log("token", token, "res", res);

    // Cookies.set("token", token);
    await onLogin({
      ...res,
      token:token,
    })
    setIs2faclosed(true);
    setShowEnable2fa(!showEnable2fa);
    
    if (res?.role === "customer") {
      navigate("/", { replace: true });
    } else if (res?.role === "seller"|| res?.role === "admin") {
      navigate("/user", { replace: true });
    }
  };

  const handlecancel = async () => {
    setIs2faCancelled(true);
    // try {
    //   const token = Cookies.get("token");
    //   if (!token) throw new Error("No token found");
  
    //   console.log("Token fetched:", token);
  
    //   // Use the current `res` structure properly.
    //   const user = { ...res, token }; 
    //   await onLogin(user); // Ensure the context updates properly before navigating
  
    //   setIs2faclosed(true); 
    //   setShowEnable2fa(false); // Close the modal on cancel
  
    //   // Redirect based on user role
    //   if (user?.role === "customer") {
    //     navigate("/", { replace: true });
    //   } else if (["seller", "admin"].includes(user?.role)) {
    //     navigate("/user", { replace: true });
    //   } else {
    //     throw new Error("Invalid user role");
    //   }
    // } catch (error) {
    //   console.error("Cancel error:", error.message);
    //   alert("An error occurred during cancellation");
    // }
  };
  

  return (
    <Modal
      className="w-full md:w-1/2"
      open={showEnable2fa}
      closeIcon={<IoCloseSharp onClick={handlecancel} className="text-[red]" />}
    >
      <p>
        Two-factor authentication (2FA) is an extra layer of security used to
        ensure that people trying to gain access to an online account are who
        they say they are. First, a user will enter their username and a
        password. Then, instead of immediately gaining access, they will be
        required to provide another piece of information. This second factor
        could come from one of the following categories:
      </p>

      <div className=" m-auto text-center  ">
        <div className="flex justify-end items-center space-x-2 m-auto">
          <button
            disabled={loading}
            className="bg-primary text-white rounded-md p-1 px-2 disabled:opacity-50 "
            onClick={enableTwoFactorAuth}
          >
            {loading ? <Spinner /> : "Enable 2FA"}
          </button>
          <button
            className="bg-gray-500 text-white rounded-md p-1 px-2"
            onClick={handlecancel}
          >
            Maybe later
          </button>
        </div>
      </div>
    </Modal>
  );
};
