/* eslint-disable react/no-unescaped-entities */
"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    user_code: '',
    password: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    role: '',
    filiere: ''
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const filierename = ['2AP-1', '2AP-2', '2ITE-1', '2ITE-2', '2ITE-3', 'GEE-1', 'GEE-2', 'GEE-3', 'ISIC-1', 'ISIC-2', 'ISIC-3', 'CCN-1', 'CCN-2', 'CCN-3', 'GC-1', 'GC-2', 'GC-3', 'GI-1', 'GI-2', 'GI-3'];
  const [id, setId] = useState('');

  useEffect(() => {
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

  const generatePassword = (nom: string, user_code: string) => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `${nom}${user_code}${randomDigits}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    if (['nom', 'user_code'].includes(name)) {
      const { nom, user_code } = newFormData;
      newFormData.password = generatePassword(nom, user_code);
    }

    if (name === 'role' && value !== 'Etudiant') {
      newFormData.filiere = 'none';
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/Api/users/', formData);
      console.log('User created successfully:', response.data);
      setAlertMessage('Utilisateur créé avec succès !');
      setAlertType('success');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      setFormData({
        user_code: '',
        password: '',
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        role: '',
        filiere: ''
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to create user:', error.response?.data);
        setAlertMessage('Échec de la création de l\'utilisateur. Veuillez réessayer.');
        setAlertType('error');
        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
      } else {
        console.error('Unexpected error:', error);
        setAlertMessage('Une erreur inattendue est survenue.');
        setAlertType('error');
        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
      }
    }
  };

  return (
    <div className='bg-white dark:bg-gray-900'>
      <nav className='w-full shadow-xl ring-1 ring-slate-100 dark:bg-gray-900 navbar'>
        <div className='flex-row max-w-screen-xl flex items-center justify-center mx-auto p-4'>
          <a href={`/admin?id=${id}`} className="flex items-center space-x-3 rtl:space-x-reverse">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
          </a>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center bold-28 text-2xl text-black dark:text-white font-semibold whitespace-nowra">
                ENSAJ<span className='text-blue-700'>Exams</span>
                <div className='inline bg-blue-700 rounded-lg text-white px-1 py-1'>Admin</div>
              </span>
            </a>
          </div>
        </div>
      </nav>
      <br />
      <br />

      <section className="bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full mt-8 bg-white rounded-lg shadow dark:border sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700 outline-double outline-4 outline-blue-700">
            <div className="p-3 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Ajouter Un Utilisateur
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {Object.entries(formData).map(([key, value]) => {
                  if (key === 'role') {
                    return (
                      <div key={key}>
                        <label htmlFor={key} className="block mb-2 text-sm font-medium text-white dark:text-white">
                          Role
                        </label>
                        <select
                          name={key}
                          id={key}
                          value={value}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 mt-0"
                          required
                        >
                          <option value="">Selectionner Role</option>
                          <option value="Etudiant">Etudiant</option>
                          <option value="Surveillant">Surveillant</option>
                        </select>
                      </div>
                    );
                  }
                  if (key === 'filiere' && formData.role === 'Etudiant') {
                    return (
                      <div key={key}>
                        <label htmlFor={key} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                          Filiere
                        </label>
                        <select
                          name={key}
                          id={key}
                          value={value}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                          required>
                          <option value="">Sélectionnez une filière</option>
                          {filierename.map(filiereName => (
                            <option key={filiereName} value={filiereName}>{filiereName}</option>
                          ))}
                        </select>
                      </div>
                    );
                  }
                  if (key !== 'filiere') {
                    return (
                      <div key={key}>
                        <label htmlFor={key} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                          {key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)}
                        </label>
                        <input
                          type={key === 'password' ? 'password' : 'text'}
                          name={key}
                          id={key}
                          value={value}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                          placeholder={`Enter ${key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)}`}
                          required
                        />
                      </div>
                    );
                  }
                })}
                {alertMessage && (
                  <div className={`p-4 mb-4 text-sm ${alertType === 'success' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'} rounded-lg`} role="alert">
                    {alertMessage}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2"
                >
                  Créer l'utilisateur
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateUser;
