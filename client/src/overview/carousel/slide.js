import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';

function Slide() {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, features, setFeatures, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures} = useContext(MainContext);
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
      <img className="extend" style={{right: '15px', top: '15px', height: '20px', width: '20px'}} src="https://cdn-icons-png.flaticon.com/512/566/566017.png"/>
      <img src={mainPicture} style={{height: '100%', width: '100%', objectFit: 'cover'}}/>
    </div>
  );
}

export default Slide;