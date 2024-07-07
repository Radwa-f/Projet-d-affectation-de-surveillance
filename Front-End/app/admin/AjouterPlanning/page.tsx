"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateExamForm = () => {
  const [selectedExams, setSelectedExams] = useState<{ [key: string]: { subject: string; hour: string; salle: string }[] }>({
    Lundi: [],
    Mardi: [],
    Mercredi: [],
    Jeudi: [],
    Vendredi: [],
    Samedi: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<{ [key: string]: boolean }>({});
  const [filiere, setFiliere] = useState('');
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const hourChoices = [
    '9:00 à 10:30',
    '11:00 à 12:30',
    '13:30 à 15:00',
    '15:30 à 17:00',
  ];
  const filierename = ['2AP-1', '2AP-2', '2ITE-1', '2ITE-2', '2ITE-3', 'GEE-1', 'GEE-2', 'GEE-3', 'ISIC-1', 'ISIC-2', 'ISIC-3', 'CCN-1', 'CCN-2', 'CCN-3', 'GC-1', 'GC-2', 'GC-3', 'GI-1', 'GI-2', 'GI-3'];
  const [id, setId] = useState(''); // État pour stocker l'ID extrait de l'URL
  const [alertMessage, setAlertMessage] = useState(''); // Nouvel état pour le message d'alerte
  const [alertType, setAlertType] = useState<'success' | 'error'>('error'); // Nouvel état pour le type d'alerte (succès ou erreur)

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

  const handleCheckboxChange = (day: string, isChecked: boolean) => {
    setSelectedDays(prevState => ({ ...prevState, [day]: isChecked }));
  };

  const handleExamChange = (day: string, index: number, field: keyof { subject: string; hour: string; salle: string }, value: string) => {
    setSelectedExams(prevState => ({
      ...prevState,
      [day]: prevState[day].map((exam, i) => i === index ? { ...exam, [field]: value } : exam),
    }));
  };

  const addExam = (day: string) => {
    setSelectedExams(prevState => ({
      ...prevState,
      [day]: [...prevState[day], { subject: '', hour: '', salle: '' }],
    }));
  };

  const removeExam = (day: string, index: number) => {
    setSelectedExams(prevState => ({
      ...prevState,
      [day]: prevState[day].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const hasAllRequiredFields = Object.values(selectedExams).every(exams => exams.every(exam => exam.subject && exam.hour && exam.salle));
    if (!hasAllRequiredFields) {
      setAlertMessage('Échec. Veuillez réessayer.');
      setAlertType('error');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000); // Le message d'alerte disparaît après 3 secondes
      return;
    }

    try {
      // First, delete existing exams for the given filiere if any
      await axios.delete(`http://localhost:8000/Api/Exams/delete_by_filiere/?filiere=${filiere}`);
    
      // Then, create new exams based on the selected days and details
      for (const day in selectedExams) {
        for (const exam of selectedExams[day]) {
          await axios.post('http://localhost:8000/Api/Exams/', {
            subject: exam.subject,
            day_of_week: day,
            hour: exam.hour,
            salle: exam.salle,
            filiere: filiere,
          });
        }
      }

      // After exams are created or updated, make a POST request to the new endpoint to create assignments based on the filiere
      const assignmentsResponse = await axios.post('http://localhost:8000/Api/Exams/create_assignments/', {
        filiere: filiere,
      });

      if (assignmentsResponse.data.error) {
        setAlertMessage('Échec. Veuillez réessayer.');
        setAlertType('error');
        setTimeout(() => {
          setAlertMessage('');
        }, 3000); // Le message d'alerte disparaît après 3 secondes
        return;
      }

      // Reset form state and error message
      setSelectedDays({});
      setSelectedExams({
        Lundi: [],
        Mardi: [],
        Mercredi: [],
        Jeudi: [],
        Vendredi: [],
        Samedi: [],
      });
      setError(null);
    
      // Show success message
      setAlertMessage('Examens créés avec succès !');
      setAlertType('success');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000); // Le message d'alerte disparaît après 3 secondes

    } catch (error) {
      console.error('Failed to create exams or assignments:', error);
      setAlertMessage('Échec. Veuillez réessayer.');
      setAlertType('error');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000); // Le message d'alerte disparaît après 3 secondes
    }
  };

  return (
    <div className='w-full bg-white dark:bg-gray-900'>
      <nav className='w-full shadow-xl ring-1 ring-slate-100 dark:bg-gray-900 navbar'>
        <div className='flex-row max-w-screen-xl flex items-center justify-center mx-auto p-4'>
          <a href={`/admin?id=${id}`} className="flex items-center space-x-3 rtl:space-x-reverse">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
            </svg>
          </a>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse ">
              <span className="self-center bold-28 text-2xl text-black dark:text-white font-semibold whitespace-nowra ">ENSAJ<span className='text-blue-700'>Exams</span> <div className='inline bg-blue-700 rounded-lg text-white px-1 py-1'>Admin </div></span>
            </a>
          </div>  
        </div> 
      </nav>
      <br/>
      <br/>
      <br/>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl outline-double outline-blue-300 ">
        <div className="md:flex  bg-sky-blue dark:bg-gray-900 shadow-md place-items-center justify-center">
          <div className="p-3">
            <div className="uppercase tracking-wide text-sm text-indigo-500 bold-20">Ajouter Des Examens </div>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-1 flex-1">
                <p className="text-gray-700 dark:text-white bold-10 p-2 bold-5">Selectionner la filière des examens à ajouter:</p>
                <select
                  className="form-select block w-full border mt-1  outline-double outline-blue-600 rounded-md p-1 shadow-lg shadow-blue-400/20 hover:shadow-indigo-500/30"
                  value={filiere}
                  onChange={(e) => setFiliere(e.target.value)}
                >
                  <option value="">Sélectionnez une filière</option>
                  {filierename.map(filiereName => (
                    <option key={filiereName} value={filiereName}>{filiereName}</option>
                  ))}
                </select>
                <br />
                <br/>
                <p className="text-gray-700 dark:text-white bold-3 p-1">Selectionner les crénaux:</p><br/>
                <div className="form-container flex-1">
                  {daysOfWeek.map(day => (
                    <div key={day} className="day-container p-1 ">
                      <div className="w-32 flex p-1 mt-2 ">
                        <input
                          type="checkbox"
                          id={`${day}-checkbox`}
                          checked={selectedDays[day] || false}
                          onChange={(e) => handleCheckboxChange(day, e.target.checked)}
                          className="form-checkbox h-5 w-5 text-indigo-600 shadow-sm rounded-lg shadow-lg shadow-black-400/50 hover:shadow-indigo-500/40"
                        />
                        <br/>
                        <label htmlFor={`${day}-checkbox`} className="ml-2 text-gray-700 dark:text-white ">{day}</label>
                      </div>
                      {selectedDays[day] && selectedExams[day]?.map((exam, index) => (
                        <div key={index} className="input-group flex flex-col ">
                          <br/>
                          <input
                            type="text"
                            placeholder="Module/element"
                            className="form-input block w-full p-1 mt-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 outline-double outline-blue-500 shadow-sm rounded-md shadow-lg shadow-blue-400/50 hover:shadow-indigo-500/40"
                            required
                            value={exam.subject}
                            onChange={(e) => handleExamChange(day, index, 'subject', e.target.value)}
                          />
                          <br/>
                          <select
                            className="form-select block w-full p-1 mt-1 outline-double outline-blue-500 shadow-sm rounded-md shadow-lg shadow-blue-400/50 hover:shadow-indigo-500/40"
                            value={exam.hour}
                            onChange={(e) => handleExamChange(day, index, 'hour', e.target.value)}
                          >
                            <option value="">sélectionnez la période</option>
                            {hourChoices.map(hour => (
                              <option key={hour} value={hour}>{hour}</option>
                            ))}
                          </select>
                          <br/>
                          <input
                            type="text"
                            placeholder="Salle"
                            className="form-input block w-full p-1 mt-1 border-b border-gray-300 focus:border-blue-500 outline-double outline-blue-500 shadow-sm rounded-md shadow-lg shadow-blue-400/50 hover:shadow-indigo-500/40"
                            required
                            value={exam.salle}
                            onChange={(e) => handleExamChange(day, index, 'salle', e.target.value)}
                          />
                          <br/>
                          <button className="bold-10 bg-blue-400 hover:bg-blue-600 text-white font-bold py-0.1 px-1.5 rounded shadow text-sm shadow-lg shadow-black-400/50 hover:shadow-indigo-500/40" onClick={() => removeExam(day, index)}>Supprimer</button>
                          <br></br>
                        </div>
                      ))}
                      <br/>
                      <button className='bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-violet-600 hover:to-yellow-600 text-white font-bold py-0.1 px-1 rounded shadow text-sm' onClick={() => addExam(day)}> Plus </button>
                    </div>
                  ))}
                </div>
              </div>
              <br/>
              <div className="flex flex-col space-x-2">
                {alertMessage && (
                  <div className={`py-2 px-4 text-sm max-w-xs ${alertType === 'success' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'} rounded-lg`} role="alert">
                    {alertMessage}
                  </div>
                )}
                <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg shadow-indigo-400/50 hover:shadow-black-500/40">
                  Lancer
                </button>
              </div>
            </form>
            <br/>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExamForm;
