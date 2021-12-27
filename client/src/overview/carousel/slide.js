import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';

function Slide() {
  const {products, setProducts, cart, setCart} = useContext(MainContext);

  return (
    <div className="mySlides fade" style={{width:'100%', backgroundColor:'yellow', height:'500px', display: 'block'}}>
      <img className="extend" style={{right: '15px', top: '15px', height: '20px', width: '20px'}} src="https://cdn-icons-png.flaticon.com/512/566/566017.png"/>
      <img src="https://cdn.pixabay.com/photo/2019/07/06/11/49/woman-4320328_1280.jpg" style={{height: '100%', width: '100%'}}/>
    </div>
  );
}

export default Slide;