//define a reducer function


const initialState = {
    loggedIn:false
};

function userReducer(state=initialState , action){

    //Depending on the aciton type
  
    switch(action.type)
    {
      case 'LOGIN':
        return {
          ...state,
          loggedIn:true
        };
      
        case 'LOGOUT':
          return {
            ...state,
            loggedIn:false
          };
        default:
          return state;
    }
};

export default userReducer;
