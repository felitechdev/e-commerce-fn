const ProductsGridContainer = (props) => {
  return (
    <div className="align-start grid w-full auto-rows-min grid-cols-1 gap-2 xs:grid-cols-2 sml:grid-cols-3 mdl:grid-cols-4 lg:grid-cols-5 lg:gap-4 lgl:grid-cols-6">
      {props.children}
    </div>
  );
};

export default ProductsGridContainer;
