import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets/images";
import googelIcon from "../../assets/images/google-icon.jpg"
import axios from "axios";

const SignUp = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [checked, setChecked] = useState(false);

  const [errFirstName, setErrFirstName] = useState("");
  const [errLastName, setErrLastName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setErrFirstName("");
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setErrLastName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
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
        return
      }
      if (!lastName) {
        setErrLastName("Enter your last name");
        return
      }
      if (!email) {
        setErrEmail("Enter your email");
        return
      } else {
        if (!EmailValidation(email)) {
          setErrEmail("Enter a Valid email");
          return
        }
      }
      if (!password) {
        setErrPassword("Create a password");
        return
      } else {
        if (password.length < 6) {
          setErrPassword("Passwords must be at least 6 characters");
          return
        }
      }


        let userData = {
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: password
      };
      axios({
          url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/user/register`,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: userData,
        }).then((result) => { 
        console.log(result.data);
        // navigate("/", { replace: true })
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      }).catch(error => console.log(error.message))

    }
  };
  return (
    <div className="w-full h-screen flex  items-center justify-center">
      <div className="w-[500px] bg-white px-6 flex flex-col gap-4">
        <Link to="/">
          <div className="text-center">
            <img src={logo} alt="logoImg" className="w-28 mx-auto" />
          </div>
        </Link>
          <form className="w-full lgl:w-[450px] h-auto flex flex-col items-center">
            <div className="px-6 py-4 w-full flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4 text-center">
                Create your account
              </h1>
              <div className="flex flex-col gap-3">
                {/* First name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    First Name
                  </p>
                  <input      
                    onChange={handleFirstName}
                    value={firstName}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="eg.John"  
                  />
                  {errFirstName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errFirstName}
                    </p>
                  )}
                </div>
                 {/* Last name */}
                 <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Last Name
                  </p>
                  <input
                    onChange={handleLastName}
                    value={lastName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder=" eg: Doe" 
                  />
                  {errLastName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errLastName}
                    </p>
                  )}
                </div>
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
                    placeholder="johndoe@example.com"
                     
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
                    placeholder="Your password" 
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>
               
                {/* Checkbox */}
                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer bg-[#1D6F2B]"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    I agree to the OREBI{" "}
                    <a className="text-[#1E61CC]">Terms of Service </a>
                    and <a className="text-[#1E61CC]">Privacy Policy</a>.
                  </p>
                </div>
                <button
                  onClick={handleSignUp}
                  className={`${
                    checked
                      ? "bg-[#1D6F2B] hover:bg-[#437a4c] cursor-pointer"
                      : "bg-[#81b48a] disabled "
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300 mt-3`}
                >
                  Create Account
              </button>
              <div className="ml-[5%]">
                <hr className="inline-block w-[40%] align-middle"></hr>
                <span className="inline-block mx-4">or</span>
                <hr className="inline-block w-[40%] align-middle"></hr>
              </div>
              
              <button
                className="bg-[#fff] text-[#202124] border-2 border-gray-400 cursor-pointer w-full text-base font-medium h-10 rounded-md flex items-center justify-center gap-2 duration-300"
              >
                <img src={googelIcon} className="w-[20px]" /> Signup with Google
              </button>
              <p className="text-sm text-center font-titleFont font-medium">
                Already have an account?{" "}
                <Link to="/signin">
                <a className="text-[#1E61CC] Bduration-300">
                  Sign in
                </a>
                </Link>
                </p>
              </div>
            </div>
          </form>
      </div>
    </div>
  );
};
export default SignUp;
