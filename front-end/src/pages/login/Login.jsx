import Axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react';


import { useNavigate, Link } from 'react-router-dom'
import Chat from '../chat/Chat.jsx'
import './login.css'



function Login() {
 
    // const [state, setState] = useState(0)
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [userList, setUserList] = useState([])
    var connection = false
    const navigate = useNavigate()


	const getUser = () => {
	  	Axios.get("http://localhost:3001/Login").then((response) => {
	      	setUserList(response.data)
	    })
	}
	useEffect(() => {
		 getUser()
	}, [])
   


    const handleSubmit = (event) => {
	  	event.preventDefault()

	    userList.forEach((val) => {

			if(val.user===user &&
			   val.pass===password ){

				
				// localStorage.setItem('user',val.user)

				// localStorage.setItem('idUser',val.idUser)
               connection = true
			   navigate(`/Perfil/${val.idUser}`)

			}

        })
		if(connection!=true){
			alert('error')
		}
    };

    const redireccion = () => {
	    navigate('/NewUser')
    }

  

	return (
		<div className="login-container-section">
			
				
				<div className="login-container">
					<form>
						
						<input 
						className="input"
						type="mail" 
						placeholder="Correo electronico o numero de telefono"  
						onChange={(event) => {
       					setUser(event.target.value);
         				}}/>

         				<input 
						className="input"
						type="password" 
						placeholder="Contraseña"  
						onChange={(event) => {
       					setPassword(event.target.value);
         				}}/>

						<button 
						onClick={handleSubmit}>
						Iniciar sesion
						</button>	

						<div className="alert">
							 <Link id="help" to="#">¿Olvidaste tu contraseña?</Link>
						</div>
						<input onClick={redireccion} type="submit" value="Crear cuenta nueva"/>
					   
					</form>
			 	</div>

			</div>
			
				
			
		
		
	)
	 
}

export default Login