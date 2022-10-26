import PropTypes from "prop-types";
import React from "react";
import blogFeaturedData from "../../data/blog-featured/blog-featured.json";
import BlogFeaturedSingle from "../../components/blog-featured/BlogFeaturedSingle";
import SectionTitle from "../../components/section-title/SectionTitle";
import B1 from "../../assets/img/rbanner2.webp"

const BlogFeatured = ({ spaceTopClass, spaceBottomClass }) => {

    const blogFeaturedData = [{
            "id": 1,
            "image": B1,
            "category": ["lifestyle", "men"],
            "title": "Best Cycle for Workout",
            "url": "/blog-details-standard",
            "author": "Admin",
            "authorUrl": "/blog-standard"
        },
        {
            "id": 2,
            "image": B1,
            "category": ["lifestyle"],
            "title": "Why Cycling is important",
            "url": "/blog-details-standard",
            "author": "Admin",
            "authorUrl": "/blog-standard"
        },
        {
            "id": 3,
            "image": B1,
            "category": ["lifestyle"],
            "title": "Coimbatore Cycling Events",
            "url": "/blog-details-standard",
            "author": "Admin",
            "authorUrl": "/blog-standard"
        }
    ]


    return ( <div
      className={`blog-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <SectionTitle
          titleText="OUR BLOG"
          positionClass="text-center"
          spaceClass="mb-55"
        />
        <div className="row">
          {blogFeaturedData.map(singlePost => {
            return (
              <BlogFeaturedSingle singlePost={singlePost} key={singlePost.id} />
            );
          })}
        </div>
      </div>
    </div>
    );
};

BlogFeatured.propTypes = {
    spaceBottomClass: PropTypes.string,
    spaceTopClass: PropTypes.string
};

export default BlogFeatured;