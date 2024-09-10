import React from "react";

const Image = ({ imgSrc, className, onLoad }) => {
  return (
    <img className={className} src={imgSrc} alt={"image"} onLoad={onLoad} />
  );
};

export default Image;
