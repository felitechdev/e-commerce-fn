import PageLayout from "../components/designLayouts/PageLayout";

import WishlistProducts from "../components/home/AllProducts/WishlistAllProducts";
import { useSelector } from "react-redux";
export const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);

  return (
    <PageLayout showFooter={true}>
      <div className="max-w-container mx-auto px-4">
        {" "}
        {wishlist && <WishlistProducts products={wishlist} />}
      </div>
    </PageLayout>
  );
};
