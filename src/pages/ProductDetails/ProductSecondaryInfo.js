const ProductSecondaryInfo = ({ product }) => {
  return (
    <div className="w-container w-full flex flex-col ">
      <div className="border-b-2 h-8">
        <ul className="font-semibold">
          <li className="inline-block cursor-pointer  bg-[#E5E5E5] py-[4px] px-[18px]">
            Description
          </li>
        </ul>
      </div>
      <div className="border-2 border-t-0 rounded-bl-md rounded-br-md py-3 px-4 capitalize-first flex gap-5 justify-between">
        {product?.description.length > 50 ? (
          <p
            className="flex-1 text-gray-600"
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          ></p>
        ) : (
          <p className="flex-1 text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum
            delectus consequuntur aperiam doloribus aliquid in maiores inventore
            facilis, consectetur officia ullam dolorem aliquam velit ipsa fuga
            omnis suscipit sequi. Voluptatum!
          </p>
        )}

        <div className="flex-1 flex justify-center items-center">
          <img
            src={product?.productImages?.productThumbnail?.url}
            className="block w-[50%]  object-center"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSecondaryInfo;
