import React, { Component } from 'react'
import ProductCard from './ProductCard'

import './ProductsList.scss'

class ProductsList extends Component {

   buildProdsList() {
      return this.props.products.products.map((itm, i) => {
         return (
            <div key={i} className="col-sm-6 col-md-4">
               <ProductCard cartActions={this.props.cartActions} data={itm} />
            </div>
         )
      })
   }

   render() {

      let prodCards = this.buildProdsList();

      return (
         <main className="main products-list" role="main">
            <div className="container">
               <div className="row products">
                  {prodCards}
               </div>
            </div>
         </main>
      )
   }
}

ProductsList.defaultProps = {
   products: []
}

export default ProductsList
