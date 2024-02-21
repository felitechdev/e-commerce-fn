import { FiHeart } from 'react-icons/fi';
import SmallImagesContainer from './SmallImagesContainer';

const ProductImages = ({ activeImage, productImages, dispatch }) => {
  return (
    <>
      <div className='mt-4 inline-block w-container lg:w-[35%]'>
        <div className='flex flex-col gap-3 items-center'>
          <div className='relative max-w-[428px] max-h-[418px] rounded-md'>
            <FiHeart
              className='absolute right-2 top-2 bg-white hover:text-[#1D6F2B] hover:bg-[#E5E5E5] rounded-full py-1.5 px-2.5  cursor-pointer'
              size={40}
            />

            <img
              src={activeImage.url}
              className='w-full rounded-md'
              alt=''
            />
          </div>
          <div className='flex flex-row gap-1'>
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
      </div>
    </>
  );
};

export default ProductImages;
