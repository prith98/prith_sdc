import React, { useState, useContext, useEffect} from 'react';
import { MainContext } from '../../contexts/contexts.js'
import Axios from 'axios';

function ProductOverview() {
  const {products, setProducts, cart, setCart} = useContext(MainContext);

  return (
    <div className="poverview">
      <div>
        <h3>Product Slogan. Pithy Description Or Catchphrase.</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div>
        <p>√ GMO and Pesticide-free</p>
        <p>√ Made with 100% Genetic Modification</p>
        <p>√ This is made up</p>
      </div>
    </div>
  );
}

export default ProductOverview;