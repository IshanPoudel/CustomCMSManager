import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { logoCMS, nameCMS } from '../assets';
import store from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions';

const Header = () => {
  const userState = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSignOut = () => {
    console.log('Signing Out');
    dispatch(logout());
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='w-full h-25 bg-white border-b-[1px] border-b-gray-800 sticky top-0 z-20'>
      <div className='max-screen-xl mx-auto my-4 px-20 flex items-center justify-between'>
        <div>
          <Link to='/'>
            <ul className='flex items-center gap-0'>
              <img className='w-14' src={logoCMS} alt='FastCMSLogo' />
              <li className='text-3xl text-black font-bold hover:text-blue-200 font-titlefont hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
                STREAMLINE
              </li>
            </ul>
          </Link>
        </div>

        <ul className='flex items-center gap-8'>
          <li className='text-xl text-black font-bold hover:text-blue-200 font-titlefont hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 '>
            Product
          </li>
          <li className='text-xl text-black font-bold hover:text-blue-200 font-titlefont hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Solutions</li>
          <li className='text-xl text-black font-bold hover:text-blue-200 font-titlefont hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Docs</li>
          <li className='text-xl text-black font-bold hover:text-blue-200 font-titlefont hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Blog</li>
          <li className='text-xl text-black font-bold hover:text-blue-200 font-titlefont hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
            <Link to='/login'>
              <button className='bg-blue-400 hover:bg-blue-900 py-2 px-4 rounded-lg'>Get Started</button>
            </Link>
          </li>
          {userState.loggedIn && (
            <li>
              <div className='relative inline-block' ref={dropdownRef}>
                <button className='bg-blue-400 hover:bg-blue-900 py-2 px-4 rounded-full' onClick={toggleDropdown}>
                  {userState.username}
                </button>
                {dropdownVisible && (
                  <ul className='absolute mt-2 py-2 px-4 bg-white rounded-lg shadow-lg'>
                    <li>
                      <button onClick={() => console.log('Profile clicked')}>Profile</button>
                    </li>
                    <li>
                      <button onClick={handleSignOut}>Sign Out</button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
