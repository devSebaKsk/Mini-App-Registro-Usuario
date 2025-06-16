import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import md5 from 'md5';
import './registro.scss'
import { ToastContainer, toast } from 'react-toastify';

export const Registro = () => {

    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")

    const handleSignup = async()=>{
		if(passwordConfirm.length < 6){
		toast.error("La contraseña debe tener al menos 6 caracteres");
		return;
	}
	if (!fullname || !email || !password) {
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
	  "fullname": fullname,
	  "email": email,
	  "password": password
	};
	try {
			const response = await fetch (`https://fuzzy-goldfish-q7qvv4w7rpp724w4w-5000.app.github.dev/createUser`, {
				method:'POST',
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(data)
				
			});
			toast.success('Usuario creado correctamente');
			if(!response.ok){
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
            <form>
                 <div className="input-box">
					<label htmlFor="InputFullName">Nombre Completo</label>
                    <input type="text" onChange={(e)=>{
						setFullname(e.target.value)
					}} className="form-control"  id="InputFullName" placeholder="Nombre Completo"/>
                </div>
                <div className="input-box">
					<label htmlFor="InputEmail">Correo Electrónico</label>
                    <input type="email" onChange={(e)=>{
						setEmail(e.target.value)
					}} className="form-control"  id="InputEmail" placeholder="Correo"/>
                </div>
                <div className="input-box">
					<label htmlFor="InputPassword">Contraseña</label>
                    <input type="password" onChange={(e)=>{
						setPassword(md5(e.target.value))
						setPasswordConfirm(e.target.value)
					}} className="form-control" id="InputPassword" placeholder="Contraseña"/>
                </div>
				<div className='buttons'>
                <button type="button" onClick={handleSignup} className="signup">Registrar</button>
				</div>
            </form>
        </div>
		</>
    )
}