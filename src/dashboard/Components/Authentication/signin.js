import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Login } from '../../Apis/User';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../assets/images/Spinner.svg';
import AlertComponent from '../../Layouts/designLayouts/AlertComponent';
import Alerts from '../Notifications&Alert/Alert';
import Cookies from 'js-cookie';

import { Loader } from '../Loader/LoadingSpin';

const SignInForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState({
    status: false,
    message: '',
  });
  const [signInError, setSignInError] = useState('');

  // State to control alert display
  const [alertIndex, setAlertIndex] = useState(null);
  const [alertDescription, setAlertDescription] =
    useState('');

  const Dispatch = useDispatch();

  // access redux userlogin actions
  const { user, load, err } = useSelector(
    (state) => state.userlogin
  );
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail('');
    setSignInError('');
  };

  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword('');
    setSignInError('');
  };
  // - token exists in cookies
  const existingToken = Cookies.get('token');
  if (existingToken) {
    //- Token exists, remove it
    // Cookies.remove("token");
  }

  const handleSignIn = async () => {
    if (!email) {
      setErrEmail('Enter your email');
      return;
    } else if (!EmailValidation(email)) {
      setErrEmail('Enter a Valid email');
      return;
    } else if (!password) {
      setErrPassword('Enter your password');
      return;
    } else if (password.length < 6) {
      setErrPassword(
        'Passwords must be at least 6 characters'
      );
      return;
    } else {
      setLoading(true);
      let userData = {
        email: email,
        password: password,
      };

      // dispatch action
      Dispatch(Login(userData))
        .unwrap()
        .then((response) => {
          // handle success, 'action.payload' contains the payload from the fulfilled action

          setAlertIndex('success'); // Display success alert on success
          setAlertDescription('successfully!');
          setSignInError('');
          if (response.status == 200) {
            // Set the new token in cookies
            Cookies.set('token', response?.data?.token);
            Cookies.set('profile', {
              user: response?.data?.data?.user,
            });
            if (
              response.data?.data?.user?.role == 'admin'
            ) {
              navigate('/dashboard');
            } else {
              navigate('/');
            }
          }
        })
        .catch((error) => {
          // handle error

          if (error.status == 401) {
            setErrorAlert({
              status: true,
              message: `${
                ('you are not allowed', error.message)
              }`,
            });
          }
          setAlertIndex('error'); // Display error alert on error
          setAlertDescription('Error: ' + error.message);
          setErrorAlert({
            status: true,
            message: 'you are not allowed',
          });
          setSignInError(
            'Unable to sign you in! Try again later.'
          );
        });
    }
  };

  useEffect(() => {
    if (
      (user && user.data?.data?.user?.role == 'admin') ||
      user.data?.data?.user?.role == 'seller'
    ) {
      setErrorAlert({
        status: true,
        message: 'welcome to admin dashboard',
      });
      navigate('/dashboard');
    } else if (user && user.data.user.role !== 'admin') {
      setAlertIndex('warning'); // Display error alert on error
      setAlertDescription('you are not allowed');
      setErrorAlert({
        status: true,
        message: 'you are not allowed',
      });
      navigate('/');
    }

    if (err) {
      setSignInError(err.message);
    }
  }, [err, user]);

  useEffect(() => {
    if (signInError !== '') {
      setErrorAlert({ status: true, message: signInError });
    } else {
      setErrorAlert({ status: false, message: '' });
    }
  }, [signInError, Dispatch]);

  useEffect(() => {
    if (load) {
      setAlertIndex(null);
    }
  }, [load, Dispatch, alertDescription, alertIndex]);

  const handleAlertClose = () => {
    setAlertIndex(null); // Reset alertIndex to hide the alert
  };

  return (
    <>
      {alertIndex !== null && (
        <Alerts
          type={alertIndex}
          description={alertDescription}
          onClose={handleAlertClose}
          className=' mx-6'
        />
      )}

      <form
        className='w-full lgl:w-[450px]  h-auto flex flex-col gap-4 items-center'
        onKeyDown={(e) => {
          if (e.key === 'Enter') return handleSignIn();
        }}
      >
        <div className='px-6 w-full h-[90%] flex flex-col justify-center '>
          {/* {errorAlert.status && (
            <AlertComponent
              color="failure"
              type="Error!"
              message={errorAlert.message}
            />
          )} */}
          {/* <h1 className="font-titleFont decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
          Sign in
        </h1> */}
          <div className='flex flex-col gap-3 '>
            {/* Email */}
            <div className='flex flex-col gap-.5'>
              <p className='font-titleFont text-base font-semibold text-gray-600'>
                Email
              </p>
              <input
                onChange={handleEmail}
                value={email}
                className='w-full h-12  placeholder:text-xl placeholder:tracking-wide px-4 text-base font-medium 
                    placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                type='email'
                autoComplete='true'
                placeholder='john@example.com'
              />
              {errEmail && (
                <p className='text-xl text-[red] font-titleFont font-semibold px-4'>
                  <span className='font-bold italic  mr-1'>
                    !
                  </span>
                  {errEmail}
                </p>
              )}
            </div>

            {/* Password */}
            <div className='flex flex-col gap-.5'>
              <p className='font-titleFont text-base font-semibold text-gray-600'>
                Password
              </p>
              <input
                onChange={handlePassword}
                value={password}
                autoComplete={true}
                className='w-full h-12 placeholder:text-xl placeholder:tracking-wide px-4 text-base font-medium 
                    placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                type='password'
                placeholder='Create password'
              />
              {errPassword && (
                <p className='text-xl text-red-500 font-titleFont font-semibold px-4'>
                  <span className='font-bold italic  text-[red]  mr-1'>
                    !
                  </span>
                  {errPassword}
                </p>
              )}
            </div>

            <button
              type='button'
              onClick={handleSignIn}
              className={
                load
                  ? 'bg-[#81b48a] mt-2 text-gray-200 text-xl font-bold hover:text-white w-full  h-12 rounded-md  disabled'
                  : 'bg-[#1D6F2B] mt-2 hover:bg-[#437a4c] text-xl  text-gray-200 hover:text-white cursor-pointer w-full  font-medium h-12 rounded-md '
              }
            >
              {load ? (
                <>
                  <Loader className='inline-block mr-3' />
                  Signing you In
                </>
              ) : (
                'Sign In'
              )}
            </button>
            <p className='text-xl text-center font-titleFont font-medium -mt-2'>
              Don't have an Account?{' '}
              <span
                className='text-[#1E61CC] duration-300 cursor-pointer'
                onClick={() =>
                  props.setOpenForm({
                    signin: false,
                    signup: true,
                  })
                }
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignInForm;
