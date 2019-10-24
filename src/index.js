// import './index.scss'

// import React from 'react'
// import {render} from 'react-dom'

// import 'babel-polyfill'
// import { createStore, applyMiddleware } from 'redux'
// import { Provider } from 'react-redux'
// import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'
// import reducer from './reducers'
// import App from './App'
// import { BrowserRouter as Router } from 'react-router-dom';


// const loggerMiddleware = createLogger()

// const store = createStore(
//     reducer,
//     applyMiddleware(thunkMiddleware, loggerMiddleware)
// )

// render(
//    <Provider store={store}>
//       <Router><App /></Router>
//    </Provider>, document.querySelector('#app')
// )








import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { getAllProducts } from './actions'

const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
   reducer,
   // applyMiddleware(thunk)
   withDevTools(applyMiddleware(thunk, createLogger()))
)

store.dispatch(getAllProducts())

ReactDOM.render(
   <Provider store={store}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </Provider>
   , document.getElementById('app'));
