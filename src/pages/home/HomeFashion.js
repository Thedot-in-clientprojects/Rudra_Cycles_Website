import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import Notify from "../../components/notification/Notify";
import HeroSliderEight from "../../wrappers/hero-slider/HeroSliderEight";
import BannerOne from "../../wrappers/banner/BannerOne";

const HomeFashion = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Rudra Cycle Mart | Coimbatore</title>
        <meta
          name="description"
          content="Rudra Cycle Mart - The Top Cycle Shop In Coimbatore"
        />
      </MetaTags>
      <Notify />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* hero slider */}
        <HeroSliderEight />
        
        {/* featured icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60" category="fashion" />
        <BannerOne spaceTopClass="pt-60" spaceBottomClass="pb-65" />

        {/* blog featured */}
        <BlogFeatured spaceBottomClass="pb-55" />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
