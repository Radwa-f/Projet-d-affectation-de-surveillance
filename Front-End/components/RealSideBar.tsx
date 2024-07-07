
"use client";
import React, { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import axios from 'axios';
import { HiArrowSmRight, HiCalendar, HiChartPie, HiDotsVertical, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import LogoutButton from '@/components/LogoutButton';

interface UserData {
  user_code: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}
export function RealSideBar() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
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
  const id_user = id;


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

  return (
    <div className="h-screen w-64 bg-White border-r-4 text-white fixed left-0 top-12">
    <Sidebar >
        <br/>
        
  <Menu className='custom-sidebar '>
    <SubMenu className="text-bold text-md text-black text-left" label="Profile">
    {loading ? (
                    <p>Loading...</p>
                ) : userData ? (
        <div>
      <MenuItem> <p className="text-sm text-black text-left">Code: {userData.user_code}</p></MenuItem>
      <MenuItem> <p className="text-sm text-black text-left">Proprietaire: {userData.nom} {userData.prenom}</p> </MenuItem>
      <MenuItem> <p className="text-sm text-black text-left">Telephone: {userData.telephone}</p></MenuItem>
      <MenuItem> <p className="text-sm text-black text-left">Email: {userData.email}</p></MenuItem>
      </div>
    ) : null}
    </SubMenu>
    <br/>
    <MenuItem className="text-bold text-md text-black text-left"> Documentation </MenuItem>
    <br/>
    <MenuItem className="text-bold text-md text-black text-left"> Calendrier </MenuItem>
    <br/>
    <MenuItem><LogoutButton/></MenuItem>
  </Menu>
</Sidebar>
</div>
  );
}
