import React, { useState, useEffect } from "react";
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

    const showHideButton = await document.querySelector(".show-hide");
    if (window.scrollY > 300 && showCategory) {
      document.querySelector(".shopcategory").style.position = "fixed";
      document.querySelector(".shopcategory").style.zIndex = "1000";
      document.querySelector(".shopcategory").style.height = "300px";
      document.querySelector(".shopcategory").style.marginTop = "-30px";
    } else {
      document.querySelector(".shopcategory").style.position = "relative";
      document.querySelector(".shopcategory").style.zIndex = "0";
      document.querySelector(".shopcategory").style.height = "100%";
      document.querySelector(".shopcategory").style.display = "block";
    }
  };

  const handlecloseCategoryMenu = () => {
    setCategoryMenuIsOpen(false);
    setShowCategory(false);
    // document.querySelector(".shopcategory").style.position = "relative";
    // document.querySelector(".shopcategory").style.zIndex = "0";
    // document.querySelector(".shopcategory").style.height = "100%";
    document.querySelector(".shopcategory").style.display = "none";
  };

  useEffect(() => {
    const showHideButton = document.querySelector(".show-hide");
    if (window.scrollY < 300) {
      showHideButton.style.display = "none";
      showHideButton.style.zIndex = "auto";
    }
  }, [window.scrollY]);

  // Control the visibility of the `show-hide` toggle button
  useEffect(() => {
    const showHideButton = document.querySelector(".show-hide");
    if (!categoryMenuIsOpen && window.scrollY > 300) {
      showHideButton.style.display = "block";
      showHideButton.style.position = "fixed";
      showHideButton.style.marginTop = "-30px";
      setShowCategory(true);
      showHideButton.style.zIndex = "1000";
    } else {
      setShowCategory(false);
      showHideButton.style.display = "none";
      showHideButton.style.zIndex = "auto";
      setCategoryMenuIsOpen(false);
      document.querySelector(".shopcategory").style.position = "relative";
      document.querySelector(".shopcategory").style.zIndex = "10";
      document.querySelector(".shopcategory").style.height = "100%";
      document.querySelector(".shopcategory").style.display = "block";
      document.querySelector(".shopcategory").style.marginTop = "0px";
    }
  }, [categoryMenuIsOpen, window.scrollY]);

  // 667px  hide   show-hide

  useEffect(() => {
    const showHideButton = document.querySelector(".show-hide");
    if (window.innerWidth < 667) {
      showHideButton.style.display = "none";
    } else {
     
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < 667) {
        showHideButton.style.display = "none";
      } else {
      
      }
    });
  }, []);

  const optimizedImageUrl = "";

  return (
    <div className="m-auto flex h-64 max-w-container justify-center bg-white px-6">
      <div className="w-full lg:container">
        <div className="relative flex h-full w-full gap-4 py-2">
          <div
            className="show-hide hidden cursor-pointer  lg:flex lg:w-fit"
            onClick={handleCategoryMenu}
          >
            <span className="flex items-center justify-between space-x-2 rounded-md bg-primary p-1 text-white">
              {" "}
              <span>
                {" "}
                <IoMdMenu className="h-5 w-5" />
              </span>{" "}
              <p> Shop by Categories</p>{" "} 
            </span>
          </div>

          <div className={`shopcategory hidden bg-white lg:block lg:w-[20%]`}>
            <HomePageCategories
              showcategory={showCategory}
              handlecloseCategoryMenu={handlecloseCategoryMenu}
              handleCategoryMenu={handleCategoryMenu}
            />
          </div>
          <div className="opacity-0.5 absolute left-4 z-10 block w-[30%] lg:hidden lg:w-[20%]">
            <HomePageCategories />
          </div>

          <div className="hidden w-[60%] lg:flex">
            <Slider {...settings} className="w-full px-4">
              {props?.ads && props?.ads.length > 0 ? (
                props?.ads?.map((ad, index) => {
                  return (
                    <div
                      key={index + 1}
                      className="w-1408 mx-auto h-[15rem] rounded-[15px] border"
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
                        className="h-full w-full rounded-[15px] object-fill"
                      />
                    </div>
                  );
                })
              ) : (
                <div className="w-1408 mx-auto h-[15rem] rounded-[15px]">
                  <Image
                    // imgSrc={bannerImgOne}
                    imgSrc="https://res.cloudinary.com/dccszmlim/image/upload/v1726477123/felitechnology_E-commerce_HAHA/imdfmiu38l17nkjxoxnl.png"
                    className="h-full w-full rounded-[15px] object-cover"
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

          <div className="w-full lg:hidden">
            <Slider {...settings} className="w-full rounded-[15px] px-4">
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
                      className="w-1408 mx-auto h-[15rem] rounded-[15px] border"
                      onClick={() => {
                        navigate(`/products/${ad.id}`);
                      }}
                    >
                      <Image
                        imgSrc={ad.image}
                        // imgSrc={getCloudinaryUrl(ad.image, {})}
                        className="m-auto h-full w-full rounded-[15px] object-fill"
                      />
                    </div>
                  );
                })
              ) : (
                <div className="w-1408 mx-auto h-[15rem] rounded-[15px] border">
                  <Image
                    imgSrc="https://res.cloudinary.com/dccszmlim/image/upload/v1726477123/felitechnology_E-commerce_HAHA/imdfmiu38l17nkjxoxnl.png"
                    className="m-auto h-full w-full rounded-[15px] object-fill"
                  />
                </div>
              )}
            </Slider>
          </div>
          <div className="hidden rounded-[15px] border h-[15rem] text-center justify-center lg:block lg:w-[20%] ">
            {/* <ImageSlider ads={props?.ads} /> */}

            Space for Ads
          
          </div>

         


        </div>
      </div>
    </div>
  );
};





export default Banner;
export const AdBanner = () => {
  useEffect(() => {
    const loadAds = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("Adsbygoogle script failed to load:", e);
      }
    };

    loadAds();
  }, []);

  return (
    <div className="image-slider 
    !max-h-[300px]">
      {/* Google AdSense Ad */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4634354492890842"
        data-ad-slot="4465416700"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};