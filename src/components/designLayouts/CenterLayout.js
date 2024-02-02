import React from 'react';

export default function CenterLayout({ children }) {
  return (
    <div className='w-full bg-white flex justify-center items-center pt-20 pb-8'>
      {children}
    </div>
  );
}
