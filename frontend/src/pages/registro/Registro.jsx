import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import md5 from 'md5';
import './registro.scss'

export const Registro = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignup = async()=>{
		const data = {
            "fullname":name,
			"email":email,
			"password":password
		};
		try {
			const response = await fetch (`https://fuzzy-goldfish-q7qvv4w7rpp724w4w-5000.app.github.dev/createUser`, {
				method:'POST',
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(data)
			});

			if(!response.ok){
				throw new Error("Error login endpoint");
				
			}

		} catch (error) {
			console.error(error)
		}
	}



    
    return (
		<>
        <div className='wrapper'>
            <h1>Signup</h1>
            <form>
                 <div className="input-box">
                    <input type="text" onChange={(e)=>{
						setName(e.target.value)
					}} className="form-control"  id="InputName" placeholder="Nombre Completo"/>
                </div>
                <div className="input-box">
                    <input type="email" onChange={(e)=>{
						setEmail(e.target.value)
					}} className="form-control"  id="InputEmail" placeholder="Correo"/>
                </div>
                <div className="input-box">
                    <input type="password" onChange={(e)=>{
						setPassword(md5(e.target.value))
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