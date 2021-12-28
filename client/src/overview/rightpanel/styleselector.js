import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import Style from './style.js';

function StyleSelector() {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, features, setFeatures, styles, setStyles} = useContext(MainContext);
  let currProdStyles;
  //Find currentProduct in styles
  styles.forEach(p => {
    if (Number(p.product_id) === currentProductId) {
      currProdStyles = p;
    }
  })

  console.log(currProdStyles);

  let stylesData = currProdStyles.results.map(style => {
    return <Style url={style.photos[0]['thumbnail_url']}/>
  });

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