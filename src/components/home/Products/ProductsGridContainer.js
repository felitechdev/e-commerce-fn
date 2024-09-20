const ProductsGridContainer = (props) => {
  return (
    // <div className="w-full grid grid-cols-1 xs:grid-cols-2 sml:grid-cols-3 mdl:grid-cols-4 lg:grid-cols-5 lgl:grid-cols-6 gap-2 lg:gap-4 auto-rows-min align-start">
    <div className="grid items-start grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-6 m-auto max-w-[1400px] w-[90%]">
      {props.children}
    </div>
  );
};

export default ProductsGridContainer;
