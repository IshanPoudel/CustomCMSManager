import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-400 text-black py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <h2 className="text-xl font-bold mb-4 text-black">Streamline Content Management System</h2>

        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-black">PRODUCT</h3>
            <ul className="text-base">
              <li><a href="#">Streamline</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Request a Demo</a></li>
              <li><a href="#">Feature List</a></li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-black">SOLUTIONS</h3>
            <ul className="text-base">
              <li><a href="#">Content Management</a></li>
              <li><a href="#">Headless/APIs</a></li>
              <li><a href="#">Asset Management</a></li>
              <li><a href="#">Agile E-Commerce</a></li>
              <li><a href="#">Intranets & Extranets</a></li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-black">RESOURCES</h3>
            <ul className="text-base">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Videos</a></li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-black">COMPANY</h3>
            <ul className="text-base">
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4 mt-4 md:mt-0">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-xl text-white hover:text-red-500" />
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-xl text-white hover:text-red-500" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-xl text-white hover:text-red-500" />
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="text-xl text-white hover:text-red-500" />
        </a>
      </div>

      <div className="text-center text-sm mt-4">
        <p>© {currentYear} Streamline. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
