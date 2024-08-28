// import { FiHeart } from "react-icons/fi";
// import { useState } from "react";
// import SmallImagesContainer from "./SmallImagesContainer";
// import { useSelector } from "react-redux";
// import { getCloudinaryUrl } from "../../components/imageslider/ImageSlider";
// const ProductImages = ({
//   activeImage,
//   productImages,
//   productId,
//   dispatch,
//   handleAddwishlist,
// }) => {
//   const wishlist = useSelector((state) => state.wishlist);
//   const productInwhishlist = wishlist.find(
//     (product) => product.id === productId
//   );

//   const [clicked, setClicked] = useState(false);

//   const onClickHeart = (event) => {
//     event.stopPropagation();
//     handleAddwishlist(productId);
//     setClicked(true);
//   };

//   const [hoveredImage, setHoveredImage] = useState(null);
//   const [isMouseMoveOnImage, setIsMouseMoveOnImage] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);

//   const handleImageHover = (e) => {
//     const optimizedImageUrl = getCloudinaryUrl(e.target.src, {
//       width: 500,
//       height: 500,
//     });
//     setHoveredImage(optimizedImageUrl);
//     setImagePreview(optimizedImageUrl);
//   };

//   const handleMouseMove = (e) => {
//     if (!isMouseMoveOnImage) return;

//     const rect = e.target.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     e.target.style.transformOrigin = `${x}px ${y}px`;
//   };

//   const handleMouseLeave = () => {
//     setHoveredImage(null);
//     setIsMouseMoveOnImage(false);
//   };

//   return (
//     <>
//       <div className="mt-4 inline-block w-container lg:w-[35%]">
//         <div className="flex flex-col gap-3 items-center">
//           {/* <div className="relative max-w-[428px] max-h-[418px] rounded-md overflow-hidden"> */}
//           <div className="relative  w-[428px] flex items-center justify-center h-[418px] p-1 rounded-md overflow-hidden">
//             {productInwhishlist || clicked ? (
//               <FiHeart
//                 className="absolute text-[red] right-2 top-2 bg-red-100 hover:text-[#1D6F2B] hover:bg-[#E5E5E5] rounded-full py-2.5 px-2.5  cursor-pointer"
//                 size={40}
//                 // onClick={(event) => handleAddwishlist(event)}
//               />
//             ) : (
//               <FiHeart
//                 className="absolute right-2 top-2 bg-white hover:text-[#1D6F2B] hover:bg-[#E5E5E5] rounded-full py-2.5 px-2.5  cursor-pointer"
//                 size={40}
//                 // onClick={(event) => handleAddwishlist(event)}
//                 onClick={onClickHeart}
//               />
//             )}

//             <img
//               src={activeImage.url}
//               className="w-auto h-[100%] text-center rounded-md object-fill "
//               alt=""
//               onMouseOver={handleImageHover}
//             />
//           </div>
//         </div>
//         <div className="flex flex-row gap-1">
//           <SmallImagesContainer
//             images={[
//               productImages.productThumbnail,
//               ...productImages.otherImages,
//             ]}
//             activeImage={activeImage}
//             dispatch={dispatch}
//           />
//         </div>
//       </div>

//       {hoveredImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
//           onMouseMove={handleMouseMove}
//           onMouseLeave={handleMouseLeave}
//         >
//           <div className="relative">
//             <img
//               src={hoveredImage}
//               className="max-w-full max-h-full transform transition-transform duration-300"
//               style={{
//                 transform: isMouseMoveOnImage ? "scale(2)" : "scale(1)",
//               }}
//               onMouseEnter={() => setIsMouseMoveOnImage(true)}
//               onMouseLeave={handleMouseLeave}
//               alt="Preview"
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProductImages;

import { FiHeart } from "react-icons/fi";
import { useState, useRef } from "react";
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

  const handleImageHover = (e) => {
    const optimizedImageUrl = getCloudinaryUrl(e.target.src, {
      width: 500,
      height: 500,
    });
    setHoveredImage(optimizedImageUrl);
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
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
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
              productImages.productThumbnail,
              ...productImages.otherImages,
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
