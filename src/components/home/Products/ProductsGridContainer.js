const ProductsGridContainer = (props) => { 
    return (
        <div className="w-full grid grid-cols-2 sml:grid-cols-3 md:grid-cols-3 mdl:grid-cols-4 lg:grid-cols-5 lgl:grid-cols-6 gap-2 lg:gap-4">
            {props.children}
        </div>
    )
}

export default ProductsGridContainer;
