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
import { Range } from 'react-range';
import 'react-rangeslider/lib/index.css'
import { styled } from '@mui/material/styles';
import Slider, { SliderThumb } from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

const ShopGridStandard = ({location, products}) => {



  
  const [categoryFilterPickIndex, setcategoryFilterPickIndex] = useState('');
  const [ageFilterPickIndex, setageFilterPickIndex] = useState('');
  const [sizeFilterPickIndex, setsizeFilterPickIndex] = useState('');


  const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: '#FF8331',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
      height: 27,
      width: 27,
      backgroundColor: '#fff',
      border: '1px solid currentColor',
      '&:hover': {
        boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
      },
      '& .airbnb-bar': {
        height: 9,
        width: 1,
        backgroundColor: 'currentColor',
        marginLeft: 1,
        marginRight: 1,
      },
    },
    '& .MuiSlider-track': {
      height: 3,
    },
    '& .MuiSlider-rail': {
      color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
      opacity: theme.palette.mode === 'dark' ? undefined : 1,
      height: 3,
    },
  }));


  function AirbnbThumbComponent(props) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
      </SliderThumb>
    );
  }

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


    const cycleHeight = [
      "4'5 To 5",
      "5'7 To 6",
      "5' To 5'7",
      "6' & Above",
    ]
    
    const userAge = [
      '12+',
      '15 & Above'
    ]

  const [selectedCategoryHere, setselectedCategoryHere] = useState('');


  const [selectedProducts, setselectedProducts] = useState(productData);


  // Filters Checklist
  const [searchFilter, setsearchFilter] = useState('');

  const searchFilterHandler = (searchValue) => {
      if(selectedProducts){
        const searchResult = productData.filter((product) => {
          if(product == ""){
            return product
          }
          else if(product.name.toLowerCase().includes(searchValue.toLowerCase())){
            return product
          }
        });
        setselectedProducts(searchResult)        
      }

      else{
        const searchResult = productData.filter((product) => {
          if(product == ""){
            return product
          }
          else if(product.name.toLowerCase().includes(searchValue.toLowerCase())){
            return product
          }
        setselectedProducts(searchResult)        

      })
  }
  }
  const [chooseGender, setchooseGender] = useState('');
  const [categoryPckList, setcategoryPckList] = useState(false);
  const [agePickList, setagePickList] = useState(false);



  // *? Working with Filters ****************************************

    const [refreshStatus, setrefreshStatus] = useState(false);
    const [categoryFilterStatus, setcategoryFilterStatus] = useState(false);
    const [ageFilterStatus, setageFilterStatus] = useState(false);


    const [rememberCategory, setrememberCategory] = useState('');
    const [rememberAge, setrememberAge] = useState('');
  // *? **************************************************************
  const selectedCategory = (name, index) => {
    console.log(name)
    setcategoryFilterPickIndex(index)
    setcategoryFilterStatus(true)
    setrememberCategory(name)
    if(selectedProducts){
    if(rememberAge){
        console.log('Remember Age: ', rememberAge, "Remember Category: ", name.name);
        let selectedPro = productData.filter((p) => p.age === rememberAge && p.mainCategory === name.name);
        console.log('Ctaegory Data - ', selectedPro);
        setselectedProducts(selectedPro)
      }else{
        let selectedPro = productData.filter((p) => p.mainCategory === name.name);
        setselectedProducts(selectedPro);
        setcategoryPckList(true);
    }
  }
  else{
    let selectedPro = productData.filter((p) => p.mainCategory === name.name);
    setselectedProducts(selectedPro);
    setcategoryPckList(true);
  }
  }
  const selectedAge = (age, index) => {
    // console.log(age);
    setageFilterPickIndex(index)
    setagePickList(true);
    setrememberAge(age)
    if(categoryData){
      
      if(rememberCategory){
        console.log('CategorData && RemenberCategory');
        let selectedPro = productData.filter((p) => p.mainCategory === rememberCategory.name);
        console.log(rememberCategory)
        let selectedAge = selectedPro.filter((p) => p.age === age);
        console.log(selectedAge)
        setselectedProducts(selectedAge);
        
        }
        else{
          let selectedAge = selectedProducts.filter((p) => p.age === age);
      setselectedProducts(selectedAge);
        }
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


  // Price Range Logics
  const [priceRange, setpriceRange] = useState(0);


  // ------------------------

  const [value1, setValue1] = React.useState([2000, 37000]);
  // const [value1, setValue1] = React.useState([20, 37]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - 10000), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + 10000)]);
    }
  };



  //**  Filter Selection Logic


  // const filterSelection = () => {
  //     if(){

  //     }
  // }



  //** */

  // ------------------------


  const resetAllFilter = () => {
    setrememberAge('');
    setrememberCategory('');
    setselectedProducts(productData);
  }

    return (
        <Fragment>
            <MetaTags>
                <title>Shop Now | Rudra Cycle Mart Coimbatore</title>
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
                                  <input type="text" placeholder="Search here..." onChange={(e) => searchFilterHandler(e.target.value)}/>
                                  <button onClick={searchResultFilter}> 
                                    <i className="pe-7s-search" />
                                  </button>
                                </form>
                              </div>
                            </div>
    <div className="sidebar-widget" style={{ marginTop:25 }}>
      <h4 className="pro-sidebar-title">Price (In Thousands)</h4>
        <p>
          {
            priceRange
          }
        </p>
     
        <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
      </div>
    
      {/* filter by categories */}
      <>
      <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories</h4>
      <div className="sidebar-widget-list mt-30">
        {categoryData ? (
            <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                onClick={resetAllFilter} 
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
                      onClick={() => selectedCategory(category, key)}>
                      {" "}
                      <span  style={categoryFilterPickIndex === key ? {backgroundColor:'#FF3939'} : {backgroundColor:'#FFFFFF'}
                  }/> {category.name}{" "}
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
                onClick={resetAllFilter} 

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
                      onClick={() => selectedAge(age, key)}
                    >
                      {" "}
                      <span style={ageFilterPickIndex === key ? {backgroundColor:'#FF3939'} : {backgroundColor:'#FFFFFF'}}/> {age}{" "}
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
      <h4 className="pro-sidebar-title">Height</h4>
      <div className="sidebar-widget-list mt-20">
        {cycleHeight ? (
            <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("size", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Height{" "}
                </button>
              </div>
            </li>
            {cycleHeight.map((size, key) => {
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
      <div className="sidebar-widget mt-40">
      <h4 className="pro-sidebar-title">Size</h4>
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