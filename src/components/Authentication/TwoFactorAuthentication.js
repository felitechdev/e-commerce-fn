import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Spinner } from "../../assets/images/Spinner.svg";
import { useUser } from "../../context/UserContex";
import { twofaicon } from "../../assets/images";
import { SignInFormModal } from "./Signinmodal";

// OTP Component
const TwoFactor = () => {
  const { onLogin,  user } = useUser();
  const navigate = useNavigate();
  const [isNouser, setIsNouser] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendloading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const [userId, setUserId] = useState(location.state?.userId);
  // const userId = location.state?.userId;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");


  // Function to handle OTP digit change
  const handleOtpChange = (element, index) => {
    const value = element.value;

    // Allow only numbers and move to next input automatically
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move to next input
      if (index < 5) {
        const nextElement = document.getElementById(`otp-${index + 1}`);
        if (nextElement) nextElement.focus();
      }
    } else if (value === "") {
      // Backspace handling
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Move to previous input on backspace
      if (index > 0) {
        const prevElement = document.getElementById(`otp-${index - 1}`);
        if (prevElement) prevElement.focus();
      }
    }
  };



  // Function to handle OTP verification  
  const handleOtpVerification = async () => {
    setLoading(true);
    const otpCode = otp.join(""); // Combine all digits
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/verify-otp`,
        { otp: otpCode,
          userId : userId
         }
      );
      setLoading(false);
      Cookies.set("token", result.data.token);

     

      onLogin({
        ...result.data.data.user,
        token: result.data.token,
      });

      if (result.data.data.user.role === "customer") {
        navigate("/", { replace: true });
      } else {
        navigate("/user", { replace: true });
      }
    } catch (err) {
      setLoading(false);
      setError("Invalid OTP. Please try again.");
    }
  };


const handleResendOtp = async () => {
  setResendLoading(true);
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/resend-2fa-otp`,
      { userId: userId }
    );




    setResendLoading(false);
    setIsModalOpen(true); 
    setModalMessage(result.data?.message || "OTP resent successfully!");
 

    setError("");
  } catch (err) {
    setResendLoading(false);
    setModalMessage("Failed to resend OTP. Please try again.");
    setError("Failed to resend OTP. Please try again.");
  }
}

useEffect(() => {
  if (!userId) {
   setUserId(userId)
  }
 
}
, [userId]);

  return (
    <div className="otp-container flex flex-col items-center">
    
      <h1 className="text-lg font-semibold mb-2">Enter code</h1>
      <p className="text-sm text-gray-600 mb-4">We sent a code to your email</p>
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
      {/* OTP Inputs */}
      <div className="otp-inputs flex gap-1 md:gap-2 mb-4 justify-center items-center">
        <img src={twofaicon} className=" w-14 h-14  md:w-20 md:h-20" />
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleOtpChange(e.target, index)}
            className=" w-10 md:w-16 md:h-16 bg-[#669e68] bg-opacity-50 text-white font-bold text-center text-2xl border border-gray-300 rounded focus:border-green-500 focus:outline-none"
          />
        ))}

        <img src={twofaicon} className="w-14 h-14  md:w-20 md:h-20" />
      </div>

      <SignInFormModal isNouser={isNouser} setIsNouser={setIsNouser} />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Verify OTP Button */}
      <button
        type="button"
        onClick={handleOtpVerification}
        disabled={loading}
        className={`${
          loading ? "bg-green-300" : "bg-primary hover:bg-green-700 "
        } text-white w-full md:w-1/2 text-base font-medium py-2 rounded-full duration-300`}
      >
        {loading ? (
          <>
            <Spinner className="inline-block mr-3" />
            Verifying...
          </>
        ) : (
          "Verify OTP"
        )}
      </button>

      {/* Resend Link */}
      <p className="text-sm mt-4">
        Didn't get a code?{" "}
        {/* to="/signin" */}
        <Link className="text-green-500 cursor-pointer"


          onClick={handleResendOtp}
        
        >
          {resendloading ? "Resending..." : "Click to resend"}
        </Link>
      </p>
    </div>
  );
};

const Modal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/3">
        <p className="text-center text-gray-700 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TwoFactor;
