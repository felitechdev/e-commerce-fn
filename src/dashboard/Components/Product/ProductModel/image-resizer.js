// import React, { useEffect, useState } from "react";
// import Resizer from "react-image-file-resizer";

// export const ImageResizer = () => {
//   const [newImage, setNewImage] = useState(null);
//   // 800 , 240
//   const width = 800;
//   const height = 240; // Set height based on the desired aspect ratio

//   const resizeFile = (file) => {
//     try {
//       Resizer.imageFileResizer(
//         file,
//         width,
//         height,
//         "PNG", // Specify a single format, like "JPEG"
//         100,
//         0,
//         (uri) => {
//           setNewImage(uri);
//           console.log(uri);
//         },
//         "base64",
//         width,
//         height
//       );
//     } catch (err) {
//       console.log("error on image resizer", err);
//     }
//   };

//   return (
//     <div>
//       <h1>
//         Your image will be resized to a width of {width}px and a height of{" "}
//         {height}px.
//       </h1>

//       {newImage && (
//         <img
//           src={newImage}
//           alt="newImage"
//           className="object-center"
//           style={{
//             width: `${width}px`,
//             height: `${height}px`,
//           }}
//         />
//       )}

//       {/* Input to upload and resize an image */}
//       <input
//         type="file"
//         onChange={(e) => {
//           resizeFile(e.target.files[0]);
//         }}
//       />
//     </div>
//   );
// };

import React, { useState } from "react";
import Resizer from "react-image-file-resizer";

export const ImageResizer = () => {
  const [newImage, setNewImage] = useState(null);
  const width = 800;
  const height = 240;

  const resizeFile = (file) => {
    const fileType = file.type.split("/")[1].toUpperCase(); // Extract file type
    try {
      Resizer.imageFileResizer(
        file,
        width,
        height,
        fileType, // Dynamically use the file type
        100,
        0,
        (uri) => {
          setNewImage(uri);
          console.log("url", uri);
        },
        "base64",
        width,
        height
      );
    } catch (err) {
      console.log("error on image resizer", err);
    }
  };

  return (
    <div>
      <h1>
        Your image will be resized to a width of {width}px and a height of{" "}
        {height}px.
      </h1>

      {newImage && (
        <img
          src={newImage}
          alt="newImage"
          className="object-center"
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        />
      )}

      {/* Input to upload and resize an image */}
      <input
        type="file"
        onChange={(e) => {
          resizeFile(e.target.files[0]);
        }}
      />
    </div>
  );
};
