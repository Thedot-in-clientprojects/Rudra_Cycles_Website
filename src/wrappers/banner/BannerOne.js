import PropTypes from "prop-types";
import React from "react";
import bannerData from "../../data/banner/banner-one.json";
import BannerOneSingle from "../../components/banner/BannerOneSingle.js";
import B1 from "../../assets/img/offer1.webp"
import B2 from "../../assets/img/offer2.webp"
import B3 from "../../assets/img/offer3.webp"

const BannerOne = ({ spaceTopClass, spaceBottomClass }) => {

  const bannerData = [{
    "id": 1,
    "image": B1,
    "title": "MTB",
    "subtitle": "Starting at",
    "price": "850",
    "link": "/all/cycle"
},
{
    "id": 2,
    "image": B2,
    "title": "Kids",
    "subtitle": "Starting at",
    "price": "2800",
    "link": "/all/cycle"
},
{
    "id": 3,
    "image": B3,
    "title": "Mountain Bike",
    "subtitle": "Starting at",
    "price": "6800",
    "link": "/all/cycle"
}]


  return (
    <div
      className={`banner-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          {bannerData &&
            bannerData.map((single, key) => {
              return (
                <BannerOneSingle
                  data={single}
                  key={key}
                  spaceBottomClass="mb-30"
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

BannerOne.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerOne;
