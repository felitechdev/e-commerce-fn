import React from 'react';
import { FeliTechLogo_transparent } from '../../assets/images';
import { Link } from 'react-router-dom';

export default function AuthLayout({ children }) {
  return (
    <div className='w-[500px] mx-auto h-screen flex items-center justify-center'>
      <div className='w-full bg-white flex flex-col gap-4'>
        <Link to='/'>
          <img
            src={FeliTechLogo_transparent}
            alt='logoImg'
            className='w-32 mx-auto'
          />
        </Link>
        {children}
      </div>
    </div>
  );
}
