'use client';
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface Assignment {
  exam: {
    day_of_week: string;
    hour: string;
    subject: string;
    salle: string;
  };
  surveillant: string;
}

const ScheduleTable = () => {
  const filierename = ['2AP-1', '2AP-2', '2ITE-1', '2ITE-2', '2ITE-3', 'GEE-1', 'GEE-2', 'GEE-3', 'ISIC-1', 'ISIC-2', 'ISIC-3', 'CCN-1', 'CCN-2', 'CCN-3', 'GC-1', 'GC-2', 'GC-3', 'GI-1', 'GI-2', 'GI-3'];
  const [selectedFiliere, setSelectedFiliere] = useState<string>('');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [id, setId] = useState<string>(''); 
  const [alertMessage, setAlertMessage] = useState<string>(''); 
  const [alertType, setAlertType] = useState<'success' | 'error'>('error'); 

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

  useEffect(() => {
    if (selectedFiliere) {
      axios.get(`http://localhost:8000/Api/assignments/?filiere=${selectedFiliere}`)
        .then(response => {
          setAssignments(response.data);
        })
        .catch((error: AxiosError) => {
          console.error('Failed to fetch assignments:', error);
        });
    }
  }, [selectedFiliere]);

  const handleFiliereChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFiliere(event.target.value);
  };

  const organizeAssignmentsByDay = (): { [key: string]: Assignment[] } => {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const organizedAssignments: { [key: string]: Assignment[] } = {};

    days.forEach(day => {
      organizedAssignments[day] = assignments.filter(assignment => assignment.exam.day_of_week === day);
    });

    return organizedAssignments;
  };

  const sendNotification = () => {
    axios.post('http://localhost:8000/Api/assignments/send_notification/', { filiere: selectedFiliere })
      .then(response => {
        console.log('Notification sent successfully');
        setAlertMessage('Notification envoyée avec succès !');
        setAlertType('success');
        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
      })
      .catch((error: AxiosError) => {
        console.error('Failed to send notification:', error);
        setAlertMessage('Échec de l\'envoi de la notification. Veuillez réessayer.');
        setAlertType('error');
        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
      });
  };

  const renderSchedule = () => {
    const organizedAssignments = organizeAssignmentsByDay();
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    return days.map(day => {
      const timeSlots: { [key: string]: Assignment[] } = {
        '9:00 à 10:30': [],
        '11:00 à 12:30': [],
        '13:30 à 15:00': [],
        '15:30 à 17:00': [],
      };

      organizedAssignments[day].forEach(assignment => {
        const hour = assignment.exam.hour;
        if (!timeSlots[hour]) {
          timeSlots[hour] = [];
        }
        timeSlots[hour].push(assignment);
      });

      return (
        <tr key={day} className={day === 'Lundi' || day === 'Mercredi' || day === 'Vendredi' ? 'bg-gray-100 border-b' : 'bg-white border-b'}>
          <td className="px-6 py-6 whitespace-nowrap border-r text-sm w-[180px] h-[100px]">{day}</td>
          {Object.values(timeSlots).map((assignments, index) => (
            <td key={index} className="px-6 py-4 whitespace-nowrap border-r w-[180px] h-[100px]">
              {assignments.map((assignment, idx) => (
                <div key={idx}>
                  <p className="text-sm">{assignment.exam.hour}</p>
                  <p className="text-sm">{assignment.exam.subject} - {assignment.exam.salle}</p>
                  <p className="text-sm">Pr. {assignment.surveillant}</p>
                </div>
              ))}
            </td>
          ))}
        </tr>
      );
    });
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900">
      <nav className="w-full shadow-xl ring-1 ring-slate-100 dark:bg-gray-900 navbar">
        <div className="flex-row max-w-screen-xl flex items-center justify-center mx-auto p-4">
          <a href={`/admin?id=${id}`} className="flex items-center space-x-3 rtl:space-x-reverse">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0a8 8 1 0 0 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 1 0 1 0 0H5.707l2.147 2.146a.5.5 1 0 1-.708.708l-3-3a.5.5 0 1 0 0-.708l3-3a.5.5 1 0 1 .708.708L5.707 7.5z" />
            </svg>
          </a>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center bold-28 text-2xl text-black dark:text-white font-semibold whitespace-nowra">
                ENSAJ<span className="text-blue-700">Exams</span>
                <div className="inline bg-blue-700 rounded-lg text-white px-1 py-1">Admin</div>
              </span>
            </a>
          </div>
        </div>
      </nav>
      <br />
      <br />
      <br />
      <div className="container mx-auto p-4">
        <select value={selectedFiliere} onChange={handleFiliereChange} className="mb-4 form-select border mt-1 outline-double outline-blue-600 rounded-md p-1 shadow-lg shadow-blue-400/20 hover:shadow-indigo-500/30">
          <option value="">Selectionez la Filière</option>
          {filierename.map((filiere, index) => (
            <option key={index} value={filiere}>{filiere}</option>
          ))}
        </select>
        <table className="min-w-full bg-white border border-gray-300">
          <tbody>
            {renderSchedule()}
          </tbody>
        </table>
        <div className="flex items-center space-x-2">
          <button onClick={sendNotification} className="interesting-button">Envoyez ce Planning</button>
          {alertMessage && (
            <div className={`p-2 text-sm max-w-xs ${alertType === 'success' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'} rounded-lg`} role="alert">
              {alertMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
