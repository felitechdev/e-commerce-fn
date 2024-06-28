import PageLayout from "../components/designLayouts/PageLayout";

import WishlistProducts from "../components/home/AllProducts/WishlistAllProducts";
import { useSelector } from "react-redux";
export const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);


  return (
    <PageLayout showFooter={true}>
      {wishlist && <WishlistProducts products={wishlist} />}
    </PageLayout>
  );
};
