import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import authReducer from "./state/index";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {presistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PURGE,REGISTER} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

// So idea /concept is that : all the state will be stored inside the local storage !!
// so that even if user closes the brwoser and comes again
// still they have all those access tokens , profile logged in etc !!

const persistConfig={key:"root",storage,version:1};
const persistedReducer=persistReducer(persistConfig,authReducer);

// redux store as you know is nothing but all the reducers and the state wired up !!
const store=configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware({
      serializableCheck:{
        ignoreActions:[FLUSH,REHYDRATE,PAUSE,PURGE,REGISTER],
      },
   })
  } 
})

// this ignoreActions : is basically used to ignore the warnings of the 
// type : stated in the array !!


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);
