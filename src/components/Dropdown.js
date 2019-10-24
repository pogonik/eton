import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Cart } from './Icons'
import './Dropdown.scss';

import { getDropdownState } from '../actions'

class Dropdown extends React.PureComponent {

   constructor(props) {
      super(props);

      this.state = {
         open: false
      }

      this.dropdownToggle = this.dropdownToggle.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
   }

   componentDidMount() {
      this.props.toggle()
      document.addEventListener('mousedown', this.handleClickOutside);
   }

   componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
   }

   handleClickOutside(e) {
      if (!this.node.contains(e.target) && this.state.open) {
         this.setState({ open: false }, () => {
            this.props.toggle()
         })
      }
   }

   dropdownToggle() {
      this.setState({ open: !this.state.open }, () => {
         this.props.toggle(this.state.open)
      })
   }

   render () {

      let { removeFromCart } = this.props.cartActions;

      let prodsList = this.props.cart.map((itm, i) => {
         return (
            <div className="dropdown-item" key={i}>
               <img src={itm.image} />
               <h4>{itm.title}</h4>
               <button 
                  type="button" 
                  className="close" 
                  onClick={() => { removeFromCart(itm.id) }}>
                  <span>x</span>
               </button>
            </div>
         )
      })

      let badge = this.props.cart.length
         ? <span className="badge">{this.props.cart.length}</span>
         : '';

      let checkoutBtn = this.props.cart.length
         ? <Link to="/checkout" className="btn btn-primary btn-block go-checkout">Go to Checkout</Link>
         : 'Your cart is empty';

      return (
         <div className="dropdown" ref={node => { this.node = node }}>
            <button
               type="button"
               className="toggle btn btn-link"
               onClick={this.dropdownToggle}>
               <Cart className="cart-icon" />
               {badge}
            </button>

            <div className={`dropdown-menu dropdown-menu-right${this.state.open ? ' show' : ''}`}>
               {prodsList}
               {checkoutBtn}
            </div>
         </div>
      );
   }
}

const mapDispatchToProps = (dispatch) => ({
   toggle: active => { dispatch(getDropdownState(active)) }
})

Dropdown = connect(null, mapDispatchToProps)(Dropdown)

export default Dropdown;
