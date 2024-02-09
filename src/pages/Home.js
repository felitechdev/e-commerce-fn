import React from "react";
import ProductsCategories from "../components/ProductsCategories";
import PageLayout from "../components/designLayouts/PageLayout";

export default function Home(props) {
  return (
    <>
      <PageLayout userInfo={props.user} showSearchBar={true}>
        <ProductsCategories />
      </PageLayout>
    </>
  );
}
