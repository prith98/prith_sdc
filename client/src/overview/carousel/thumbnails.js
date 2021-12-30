import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import Thumbnail from './thumbnail.js'
import Arrows from './arrows.js';

function Thumbnails() {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures} = useContext(MainContext);
  let photos;
  let currProdStyles;
  var mainPhotosArr = [];

   //Find currentProduct in styles
   styles.forEach(p => {
    if (Number(p.product_id) === currentProductId) {
      currProdStyles = p;
    }
  });

  let stylesData = currProdStyles.results.map(style => {
    if (style.style_id === currStyle) {
      photos = style.photos;
    }
  });

  let thumbnailsArr = photos.map(photo => {
    mainPhotosArr.push(photo['url']);
    return <Thumbnail url={photo['thumbnail_url']} photo={photo}/>
  });

  if (mainPictures == null) {
    setMainPictures(mainPhotosArr);
    return <div>Loading...</div>
  }

  if (mainPictures[0] !== mainPhotosArr[0]) {
    setMainPictures(mainPhotosArr);
    return <div>Loading...</div>
  }

  // if (mainPhotosArr[0] !== mainPictures[0]) {
  //   setMainPictures(mainPhotosArr);
  // }

  return (
    <div className="dot-container">
      {thumbnailsArr}
    </div>
  );
}

export default Thumbnails;