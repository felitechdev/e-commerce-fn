import React, { useState } from 'react';

const SmallImagesContainer = (props) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (e) => {
        const { imageid, imagecategory, imagecolorname } = e.currentTarget.dataset;
        
        setSelectedImage({ imageid, imagecategory });

        if (imagecategory === "color-images") {
            props.setCartItemInfo({
                ...props.cartItemInfo,
                imagePreview: e.target.src,
                colorId: imageid,
                colorName: imagecolorname,
            })
        } else { 
            props.setCartItemInfo({
                ...props.cartItemInfo,
                imagePreview: e.target.src,
            });
        }
    };

    return (
        <div className="flex flex-row gap-1">
            {props.imagesInfo.map((imageInfo) => (
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
            ))}
        </div>
    );
};

export default SmallImagesContainer;
