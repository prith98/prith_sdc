import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';

function StyleSelector() {
  const {products, setProducts, cart, setCart} = useContext(MainContext);

  return (
    <div>
      <div>Style > Selected style</div>
      <div>Bubbles</div>
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