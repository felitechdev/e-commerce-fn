import React, { useEffect, useState } from 'react';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import ProgresiveBar from '../../components/ProgressiveBar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FiCheckCircle } from 'react-icons/fi';

export default function VerifyPaymentPage() {
  const [isVerifying, setIsVerifying] = useState(true);

  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  const token = Cookies.get('token');

  const { tx_ref, transaction_id } = Object.fromEntries(
    searchParam.entries()
  );

  useEffect(() => {
    setIsVerifying(true);
    const activateAccount = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/payments/verify-payment`,

          {
            tx_ref,
            transaction_id,
          },
          {
            headers: {
              Authorization: ` Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setTimeout(() => {
            navigate('/user/order');
          }, 3000);
        }
      } catch (error) {
      } finally {
        setIsVerifying(false);
      }
    };

    activateAccount();
  }, [navigate, token, transaction_id, tx_ref]);

  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      {isVerifying && (
        <>
          <div className='w-full flex justify-center'>
            <img
              className='w-[200px]'
              src='https://res.cloudinary.com/dy2opnabf/image/upload/v1699005685/FeliTechWhiteLogo_aml9yf.jpg'
              alt=''
            />
          </div>
          <ProgresiveBar message='Verifying payment...' />
        </>
      )}

      {!isVerifying && (
        <div className='w-[30%] flex flex-col items-center gap-8'>
          <FiCheckCircle
            className='text-[#1D6F2B]'
            size={70}
          />
          <span className='text-[#1D6F2B] text-center text-2xl'>
            Payment was successful! You should expect
            deliver very soon.
          </span>
          <button
            type='button'
            onClick={() =>
              navigate('/user/order', { replace: true })
            }
            className='bg-[#1D6F2B] hover:bg-[#437a4c] text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300'
          >
            Track your orders
          </button>
        </div>
      )}
    </div>
  );
}
