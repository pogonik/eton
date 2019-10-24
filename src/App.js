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

      this.state = {
         dropdownActive: false
      }
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

   // Naravno, ovaj deo pre return-a bi trebalo da bude u reducer-u
   // kao posebna funkcija, a planirao sam da bude deo state-a cart
   // da ne gubim vreme, ubacio sam ga ovde
   let cartTotal = 0;
   let cartData = state.cart.map((itm, i) => {
      let prodItm = state.products.products.find((prod) => itm.id === prod.id);
      prodItm.quantity = itm.quantity;
      prodItm.sum = Number(prodItm.price) * itm.quantity;
      cartTotal += prodItm.sum;
      return prodItm;
   })

   return {
      products: state.products,
      cart: cartData,
      cartTotal: cartTotal,
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

//export default App
