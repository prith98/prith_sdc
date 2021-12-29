import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../contexts/contexts.js'
import Axios from 'axios';
import Carousel from './carousel/carousel.js'
import RightPanel from './rightpanel/rightpanel.js';
import ProductOverview from './productoverview/productoverview.js'

function Overview() {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme} = useContext(MainContext);
  const [features, setFeatures] = useState(null);
  const [styles, setStyles] = useState(null);
  const [currStyle, setCurrStyle] = useState(null);
  const [mainPicture, setMainPicture] = useState(null);
  const [mainPictures, setMainPictures] = useState(null);

  let featuresData = [];
  let stylesData = [];
  let count = -1;

  useEffect(() => {
    products.forEach((product) => {
      featuresData.push(Axios.get('/products/' + product.id).then((result) => { return result.data; }));
      stylesData.push(Axios.get('/products/' + product.id + '/styles').then((result) => { return result.data; }));
    });
    count = -1;
    Promise.all(featuresData).then((values) => {
      setFeatures(values);
    });
    Promise.all(stylesData).then((values) => {
      setStyles(values);
    });

  }, []);

  if (styles == null) {
    return <div>Loading....</div>
  }

  return (
    <MainContext.Provider value={{products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, features, setFeatures, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures}}>
      <div className="wrapper">
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