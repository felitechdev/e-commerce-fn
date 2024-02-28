import React from "react";

function removeDuplicateImages(imgArr) {
  let uniqueImgs = [];

  imgArr.forEach((img) => {
    const image = uniqueImgs.find((image) => image.url === img.url);

    if (!image) return uniqueImgs.push(img);
  });

  return uniqueImgs;
}

// For Color Images
function processColorImages(variations) {
  const colors = variations.reduce((acc, variation) => {
    const newColor = acc.find(
      (color) => color.color === variation.colorImg.colorName
    );

    if (!newColor)
      return [
        ...acc,
        {
          measurement: variation.measurementvalue,
          quantity: variation.colorMeasurementVariationQuantity,
          color: variation.colorImg.colorName,
          imageUrl: variation.colorImg.url,
        },
      ];
    else return [...acc];
  }, []);

  return colors;
}

const SmallImagesContainer = ({
  activeImage,
  images,
  dispatch,
  feature,
  variations,
  selectedMeasurement,
  selectedColor,
  productName,
}) => {
  const colorMeasurementVariations =
    feature === "colorImages" && processColorImages(variations);

  const handleImageClick = (e) => {
    const src = e.target.src;
    const img = images.find((img) => img.url === src);

    if (feature === "colorImages") {
      dispatch({
        type: "colorSelected",
        payload: img.colorName,
      });

      dispatch({
        type: "activeImageChanged",
        payload: img,
      });
    } else {
      dispatch({
        type: "activeImageChanged",
        payload: img,
      });
    }
  };

  const handleInsufficientQuantityHover = (e) => {
    alert("Combination not available");
  };

  return (
    <div className="flex flex-row gap-4">
      {feature === "colorImages" &&
        colorMeasurementVariations.map((variation) => {
          const colorMeasurementCombinationNotAvailable =
            selectedMeasurement === variation.measurement &&
            variation.quantity === 0;

          return (
            <button
              key={variation.quantity}
              disabled={colorMeasurementCombinationNotAvailable}
              className={`border-[2px] rounded-lg p-0.5 cursor-pointer text-sm disabled:opacity-30 disabled:cursor-not-allowed ${
                activeImage.url === variation.imageUrl
                  ? "border-dashed border-7 border-orange-400 shadow-orange-400 drop-shadow-xl"
                  : ""
              }`}
              onMouseOver={(e) => {
                colorMeasurementCombinationNotAvailable &&
                  handleInsufficientQuantityHover(e);
              }}
            >
              <img
                className={`w-[50px] h-[50px] rounded`}
                src={variation.imageUrl}
                onClick={handleImageClick}
                alt=""
              />
            </button>
          );
        })}

      {feature !== "colorImages" &&
        removeDuplicateImages(images).map((image, index) => {
          return (
            <img
              key={index}
              className={`w-[50px] h-[50px] border-[2px] rounded-lg p-0.5 cursor-pointer  ${
                activeImage.url === image.url
                  ? "border-dashed border-7 border-orange-400 shadow-orange-400 drop-shadow-xl"
                  : ""
              }`}
              src={image.url}
              onClick={handleImageClick}
              alt=""
            />
          );
        })}
    </div>
  );
};

export default SmallImagesContainer;

// import React from 'react';

// function removeDuplicateImages(imgArr) {
//   let uniqueImgs = [];

//   imgArr.forEach((img) => {
//     const image = uniqueImgs.find((image) => image.url === img.url);

//     if (!image) return uniqueImgs.push(img);
//   });

//   return uniqueImgs;
// }

// // For Color Images
// function processColorImages(variations) {
//   const colors = variations.reduce((acc, variation) => {
//     const newColor = acc.find(
//       (color) => color.color === variation.colorImg.colorName
//     );

//     if (!newColor)
//       return [
//         ...acc,
//         {
//           measurement: variation.measurementvalue,
//           quantity: variation.colorMeasurementVariationQuantity,
//           color: variation.colorImg.colorName,
//           imageUrl: variation.colorImg.url,
//         },
//       ];
//     else return [...acc];
//   }, []);

//   return colors;
// }

// const SmallImagesContainer = ({
//   activeImage,
//   images,
//   dispatch,
//   feature,
//   variations,
//   selectedMeasurement,
//   selectedColor,
//   productName,
// }) => {
//   const colorMeasurementVariations =
//     feature === 'colorImages' && processColorImages(variations);

//   const handleImageClick = (e) => {
//     const src = e.target.src;
//     const img = images.find((img) => img.url === src);

//     if (feature === 'colorImages') {
//       dispatch({
//         type: 'colorSelected',
//         payload: img.colorName,
//       });

//       dispatch({
//         type: 'activeImageChanged',
//         payload: img,
//       });
//     } else {
//       dispatch({
//         type: 'activeImageChanged',
//         payload: img,
//       });
//     }
//   };

//   const handleInsufficientQuantityHover = (e) => {
//     alert('Combination not available');
//   };

//   return (
//     <div className='flex flex-row gap-4'>
//       {feature === 'colorImages' &&
//         colorMeasurementVariations.map((variation) => {
//           const colorMeasurementCombinationNotAvailable =
//             selectedMeasurement === variation.measurement &&
//             variation.quantity === 0;

//           return (
//             <button
//               key={variation.quantity}
//               disabled={colorMeasurementCombinationNotAvailable}
//               className={`border-[2px] rounded-lg p-0.5 cursor-pointer text-sm disabled:opacity-30 disabled:cursor-not-allowed ${
//                 activeImage.url === variation.imageUrl
//                   ? 'border-dashed border-7 border-orange-400 shadow-orange-400 drop-shadow-xl'
//                   : ''
//               }`}
//               onMouseOver={(e) => {
//                 colorMeasurementCombinationNotAvailable &&
//                   handleInsufficientQuantityHover(e);
//               }}>
//               <img
//                 className={`w-[50px] h-[50px] rounded`}
//                 src={variation.imageUrl}
//                 onClick={handleImageClick}
//                 alt=''
//               />
//             </button>
//           );
//         })}

//       {feature !== 'colorImages' &&
//         removeDuplicateImages(images).map((image, index) => {
//           return (
//             <img
//               key={index}
//               className={`w-[50px] h-[50px] border-[2px] rounded-lg p-0.5 cursor-pointer  ${
//                 activeImage.url === image.url
//                   ? 'border-dashed border-7 border-orange-400 shadow-orange-400 drop-shadow-xl'
//                   : ''
//               }`}
//               src={image.url}
//               onClick={handleImageClick}
//               alt=''
//             />
//           );
//         })}
//     </div>
//   );
// };

// export default SmallImagesContainer;
