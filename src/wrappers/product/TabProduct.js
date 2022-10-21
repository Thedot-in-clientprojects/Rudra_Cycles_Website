import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGrid from "./ProductGrid";
import { productData } from "../../data-helper/product";

const TabProduct = ({
  spaceTopClass,
  spaceBottomClass,
  bgColorClass,
  category
}) => {


  const [selectedCate, setselectedCate] = useState('ATB');
  const [selectedProducts, setselectedProducts] = useState(productData);
  const selectedCategory = (name) => {
      console.log(name)
      let selectedPro = productData.filter((p) => p.mainCategory === name);
      console.log('selectedPro -> ', selectedPro);
      setselectedProducts(selectedPro);
    }


  return (
    <div
      className={`product-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      } ${bgColorClass ? bgColorClass : ""}`}
    >
      <div className="container">
        <SectionTitle titleText="SHOP BY CATEGORY" positionClass="text-center" />
        <Tab.Container defaultActiveKey="bestSeller">
          <Nav
            variant="pills"
            className="product-tab-list pt-30 pb-55 text-center"
          >
            <Nav.Item onClick={() => selectedCategory('MTB')}>
              <Nav.Link eventKey="newArrival">
                <h4>MTB</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={() => selectedCategory('ATB')}>
              <Nav.Link eventKey="bestSeller">
                <h4>ATB</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={() => selectedCategory('Kids')}>
              <Nav.Link eventKey="saleItems">
                <h4>Kids</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={() => selectedCategory('E-Cycles')}>
              <Nav.Link eventKey="saleItems">
              <h4>E-Cycles</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={() => selectedCategory('Hybrid')}>
              <Nav.Link eventKey="saleItems">
                <h4>Hybrid</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={() => selectedCategory('E-Conversion Kit')}>
              <Nav.Link eventKey="saleItems">
                <h4>E-Conversion Kit</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={() => selectedCategory('Accessories')}>
              <Nav.Link eventKey="saleItems">
                <h4>Accessories</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="newArrival">
              <div className="row">
                {selectedProducts ? (
                  <ProductGrid
                  // category={category}
                  type="new"
                  limit={8}
                  spaceBottomClass="mb-25"
                  mainProduct={selectedProducts}
                />
                ) : (
                  <ProductGrid
                  // category={category}
                  type="new"
                  limit={8}
                  spaceBottomClass="mb-25"
                  mainProduct={selectedProducts}
                />
                )

                }
                
              </div>
            </Tab.Pane>
            
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

TabProduct.propTypes = {
  bgColorClass: PropTypes.string,
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default TabProduct;
