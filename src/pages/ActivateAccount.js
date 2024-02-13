import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProgresiveBar from '../components/ProgressiveBar';

const ActivateAccount = () => {
  const [isActivating, setIsActivating] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsActivating(true);
    const activateAccount = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/activate-account/${token}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          setTimeout(() => {
            navigate('/signin');
          }, 3000);
        }
      } catch (error) {
        // TODO: Handle Error
        alert('An error occured! Try again later.');
      } finally {
        setIsActivating(false);
      }
    };

    if (token) {
      activateAccount();
    }
  }, [token]);

  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      {isActivating && (
        <>
          <div className='w-full flex justify-center'>
            <img
              className='w-[200px]'
              src='https://res.cloudinary.com/dy2opnabf/image/upload/v1699005685/FeliTechWhiteLogo_aml9yf.jpg'
            />
          </div>
          <ProgresiveBar message='Activating your account...' />
        </>
      )}

      {!isActivating && (
        <div className='w-[30%] flex flex-col items-center gap-4'>
          <FiCheckCircle className='text-[#1D6F2B]' size={70} />
          <span className='text-[#1D6F2B] text-2xl'>Acount activated</span>
          <button
            type='button'
            onClick={() => navigate('/signin', { replace: true })}
            className='bg-[#1D6F2B] hover:bg-[#437a4c] text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300'
          >
            Sign in to continue
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivateAccount;
