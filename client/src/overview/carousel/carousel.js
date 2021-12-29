import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import Slides from './slides.js';
import Thumbnails from './thumbnails.js';

function Carousel() {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, features, setFeatures, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures} = useContext(MainContext);

  if (styles == null) {
    return (<div>LADEN...</div>)
  }


  return (
<div className="slideshow-container">
  <Slides />
  <Thumbnails />
</div>
  );
}


//include plusSlides function onClick

export default Carousel;

