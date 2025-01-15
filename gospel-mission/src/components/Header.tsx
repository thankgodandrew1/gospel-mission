import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 font-heading text-white p-6 flex justify-between items-center shadow-lg relative z-10">
      <div className="flex items-center space-x-4">
        <Link href="/" legacyBehavior>
          <a className="cursor-pointer rounded-full hover:scale-110 transition-transform duration-300">
            <Image
              src="/images/logo.webp"
              alt="Elder Andrew's Missionary Blog"
              className="rounded-full shadow-lg"
              width={80}
              height={80}
            />
          </a>
        </Link>
        <span className="text-3xl font-bold tracking-wide hover:text-purple-300 transition-colors duration-300 cursor-default">
          Gospel Mission
        </span>
      </div>
      <nav className="hidden md:flex space-x-6 text-lg items-center">
        <Link href="/" legacyBehavior>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition duration-300 ease-in-out">
            Home
          </button>
        </Link>
        <Link href="/blog" legacyBehavior>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition duration-300 ease-in-out">
            Read
          </button>
        </Link>
        <Link href="/lessons" legacyBehavior>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition duration-300 ease-in-out">
            Lessons
          </button>
        </Link>
        <Link href="/about" legacyBehavior>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition duration-300 ease-in-out">
            About
          </button>
        </Link>
        <Link href="/contact" legacyBehavior>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition duration-300 ease-in-out">
            Contact
          </button>
        </Link>
      </nav>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            ></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 flex flex-col space-y-2 z-20">
          <Link href="/" legacyBehavior>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition duration-300 ease-in-out w-full text-left">
              Home
            </button>
          </Link>
          <Link href="/blog" legacyBehavior>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition duration-300 ease-in-out w-full text-left">
              Read
            </button>
          </Link>
          <Link href="/lessons" legacyBehavior>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition duration-300 ease-in-out w-full text-left">
              Lessons
            </button>
          </Link>
          <Link href="/testimonies" legacyBehavior>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition duration-300 ease-in-out w-full text-left">
              Testimonies
            </button>
          </Link>
          <Link href="/about" legacyBehavior>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition duration-300 ease-in-out w-full text-left">
              About
            </button>
          </Link>
          <Link href="/contact" legacyBehavior>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition duration-300 ease-in-out w-full text-left">
              Contact
            </button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
