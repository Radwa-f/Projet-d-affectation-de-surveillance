"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Assignment {
  exam: {
    hour: string;
    subject: string;
    salle: string;
    day_of_week: string;
  };
  surveillant: string;
}

const SupervisorTable = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [id, setId] = useState('');

  useEffect(() => {
    // Function to extract ID from the URL
    const extractIdFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const idFromUrl = urlParams.get('id');
      if (idFromUrl !== null) {
        setId(idFromUrl);
      }
    };
    extractIdFromUrl();
  }, []);

  let nom = '';

  useEffect(() => {
    // Function to extract name from the URL
    const extractNomFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const nomFromUrl = urlParams.get('Nom');
      if (nomFromUrl !== null) {
        nom = nomFromUrl;
      }
    };
    extractNomFromUrl();
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8000/Api/assignments/?surveillant=${nom}`)
      .then(response => {
        setAssignments(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch assignments:', error);
      });
  }, [nom]);

  const organizeAssignmentsByDay = () => {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const organizedAssignments: Record<string, Assignment[]> = {};

    days.forEach(day => {
      organizedAssignments[day] = assignments.filter(assignment => assignment.exam.day_of_week === day);
    });

    return organizedAssignments;
  };

  const renderSchedule = () => {
    const organizedAssignments = organizeAssignmentsByDay();
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    return days.map(day => {
      const timeSlots: Record<string, Assignment[]> = {
        '9:00 à 10:30': [],
        '11:00 à 12:30': [],
        '13:30 à 15:00': [],
        '15:30 à 17:00': [],
      };

      organizedAssignments[day].forEach((assignment) => {
        const hour = assignment.exam.hour;
        if (timeSlots[hour]) {
          timeSlots[hour].push(assignment);
        }
      });

      return (
        <tr key={day} className={day === 'Lundi' || day === 'Mercredi' || day === 'Vendredi' ? 'bg-gray-100 border-b' : 'bg-white border-b'}>
          <td className="px-6 py-6 whitespace-nowrap border-r text-sm w-[180px] h-[100px] ">{day}</td>
          {Object.values(timeSlots).map((assignments, index) => (
            <td key={index} className="px-6 py-4 whitespace-nowrap border-r w-[180px] h-[100px]">
              {assignments.map((assignment, index) => (
                <div key={index}>
                  <p className="text-sm">{assignment.exam.hour}</p>
                  <p className="text-sm">{assignment.exam.subject} - {assignment.exam.salle}</p>
                  <p className="text-sm">Pr.{assignment.surveillant}</p>
                </div>
              ))}
            </td>
          ))}
        </tr>
      );
    });
  };

  return (
    <div className='w-full h-screen bg-white dark:bg-gray-900'>
      <nav className='w-full shadow-xl ring-1 ring-slate-100 dark:bg-gray-900 navbar'>
        <div className='flex-row max-w-screen-xl flex items-center justify-center mx-auto p-4'>

          <a href={`/Surveillant?id=${id}`} className="flex items-center space-x-3 rtl:space-x-reverse">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
            </svg>
          </a>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center bold-28 text-2xl text-black dark:text-white font-semibold whitespace-nowra">
                ENSAJ<span className='text-blue-700'>Exams</span> <div className='inline bg-blue-700 rounded-lg text-white px-1 py-1'>Surveillant</div>
              </span>
            </a>
          </div>
        </div>

      </nav>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container mx-auto p-4">
        <table className="min-w-full bg-white border border-gray-300">
          <tbody>
            {renderSchedule()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupervisorTable;
