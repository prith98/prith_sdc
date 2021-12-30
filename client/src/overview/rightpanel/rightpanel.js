import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import StyleSelector from './styleselector.js';

function RightPanel() {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture} = useContext(MainContext);
  if (productInformation == null) {
    return <div>Loading...</div>
  }
  let {category, name, default_price} = productInformation[0];

  return (
      <div className="rightpanel" >
        <div style={{marginBottom: '8px', fontFamiliy: 'sans-serif', color: 'RGB(82,82,82)', fontSize: '13px', display: 'inline-flex', alignItems: 'baseline'}}>★ ★ ★ ★ ☆ <div style={{marginLeft: '5px', fontFamiliy: 'sans-serif', color: 'RGB(82,82,82)', fontSize: '11px', textDecoration: 'underline'}}>Read all reviews</div></div>
        <div style={{marginBottom: '-1px', fontFamiliy: 'sans-serif', fontSize: '13px', letterSpacing: '0.5px', color: 'RGB(82,82,82)'}}>{category.toUpperCase()}</div>
        <div style={{marginBottom: '15px', fontFamiliy: 'sans-serif', fontSize: '28px', fontWeight: 'bold', color: 'RGB(82,82,82)', letterSpacing: '0.5px'}}>{name}</div>
        <div style={{marginBottom: '20px', fontSize: '14px', color: 'RGB(82,82,82)'}}>${default_price.split('.')[0]}</div>
        <div style={{marginBottom: '8px', fontFamiliy: 'sans-serif', letterSpacing: '0.5px', color: 'RGB(82,82,82)', fontSize: '14px'}}><b>STYLE</b> > SELECTED STYLE</div>
        <StyleSelector />
        <select className="selectsizetext">
            <option value="test">SELECT SIZE</option>
          </select>
          <select className="quantitycarttext">
            <option value="test">1</option>
          </select>
        <div style={{display: 'flex', flexDirection: 'row', marginTop: '20px'}}>
          <button type="button" className="addbagbutton">ADD TO BAG</button>
          <button type="button" className="starbutton">☆</button>
        </div>
      </div>
  );
}

export default RightPanel;