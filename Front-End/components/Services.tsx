/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import NumberAnimation from './NumberAnimation'

const Services = () => {
  return (
    <div id='services-section' className='flex flex-col w-[50%] text-center m-auto mt-20'>
        
        <NumberAnimation achievementsList={[
                {
                  metric: "Enseignants",
                  value: "50",
                  postfix: "+",
                  prefix: ''
                }
                ]} /> 
            <p className='mb-[150px] dark:text-white'>
             Notre plateforme <strong>EnsajExams</strong> simplifie la planification des examens pour plus de 50 professeurs à l'ENSAJ. En offrant des fonctionnalités automatisées telles que la consultation des emplois du temps et la gestion des affectations, elle permet aux professeurs de se concentrer davantage sur leur enseignement, tout en assurant une expérience d'examen fluide pour les étudiants.
            </p>
        
            <NumberAnimation achievementsList={[
                {
                  metric: "Etudiants",
                  value: "1000",
                  postfix: "+",
                  prefix: ''
                }
                ]} /> 
            <p className='mb-[150px] dark:text-white'> 
               Notre plateforme <strong>EnsajExams</strong> simplifie la planification des examens pour plus de 1000 étudiants à l'ENSAJ. Grâce à ses fonctionnalités automatisées telles que la consultation des emplois du temps et la réception des notifications, elle garantit une organisation efficace des examens et une expérience fluide pour tous les étudiants.
            </p>
        
    </div>

    
  )
}

export default Services
