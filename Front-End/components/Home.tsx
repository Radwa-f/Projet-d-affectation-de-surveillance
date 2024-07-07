/* eslint-disable react/no-unescaped-entities */
"use client"
import React from 'react'
import { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter'
import LoginModal from './LoginModal';
import Navbar from './Navbar';
  
const Home = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  return (
   <div id='home-section' className='relative flex flex-col align-items justify-center'>
    <Navbar/>
    <section className='max-container padding-container flex flex-col items-center justify-center gap-20 py-10 pb-10 md:gap-28 lg:py-20 lg:flex-row z-0'>
    <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[144px] w-[777px] bg-blue-400 dark:bg-blue-500 rounded-full shadow-1g blur-[7rem] -z-10"></span>

      <div className='relative z-20 flex flex-1 flex-col pt-16 items-center justify-center'>
      <h4 className='bold-20 text-gray-600 dark:text-white '>
         Bienvenue sur ENSAJ
          <span className='relative inline-block'>
          <span className='text-blue-700'>Exams</span>
          <span className='absolute left-[62px] h-4 w-4 linearGradient rounded-full -z-10'></span>
         </span>
      </h4>

      <h1 className='bold-48 lg:bold-50 relative text-gray-600 dark:text-white '>Plateforme d'Affectation de Surveillance</h1>

        <h2 className='bold-28 1g:bold-32 text-[1.8rem] capitalize text-gray-600 dark:text-white '>
          On offre{' '}
          <span className='text-blue-700 dark:text-green-90'>
            {/* Style will be inherited from the parent element */}
            <Typewriter 
              words={[' la planification', 'l\'organisation', 'la coordination', 'la gestion' , ' la facilitation']}
              loop={true}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h2>
        <p className="regular-18 max-w-[555px] my-7 text-center text-gray-600 dark:text-white ">  sur la plateforme de gestion des examens de l'ENSAJ. Simplifiez la planification, la supervision et la gestion des examens pour les étudiants et les professeurs avec notre système automatisé. Offrant une expérience d'examen fluide et sans stress pour tous les intervenants.</p>
      
        <div className='flexStart pt-6 gap-10'>
          <button className="button__login rounded_button btn_dark_rounded1 dark:btn_light_rounded1 button_text" onClick={() => setModalVisible(true)}>
              Se Connecter
          </button>
          <LoginModal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
          <button className="button__login rounded_button btn_dark_rounded1  button_text btn_dark_rounded dark:btn_light_rounded1 button_text" onClick={() => scrollToSection('contact-section')}>
              Contact
          </button>
        </div>
      </div>
    </section>

   </div>

  )
}

export default Home
