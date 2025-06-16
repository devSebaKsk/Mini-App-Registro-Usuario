import React from 'react'
import { useState, useEffect } from 'react'
import './listado.scss';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


export const Listado = () => {

  useGSAP(() => {
    gsap.fromTo(".listado-wrapper", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 });
    gsap.fromTo(".listado-container", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 });
  }, [])

    const [listado, setListado] = useState([])

    const FLASK_BACKEND_URL = import.meta.env.VITE_FLASK_BACKEND_URL; // ¡CAMBIO CLAVE!


    const getUsers = async () => {
    try {

      const res = await fetch(`${FLASK_BACKEND_URL}/users`);

      const data = await res.json();
      setListado(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="listado-wrapper">
    <div className="listado-container">
      <Link to="/"><button className="btn btn-primary">Volver</button></Link>
        <h1>Listado de Usuarios</h1>
        <table className="listado-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Nombre Completo</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            {listado.map((user) => (
                <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  )
}
