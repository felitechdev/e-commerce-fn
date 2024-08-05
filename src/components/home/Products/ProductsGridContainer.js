// const ProductsGridContainer = (props) => {
//   return (
//     <div className="w-full grid grid-cols-1 xs:grid-cols-2 sml:grid-cols-3 mdl:grid-cols-4 lg:grid-cols-5 lgl:grid-cols-6 gap-2 lg:gap-4 auto-rows-min align-start">
//       {props.children}
//     </div>
//   );
// };

// export default ProductsGridContainer;

import Masonry from "react-masonry-css";

const ProductsGridContainer = (props) => {
  const breakpointColumnsObj = {
    default: 6,
    1100: 5,
    800: 4,
    600: 3,
    400: 2,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {props.children}
    </Masonry>
  );
};

export default ProductsGridContainer;
