import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import Slides from './slides.js';
import Thumbnails from './thumbnails.js';
import Arrows from './arrows.js';

function Carousel() {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures, thumbnailCount, setThumbnailCount, loadNextThumbnail, setLoadNextThumbnail, thumbnailIncrement, setThumbnailIncrement, slideIndex, setSlideIndex} = useContext(MainContext);

  if (currStyle == null) {
    return (<div>Loading current style...</div>)
  }


  return (
<div className="slideshow-container">
  <Slides />
  <Thumbnails />
  <Arrows />
</div>
  );
}


//include plusSlides function onClick

export default Carousel;

