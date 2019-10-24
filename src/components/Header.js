import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

import Dropdown from './Dropdown'

const Header = (props) => {

   return (
      <header className="pageHeader">
         <div className="container-fluid">
            <div className="row">
               <Link to="/">
                  <img className="logo" src={require('./Logo.svg')}/>
               </Link>
               <div className="right">
                  <Link to="/" className="shop">Shop</Link>
                  <Dropdown cart={props.cart} cartActions={props.cartActions} />
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header
