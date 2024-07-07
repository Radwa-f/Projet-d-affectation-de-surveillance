"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Space } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

interface Student {
  id_user: string;
  user_code: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
}

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [confirmUserId, setConfirmUserId] = useState<string | null>(null);
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

  const id_user = id;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/Api/users/?search=etudiant`);
        setStudents(response.data);
        setError('');
      } catch (error) {
        console.error('Failed to fetch student data:', error);
        setStudents([]);
        setError('Failed to fetch student data. Please try again');
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = searchTerm.trim() === '' ? students : students.filter(student =>
    student.user_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStudentClick = (student: Student) => {
    if (selectedStudent === student) {
      setSelectedStudent(null); // Collapse if already selected
    } else {
      setSelectedStudent(student);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (userId: string) => {
    setIsConfirmModalVisible(true);
    setConfirmUserId(userId);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/Api/users/${confirmUserId}/`);
      // Filter out the deleted user from the state
      setStudents(students.filter(student => student.id_user !== confirmUserId));
      setIsConfirmModalVisible(false);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmModalVisible(false);
  };

  return (
    <div className="mx-auto">
      <nav className='w-full shadow-xl ring-1 ring-slate-100 dark:bg-gray-900 navbar'>
        <div className='flex-row max-w-screen-xl flex items-center justify-center mx-auto p-4'>
          <a href={`/admin?id=${id}`} className="flex items-center space-x-3 rtl:space-x-reverse">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
            </svg>
          </a> 
          <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center bold-28 text-2xl text-black dark:text-white font-semibold whitespace-nowra">
                ENSAJ<span className='text-blue-700'>Exams</span> <div className='inline bg-blue-700 rounded-lg text-white px-1 py-1'>Admin</div>
              </span>
            </a>
          </div>  
        </div> 
      </nav>
      <br />
      <br />
      <br />
      <div className="mb-4 mx-auto mt-[40px] w-[500px]">
        <input
          type="text"
          placeholder="Search by user code..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border border-black focus:border-primary-500 outline outline-blue-600 rounded-md p-1 shadow-lg shadow-blue-400/20 hover:shadow-indigo-500/30"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul>
        {filteredStudents.map(student => (
          <li key={student.id_user} className="border-b border-gray-300 mb-4">
            <div
              className="p-4 cursor-pointer flex justify-between items-center"
              onClick={() => handleStudentClick(student)}
            >
              <div>
                <p className="text-lg font-semibold">CNE: {student.user_code}</p>
                <p className="text-gray-600">nom et prenom : {student.nom} {student.prenom}</p>
              </div>
              <Space>
                <Button onClick={() => handleDelete(student.id_user)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Supprimer
                </Button>
              </Space>
            </div>
            {selectedStudent === student && (
              <div className="px-4 py-2">
                <p><span className="font-semibold">Email:</span> {student.email}</p>
                <p><span className="font-semibold">Telephone:</span> {student.telephone}</p>
                <p><span className="font-semibold">Role:</span> {student.role}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <Modal
        title="Voulez-vous vraiment supprimer cet utilisateur ?"
        visible={isConfirmModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Oui, Supprimer"
        cancelText="annuler"
      >
        <p>La suppression de cet utilisateur ne peut pas être annulée.</p>
      </Modal>
    </div>
  );
};

export default StudentList;
