import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import Paginator from 'react-hooks-paginator';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { getSortedProducts } from '../../helpers/product';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';
import { categoryData } from "../shop-product/Category";
import { productData } from "../../data-helper/product";
import { setActiveSort } from "../../helpers/product";
import ProductgridList from "../../wrappers/product/ProductgridList";
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

const ShopGridStandard = ({location, products}) => {

    const [allCycles, setallCycles] = useState([])
  

    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);

    const pageLimit = 15;
    const {pathname} = location;

    const getLayout = (layout) => {
        setLayout(layout)
    }

    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    }

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }

    useEffect(() => {
        let sortedProducts = getSortedProducts(products, sortType, sortValue);
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue ]);


    const cycleSize = [
        '4`10”-5`0” - 148-152 cm',
        '5`0″-5`3″  - 152-160 cm',
        '5`3″-5`6″  - 160-168 cm',
        '5`6″-5`9″  - 168-175 cm',
    ]
    
    const userAge = [
      '12+',
      '15 & Above'
    ]

  const [selectedCategoryHere, setselectedCategoryHere] = useState('');


  const [selectedProducts, setselectedProducts] = useState(productData);


  // Filters Checklist
  const [searchFilter, setsearchFilter] = useState('');
  const [chooseGender, setchooseGender] = useState('');
  const [categoryPckList, setcategoryPckList] = useState(false);
  const [agePickList, setagePickList] = useState(false);
  const selectedCategory = (name) => {
    console.log(name)
    let selectedPro = productData.filter((p) => p.mainCategory === name.name);
    console.log(productData)
    console.log('selectedPro -> /all/cycle', selectedPro);
    setselectedProducts(selectedPro);
    setcategoryPckList(true)
  }
  const selectedAge = (age) => {
    console.log(age);
    setagePickList(true);
    if(categoryData){
      let selectedAge = selectedProducts.filter((p) => p.age === age);
      setselectedProducts(selectedAge);
    }
    else{
      let selectedAge = productData.filter((p) => p.age === age);
      setselectedProducts(selectedAge);
    }
    
  } 

  const selectGender =  (gender) => {
    console.log(gender)

    // if(selectedProducts){
    //   let selectedGender = selectedProducts.filter((p) => p.gender === gender);
    //   setselectedProducts(selectedGender);
    // }
    // else{
      let selectedGender = productData.filter((p) => p.gender === gender);
      setselectedProducts(selectedGender);
    // }
  }

//   const getProductBasedOnFilters = (p) => {
//         productData.filter((p) => p.)
//   }         

  const [productMain, setproductMain] = useState([]);



  // Slider Functionlaity
  const [value, setValue] = React.useState([2, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const searchResultFilter = () => {
      
  }

    return (
        <Fragment>
            <MetaTags>
                <title>Rudra Cycle Mart | Coimbatore</title>
                <meta name="description" content="Shop page of flone react minimalist eCommerce template." />
            </MetaTags>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Shop</BreadcrumbsItem>

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-2 order-lg-1">
                                {/* shop sidebar */}
                                {/* <ShopSidebar products={products} getSortParams={getSortParams} sideSpaceClass="mr-30"/> */}
                                <>
                                <div className={`sidebar-style mr-30}`}>
      {/* shop search */}
      {/* <ShopSearch /> */}
      <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" action="#">
          <input type="text" placeholder="Search here..." onChange={(e) => setsearchFilter(e.target.value)}/>
          <button onClick={searchResultFilter}> 
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
    <div className="sidebar-widget" style={{ marginTop:25 }}>
      <h4 className="pro-sidebar-title">Price (In Thousands)</h4>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      </div>
    
      {/* filter by categories */}
      <>
      <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categoryData ? (
            <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                >
                  <span className="checkmark" /> All Categories
                </button>
              </div>
            </li>
            {categoryData.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={() => selectedCategory(category)}
                    >
                      {" "}
                      <span className="checkmark" /> {category.name}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>

          </p>
        )

        }
        
        
       
        
      </div>
      </div>
      <div className="sidebar-widget" style={{ marginTop:25 }}>
      <h4 className="pro-sidebar-title">Age </h4>
      <div className="sidebar-widget-list mt-30">
        {userAge ? (
            <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                >
                  <span className="checkmark" /> All Age
                </button>
              </div>
            </li>
            {userAge.map((age, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={() => selectedAge(age)}
                    >
                      {" "}
                      <span className="checkmark" /> {age}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>

          </p>
        )

        }
        
        
       
        
      </div>
      </div>
      </>
      {/* <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParams}
      /> */}

      {/* filter by color */}
      {/* <ShopColor colors={uniqueColors} getSortParams={getSortParams} /> */}

      {/* filter by size */}
      {/* <ShopSize sizes={uniqueSizes} getSortParams={getSortParams} /> */}
      <>
      <div className="sidebar-widget mt-40">
      <h4 className="pro-sidebar-title">Size </h4>
      <div className="sidebar-widget-list mt-20">
        {cycleSize ? (
            <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("size", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Sizes{" "}
                </button>
              </div>
            </li>
            {cycleSize.map((size, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      className="text-uppercase"
                      onClick={e => {
                        getSortParams("size", size);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" />
                      {size}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No sizes found"
        )
        }
       
      </div>
    </div>
      
      </>
      {/* filter by tag */}
      {/* <ShopTag tags={uniqueTags} getSortParams={getSortParams} /> */}
    </div> 
                                </>
                               
                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                {/* shop topbar default */}
                                {/* <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} /> */}
                                <div>
                                <div className="shop-top-bar mb-35">
                                    <div className="select-shoing-wrap">
                                      <div className="shop-select">
                                        <select
                                          onChange={(e) => {selectGender(e.target.value)}}
                                        >
                                          <option value="default">Gender</option>
                                          <option value="Boys">Boys</option>
                                          <option value="Girls">Girls</option>
                                        </select>
                                      </div>
                                      <p>
                                        Showing  result
                                      </p>
                                    </div>
                                      </div>
                                </div>
                                {/* grid three-column */}
                                {/* shop page content default */}
                                {/* <ShopProducts layout={layout} products={currentData} fineProduct={productData}/> */}
                                <>
                                <div className="shop-bottom-area mt-35">
                                        <div className={`row grid three-column}`}>
                                            <ProductgridList products={selectedProducts} spaceBottomClass="mb-25" fineProduct={selectedProducts ? selectedProducts : productData}/>
                                        </div>
                                        </div>
                                </>
                                {/* shop product pagination */}
                                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={sortedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    )
}

ShopGridStandard.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array
}

const mapStateToProps = state => {
    return{
        products: state.productData.products
    }
}

export default connect(mapStateToProps)(ShopGridStandard);