import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../contexts/contexts.js'
import Axios from 'axios';
import Carousel from './carousel/carousel.js'
import RightPanel from './rightpanel/rightpanel.js';
import ProductOverview from './productoverview.js';
import { FaSearch } from 'react-icons/fa';
import { TiChartArea } from 'react-icons/ti';

function Overview() {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme} = useContext(MainContext);
  const [productInformation, setProductInformation] = useState(null);
  const [styles, setStyles] = useState(null);
  const [currStyle, setCurrStyle] = useState(null);
  const [mainPicture, setMainPicture] = useState(null);
  const [mainPictures, setMainPictures] = useState(null);

  let productInformationData = [];
  let stylesData = [];

  useEffect(() => {
    productInformationData.push(Axios.get('/products/' + currentProductId).then((result) => { return result.data; }));
    stylesData.push(Axios.get('/products/' + currentProductId + '/styles').then((result) => { return result.data; }));

    Promise.all(productInformationData).then((values) => {
      setProductInformation(values);
    });
    Promise.all(stylesData).then((values) => {
      setStyles(values);
    });

  }, []);

  if (styles == null) {
    return <div>Loading....</div>
  }

  return (
    <MainContext.Provider value={{products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures}}>
      <div className="wrapper">
        <div className="overviewsearch">
          <TiChartArea style={{height: '65px', width: '65px', color: 'white', marginLeft: '20px'}}/>
          <div style={{marginRight: '25px'}}>
          <input className="searchtext" style={{backgroundColor: 'rgb(82,82,82)'}}/>
          <FaSearch className="searchicon"/>
          </div>
        </div>
        <div style={{textAlign: 'center', height: '31px', marginTop: '15px', fontFamiliy: 'sans-serif', fontSize: '12px'}}>SITE-WIDE ANNOUNCEMENT MESSAGE! -- SALE / DISCOUNT OFFER -- NEW PRODUCT HIGHLIGHT</div>
        <div className="overview-columns">
          <Carousel />
          <RightPanel />
        </div>
        <ProductOverview />
      </div>

    </MainContext.Provider>
  );
}

export default Overview;