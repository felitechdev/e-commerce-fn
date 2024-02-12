import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ReactComponent as Spinner } from '../../assets/images/Spinner.svg';

import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AlertComponent from '../designLayouts/AlertComponent';

const SignUpForm = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [checked, setChecked] = useState(false);

  const [errFirstName, setErrFirstName] = useState('');
  const [errLastName, setErrLastName] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errType, setErrType] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState({ status: false, message: '' });
  const [successAlert, setSuccessAlert] = useState({
    status: false,
    message: '',
  });
  const [signInError, setSignInError] = useState('');
  const [signinSuccess, setSigninSuccess] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const roleSelectRef = useRef(null);

  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setErrFirstName('');
    setSignInError('');
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setErrLastName('');
    setSignInError('');
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail('');
    setSignInError('');
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword('');
    setSignInError('');
  };

  const handleconfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setErrPassword('');
    setSignInError('');
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
        setErrFirstName('Enter your first name');
        return;
      }
      if (!lastName) {
        setErrLastName('Enter your last name');
        return;
      }
      if (!email) {
        setErrEmail('Enter your email');
        return;
      } else {
        if (!EmailValidation(email)) {
          setErrEmail('Enter a Valid email');
          return;
        }
      }
      if (!password) {
        setErrPassword('Create a password');
        return;
      } else {
        if (password.length < 8) {
          setErrPassword('Passwords must be at least 8 characters');
          return;
        }
      }

      if (confirmPassword != password) {
        setErrPassword('Passwords not match');
      }

      const selectedRole = roleSelectRef.current.value;

      if (selectedRole == '') {
        setErrType('Account Type not selected');
      }

      setLoading(true);

      let userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: selectedRole,
        confirmPassword: confirmPassword,
      };

      axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/register`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: userData,
      })
        .then((result) => {
          if (result.status === 201 || result.data.status === 'success') {
            setSignInError('');
            setErrType('');
            const success = {
              statusCode: result.status,
              message: result.data.data,
            };
            setSigninSuccess(success.message);
          }

          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);

          setSigninSuccess('');
          if (err.message) {
            setSignInError(err.message);
          }

          if (err.response) {
            if (
              err.response.status === 422 ||
              err.response.status === 409 ||
              err.response.status === 401 ||
              err.response.status === 400
            ) {
              setSignInError(err.response.data.message);
            } else {
              setSignInError('Unable to sign you in! Try again later.');
            }
          } else {
            setSignInError('An error occurred. Please try again.');
          }
        });
    }
  };

  const handleGoogleSignUp = (e) => {
    e.preventDefault();
    return window.open(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/google`,
      '_self'
    );
  };

  useEffect(() => {
    if (signInError !== '') {
      setErrorAlert({ status: true, message: signInError });
    } else {
      setErrorAlert({ status: false, message: '' });
    }
  }, [signInError]);

  useEffect(() => {
    if (signinSuccess !== '') {
      setSuccessAlert({ status: true, message: signinSuccess });
    } else {
      setSuccessAlert({ status: false, message: '' });
    }
  }, [signinSuccess]);

  useEffect(() => {
    // Reset selectedRole to empty after successful dispatch
    if (signinSuccess) {
      setSelectedRole('');
    }
  }, [signinSuccess]);

  return (
    <form className='w-full lgl:w-[450px] h-auto flex flex-col items-center'>
      <div className='px-6  w-full flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor'>
        {errorAlert.status && (
          <AlertComponent
            color='failure'
            type='Error!'
            message={errorAlert.message}
          />
        )}
        {successAlert.status && (
          <AlertComponent
            color='success'
            type='Success'
            message={successAlert.message}
          />
        )}
        <h1 className='font-titleFont decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4 text-center'>
          Create your account
        </h1>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-row gap-3'>
            {/* First name */}
            <div className='flex flex-col gap-.5'>
              <p className='font-titleFont text-base font-semibold text-gray-600'>
                First Name
              </p>
              <input
                onChange={handleFirstName}
                value={firstName}
                className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                type='text'
                placeholder='eg.John'
              />
              {errFirstName && (
                <p className='text-sm text-red-500 font-titleFont font-semibold px-4'>
                  <span className='font-bold italic mr-1'>!</span>
                  {errFirstName}
                </p>
              )}
            </div>
            {/* Last name */}
            <div className='flex flex-col gap-.5'>
              <p className='font-titleFont text-base font-semibold text-gray-600'>
                Last Name
              </p>
              <input
                onChange={handleLastName}
                value={lastName}
                className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                type='text'
                placeholder=' eg: Doe'
              />
              {errLastName && (
                <p className='text-sm text-red-500 font-titleFont font-semibold px-4'>
                  <span className='font-bold italic mr-1'>!</span>
                  {errLastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className='flex flex-col gap-.5'>
            <p className='font-titleFont text-base font-semibold text-gray-600'>
              Email
            </p>
            <input
              onChange={handleEmail}
              value={email}
              className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
              type='email'
              placeholder='johndoe@example.com'
            />
            {errEmail && (
              <p className='text-sm text-red-500 font-titleFont font-semibold px-4'>
                <span className='font-bold italic mr-1'>!</span>
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
              className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
              type='password'
              placeholder='Your password'
            />
            {errPassword && (
              <p className='text-sm text-red-500 font-titleFont font-semibold px-4'>
                <span className='font-bold italic mr-1'>!</span>
                {errPassword}
              </p>
            )}
          </div>
          <div className='flex flex-col gap-.5'>
            <p className='font-titleFont text-base font-semibold text-gray-600'>
              Reenter the password
            </p>
            <input
              onChange={handleconfirmPassword}
              value={confirmPassword}
              className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
              type='password'
              placeholder='Your  confirmPassword'
            />
            {errPassword && (
              <p className='text-sm text-red-500 font-titleFont font-semibold px-4'>
                <span className='font-bold italic mr-1'>!</span>
                {errPassword}
              </p>
            )}
          </div>

          <div className='flex flex-col gap-.5'>
            <p className='font-titleFont text-base font-semibold text-gray-600'>
              Sign up as
            </p>

            <select
              name='role'
              ref={roleSelectRef}
              value={selectedRole} // Set the selected value
              onChange={(e) => setSelectedRole(e.target.value)}
              className='w-full align-middle h-10 placeholder:text-sm placeholder:tracking-wide px-4 py-2 text-sm font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
            >
              <option value='' disabled selected hidden>
                Select an account type
              </option>
              <option value='customer' className='text-sm'>
                Customer
              </option>
              <option value='seller' className='text-sm'>
                Seller
              </option>
            </select>
            {errType && (
              <p className='text-sm text-red-500 font-titleFont font-semibold px-4'>
                <span className='font-bold italic mr-1'>!</span>
                {errType}
              </p>
            )}
          </div>

          {/* Checkbox */}
          <div className='flex items-start mdl:items-center gap-2'>
            <input
              onChange={() => setChecked(!checked)}
              className='w-4 h-4 mt-1 mdl:mt-0 cursor-pointer bg-[#fff]'
              type='checkbox'
            />
            <p className='text-sm text-primeColor'>
              I agree to the "company name"{' '}
              <a className='text-[#1E61CC]'>Terms of Service </a>
              and <a className='text-[#1E61CC]'>Privacy Policy</a>.
            </p>
          </div>
          <button
            type='button'
            disabled={loading}
            onClick={handleSignUp}
            className={`${
              checked
                ? 'bg-[#1D6F2B] hover:bg-[#437a4c] cursor-pointer'
                : 'bg-[#81b48a] disabled '
            } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300 mt-3`}
          >
            {loading ? (
              <>
                <Spinner className='inline-block mr-3' />
                Creating your account
              </>
            ) : (
              'Create Account'
            )}
          </button>
          <div className='ml-[5%]'>
            <hr className='inline-block w-[40%] align-middle'></hr>
            <span className='inline-block mx-4'>or</span>
            <hr className='inline-block w-[40%] align-middle'></hr>
          </div>

          <p className='text-sm text-center font-titleFont font-medium'>
            Already have an account?{' '}
            <Link
              className='text-[#1E61CC] Bduration-300 cursor-pointer'
              to='/signin'
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};
export default SignUpForm;
