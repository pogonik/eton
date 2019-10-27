import { combineReducers } from 'redux'
import { types } from '../actions'
import { useSelector } from 'react-redux'
// import { createSelector } from 'reselect'

let initProdsState = {
   products: [],
   loading: true,
   error: false
}

const products = (state = initProdsState, action) => {
   switch (action.type) {
      case types.PRODUCTS_LOADING:
         return {...state}
         break;
      case types.PRODUCTS_LOADED:
         return {...state, loading: action.loading, products: action.products}
         break;
      default:
         return {...state}
         break;
   }
}

let initCart = {
   cart: []
}

const cart = (state = initCart.cart, action = {}) => {
   switch (action.type) {
      case types.ADD_TO_CART:
         
         // pretpostavljam da postoji pametnije resenje...
         let itmIndex = state.findIndex(itm => itm.id === action.payload);
         let copiedState = [...state];

         itmIndex !== -1
            ? copiedState[itmIndex].quantity ++
            : copiedState.push({ id: action.payload, quantity: 1 });
         
         return [...copiedState]
         break;
      case types.REMOVE_FROM_CART:
         let filteredState = state.filter(itm => itm.id !== action.payload);

         return [...filteredState]
      default:
         return state;
   }
}

let dropdownInit = {
   active: false
}

const dropdown = (state = dropdownInit, action) => {
   switch (action.type) {
      case types.DROPDOWN_TOGGLE:
         return { ...state, active: action.payload };
      default:
         return state;
   }
};

const reducers = (state = {}, action) => {

   let kart = cart(state.cart, action);
   let prods = products(state.products, action);
   let cartTotal = 0;
   let cartData = kart.map((itm, i) => {

      let prodItm = prods.products.find((prod) => itm.id === prod.id);
      prodItm.sum = Number(prodItm.price) * itm.quantity;
      kart[i].data = prodItm;
      cartTotal += prodItm.sum;
   })

   return {
      products: prods,
      cart: kart,
      total: cartTotal,
      dropdown: dropdown(state.dropdown, action)
   }
}

export default reducers;