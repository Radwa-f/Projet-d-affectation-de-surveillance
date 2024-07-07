import 'tailwindcss/tailwind.css'
import '@/app/globals.css';
import React from 'react';
import { useRouter } from 'next/router';
import EtudiantPlanning from '@/components/EtudiantPlanning';

const EtudiantPage = () => {
  const router = useRouter();
  const { filiere } = router.query;

  // Ensure filiere is loaded before rendering
  if (!filiere) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <EtudiantPlanning selectedFiliere={filiere} />
    </div>
  );
};

export default EtudiantPage;
