import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import ProductInfo from './productinfo.js';
import StyleSelector from './styleselector.js';
import SelectSize from './selectsize.js';
import AddToCart from './addtocart.js';

function RightPanel() {
  //const {products, setProducts, cart, setCart} = useContext(MainContext);

  return (
    <div className="rightpanel" style={{border: '1px solid black'}}>
      <ProductInfo />
      <StyleSelector />
      <SelectSize />
      <AddToCart />
    </div>
  );
}

export default RightPanel;