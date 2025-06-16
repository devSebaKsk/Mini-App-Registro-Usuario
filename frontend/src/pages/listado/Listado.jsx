import React from 'react'
import { useState, useEffect } from 'react'
import './listado.scss';

export const Listado = () => {

    const [listado, setListado] = useState([])

    const getUsers = async () => {
    try {

      const res = await fetch(`https://fuzzy-goldfish-q7qvv4w7rpp724w4w-5000.app.github.dev/users`);

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
