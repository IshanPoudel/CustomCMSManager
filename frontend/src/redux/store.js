import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';


//Define a reducer
const store = configureStore({
    reducer:{
      user: userReducer
    },
  });
  
export default store;
