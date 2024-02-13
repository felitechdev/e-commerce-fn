import React, { useState, useEffect } from 'react';
import './loader/Loader.css';

const ProgresiveBar = ({ message }) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate the loader progress
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + 1);
      } else {
        clearInterval(interval);
        // Close the loader when progress reaches 100%
        setLoading(false);
      }
    }, 30);
    return () => {
      clearInterval(interval);
    };
  }, [progress]);

  useEffect(() => {
    window.addEventListener('load', () => {
      // Ensure the loader doesn't close prematurely when the page has finished loading
      if (progress < 100) {
        return;
      }
      setLoading(false);
    });

    return () => {
      window.removeEventListener('load', () => {
        if (progress < 100) {
          return;
        }
        setLoading(false);
      });
    };
  }, [progress]);

  return loading ? (
    <div className='w-full bg-white z-50 flex justify-center items-center flex-wrap '>
      <div className='w-full'>
        <div className='w-full flex justify-center'>
          <div className='loader w-[90%] md:w-[60%] lg:w-[40%] rounded-full'>
            <div
              className='loader-progress rounded-full'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <span className='mt-2 text-2xl text-[#1D6F2B]'>{message}</span>
    </div>
  ) : null;
};

export default ProgresiveBar;
