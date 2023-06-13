import React from 'react'
import store from '../redux/store'
import { useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Home = () => {

  const userState = useSelector((store) => store.user);

  console.log(userState)
  return (
    <div>{userState.userId}</div>
  )
}

export default Home