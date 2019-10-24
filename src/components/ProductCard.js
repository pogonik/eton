import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux'
// import { addToCart, removeFromCart } from '../actions'

const ProductCard = (props) => {

   const { addToCart, removeFromCart } = props.cartActions;

   return (
      <div className="card">
         {/* Ovaj wrapper je stavljen da sacuva aspect-ratio
         To je hack, jer slike nisu kropovane na pravilan odnos strana */}
         <div className="img-wrapper">
            <img src={props.data.image} className="card-img-top"/>
         </div>
         <div className="card-body">
            <div className="top">
               <h3 className="card-title">{props.data.title}</h3>
               <span className="price">{`${props.data.price}$`}</span>
               <p className="card-text">
                  {props.data.description}
               </p>
            </div>
            <div className="right">
               <div className="price">{`${props.data.sum}$`}</div>
               <button
                  type="button"
                  onClick={() => removeFromCart(props.data.id)}
                  className="btn btn-link remove">
                  Remove
               </button>
            </div>
            <button
               type="button"
               onClick={() => addToCart(props.data.id)}
               className="btn btn-primary btn-block add-to-cart">
               Add to Cart
            </button>
         </div>
      </div>
   );
}

const mapDispatchToProps = (dispatch) => ({
   addToCart: prod => { dispatch(addToCart(prod)) }
})

export default connect(null, mapDispatchToProps)(ProductCard)
