"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton';
import { RealSideBar } from '@/components/RealSideBar';

interface UserData {
  user_code: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}

const Surveillant: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const [id, setId] = useState(''); // État pour stocker l'ID extrait de l'URL

    useEffect(() => {
      // Fonction pour extraire l'ID de l'URL
      const extractIdFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const idFromUrl = urlParams.get('id');
        if (idFromUrl !== null) {
          setId(idFromUrl);
        }
      };
      extractIdFromUrl();
    }, []);
    console.log('User ID:', id); 
    const id_user = id;
    const nom = userData?.nom;
  
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get<UserData>(`http://127.0.0.1:8000/Api/users/${id_user}/`);
              setUserData(response.data);
              setLoading(false);
          } catch (error) {
              setLoading(false);
          }
      };
      fetchData();
  }, [id_user]);

  const prenom = userData?.prenom
  const disponnibiliteUrl =`/Surveillant/DispoSurveillant?id=${id}`;
  const checkPlanningUrl =`/Surveillant/Planning?id=${id}&Nom=${nom}`;

  return (
    <div className='w-full h-screen bg-white dark:bg-gray-900'>
      <nav className='w-full shadow-xl ring-1 ring-slate-100 dark:bg-gray-900 navbar'>
        <div className='flex-row max-w-screen-xl flex items-center justify-center mx-auto p-4'>

       
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto">

          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse ">
            <span className="self-center bold-28 text-2xl text-black dark:text-white font-semibold whitespace-nowra ">ENSAJ<span className='text-blue-700'>Exams</span> <div className='inline bg-blue-700 rounded-lg text-white px-1 py-1'>Surveillant </div></span>
          </a>
        </div>  
        </div> 
        
      </nav>

      <div className="h-screen max-w-screen-xl mx-auto flex flex-grow mt-[0px] left-0  bg-white dark:bg-gray-900">  
      <RealSideBar/>
      <div className='border-1 border-cyan-900 flex flex-grow flex-col justify-center items-center ml-8 w-64'>
      
          <Link href={disponnibiliteUrl}>
            <button className="rounded_button_admin btn_dark_rounded dark:btn_light_rounded button_text">
              Ajoute disponibilité
            </button>
          </Link>
         
          <br/>
          
          <Link href={checkPlanningUrl }>
            <button className="rounded_button_admin btn_dark_rounded dark:btn_light_rounded button_text">
              Consulter Planning
            </button>
          </Link>
          </div>
      
      </div>
      </div>
  );
};

export default Surveillant;