import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Spinner } from "../../assets/images/Spinner.svg";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

import Cookies, { set } from "js-cookie";
import AlertComponent from "../designLayouts/AlertComponent";
import { useUser } from "../../context/UserContex";
import { Enable2FaModal } from "./Enable2Fa";
import RequestActivate from "./requestActivationEmail";
import { FcGoogle } from "react-icons/fc";
import { Alert } from "flowbite-react";

export const AlertComp = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [errormessage, setErrormessage] = useState("");
  const handlesubmit = async (email) => {
    setLoading(true);
    setError(false);

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/request-account-verification-email`,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (result?.data?.status === "success") {
        props.setEmailMessage(result.data.data);
        props.setIsAccountActivated(true);
        // setOpenModal(false);
      }
    } catch (error) {
      if (error?.response?.data?.status === "fail") {
        setErrormessage(error.response.data.message);
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Alert color={props.color} className="flex text-center">
      <p className="capitalize-first">{props.message}</p>
      <button
        onClick={() => {
          // props.setOpenactivatemodel(true);
          handlesubmit(props.email);

          // setIsAccountActivated(true);
        }}
        className="m-auto mt-2 h-8 w-fit cursor-pointer rounded bg-[#1D6F2B] px-5 text-base font-medium text-gray-200 duration-300 hover:bg-[#437a4c] hover:text-white"
      >
        {" "}
        Request Email{" "}
      </button>
    </Alert>
  );
};

const SignInForm = (props) => {
  const { onLogin, onLogout } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [twofactorenabled, setTwoFactorEnabled] = useState(false);
  // email activation state
  const [isaccountActivated, setIsAccountActivated] = useState(true);
  const [openactivatemodel, setOpenactivatemodel] = useState(false);
  const [emailMessage, setEmailMessage] = useState(null);
  const [showEnable2fa, setShowEnable2fa] = useState(false);
  const [is2faCancelled, setIs2faCancelled] = useState(false);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
    setSignInError("");
  };

  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
    setSignInError("");
  };

  // Modify the existing login handler to work with 2FA modal
  const handleSignIn = async () => {
    if (!email) {
      setErrEmail("Enter your email");
      return;
    } else if (!EmailValidation(email)) {
      setErrEmail("Enter a Valid email");
      return;
    } else if (!password) {
      setErrPassword("Enter your password");
      return;
    } else if (password.length < 6) {
      setErrPassword("Passwords must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      let userData = {
        email: email,
        password: password,
      };
      const result = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: userData,
      });

      if (
        result.status === 200 &&
        result?.data?.message == "OTP sent to your email"
      ) {
        setSignInError("");
        setTwoFactorEnabled(true);
        // navigate("/otp", { replace: true });
        navigate("/otp", { replace: true, state: { userId: result.data.data.userId } });
      }

      if (result.status === 200) {
        // setEmail("");
        // setPassword("");
        setLoading(false);
        Cookies.set("token", result?.data?.token);
        onLogin({
          ...result.data.data.user,
          token: result.data.token,
        });

        setUser(result.data.data.user);

        if (result.data.data.user?.twoFactorAuthEnabled === false) {
          onLogin({
            ...result.data.data.user,
            token: result.data.token,
          });
          setShowEnable2fa(true);
        }
      }
    } catch (err) {
      if (err?.response?.data?.status === "fail") {
        setSignInError(err.response.data.message);

        console.log(
          "Email not verified!",
          err.response.data.message ===
            "Your email has not been verified yet. Please check your inbox for the verification link or click here to resend the verification email.",
        );

        if (
          err.response.data.message ===
          "Your email has not been verified yet. Please check your inbox for the verification link or click here to resend the verification email."
        ) {
          setIsAccountActivated(false);
        } else {
          setIsAccountActivated(true);
        }
      } else {
        setSignInError("Unable to sign you in! Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const signuserin = async (email, password) => {
    await onLogout();
    try {
      setLoading(true);
      let userData = {
        email: email,
        password: password,
      };
      const result = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: userData,
      });

      if (result.status === 200) {
        setEmail("");
        setPassword("");
        setLoading(false);
        Cookies.set("token", result?.data?.token);
        onLogin({
          ...result.data.data.user,
          token: result.data.token,
        });
        setUser(result.data.data.user);

        if (user?.role === "customer") {
          navigate("/", { replace: true });
        } else if (user?.role === "seller" || user?.role === "admin") {
          navigate("/user", { replace: true });
        }
      }
    } catch (err) {
      if (err?.response?.data?.status === "fail") {
        setSignInError(err.response.data.message);

        console.log(
          "Email not verified!",
          err.response.data.message ===
            "Your email has not been verified yet. Please check your inbox for the verification link or click here to resend the verification email.",
        );

        if (
          err.response.data.message ===
          "Your email has not been verified yet. Please check your inbox for the verification link or click here to resend the verification email."
        ) {
          setIsAccountActivated(false);
        } else {
          setIsAccountActivated(true);
        }
      } else {
        setSignInError("Unable to sign you in! Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (is2faCancelled) {
      signuserin(email, password);
      setShowEnable2fa(false);
      // setIs2faCancelled(false);
      // if (user?.role === "customer") {
      //   navigate("/", { replace: true });
      // } else if (user?.role === "seller"|| user?.role === "admin") {
      //   navigate("/user", { replace: true });
      // }
    }
  }, [is2faCancelled]);
  return (
    <div className="w-full text-center">
      {showEnable2fa && (
        <Enable2FaModal
          showEnable2fa={showEnable2fa}
          setShowEnable2fa={setShowEnable2fa}
          res={user}
          setIs2faCancelled={setIs2faCancelled}
        />
      )}
      {/* {!isaccountActivated && (
        <div className="  text-center py-5 ">
          <h1> No email found </h1>
          <button
            onClick={() => {
              setOpenactivatemodel(true);

              // setIsAccountActivated(true);
            }}
            className="bg-[#1D6F2B] hover:bg-[#437a4c] px-5 text-gray-200 hover:text-white cursor-pointer w-fit text-base font-medium h-8 rounded duration-300"
          >
            {" "}
            Request Email{" "}
          </button>

          <RequestActivate
            setModel={openactivatemodel}
            setOpenModal={setOpenactivatemodel}
            setEmailMessage={setEmailMessage}
          />
        </div>
      )} */}

      {!isaccountActivated && (
        <AlertComp
          type="Success!"
          message={signInError}
          color="success"
          setOpenactivatemodel={setOpenactivatemodel}
          setEmailMessage={setEmailMessage}
          setIsAccountActivated={setIsAccountActivated}
          email={email}
        />
      )}

      {isaccountActivated && (
        <form
          // className="w-full md:w-[60%] lgl:w-[400px] h-auto flex flex-col gap-4 items-center"
          className="m-auto flex h-auto w-full flex-col items-center md:w-[60%] lgl:w-[450px]"
          onKeyDown={(e) => {
            if (e.key === "Enter") return handleSignIn();
          }}
        >
          <div className="flex h-[90%] w-full flex-col justify-center overflow-y-scroll px-6 scrollbar-thin">
            {signInError && emailMessage == null && (
              <AlertComponent
                color="failure"
                type="Error!"
                message={signInError}
              />
            )}

            {emailMessage != null && (
              <AlertComponent
                color="success"
                type="Success!"
                message={emailMessage}
              />
            )}

            <h2 className="font-title font-lighter p-0 text-center text-lg text-gray-600 decoration-[1px] mdl:text-3xl">
              Sign in to your account
            </h2>
            <hr class="mx-auto my-4 h-[0.2px] w-[90%] border-0 bg-gray-200 dark:bg-gray-700" />
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="font-title text-left text-base text-gray-600">
                  Email
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-base font-medium outline-none placeholder:text-sm placeholder:font-normal placeholder:tracking-wide placeholder:text-[#C4C4C4]"
                  type="email"
                  placeholder="Email"
                />
                {errEmail && (
                  <p className="font-titleFont px-4 text-sm text-red-500">
                    <span className="mr-1 font-bold italic">!</span>
                    {errEmail}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-2 flex flex-col gap-1">
                <p className="font-title text-left text-base text-gray-600">
                  Password
                </p>
                <div className="relative">
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-base font-medium outline-none placeholder:text-sm placeholder:font-normal placeholder:tracking-wide placeholder:text-[#C4C4C4]"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeInvisibleFilled className="text-gray-500" />
                    ) : (
                      <EyeFilled className="text-gray-500" />
                    )}
                  </div>
                </div>
                {errPassword && (
                  <p className="font-titleFont px-4 text-sm text-red-500">
                    <span className="mr-1 font-bold italic">!</span>
                    {errPassword}
                  </p>
                )}

                <p className="flex items-center justify-between pt-1 text-xs">
                  <Link
                    className="cursor-pointer text-[#1E61CC] duration-300 hover:underline"
                    to="/forgot-password"
                  >
                    Forgot Password ?
                  </Link>

                  <p className="font-titleFont text-xs font-medium">
                    Don't have an Account?{" "}
                    <Link
                      className="cursor-pointer text-[#1E61CC] duration-300 hover:underline"
                      to="/signup"
                    >
                      Sign up
                    </Link>
                  </p>
                </p>
              </div>
              <button
                type="button"
                onClick={handleSignIn}
                className={
                  loading
                    ? "disabled mt-8 w-full rounded-md bg-[#81b48a] py-2 text-base font-medium text-white duration-300 hover:text-white"
                    : "mt-8 w-full cursor-pointer rounded-md bg-[#1D6F2B] py-2 text-base font-medium text-white duration-300 hover:bg-[#437a4c] hover:text-white"
                }
              >
                {loading ? (
                  <>
                    <Spinner className="mr-3 inline-block" />
                    Signing you In
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
              <Link
                to={`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/google`}
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 transition duration-300 hover:bg-gray-100"
              >
                <FcGoogle className="mr-2 text-xl" />
                Continue with Gmail
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignInForm;
