import React from 'react'
import 'tailwindcss/tailwind.css'
import '@/app/globals.css';
import Home from '@/components/Home'
import About from '@/components/About'
import Services from '@/components/Services'
import ContactMe from '@/components/ContactMe'
import Foooter from '@/components/Foooter'
import LougoutButton from '@/components/LogoutButton';

const page = () => {
  return (
    <main className='w-full bg-white dark:bg-gray-900'>
      <>
      <Home/>
      <About/>
      <Services/>
      <ContactMe/>
      <Foooter/>
      </>
    </main>    
  )
}

export default page
