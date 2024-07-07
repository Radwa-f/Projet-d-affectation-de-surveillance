import React from 'react';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <nav className=' shadow-md ring-1  ring-slate-100 navbar bg-white dark:bg-gray-900'> {/* Added shadow and modified shadow class */}
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse ">
          <span className="self-center font-bold text-2xl font-semibold whitespace-no-wrap text-gray-600 dark:text-white "> {/* Made "EnsajExams" bolder */}
            ENSAJ
            <span className='text-blue-700'>Exams<span className=' left-[290px] h-4 w-4 linearGradient rounded-full'></span></span>
          </span>
        </a>
        <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div className={`w-full md:block md:w-auto ${isMenuOpen ? '' : 'hidden'}`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a  onClick={() => scrollToSection('home-section')}  className="flexCenter text-[15px] font-[500] text-black hover:bg-blue-700 hover:text-white px-4 py-1 rounded-full cursor-pointer transition-all duration-300 text-gray-600 dark:text-white ">Accueil</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('about-section')} className="flexCenter text-[15px] font-[500] text-black hover:bg-blue-700 hover:text-white px-4 py-1 rounded-full cursor-pointer transition-all duration-300 text-gray-600 dark:text-white ">À propos</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('services-section')} className="flexCenter text-[15px] font-[500] text-black hover:bg-blue-700 hover:text-white px-4 py-1 rounded-full cursor-pointer transition-all duration-300 text-gray-600 dark:text-white ">Services</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('contact-section')} className="flexCenter text-[15px] font-[500] text-black hover:bg-blue-700 hover:text-white px-4 py-1 rounded-full cursor-pointer transition-all duration-300 text-gray-600 dark:text-white ">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
