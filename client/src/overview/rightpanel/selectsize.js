import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';

function SelectSize() {
  const {products, setProducts, cart, setCart} = useContext(MainContext);

  return (
    <div>
    <select value="SELECT SIZE"/>
    <select value="1"/>
    </div>
  );
}

export default SelectSize;