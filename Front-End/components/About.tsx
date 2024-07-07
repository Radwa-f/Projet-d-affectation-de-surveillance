/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <section id='about-section' className='max-container padding-container gap-20 py-10 pb-32 md:gap-28 lg:py-20 bg-gradient-to-r from-blue-400 to-white rounded-2xl mt-[200px] group'>
      <div className='text-center bold-18 uppercase tracking-[1rem] text-white dark:text-black pb-20 mb-5 '>À propos</div>
      <div className='flex flex-col gap-20 md:gap-20 xl:flex-row group'>
        <div className='flex-1 flexCenter flex-col m-auto text-white dark:text-black group-hover:scale-105 transition-all duration-1000'>
          <p className='mb-8  '>
          Dans l'évolution rapide de l'enseignement, <strong>EnsajExams</strong> se présente comme la solution par excellence face aux défis de planification et d'assignation des surveillants pendant les périodes d'examen. Face aux méthodes traditionnelles, souvent manuelles et dépourvues de l'assistance de l'automatisation, nous sommes témoins d'inefficacités significatives en ce qui concerne la répartition des salles, la gestion des horaires, et l'attribution des surveillants.</p>
          <p>Ces pratiques, bien qu'habituelles, mettent en lumière d'importantes lacunes en termes de temps, d'effort et de coûts, soulignant l'urgence d'un outil de gestion automatique et précis. <strong>EnsajExams</strong> s'érige en tant que cette plateforme innovante, élaborée pour répondre avec efficacité aux besoins spécifiques des institutions académiques.</p>
          <p>En offrant une gestion optimisée de la surveillance des examens, notre site a pour ambition de révolutionner et de simplifier de manière significative le processus de planification des examens. Ce texte introduit le projet de développement de <strong>EnsajExams</strong>, visant à fournir une solution complète pour une gestion impeccable des examens, marquant ainsi une évolution stratégique et nécessaire dans l'administration académique.</p>
        </div>
        <div className='group-hover:scale-105 hover:duration-500 transition-all duration-1000'>
          <Image src={'/ensa2.jpeg'} alt={'about'} height={400} width={600} className='w-auto rounded-2xl shadow'/>
          
        </div>

        
      
      </div>

    </section>
  )
}

export default About
