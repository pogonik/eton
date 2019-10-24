import React from 'react'
import './Checkout.scss'
import ProductCard from './ProductCard'

class Checkout extends React.Component {

   buildProdsList() {
      return this.props.cart.map((itm, i) => {
         return <ProductCard cartActions={this.props.cartActions} key={i} data={itm} />
      })
   }

   render () {
      return (
         <main className="main" role="main">
            <div className="container">
               <div className="row">
                  <div className="checkout">
                     <h1 className="page-title">Your Cart</h1>
                     {this.buildProdsList()}
                     <div className="total">
                        <div className="left">Total</div>
                        <div className="price">{`${this.props.cartTotal}$`}</div>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      )
   }
}


Checkout.defaultProps = {
   products: [],
   cart: []
}

export default Checkout
