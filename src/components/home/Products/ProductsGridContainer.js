const ProductsGridContainer = (props) => {
  return (
    // <div className="align-start grid w-full auto-rows-min grid-cols-1 gap-2 xs:grid-cols-2 sml:grid-cols-3 mdl:grid-cols-4 lg:grid-cols-5 lg:gap-4 lgl:grid-cols-6">
    //   {props.children}
    // </div>

  //   <div className="  grid items-start grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))]   gap-6 m-auto max-w-[1400px] w-[100%]">
  //   {props.children}
  // </div>

  <div className="grid items-start gap-2 grid-cols-2  sml:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] sml:gap-6 m-auto max-w-[1400px] w-full">
  {props.children}
</div>

//   <div className="  sml:grid  items-start grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))]  sml:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))]  gap-2 sml:gap-6 m-auto max-w-[1400px] w-[100%]">
//   {props.children}
// </div>
  );
};

export default ProductsGridContainer;
