const ProductSecondaryInfo = ({ DBProductInfo }) => {
  return (
    <div className='w-container lgl:w-[70%] flex flex-col '>
      <div className='border-b-2 h-8'>
        <ul className='font-semibold'>
          <li className='inline-block cursor-pointer  bg-[#E5E5E5] py-[4px] px-[18px]'>
            Description
          </li>
          {/* <li className="inline-block mr-6 cursor-pointer  hover:text-[#1D6F2B] py-[4px] px-[18px]">Reviews</li>  */}
        </ul>
      </div>
      <div className='border-2 border-t-0 rounded-bl-md rounded-br-md py-3 px-4'>
        {/* This section should receive the description from the database 
                which contains html tags passed from the text editor embedded for 
                inputting the description in product uploading */}
        {DBProductInfo?.description}
        <img src={DBProductInfo?.productImages?.productThumbnail?.url} />
      </div>
    </div>
  );
};

export default ProductSecondaryInfo;
