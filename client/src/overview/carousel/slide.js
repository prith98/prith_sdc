import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import { FaExpand } from 'react-icons/fa';

function Slide() {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures} = useContext(MainContext);
  let currProdStyles;
  //Find currentProduct in styles
  styles.forEach(p => {
    if (Number(p.product_id) === currentProductId) {
      currProdStyles = p;
    }
  })

  // if (mainPicture == null) {
  //   return <div>Loading...</div>
  // }

  return (
    <div className="mySlides fade" style={{width:'100%', backgroundColor:'yellow', height:'500px', display: 'block'}}>
      <FaExpand className="extend"/>
      <img src={mainPicture} style={{height: '100%', width: '100%', objectFit: 'cover'}}/>
    </div>
  );
}

export default Slide;