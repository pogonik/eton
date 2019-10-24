import { combineReducers } from 'redux'
import { types } from '../actions'

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

const dropdown = (state = {}, action) => {
   switch (action.type) {
      case types.DROPDOWN_TOGGLE:
         return { ...state, active: action.payload };
      default:
         return state;
   }
};

export default combineReducers({
   products, cart, dropdown
});