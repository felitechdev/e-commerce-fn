import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FeliTechLogo_transparent } from "../../assets/images";
import googelIcon from "../../assets/images/google-icon.jpg"
import axios from "axios";
import { updateUserInfo } from "../../redux/userSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { ReactComponent as Spinner } from "../../assets/images/Spinner.svg"


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const Dispatch = useDispatch();
  
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  // let loggedInUser = useSelector((state) => state.userInfo)
  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true)
    if (!email) {
      setErrEmail("Enter your email");
    }

    if (!password) {
      setErrPassword("Enter your password");
    }
    if (email && password) {

      let userData = {
        email: email,
        password: password
      };

      axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/user/login`,
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          data: userData,
      }).then((result) => {        
        if (result.status === 200) {
          setEmail("");
          setPassword("");
          setLoading(false)
          sessionStorage.setItem("token", result.data.token)
          Dispatch(updateUserInfo(result.data.user))
          navigate("/accounts/", { replace: true })
        } 
      }).catch(error => {
        const response = { 
          statusCode: error.response.status,
          message: error.response.data.message,
        }

        console.log(response);
      })
    }
  };

  const handleGoogleSignIn = (e) => { 
    e.preventDefault();
    return window.open(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/google/callback`,
      "_self"
    )
  }

  return (
    <div className="w-full h-screen flex  items-center justify-center">
      <div className="w-[500px] bg-white px-6 flex flex-col gap-4">
        <Link to="/">
          <img src={FeliTechLogo_transparent} alt="logoImg" className="w-32 mx-auto" />
        </Link>
          <form className="w-full lgl:w-[450px] h-auto flex flex-col items-center">
            <div className="px-6 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin">
              <h1 className="font-titleFont decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                Sign in
              </h1>
              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="john@example.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Create password"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSignIn}
                  className="bg-[#1D6F2B] hover:bg-[#437a4c] text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
                >
                {loading ?
                  <>
                    <Spinner className="inline-block mr-3" />
                    Signing you In
                  </>
                  : "Sign In"}
                
                </button>
                <p className="text-sm text-center font-titleFont font-medium -mt-2">
                  Don't have an Account?{" "}
                  <Link to="/signup">
                    <span className="text-[#1E61CC] duration-300">
                      Sign up
                    </span>
                  </Link>
                </p>
                <div className="ml-[5%]">
                  <hr className="inline-block w-[40%] align-middle"></hr>
                  <span className="inline-block mx-4">or</span>
                  <hr className="inline-block w-[40%] align-middle"></hr>
                </div>  
                <button
                  className="bg-[#fff] text-[#202124] border-2 border-gray-400 cursor-pointer w-full text-base font-medium h-10 rounded-md flex items-center justify-center gap-2 duration-300"
                  onClick={ handleGoogleSignIn}
                >
                  <img src={googelIcon} className="w-[20px]" /> Sign in with Google
                </button>
               
              </div>
            </div>
          </form>
        
      </div>
    </div>
  );
};

export default SignIn;