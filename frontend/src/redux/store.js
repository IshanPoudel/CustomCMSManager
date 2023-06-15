import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';


const saveState = (state) =>
{
  try
  {
    //Convert the state to a JSON string. 
    const serialisedState = JSON.stringify(state);

    window.localStorage.setItem('app_state' , serialisedState);
  }
  catch(err)
  {
    console.log(err)
  }
}

const loadState = () => {
  try {
    const serialisedState = window.localStorage.getItem('app_state');
    if (serialisedState === null) {
      return undefined;
    }
    return JSON.parse(serialisedState);
  } catch (err) {
    return undefined;
  }
};

//Define a reducer
const store = configureStore({
    reducer:{
      user: userReducer
    },
    preloadedState: loadState()
  });

store.subscribe(()=>
{
  saveState(store.getState());
})
  
export default store;
