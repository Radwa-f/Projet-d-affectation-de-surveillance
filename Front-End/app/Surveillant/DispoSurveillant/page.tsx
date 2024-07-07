"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateDisponibiliteForm = () => {
  const [selectedDisponibilites, setSelectedDisponibilites] = useState<{ day: string; hours: string[] }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<{ [key: string]: boolean }>({});
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const hourChoices = [
    '9:00 à 10:30',
    '11:00 à 12:30',
    '13:30 à 15:00',
    '15:30 à 17:00',
  ];
  const [alertMessage, setAlertMessage] = useState(''); // Nouvel état pour le message d'alerte
  const [alertType, setAlertType] = useState(''); // Nouvel état pour le type d'alerte (succès ou erreur)

  const [id, setId] = useState('');

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
const ref=`/Surveillant?id=${id}`;


  const handleCheckboxChange = (day: string, isChecked: boolean) => {
    const selectedDayCount = Object.values(selectedDays).filter(Boolean).length;

    if (isChecked && selectedDayCount >= 4) {
      setError('You can only select up to 4 days.');
      return;
    }

    setSelectedDays(prevState => {
      const newSelectedDays = { ...prevState, [day]: isChecked };
      // Reset the error when a valid selection is made
      setError(null);
      return newSelectedDays;
    });
  };

  const handleHourChange = (day: string, hour: string, isChecked: boolean) => {
    setSelectedDisponibilites(prevState => {
      const existingEntry = prevState.find(item => item.day === day) || { day, hours: [] };
      let updatedHours = [...existingEntry.hours];

      if (isChecked) {
        if (!updatedHours.includes(hour)) {
          updatedHours.push(hour);
        }
      } else {
        updatedHours = updatedHours.filter(h => h !== hour);
      }

      const updatedState = prevState.filter(item => item.day !== day);
      updatedState.push({ day, hours: updatedHours });

      return updatedState;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDisponibilites.length === 0 || selectedDisponibilites.some(item => item.hours.length === 0)) {
      setAlertMessage('Échec de la création. Réessayer!');
      setAlertType('error');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000); // Le message d'alerte disparaît après 3 secondes
      return;
    }

    try {
      for (const disponibilite of selectedDisponibilites) {
        for (const hour of disponibilite.hours) {
          const response = await axios.post('http://localhost:8000/Api/disponibilite/', {
            id_user: id, // Replace with the ID of the logged-in professor
            day_of_week: disponibilite.day,
            hour,
          });
          console.log('Disponibilité created:', response.data);
        }
      }

      setSelectedDays({});
      setSelectedDisponibilites([]);
      setError(null);
      setAlertMessage('Disponibilité créé avec succès !');
      setAlertType('success');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000); // Le message d'alerte disparaît après 3 secondes
    } catch (error) {
      console.error('Failed to create disponibilités:', error);
      setAlertMessage('Échec de la création de disponibilité. Réessayer!');
      setAlertType('error');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000); // Le message d'alerte disparaît après 3 secondes
    }
 };

 return (
    <div className='w-full h-screen bg-white dark:bg-gray-900'>
      <nav className='w-full shadow-xl ring-1 ring-slate-100 dark:bg-gray-900 navbar'>
        <div className='flex-row max-w-screen-xl flex items-center justify-center mx-auto p-4'>

        <a href={`/Surveillant?id=${id}`} className="flex items-center space-x-3 rtl:space-x-reverse">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
    </svg> </a> 
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto">

          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse ">
            <span className="self-center bold-28 text-2xl text-black dark:text-white font-semibold whitespace-nowra ">ENSAJ<span className='text-blue-700'>Exams</span> <div className='inline bg-blue-700 rounded-lg text-white px-1 py-1'>Surveillant </div></span>
          </a>
        </div>  
        </div> 
        
      </nav>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl outline-double outline-blue-600 rounded-md p-1 shadow-lg shadow-blue-400/20 hover:shadow-indigo-500/30">
      <div className="md:flex bg-sky-blue shadow-md">
        <div className="p-8 ">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Créer Disponibilités</div>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <p className="text-gray-700 text-sm">Selectionner le jour et la periode:</p>
              {daysOfWeek.map(day => (
                <div key={day} className="flex items-center mt-2">
                 <input
                    type="checkbox"
                    id={`${day}-checkbox`}
                    checked={selectedDays[day] || false}
                    onChange={(e) => handleCheckboxChange(day, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                 />
                 <label htmlFor={`${day}-checkbox`} className="ml-2 text-gray-700">{day}</label>
                 {selectedDays[day] && (
                    <div className="ml-4">
                      {hourChoices.map(hour => (
                        <div key={hour} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`${day}-${hour}`}
                            checked={selectedDisponibilites.find(item => item.day === day)?.hours.includes(hour) || false}
                            onChange={(e) => handleHourChange(day, hour, e.target.checked)}
                            className="form-checkbox h-5 w-5 text-indigo-600"
                          />
                          <label htmlFor={`${day}-${hour}`} className="ml-2 text-gray-700">{hour}</label>
                        </div>
                      ))}
                    </div>
                 )}
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2"> {/* Reduce space between button and alert */}
          <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg shadow-indigo-400/50 hover:shadow-black-500/40">
            Créer Disponibilités
          </button>
          {alertMessage && (
            <div className={`p-2 text-sm max-w-xs ${alertType === 'success' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'} rounded-lg`} role="alert">
              {alertMessage}
            </div>
          )}
      </div>
            
          </form>
          
          {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
        </div>
      </div>
      </div>
    </div>
  );
};

export default CreateDisponibiliteForm;
