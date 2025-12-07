import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserShield } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-200 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-3xl font-extrabold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">GlowBeauty</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
            <Link to="/cart" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-gray-900 rounded-full hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 transition-all">
                <FaShoppingCart className="w-5 h-5 text-gray-700"/>
                <span className="sr-only">Cart</span>
            </Link>
             <Link to="/admin" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-gray-900 rounded-full hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 transition-all">
                <FaUserShield className="w-5 h-5 text-gray-700"/>
            </Link>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:text-primary md:p-0 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/products" className="block py-2 px-3 text-gray-900 rounded hover:text-primary md:p-0 transition-colors">Products</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
