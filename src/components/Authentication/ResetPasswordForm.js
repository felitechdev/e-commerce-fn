import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Spinner } from "../../assets/images/Spinner.svg";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

import AlertComponent from "../designLayouts/AlertComponent";

const ResetPasswordForm = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    passwordError: "",
    confirmPasswordError: "",
    apiError: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!data.password) {
      setError({
        ...error,
        passwordError: "Enter new password",
      });
      return;
    }

    if (!data.confirmPassword) {
      setError({
        ...error,
        confirmPasswordError: "Re-enter the password",
      });
      return;
    }

    try {
      setLoading(true);
      setError({
        passwordError: "",
        confirmPasswordError: "",
        apiError: "",
      });

      if (data.password !== data.confirmPassword) {
        setError({
          ...error,
          apiError: "Passwords do not match.",
        });

        return;
      }
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/reset-password/${resetToken}`,
        {
          newPassword: data.password,
          confirmPassword: data.confirmPassword,
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Password reset successfully!");
        setTimeout(() => {
          navigate("/signin", { replace: true });
        }, 3000);
      }
    } catch (error) {
      if (error?.response?.data?.message)
        setError({
          ...error,
          apiError: error.response.data.message,
        });
      else
        setError({
          ...error,
          apiError: "Error processing your request! Please try again later",
        });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {(successMessage && (
        <AlertComponent
          color="success"
          type="Success"
          message={successMessage}
        />
      )) || (
        <form
          className="w-full lgl:w-[400px] h-auto flex flex-col gap-4 items-center"
          onSubmit={handleSubmit}
        >
          <div className="px-6 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin">
            <h2 className="font-titleFont decoration-[1px] font-semibold text-sm mdl:text-4xl mb-6 text-center">
              Reset Password
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-.5 mb-2">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  New Password
                </p>

                <div className="relative">
                  <input
                    onChange={handleOnChange}
                    value={data.password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium 
                    placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password..."
                    name="password"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeInvisibleFilled /> : <EyeFilled />}
                  </div>
                </div>

                {error.passwordError && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-semibold italic mr-1">!</span>
                    {error.passwordError}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-.5 mb-2">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Re-enter New Password
                </p>

                <div className="relative">
                  <input
                    onChange={handleOnChange}
                    value={data.confirmPassword}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium 
                    placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                  />

                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeInvisibleFilled /> : <EyeFilled />}
                  </div>
                </div>

                {error.confirmPasswordError && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-semibold italic mr-1">!</span>
                    {error.confirmPasswordError}
                  </p>
                )}
              </div>

              {error.apiError && (
                <AlertComponent
                  color="failure"
                  type="Error!"
                  message={error.apiError}
                />
              )}

              <button
                type="submit"
                className={
                  loading
                    ? "bg-[#81b48a] text-gray-200 hover:text-white w-full text-base font-medium h-10 rounded-md duration-300 disabled"
                    : "bg-[#1D6F2B] hover:bg-[#437a4c] text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
                }
              >
                {loading ? (
                  <>
                    <Spinner className="inline-block mr-3" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
              <p className="text-sm text-center font-titleFont font-medium -mt-2">
                Did not forgot your password?{" "}
                <Link
                  className="text-[#1E61CC] duration-300 cursor-pointer"
                  to="/signin"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ResetPasswordForm;
