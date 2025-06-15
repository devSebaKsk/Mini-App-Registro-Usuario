import React from 'react';
import './App.css'; // Asegúrate de que tu CSS global esté aquí
import AppRouter from './AppRouter.jsx'; // Importa tu nuevo AppRouter

function App() {
  return (
    <>
      {/* AppRouter contendrá toda tu lógica de enrutamiento y páginas */}
      <AppRouter />
    </>
  );
}

export default App;