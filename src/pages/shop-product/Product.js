import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productData } from "../../data-helper/product";


const Product = ({ location, product }) => {
  const { pathname } = location;
  console.log("-- >>> pathName:",location);


  
  const [getPickedProducts, setgetPickedProducts] = useState([]);
  let { id } = useParams();
  
  useEffect(() => {
      productData.map((pro, index) => {
        if(pro.id === id){
            setgetPickedProducts(pro)
        }
      })
  }, [])
  
  

  return (
    <Fragment>
      <MetaTags>
        <title>Rudra Cycle Mart | Products</title>
        <meta
          name="description"
          content="Rudra Cycle Mart Coimbatore | "
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop Product
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* product description with image */}
        {
          console.log("Product from Product", product)
        }
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={getPickedProducts}
          galleryType="leftThumb"
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={getPickedProducts}
        />

        {/* related product slider */}
        {/* <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        /> */}
      </LayoutOne>
    </Fragment>
  );
};

// Product.propTypes = {
//   location: PropTypes.object,
//   product: PropTypes.object
// };

// const mapStateToProps = (state, ownProps) => {
//   const itemId = ownProps.match.params.id;
//   return {
//     product: state.productData.products.filter(
//       single => single.id === itemId
//     )[0]
//   };
// };

// export default connect(mapStateToProps)(Product);
export default Product;