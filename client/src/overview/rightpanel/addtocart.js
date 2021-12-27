import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';

function AddToCart() {
  //const {products, setProducts, cart, setCart} = useContext(MainContext);

  return (
    <div>
    <button type="button">ADD TO BAG</button>
    <button type="button">STAR</button>
    </div>
  );
}

export default AddToCart;