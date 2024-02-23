import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ReactComponent as Spinner } from '../../assets/images/Spinner.svg';

import AlertComponent from '../designLayouts/AlertComponent';

const ForgotPasswordForm = (props) => {
  const [email, setEmail] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setEmail(e.target.value);
    setErrEmail('');
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      setErrEmail('Enter your email');
      return;
    } else if (!EmailValidation(email)) {
      setErrEmail('Enter a Valid email');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/forgot-password`,
        {
          email,
        }
      );

      if (response.status === 201) {
        setSuccessMessage(response.data.message);
        setEmail('');
      }
    } catch (error) {
      if (error?.response?.data?.message) setError(error.response.data.message);
      else setError('Error processing your request! Please try again later');
    } finally {
      setLoading(false);
    }
  }

  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  return (
    <>
      {(successMessage && (
        <AlertComponent
          color='success'
          type='Success'
          message={successMessage}
        />
      )) || (
        <form
          className='w-full lgl:w-[400px] h-auto flex flex-col gap-4 items-center'
          onSubmit={handleSubmit}
        >
          <div className='px-6 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin'>
            <h2 className='font-titleFont decoration-[1px] font-semibold text-sm mdl:text-4xl mb-6 text-center'>
              Reset Password
            </h2>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-.5 mb-2'>
                <p className='font-titleFont text-base font-semibold text-gray-600'>
                  Email
                </p>
                <input
                  onChange={handleOnChange}
                  value={email}
                  className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium 
                    placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                  type='email'
                  placeholder='john@example.com'
                />
                {errEmail && (
                  <p className='text-sm text-red-500 font-titleFont font-semibold px-4'>
                    <span className='font-bold italic mr-1'>!</span>
                    {errEmail}
                  </p>
                )}
              </div>

              {error && (
                <AlertComponent color='failure' type='Error!' message={error} />
              )}

              <button
                type='submit'
                className={
                  loading
                    ? 'bg-[#81b48a] text-gray-200 hover:text-white w-full text-base font-medium h-10 rounded-md duration-300 disabled'
                    : 'bg-[#1D6F2B] hover:bg-[#437a4c] text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300'
                }
              >
                {loading ? (
                  <>
                    <Spinner className='inline-block mr-3' />
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
              <p className='text-sm text-center font-titleFont font-medium -mt-2'>
                Did not forgot your password?{' '}
                <Link
                  className='text-[#1E61CC] duration-300 cursor-pointer'
                  to='/signin'
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

export default ForgotPasswordForm;
