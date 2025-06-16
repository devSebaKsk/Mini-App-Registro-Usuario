import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import md5 from 'md5';
import './registro.scss'
import { ToastContainer, toast } from 'react-toastify';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Registro = () => {
	useGSAP(() => {
		gsap.fromTo(".wrapper", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 });
		gsap.fromTo(".input-box", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 });
		gsap.fromTo(".signup", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.5 });
	}, [])

	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const FLASK_BACKEND_URL = import.meta.env.VITE_FLASK_BACKEND_URL;

	const handleSignup = async (e) => {
		toast.info('Registrando usuario!', {
			position: "top-right",
			autoClose: 5000,
		});
		e.preventDefault();
		if (password.length < 6) {
			toast.error("La contraseña debe tener al menos 6 caracteres");
			return;
		}
		if (!nombre || !email || !password) {
			toast.error('Todos los campos son obligatorios');
			return;
		}
		// Validar email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			toast.error('Correo electrónico no válido');
			return;
		}
		const data = {
			"fullname": nombre,
			"email": email,
			"password": md5(password)
		};
		try {
			const response = await fetch(`${FLASK_BACKEND_URL}/createUser`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)

			});
			setNombre('');
			setEmail('');
			setPassword('');
			toast.success('Usuario creado correctamente');

			if (!response.ok) {
				throw new Error("Error login endpoint");
			}

		} catch (error) {
			console.error(error)
			toast.error("Error al registrar el usuario");
		}
	}




	return (
		<>
			<ToastContainer />

			<div className='wrapper'>
				<Link to="/listado" className='back'><button className='listado-button'>Usuarios Registrados</button></Link>
				<h1>Signup</h1>
				<form onSubmit={handleSignup}>
					<div className="input-box">
						<label htmlFor="InputFullName">Nombre Completo</label>
						<input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="form-control" id="InputFullName" placeholder={nombre} />
					</div>
					<div className="input-box">
						<label htmlFor="InputEmail">Correo Electrónico</label>
						<input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="InputEmail" placeholder={email} />
					</div>
					<div className="input-box">
						<label htmlFor="InputPassword">Contraseña</label>
						<input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="InputPassword" placeholder={password} />
					</div>
					<div className='buttons'>
						<button type="submit" className="signup">Registrar</button>
					</div>
				</form>
			</div>
		</>
	)
}