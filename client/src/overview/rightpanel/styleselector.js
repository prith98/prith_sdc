import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import Style from './style.js';

function StyleSelector() {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, features, setFeatures, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture} = useContext(MainContext);
  let currProdStyles;
  //Find currentProduct in styles
  styles.forEach(p => {
    if (Number(p.product_id) === currentProductId) {
      currProdStyles = p;
    }
  });

  let stylesData = currProdStyles.results.map(style => {
    return <Style url={style.photos[0]['thumbnail_url']} main={style.photos[0]['url']} style_id={style.style_id}/>
  });

  useEffect(() => {
    if (currStyle == null) {
      setCurrStyle(currProdStyles.results[0].style_id);
    }
    if (mainPicture == null) {
      setMainPicture(currProdStyles.results[0].photos[0]['url']);
    }
  }, []);

  return (
    <div className="styles-wrap">
      {stylesData}
    </div>
  );
}
//ProductInfo.js
//----------------
//Star Ratings
//Category
//Product Name
//Price

//StyleSelector.js
//---------------
//Style > Selected Style Header
//Style Bubbles
//Select Size
//Add To Bag / Star Button

export default StyleSelector;