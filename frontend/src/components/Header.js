import React from 'react';
import { Link } from 'react-router-dom';
import { logoCMS, nameCMS } from '../assets';

const Header = () => {
  return (
    <div className='w-full h-25 bg-white border-b-[1px] border-b-gray-800 sticky top-0 z-20'>
      <div className='max-screen-xl mx-auto my-4 px-20 flex items-center justify-between'>
        <div>
          <ul className='flex items-center gap-8'>
            <Link to='/'>
              <img className='w-14' src={logoCMS} alt='FastCMSLogo' />
            </Link>
            <li className='text-3xl text-black font-bold hover:text-blue-200 font-titlefont hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>STREAMLINE</li>
          </ul>
        </div>

        <ul className='flex items-center gap-8'>
          <li className='text-3xl text-black font-bold hover:text-blue-200 font-titlefont hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Product</li>
          <li className='text-3xl text-black font-bold hover:text-blue-200 font-titlefont hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Solutions</li>
          <li className='text-3xl text-black font-bold hover:text-blue-200 font-titlefont hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Docs</li>
          <li className='text-3xl text-black font-bold hover:text-blue-200 font-titlefont hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Blog</li>
          <li className='text-3xl text-black font-bold hover:text-blue-200 font-titlefont hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Get Started</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
