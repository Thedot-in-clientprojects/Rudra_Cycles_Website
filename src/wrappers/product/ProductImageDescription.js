import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";
import ProductImageFixed from "../../components/product/ProductImageFixed";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  galleryType,
  product,
  currency,
  cartItems,
  wishlistItems,
  compareItems
}) => {

  // const wishlistItem = wishlistItems.filter(
  //   wishlistItem => wishlistItem.id === product.id
  // )[0];
  // const compareItem = compareItems.filter(
  //   compareItem => compareItem.id === product.id
  // )[0];
  // const { addToast } = useToasts();
  //   const discountedPrice = getDiscountPrice(product.price, product.disPrice);
  // const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  // const finalDiscountedPrice = +(
  //   discountedPrice * currency.currencyRate
  // ).toFixed(2);

  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6" style={{
            marginBottom:-400
          }}>
            {
              console.log('Image - ', product.subImg)
            }
            {galleryType === "leftThumb" ? (
              <ProductImageGallerySideThumb
                product={product}
                thumbPosition="right"
              />
            ) : galleryType === "rightThumb" ? (
              <ProductImageGallerySideThumb product={product} />
            ) : galleryType === "fixedImage" ? (
              <ProductImageFixed product={product} />
            ) : (
              <div>
              <ProductImageGallery product={product} />
              </div>
            )}
            
              
          </div>
            
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
              product={product}
              discountedPrice={product.disPrice}
              // currency={currency}
              finalDiscountedPrice={product.disPrice}
              finalProductPrice={product.price}
              // cartItems={cartItems}
              // wishlistItem={wishlistItem}
              // compareItem={compareItem}
              // addToast={addToast}
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

// ProductImageDescription.propTypes = {
//   cartItems: PropTypes.array,
//   compareItems: PropTypes.array,
//   currency: PropTypes.object,
//   galleryType: PropTypes.string,
//   product: PropTypes.object,
//   spaceBottomClass: PropTypes.string,
//   spaceTopClass: PropTypes.string,
//   wishlistItems: PropTypes.array
// };

// const mapStateToProps = state => {
//   return {
//     currency: state.currencyData,
//     cartItems: state.cartData,
//     wishlistItems: state.wishlistData,
//     compareItems: state.compareData
//   };
// };

// export default connect(mapStateToProps)(ProductImageDescription);
export default ProductImageDescription;
