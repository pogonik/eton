import './App.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCart, removeFromCart } from './actions'
import { Route, Switch, withRouter } from 'react-router-dom'
import Header from './components/Header'
import ProductsList from './components/ProductsList'
import Checkout from './components/Checkout'

class App extends Component {

   constructor(props) {
      super(props)
   }

   render() {

      let wrapperClassName = this.props.dropdown ? ' dropdown-open' : '';

      return (
         <div className={`app${wrapperClassName}`}>
            <Header cart={this.props.cart} cartActions={this.props.cartActions} />
               
               <Route exact path="/">
                  <ProductsList 
                     products={this.props.products} 
                     dropdown={this.props.dropdown} 
                     cartActions={this.props.cartActions}/>
               </Route>

               <Route path="/checkout">
                  <Checkout 
                     cart={this.props.cart} 
                     cartTotal={this.props.cartTotal} 
                     cartActions={this.props.cartActions} />
               </Route>
         </div>
      );
   }
}

App.defaultProps = {
   products: []
};

const mapStateToProps = (state) => {

   return {
      products: state.products,
      cart: state.cart,
      cartTotal: state.total,
      dropdown: state.dropdown.active
   }
}

const mapDispatchToProps = (dispatch) => ({
   cartActions: {
      addToCart: prod => { dispatch(addToCart(prod)) },
      removeFromCart: prod => { dispatch(removeFromCart(prod)) }
   }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
