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

const store = createStore(
   reducer,
   applyMiddleware(thunk, createLogger())
)

store.dispatch(getAllProducts())

ReactDOM.render(
   <Provider store={store}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </Provider>
   , document.getElementById('app'));
