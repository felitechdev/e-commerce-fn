const ProductSecondaryInfo = ({ product }) => {
  function getCloudinaryUrl(imageUrl, options = {}) {
    const { width, height, quality } = options;

    // Default values
    const defaultQuality = "auto:best"; // Ensures the highest quality
    const defaultWidth = "auto";
    const defaultHeight = "auto";
    const cropMode = "fill"; // Ensures the image is cropped and resized to fit the specified dimensions

    // Construct the transformation string
    const transformations = [
      `q_${quality || defaultQuality}`,
      `w_${width || defaultWidth}`,
      `h_${height || defaultHeight}`,
      `c_${cropMode}`,
    ].join(",");

    // Insert transformations into the image URL
    return imageUrl.replace("/upload/", `/upload/${transformations}/`);
  }

  // Usage example
  const optimizedImageUrl = getCloudinaryUrl(
    product?.productImages?.productThumbnail?.url,
    {
      width: 400,
      height: 400,
    }
  );

  // <img
  //   src="https://res.cloudinary.com/dccszmlim/image/upload/q_auto:best,c_fill/v1725021396/felitechnology_E-commerce_HAHA/dazhuyyquvyvdauio5cy.png"
  //   class="m-auto"
  // ></img>;

  return (
    <div className="w-container w-full  flex flex-col">
      <div className="border-b-2 h-8">
        <ul className="font-semibold">
          <li className="inline-block cursor-pointer bg-[#E5E5E5] py-[4px] px-[18px]">
            Description
          </li>
        </ul>
      </div>

      <div className="border-2 border-t-0 rounded-bl-md rounded-br-md py-3 px-4 capitalize-first flex-col sml:flex gap-5">
        {product?.attributes?.length > 0 && (
          <table className=" border table-auto  ">
            {product?.attributes.map((attribute, index) => {
              return (
                <tr className="border">
                  <td className="border border-black">{attribute.key}</td>
                  <td className="border border-black">{attribute.value}</td>
                </tr>
              );
            })}
          </table>
        )}

        {product?.description.length > 0 && (
          <p
            className=" text-gray-600 w-full p-0 break-words overflow-auto"
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          ></p>
        )}

        <div className="flex-4 flex justify-start items-center">
          <img
            src={optimizedImageUrl}
            // style={{ width: "100%", height: "auto" }}
            className="m-auto"
          />
        </div>

        {/* <div className="flex-4 flex justify-start items-center">
          <img
            src={product?.productImages?.productThumbnail?.url}
            className="block w-[50%] object-center"
            alt=""
          />
        </div> */}
      </div>
    </div>
  );
};

export default ProductSecondaryInfo;
