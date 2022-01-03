import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import Thumbnail from './thumbnail.js'
import Arrows from './arrows.js';

function Thumbnails() {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures, thumbnailCount, setThumbnailCount, loadNextThumbnail, setLoadNextThumbnail, thumbnailIncrement, setThumbnailIncrement} = useContext(MainContext);
  let photos;
  let currProdStyles;
  var mainPhotosArr = [];
  let thumbnailsArr = [];

   //Find currentProduct in styles
   styles.forEach(p => {
    if (Number(p.product_id) === currentProductId) {
      currProdStyles = p;
    }
  });

  let stylesData = currProdStyles.results.map(style => {
    if (style.style_id === currStyle) {
      console.log(style);
      photos = style.photos;
      setThumbnailCount(photos.length);
    }
  });

    if (thumbnailsArr.length === 0) {
      for (let i = 0; i < photos.length - 1; i++) {
        let photo = photos[i + thumbnailIncrement];
        console.log(photo);
        mainPhotosArr.push(photo['url']);
        thumbnailsArr.push(<Thumbnail url={photo['thumbnail_url']} photo={photo} count={photo.length}/>);
      }
    }


  if (mainPictures == null) {
    setMainPictures(mainPhotosArr);
    return <div>Loading...</div>
  }

  if (mainPictures[0] !== mainPhotosArr[0]) {
    setMainPictures(mainPhotosArr);
    return <div>Loading...</div>
  }

  return (
    <div className="dot-container">
      {thumbnailsArr}
    </div>
  );
}

export default Thumbnails;