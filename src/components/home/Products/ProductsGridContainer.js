const ProductsGridContainer = (props) => {
  return (
    <div className="m-auto grid w-full max-w-[1400px] grid-cols-2 items-start gap-2 gap-y-4 sml:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] sml:gap-6 sml:gap-y-4">
      {props.children}
    </div>
  );
};

export default ProductsGridContainer;
