import React, { useState, useEffect } from "react";
import axios from "axios";
// import { ReactComponent as Spinner } from "../../../assets/images/Spinner.svg";
// import { logIn } from "../../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import googelIcon from "../../assets/images/google-icon.jpg";
import Spinner from "../../assets/images/Spinner.svg";
// import userSlice from "../../redux/userSlice";
// import AlertComponent from "../../components/designLayouts/AlertComponent";

const SignUpForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [checked, setChecked] = useState(false);

  const [errFirstName, setErrFirstName] = useState("");
  const [errLastName, setErrLastName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState({
    status: false,
    message: "",
  });
  const [signInError, setSignInError] = useState("");

  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setErrFirstName("");
    setSignInError("");
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setErrLastName("");
    setSignInError("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
    setSignInError("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
    setSignInError("");
  };

  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (checked) {
      if (!firstName) {
        setErrFirstName("Enter your first name");
        return;
      }
      if (!lastName) {
        setErrLastName("Enter your last name");
        return;
      }
      if (!email) {
        setErrEmail("Enter your email");
        return;
      } else {
        if (!EmailValidation(email)) {
          setErrEmail("Enter a Valid email");
          return;
        }
      }
      if (!password) {
        setErrPassword("Create a password");
        return;
      } else {
        if (password.length < 6) {
          setErrPassword("Passwords must be at least 6 characters");
          return;
        }
      }

      setLoading(true);
      let userData = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      };
      axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/user/register`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: userData,
      })
        .then((result) => {
          setLoading(false);
          sessionStorage.setItem("userToken", result.data.token);
          // Dispatch(
          //   logIn({
          //     profile: result.data.user,
          //     logInType: "ByEmail",
          //   })
          // );
          navigate("/accounts/", { replace: true });
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
        })
        .catch((err) => {
          const error = {
            statusCode: err.response.status,
            message: err.response.data.message,
          };

          if (
            error.statusCode === 422 ||
            error.statusCode === 409 ||
            error.statusCode === 401
          ) {
            setSignInError(error.message);
          } else {
            setSignInError("Unable to sign you in! Try again later.");
          }
          setLoading(false);
        });
    }
  };

  const handleGoogleSignUp = (e) => {
    e.preventDefault();
    return window.open(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/google`,
      "_self",
    );
  };

  useEffect(() => {
    if (signInError !== "") {
      setErrorAlert({ status: true, message: signInError });
    } else {
      setErrorAlert({ status: false, message: "" });
    }
  }, [signInError]);

  return (
    <form className="flex h-auto w-full flex-col items-center lgl:w-[450px]">
      <div className="flex w-full flex-col justify-center px-6 scrollbar-thin scrollbar-thumb-primeColor">
        {/* {errorAlert.status && (
          <AlertComponent
            color="failure"
            type="Error!"
            message={errorAlert.message}
          />
        )} */}
        <h1 className="font-titleFont mb-4 text-center text-2xl font-semibold decoration-[1px] mdl:text-3xl">
          Create your account
        </h1>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3">
            {/* First name */}
            <div className="gap-.5 flex flex-col">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                First Name
              </p>
              <input
                onChange={handleFirstName}
                value={firstName}
                className="h-8 w-full rounded-md border-[1px] border-gray-400 px-4 text-base font-medium outline-none placeholder:text-sm placeholder:font-normal placeholder:tracking-wide"
                type="text"
                placeholder="eg.John"
              />
              {errFirstName && (
                <p className="font-titleFont px-4 text-sm font-semibold text-red-500">
                  <span className="mr-1 font-semibold italic">!</span>
                  {errFirstName}
                </p>
              )}
            </div>
            {/* Last name */}
            <div className="gap-.5 flex flex-col">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Last Name
              </p>
              <input
                onChange={handleLastName}
                value={lastName}
                className="h-8 w-full rounded-md border-[1px] border-gray-400 px-4 text-base font-medium outline-none placeholder:text-sm placeholder:font-normal placeholder:tracking-wide"
                type="text"
                placeholder=" eg: Doe"
              />
              {errLastName && (
                <p className="font-titleFont px-4 text-sm font-semibold text-red-500">
                  <span className="mr-1 font-semibold italic">!</span>
                  {errLastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="gap-.5 flex flex-col">
            <p className="font-titleFont text-base font-semibold text-gray-600">
              Email
            </p>
            <input
              onChange={handleEmail}
              value={email}
              className="h-8 w-full rounded-md border-[1px] border-gray-400 px-4 text-base font-medium outline-none placeholder:text-sm placeholder:font-normal placeholder:tracking-wide"
              type="email"
              placeholder="johndoe@example.com"
            />
            {errEmail && (
              <p className="font-titleFont px-4 text-sm font-semibold text-red-500">
                <span className="mr-1 font-semibold italic">!</span>
                {errEmail}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="gap-.5 flex flex-col">
            <p className="font-titleFont text-base font-semibold text-gray-600">
              Password
            </p>
            <input
              onChange={handlePassword}
              value={password}
              className="h-8 w-full rounded-md border-[1px] border-gray-400 px-4 text-base font-medium outline-none placeholder:text-sm placeholder:font-normal placeholder:tracking-wide"
              type="password"
              placeholder="Your password"
            />
            {errPassword && (
              <p className="font-titleFont px-4 text-sm font-semibold text-red-500">
                <span className="mr-1 font-semibold italic">!</span>
                {errPassword}
              </p>
            )}
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-2 mdl:items-center">
            <input
              onChange={() => setChecked(!checked)}
              className="mt-1 h-4 w-4 cursor-pointer bg-[#fff] mdl:mt-0"
              type="checkbox"
            />

            <p className="cursor-pointer text-sm text-primeColor">
              I agree to the Feli Technology{" "}
              <a className="text-[#1E61CC]">
                <Link to="/terms-and-conditions">Terms of Service</Link>
              </a>
              and
              <a className="text-[#1E61CC]">
                <Link to="/refund-policy">Privacy Policy</Link>
              </a>
              .
            </p>
          </div>
          <button
            type="button"
            onClick={handleSignUp}
            className={`${
              checked
                ? "cursor-pointer bg-[#1D6F2B] hover:bg-[#437a4c]"
                : "disabled bg-[#81b48a]"
            } mt-3 h-10 w-full rounded-md text-base font-medium text-gray-200 duration-300 hover:text-white`}
          >
            {loading ? (
              <>
                <Spinner className="mr-3 inline-block" />
                Creating your account
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="font-titleFont text-center text-sm font-medium">
            Already have an account?{" "}
            <a
              className="Bduration-300 cursor-pointer text-[#1E61CC]"
              onClick={() =>
                props.setOpenForm({
                  signin: true,
                  signup: false,
                })
              }
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};
export default SignUpForm;
