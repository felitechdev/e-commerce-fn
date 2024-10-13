import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Image from "../designLayouts/Image";
import HomePageCategories from "../homePageCategories/HomePageCategories";
import ImageSlider, { getCloudinaryUrl } from "../imageslider/ImageSlider";
import { IoMdMenu } from "react-icons/io";
// change i made
const Banner = ({ ...props }) => {
  const [dotActive, setDocActive] = useState(0);
 

  const navigate = useNavigate();

  // const ads = [
  //   {
  //     title: "Ad 1",
  //     image:
  //       "https://ae04.alicdn.com/kf/S0fb7b4c77ed149ad9beccbbfba436bf0B.jpg_480x480.jpg_.webp",
  //   },
  //   {
  //     title: "Ad 2",
  //     image:
  //       "https://ae04.alicdn.com/kf/S8ef35537fd044a738375ff9c8cef6a63N.jpg_480x480.jpg_.webp",
  //   },
  //   {
  //     title: "Ad 3",
  //     image:
  //       "https://ae04.alicdn.com/kf/Se810acbc45bb4153a2d05e7f60b52c22C.jpg_480x480.jpg_.webp",
  //   },
  // ];

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
          position: "absolute",
          top: "50%",
          left: "7%",
          transform: "translateY(-50%)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      // <div
      //   style={
      //     i === dotActive
      //       ? {
      //           width: "30px",
      //           color: "#65a30d",
      //           borderRight: "3px #65a30d solid",
      //           padding: "8px 0",
      //           cursor: "pointer",
      //         }
      //       : {
      //           width: "30px",
      //           color: "transparent",
      //           borderRight: "3px white solid",
      //           padding: "8px 0",
      //           cursor: "pointer",
      //         }
      //   }
      // >
      //   0{i + 1}
      // </div>
      <></>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2%",
                transform: "translateY(-50%)",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            // <div
            //   style={
            //     i === dotActive
            //       ? {
            //           width: "25px",
            //           color: "#65a30d",
            //           borderRight: "3px #65a30d solid",
            //           cursor: "pointer",
            //           fontSize: "12px",
            //         }
            //       : {
            //           width: "25px",
            //           color: "transparent",
            //           borderRight: "3px white solid",
            //           cursor: "pointer",
            //           fontSize: "12px",
            //         }
            //   }
            // >
            //   0{i + 1}
            // </div>
            <></>
          ),
        },
      },
    ],
  };

 



  const [showCategory, setShowCategory] = useState(false); // Control visibility of shopcategory
  const [categoryMenuIsOpen, setCategoryMenuIsOpen] = useState(false); // Control menu toggle

  // Handle category menu toggle
  const handleCategoryMenu = async () => {
    setCategoryMenuIsOpen(!categoryMenuIsOpen);
    if (categoryMenuIsOpen) {
      document.querySelector(".shopcategory").style.position = "relative";
      document.querySelector(".shopcategory").style.zIndex = "0";
      document.querySelector(".shopcategory").style.height = "100%";
      document.querySelector(".shopcategory").style.display="block";
    
    }
    else{
      document.querySelector(".shopcategory").style.display="none";

    }

    const showHideButton = await document.querySelector(".show-hide");
    if (window.scrollY > 300 && showHideButton.style.display == "none" ) {
      document.querySelector(".shopcategory").style.position = "fixed";
      document.querySelector(".shopcategory").style.zIndex = "1000";
      document.querySelector(".shopcategory").style.height = "300px";
      document.querySelector(".shopcategory").style.marginTop = "-30px";
   
    }


  };

  useEffect(()=>{
    const showHideButton = document.querySelector(".show-hide");
    if (window.scrollY < 300) {
      showHideButton.style.display = "none";
      showHideButton.style.zIndex = "auto";
    }
  } , [window.scrollY])


  // Handle scroll behavior to fix the category menu after 300px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !categoryMenuIsOpen) {
        document.querySelector(".shopcategory").style.position = "fixed";
        document.querySelector(".shopcategory").style.zIndex = "1000";
        document.querySelector(".shopcategory").style.height = "300px";
        document.querySelector(".shopcategory").style.marginTop = "-30px";
        setShowCategory(true);

      } else {
        document.querySelector(".shopcategory").style.display="block";
        document.querySelector(".shopcategory").style.position = "relative";
        document.querySelector(".shopcategory").style.zIndex = "auto";
        document.querySelector(".shopcategory").style.height = "100%";
        setShowCategory(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [categoryMenuIsOpen]);

  // Control the visibility of the `show-hide` toggle button
  useEffect(() => {
    const showHideButton = document.querySelector(".show-hide");
    if (categoryMenuIsOpen && window.scrollY > 300 ) {
      showHideButton.style.display = "block";
      showHideButton.style.position = "fixed";
      showHideButton.style.marginTop ="-30px";
  
      showHideButton.style.zIndex = "1000";
    } else {
      showHideButton.style.display = "none";
      showHideButton.style.zIndex = "auto";
      setCategoryMenuIsOpen(false);
    }
  }, [categoryMenuIsOpen,window.scrollY ]);

      


  const optimizedImageUrl = "";

  return (
    <div className=" bg-white max-w-container px-2  md:px-6 m-auto flex justify-center h-64">
      <div className="w-full lg:container">
        <div className="relative w-full flex gap-4 py-2 h-full">
       
            
         <div className="hidden  lg:w-fit lg:flex show-hide cursor-pointer "  onClick={handleCategoryMenu}>
            <span className="bg-primary  rounded-md p-1  text-white flex justify-between items-center space-x-2"> <span> <IoMdMenu className="h-5 w-5 "  /></span> <p> Shop by Categories</p> </span>
          </div>
              
            
          <div className="hidden lg:w-[20%] lg:block bg-white  shopcategory" >
            <HomePageCategories  showcategory={showCategory}  handleCategoryMenu={handleCategoryMenu} />
          </div>
          <div className="block lg:w-[20%] lg:hidden absolute z-10 left-4 w-[30%]  opacity-0.5 ">
            {" "}
            <HomePageCategories />
          </div>

          <div className="hidden lg:flex   w-[60%] ">
            <Slider {...settings} className="px-4 w-full  ">
              {props?.ads && props?.ads.length > 0 ? (
                props?.ads?.map((ad, index) => {
                  return (
                    <div
                      key={index + 1}
                      className="w-1408 h-[15rem] mx-auto  rounded-[15px]  border"
                      onClick={() => {
                        navigate(`/products/${ad.id}`);
                      }}
                    >
                      <Image
                        imgSrc={getCloudinaryUrl(ad.image, {
                          width: 800,
                          height: 240,
                        })}
                        // className="w-[800px] h-[240px]  object-cover rounded-[15px]"
                        className="w-full h-full object-fill rounded-[15px]  "
                      />
                    </div>
                  );
                })
              ) : (
                <div className="w-1408 h-[15rem] mx-auto rounded-[15px] ">
                  <Image
                    // imgSrc={bannerImgOne}
                    imgSrc="https://res.cloudinary.com/dccszmlim/image/upload/v1726477123/felitechnology_E-commerce_HAHA/imdfmiu38l17nkjxoxnl.png"
                    className="w-full h-full object-cover rounded-[15px]"
                  />
                </div>
              )}
              {/* <div className="w-1408 h-[15rem] mx-auto rounded-[15px]">
                <Image
                  imgSrc={bannerImgOne}
                  className="w-full h-full object-cover rounded-[15px]"
                />
              </div>
              <div className="w-1432 h-[15rem] mx-auto rounded-[15px]">
                <Image
                  imgSrc={bannerImgTwo}
                  className="w-full h-full object-cover rounded-[15px]"
                />
              </div>
              <div className="w-1408 h-[15rem] mx-auto rounded-[15px]">
                <Image
                  imgSrc={bannerImgThree}
                  className="w-full h-full object-cover rounded-[15px]"
                />
              </div>

              <div className="w-1408 h-[15rem] mx-auto rounded-[15px]">
                <Image
                  imgSrc={bannerImgThree}
                  className="w-full h-full object-cover rounded-[15px]"
                />
              </div> */}
            </Slider>
          </div>

          <div className="w-full lg:hidden   ">
            <Slider {...settings} className="px-4 w-full rounded-[15px]">
              {/* <div className="w-1408 h-[15rem] mx-auto rounded-[15px]">
                <Image
                  imgSrc={bannerImgOne}
                  className="w-full h-full object-cover rounded-[15px]"
                />
              </div>
              <div className="w-1432 h-[15rem] mx-auto rounded-[15px]">
                <Image
                  imgSrc={bannerImgTwo}
                  className="w-full h-full object-cover rounded-[15px]"
                />
              </div>
              <div className="w-1408 h-[15rem] mx-auto rounded-[15px]">
                <Image
                  imgSrc={bannerImgThree}
                  className="w-full h-full object-cover rounded-[15px]"
                />
              </div>

              <div className="w-1408 h-[15rem] mx-auto rounded-[15px]">
                <Image
                  imgSrc={bannerImgThree}
                  className="w-full h-full object-cover rounded-[15px]"
                />
              </div> */}

              {props?.ads && props?.ads.length > 0 ? (
                props?.ads?.map((ad, index) => {
                  return (
                    <div
                      key={index}
                      className="w-1408 h-[15rem] mx-auto rounded-[15px] border"
                      onClick={() => {
                        navigate(`/products/${ad.id}`);
                      }}
                    >
                      <Image
                        imgSrc={ad.image}
                        // imgSrc={getCloudinaryUrl(ad.image, {})}
                        className="h-full w-full object-fill rounded-[15px] m-auto"
                      />
                    </div>
                  );
                })
              ) : (
                <div className="w-1408 h-[15rem] mx-auto rounded-[15px] border">
                  <Image
                    imgSrc="https://res.cloudinary.com/dccszmlim/image/upload/v1726477123/felitechnology_E-commerce_HAHA/imdfmiu38l17nkjxoxnl.png"
                    className="h-full w-full object-fill rounded-[15px] m-auto"
                  />
                </div>
              )}
            </Slider>
          </div>
          <div className="hidden lg:w-[20%] lg:block  rounded-[15px]  border  ">
            <ImageSlider ads={props?.ads} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
