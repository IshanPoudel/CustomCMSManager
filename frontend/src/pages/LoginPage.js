import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import {useDispatch} from 'react-redux';
import { login } from '../actions';
import {useNavigate} from 'react-router-dom';

const url ='http://localhost:8000/check_user_login';


const LoginPage = () => {
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [JWTtoken , setToken] = useState('');


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleuserNameChange = (e) => {
    setuserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userName === '' || password === '') {
      setError('Please enter your email and password.');
    } else {
      // Add your login logic here

        const data = {
            username: userName,
            password: password
        
        };
    
        fetch(url , 
            {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            .then(response=>response.json())
            .then(data=>{
                console.log('Response' , data);
                
                //Check two things
                //Check if wrong and set error message that is displayed in the dom
                if (data.user_id == '-1')
                {
                  setError(data.error)
                }

                //Check if correct and set reducer
                if (data.accessToken)
                {
                  // //Dispatch login
                  // console.log(data.user_id[0].id)
                  console.log(data)
                  dispatch(login(data.user_id[0].id , data.accessToken , data.username))

                   //Have them logged in and redirect to home page. 
                   navigate('/');



                  
                }


            })
            .catch(error=>
                {
                    console.log('Error' , error)
                });
         
        }
        //User succefully created , dispatch to store user token . 
    };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl text-center mb-4">Login</h2>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Username
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="userName"
              type="userName"
              placeholder="Enter your user name"
              value={userName}
              onChange={handleuserNameChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm text-gray-700">
              <input
                type="checkbox"
                className="mr-2 leading-tight"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <span className="text-sm">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-500">
              Forgot Password?
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <p className="text-center mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
