/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState } from 'react';
import React from 'react';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";

import Link from 'next/link';
import axios from 'axios';

const ForgetPass = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/Api/forgot/', { email });
      console.log('Password reset successful. Check your email for the new password.');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };
  

  return (
    <div className="modal">
    <div className="modal-content flex justify-center rounded-lg bg-white dark:bg-gray-900">
    <div className="Ensaj_img_pass rounded-tl-lg rounded-bl-lg">
      <blockquote className="text-center py-8 px-4 md:px-8 mt-[150px]">
        <p className="text-lg md:text-xl font-bold italic text-white">
          " ... mais la technologie entre les mains de grands enseignants est transformative."
        </p>
        <cite className="mt-4 block font-semibold text-white">- George Couras</cite>
      </blockquote>
      </div>
      <div className="forget_pass_form flex flex-col justify-center pl-[40px]">
        <h1 className='bold-28 1g:bold-28 text-[1.8rem] capitalize text-black dark:text-white'>mot de pass oublié</h1>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm ">
            <div className="relative flex mt-[10px] w-[200px]">
              <span className="inline-flex items-center px-3 text-gray-500 border-[1px]">
                <MdOutlineAttachEmail />
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-1 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                placeholder="Email"
              />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-[200px]">
              Envoyer
            </button>
          </div>
        </form>
      </div>

      
    </div>
  </div>
  )
}

export default ForgetPass;
