import React, { useState } from 'react';

const SmallImagesContainer = (props) => {
  console.log('Props', props);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (e) => {
    const { imageid, imagecategory } = e.currentTarget.dataset;
    const img = props.imagesInfo.find((image) => image._id === imageid);
    props.onImageClick(img.url);
    setSelectedImage({ imageid, imagecategory });
  };

  return (
    <div className='flex flex-row gap-1'>
      {props.imagesInfo.map((imageInfo) => {
        return (
          <img
            key={imageInfo._id}
            className={`w-[45px] h-[45px] border-[2px] rounded-lg cursor-pointer ${
              selectedImage &&
              selectedImage.imageid === imageInfo._id &&
              selectedImage.imagecategory === props.imageCategory
                ? 'item-selected'
                : ''
            }`}
            src={imageInfo.url}
            data-imageid={imageInfo._id}
            data-imagecolorname={imageInfo.colorName}
            data-imagecategory={props.imageCategory}
            onClick={handleImageClick}
          />
        );
      })}
    </div>
  );
};

export default SmallImagesContainer;
