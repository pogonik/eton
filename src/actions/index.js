import fetch from 'cross-fetch'

export const types = {
   PRODUCTS_LOADING: 'PRODUCTS_LOADING',
   PRODUCTS_LOADED: 'PRODUCTS_LOADED',
   PRODUCTS_FAILED: 'PRODUCTS_FAILED',
   ADD_TO_CART: 'ADD_TO_CART',
   REMOVE_FROM_CART: 'REMOVE_FROM_CART',
   DROPDOWN_TOGGLE: 'DROPDOWN_TOGGLE'
}

let prodsInit = {
   ids: {}
}

export const preloadProds = () => ({
   type: types.PRODUCTS_LOADING,
   loading: true
})

export const getProds = (products) => ({
   type: types.PRODUCTS_LOADED,
   loading: false,
   products: products
})

export const prodsFailed = () => ({
   type: types.PRODUCTS_LOADED,
   loading: false,
   error: true
})

export const addToCart = (prod) => ({
   type: types.ADD_TO_CART,
   payload: prod
})

export const removeFromCart = (prod) => ({
   type: types.REMOVE_FROM_CART,
   payload: prod
})

export const getAllProducts = () => {

   return async function (dispatch) {
      dispatch(preloadProds())
      try {
         let res = await fetch('https://my-json-server.typicode.com/brankostancevic/products/products')
         let resJSON = await res.json()
         
         return dispatch(getProds(await resJSON))
      } catch (error) {
         return dispatch(prodsFailed())
         console.error(error)
      }
   }
}

export const getDropdownState = (active = false) => ({
   type: types.DROPDOWN_TOGGLE,
   payload: active
})