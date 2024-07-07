"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Assignment {
  exam: {
    hour: string;
    day_of_week: string;
    subject: string;
    salle: string;
  };
  // Add any other properties as needed
}

const EtudiantPlanning = ({ selectedFiliere }: { selectedFiliere: string }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    if (selectedFiliere) {
      axios.get(`http://localhost:8000/Api/assignments/?filiere=${selectedFiliere}`)
        .then(response => {
          setAssignments(response.data);
        })
        .catch(error => {
          console.error('Failed to fetch assignments:', error);
        });
    }
  }, [selectedFiliere]);

  const organizeAssignmentsByDay = () => {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const organizedAssignments: { [key: string]: Assignment[] } = {};

    days.forEach(day => {
      organizedAssignments[day] = assignments.filter(assignment => assignment.exam.day_of_week === day);
    });

    return organizedAssignments;
  };

  const renderSchedule = () => {
    const organizedAssignments = organizeAssignmentsByDay();
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    return days.map(day => {
      let timeSlots: {
        '9:00 a 10:30': Assignment[];
        '11:00 a 12:30': Assignment[];
        '13:30 a 15:00': Assignment[];
        '15:30 a 17:00': Assignment[];
      } = {
        '9:00 a 10:30': [],
        '11:00 a 12:30': [],
        '13:30 a 15:00': [],
        '15:30 a 17:00': [],
      };

      organizedAssignments[day].forEach((assignment: Assignment) => {
        const hour = assignment.exam.hour as keyof typeof timeSlots; // Ensure hour is a valid key
        timeSlots[hour].push(assignment);
      });

      return (
        <tr key={day} className={day === 'Lundi' || day === 'Mercredi' || day === 'Vendredi' ? 'bg-gray-100 border-b' : 'bg-white border-b'}>
          <td className="px-6 py-6 whitespace-nowrap border-r text-sm w-[180px] h-[100px]">{day}</td>
          {Object.values(timeSlots).map((assignments, index) => (
            <td key={index} className="px-6 py-4 whitespace-nowrap border-r w-[180px] h-[100px]">
              {assignments.map((assignment, index) => (
                <div key={index}>
                  <p className="text-sm">{assignment.exam.hour}</p>
                  <p className="text-sm">{assignment.exam.subject} - {assignment.exam.salle}</p>
                </div>
              ))}
            </td>
          ))}
        </tr>
      );
    });
  };

  return (
    <div>
      <nav className='w-full shadow-xl ring-1 ring-slate-100 dark:bg-gray-900 navbar'>
        <div className='flex-row max-w-screen-xl flex items-center justify-center mx-auto p-4'>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse ">
              <span className="self-center bold-28 text-2xl text-black dark:text-white font-semibold whitespace-nowra ">ENSAJ<span className='text-blue-700'>Exams</span> <div className='inline bg-blue-700 rounded-lg text-white px-1 py-1'>Etudiant </div></span>
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

export default EtudiantPlanning;
