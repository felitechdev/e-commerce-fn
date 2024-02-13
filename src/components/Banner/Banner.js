import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import MenuIconWhite from '../../assets/images/menu-white.png';
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
} from '../../assets/images';
import Image from '../designLayouts/Image';
import NestedList from '../nestedList/NestedList';
import ImageSlider from '../imageslider/ImageSlider';

// change i made
const Banner = (props) => {
  console.log('BANNNER', props);
  const [dotActive, setDocActive] = useState(0);
  const [isviewAllselected, setIsviewAllselected] = useState(false);
  const handleViewAllClick = () => {
    props.onViewAllClick();
  };
  const ads = [
    {
      title: 'Ad 1',
      image:
        'https://ae04.alicdn.com/kf/S0fb7b4c77ed149ad9beccbbfba436bf0B.jpg_480x480.jpg_.webp',
    },
    {
      title: 'Ad 2',
      image:
        'https://ae04.alicdn.com/kf/S8ef35537fd044a738375ff9c8cef6a63N.jpg_480x480.jpg_.webp',
    },
    {
      title: 'Ad 3',
      image:
        'https://ae04.alicdn.com/kf/Se810acbc45bb4153a2d05e7f60b52c22C.jpg_480x480.jpg_.webp',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '7%',
          transform: 'translateY(-50%)',
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: '30px',
                color: '#65a30d',
                borderRight: '3px #65a30d solid',
                padding: '8px 0',
                cursor: 'pointer',
              }
            : {
                width: '30px',
                color: 'transparent',
                borderRight: '3px white solid',
                padding: '8px 0',
                cursor: 'pointer',
              }
        }
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '2%',
                transform: 'translateY(-50%)',
              }}
            >
              <ul style={{ margin: '0px' }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: '25px',
                      color: '#65a30d',
                      borderRight: '3px #65a30d solid',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }
                  : {
                      width: '25px',
                      color: 'transparent',
                      borderRight: '3px white solid',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };
  useEffect(() => {
    if (!props.allcategory) {
      setIsviewAllselected(true);
    } else {
      setIsviewAllselected(false);
    }
  }, [props.allcategory]);

  return (
    <div className=' bg-white w-full flex justify-center'>
      <div className='w-full lg:container'>
        <div className='relative w-full flex gap-4 py-2'>
          <div className='z-10 hidden lg:w-[20%] lg:block'>
            <div className='relative text-white bg-[#D9D9D970] rounded-md  border-box cursor-pointer items-center '>
              <div className='flex bg-[#1D6F2B] p-2 py-3 items-center gap-2 rounded-md mb-2'>
                {/* <div className="flex bg-[red] p-2 py-3 items-center gap-2 rounded-md"> */}
                <img src={MenuIconWhite} className='w-5 h-5' />
                <p className='text-[14px] font-semibold'>Categories</p>
              </div>
              {(props.allcategory || props.allcatesubcategory) && (
                <span
                  onClick={handleViewAllClick}
                  className='text-[black]   space-y-4 h-[12rem] overflow-scroll mt-4 scrollbar-hide px-2 hover:text-[#1D6F2B]  hover:rounded-md w-full'
                >
                  View All
                </span>
              )}
              <NestedList
                onCategorySelect={props.onCategorySelect}
                isviewAllselected={isviewAllselected}
                subcategoryListClassName='absolute top-12 left-full mt-2 ml-1'
              />
            </div>
          </div>
          <div className='w-full lg:w-[60%]  '>
            <Slider {...settings} className='px-4 w-full'>
              <div className='w-1408 h-[15rem] mx-auto rounded-md'>
                <Image
                  imgSrc={bannerImgOne}
                  className='w-full h-full object-cover rounded-md'
                />
              </div>
              <div className='w-1432 h-[15rem] mx-auto rounded-md'>
                <Image
                  imgSrc={bannerImgTwo}
                  className='w-full h-full object-cover rounded-md'
                />
              </div>
              <div className='w-1408 h-[15rem] mx-auto rounded-md'>
                <Image
                  imgSrc={bannerImgThree}
                  className='w-full h-full object-cover rounded-md'
                />
              </div>
            </Slider>
          </div>
          <div className='hidden lg:w-[20%] lg:block'>
            <ImageSlider ads={ads} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
