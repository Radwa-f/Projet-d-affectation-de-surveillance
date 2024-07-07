/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
//import { FiAlertOctagon } from 'react-icons/fi';


interface LoginModalProps {
 isVisible: boolean;
 onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isVisible, onClose }) => {
  const [user_code, setUserCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      const response = await axios.post('http://127.0.0.1:8000/Api/login/', {
        user_code: user_code,
        password: password
      });
      // Assuming the response contains user ID
      const { id_user, role} = response.data;
      console.log('User ID:', id_user);
      console.log('Role:', role);
      const id = id_user;

      if (response.status === 200 && (role === 'surveillant' || role ==='Surveillant') ) {
        window.location.href = `/Surveillant?id=${id}`;
      }
      else if (response.status === 200 && (role === 'admin' || role === 'Admin') ){
        window.location.href = `/admin?id=${id}`;
      }
      else console.log('no such user')
  };

  if (!isVisible) return null;

  return (
    <div className="modal " onClick={onClose}>
      <div className="modal-content flex justify-center rounded-lg bg-white dark:bg-gray-900" onClick={(e) => e.stopPropagation()}>
        <div className="login_form flex flex-col justify-center pl-[80px]">
          <h1 className='bold-28 1g:bold-32 text-[1.8rem] text-black dark:text-white capitalize'>Se connecter</h1>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm ">
              <div className="relative flex">
                <span className="inline-flex items-center px-3 text-gray-500 border-[1px]">
                  <FaRegUser />
                </span>
                <input
                  type="text"
                  required
                  value={user_code}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="identifient"
                />
              </div>

              <div className="relative flex mt-[10px]">
                <span className="inline-flex items-center px-3 text-gray-500 border-[1px]">
                  <RiLockPasswordLine />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="mot de passe"
                />
              </div>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Se connecter
              </button>
              <div className="text-sm mt-[5px] ml-[90px] ">
                <Link href="/ForgetPass" className="font-medium text-indigo-400 hover:text-indigo-500">
                  mot de passe oublié?
                </Link>
              </div>
            </div>
          </form>
        </div>

        <div className="Ensaj_img rounded-tr-lg rounded-br-lg ">
          <blockquote className="text-center py-8 px-4 md:px-8 mt-[150px]">
            <p className="text-lg md:text-xl font-bold italic text-white">
              "La technologie ne remplacera jamais de grands enseignants, ..."
            </p>
            <cite className="mt-4 block font-semibold text-white">- George Couras</cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
};


export default LoginModal;
