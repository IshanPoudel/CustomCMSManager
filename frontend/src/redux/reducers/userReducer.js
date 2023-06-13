//define a reducer function


const initialState = {
    loggedIn:false,
    userId : null,
    token: null,
    username:null,
};

function userReducer(state=initialState , action){

    //Depending on the aciton type
  
    switch(action.type)
    {
      case 'LOGIN':
        return {
          ...state,
          loggedIn:true ,
          userId : action.payload.userId,
          token: action.payload.token,
          username: action.payload.username
        };
      
        case 'LOGOUT':
          return {
            ...state,
            loggedIn:false,
            userId : null ,
            token : null,
            username:null
          };
        default:
          return state;
    }
};

export default userReducer;
