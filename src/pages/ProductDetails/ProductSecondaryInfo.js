const ProductSecondaryInfo = ({ DBProductInfo }) => {
  return (
    <div className='w-container lgl:w-[70%] flex flex-col '>
      <div className='border-b-2 h-8'>
        <ul className='font-semibold'>
          <li className='inline-block cursor-pointer  bg-[#E5E5E5] py-[4px] px-[18px]'>
            Description
          </li>
        </ul>
      </div>
      <div className='border-2 border-t-0 rounded-bl-md rounded-br-md py-3 px-4'>
        {DBProductInfo?.description}
        <img src={DBProductInfo?.productImages?.productThumbnail?.url} />
      </div>
    </div>
  );
};

export default ProductSecondaryInfo;
