import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';

function ProductInfo() {
  //const {products, setProducts, cart, setCart} = useContext(MainContext);

  return (
    <div>
    <div>Star Info</div>
    <div>Category</div>
    <div>Product Name</div>
    <div>Price</div>
    </div>
  );
}

export default ProductInfo;