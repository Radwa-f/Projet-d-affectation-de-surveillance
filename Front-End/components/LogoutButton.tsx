"use client"
import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const LogoutButton =()=>{
    const [click, setClick] = useState(false);

    const handleclick=()=>{
        setClick(true);
    }

    if (click === true){
        window.location.href = `/`;

    }

    return(
        <div className='logout'>
            {!click? (
                <button className='logoutbut text-sm' onClick={handleclick}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Se Deconnecter
                </button>
            ) : (
                <p>À la prochaine!</p>
            )}
        </div>
    )

}

export default LogoutButton;