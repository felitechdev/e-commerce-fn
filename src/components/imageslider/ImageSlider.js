import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "./ImageSlider.css";
import { useNavigate } from "react-router-dom";

export function getCloudinaryUrl(imageUrl, options = {}) {
  const { width, height, quality } = options;

  // Default values
  const defaultQuality = "auto:best"; // Ensures the highest quality
  const defaultWidth = "auto";
  const defaultHeight = "auto";
  const cropMode = "thumb"; // Ensures the image is cropped and resized to fit the specified dimensions

  // Construct the transformation string
  const transformations = [
    `q_${quality || defaultQuality}`,
    `w_${width || defaultWidth}`,
    `h_${height || defaultHeight}`,
    `c_${cropMode}`,
  ].join(",");

  const url =
    imageUrl && imageUrl?.replace("/upload/", `/upload/${transformations}/`);

  // Insert transformations into the image URL
  return url;
}

const ImageSlider = ({ ads }) => {
  const navigate = useNavigate();

  //  // Usage example
  //  const optimizedImageUrl = getCloudinaryUrl(ad.image, {
  //   width: 240, // 15rem
  //   height: 240, // 15rem
  // });

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 5500,
        disableOnInteraction: true,
        waitForTransition: false,
        reverseDirection: false,
      }}
      modules={[Autoplay]}
      className="image-slider rounded-[15px]  h-full"
    >
      {ads?.map((ad, index) => (
        <SwiperSlide key={index}>
          <div
            className="slider-item "
            onClick={() => {
              navigate(`/products/${ad.id}`);
            }}
          >
            <img
              // className="!object-fill  h-[15rem] rounded"
              // className=" rounded-[15px] h-[15rem] w-full object-cover"
              src={getCloudinaryUrl(ad?.image, {
                width: 240, // 15rem
                height: 240, // 15rem
              })}
              alt={ad.title}
            />
            <div className="slider-title m-4">{ad.title}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
