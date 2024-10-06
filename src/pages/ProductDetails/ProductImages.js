

import { FiHeart } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import SmallImagesContainer from "./SmallImagesContainer";
import { useSelector } from "react-redux";
import { getCloudinaryUrl } from "../../components/imageslider/ImageSlider";

const ProductImages = ({
  activeImage,
  productImages,
  productId,
  dispatch,
  handleAddwishlist,
}) => {
  const wishlist = useSelector((state) => state.wishlist);
  const productInwhishlist = wishlist.find(
    (product) => product.id === productId
  );

  const [clicked, setClicked] = useState(false);
  const imgRef = useRef(null);

  const onClickHeart = (event) => {
    event.stopPropagation();
    handleAddwishlist(productId);
    setClicked(true);
  };

  const [hoveredImage, setHoveredImage] = useState(null);
  const [isMouseMoveOnImage, setIsMouseMoveOnImage] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleImageHover = (e) => {
    // const optimizedImageUrl = getCloudinaryUrl(e.target.src, {
    //   width: 500,
    //   height: 500,
    // });
    // setHoveredImage(optimizedImageUrl);
    if (!isSmallScreen) {
      const optimizedImageUrl = getCloudinaryUrl(e.target.src, {
        width: 500,
        height: 500,
      });
      setHoveredImage(optimizedImageUrl);
    }
  };

  const handleMouseMove = (e) => {
    if (imgRef.current) {
      const { left, top, width, height } =
        imgRef.current.getBoundingClientRect();
      const x = ((e.pageX - left) / width) * 100;
      const y = ((e.pageY - top) / height) * 100;
      imgRef.current.style.transformOrigin = `${x}% ${y}%`;
      imgRef.current.style.transform = "scale(2)";
    }
  };

  const handleMouseLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = "scale(1)";
      imgRef.current.style.transformOrigin = "center center";
    }
    setIsMouseMoveOnImage(false);
  };

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Set breakpoint for small screens
    };

    handleResize(); // Check screen size on mount
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className="mt-4 inline-block  
       lg:w-[35%]"
      >
        <div className="flex flex-col gap-3 items-center">
          <div className="relative md:w-[428px]  flex items-center justify-center h-[418px] p-1 rounded-md overflow-hidden">
            {productInwhishlist || clicked ? (
              <FiHeart
                className="absolute z-30 text-[red] right-2 top-2 bg-red-100 hover:text-[#1D6F2B] hover:bg-[#E5E5E5] rounded-full py-2.5 px-2.5 cursor-pointer"
                size={40}
              />
            ) : (
              <FiHeart
                className="absolute z-30 right-2 top-2 bg-white hover:text-[#1D6F2B] hover:bg-[#E5E5E5] rounded-full py-2.5 px-2.5 cursor-pointer"
                size={40}
                onClick={onClickHeart}
              />
            )}

            <div
              className="overflow-hidden cursor-pointer hover:border hover:rounded-md hover:border-primary  w-full h-full"
              onMouseMove={isSmallScreen ? null : handleMouseMove}
              onMouseLeave={isSmallScreen ? null : handleMouseLeave}
            >
              <img
                ref={imgRef}
                src={activeImage.url}
                className={`w-auto h-[100%] text-center rounded-md object-fill transition-transform duration-300 ease-in-out hover:w-[100%]`}
                alt=""
                onMouseOver={handleImageHover}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-1">
          <SmallImagesContainer
            images={[
              productImages?.productThumbnail,
              ...productImages?.otherImages,
            ]}
            activeImage={activeImage}
            dispatch={dispatch}
          />
        </div>
      </div>
    </>
  );
};

export default ProductImages;
