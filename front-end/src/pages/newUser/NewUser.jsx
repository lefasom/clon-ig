import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


import Axios from 'axios'
import './newUser.css'

function NewUser() {

  const [ name, setName] = useState('')
  const [ surname, setSurname] = useState('')
  const [ user, setUser] = useState('')
  const [ mail, setMail] = useState('')
  const [ pass, setPass] = useState('')
  const [ passRep, setPassRep] = useState('')
  const [ tel, setTel] = useState('')
  const [ photo, setPhoto] = useState('')
  const [userList, setUserList] = useState([]);


  

   const createUser = (event) => {

     event.preventDefault();

     if(pass == passRep){

            Axios.post("http://localhost:3001/createUser", {
                name : name,
                surname : surname,
                user : user,
                mail : mail,
                pass : pass,
                tel : tel,
                photo : photo
                                 
          }).then(() => {
            setUserList([
              ...userList,
              {
                name : name,
                surname : surname,
                user : user,
                mail : mail,
                pass : pass,
                tel : tel,
                photo : photo

              },
            ]);
          });

          alert('Usuario creado exitosamente')
     
     }else{

        alert('Las contraseñas son distintas')
     }
    
     

   }

	return (
    
      
    <div className="newUser-container">
      <form>

       <div> 
        <input
          type="text" 
          placeholder="Nombre"
          onChange={(event) => {

            setName(event.target.value)
    
          }}/>
          <input 
          type="text" 
          placeholder="Apellido"
          
          onChange={(event) => {

            setSurname(event.target.value)
    
          }}
          />
       </div> 

        <div>
          <input 
          type="text" 
          placeholder="Usuario" 
          onChange={(event) => {

            setUser(event.target.value)
    
          }}/>
          <input 
            type="text" 
            placeholder="Celular"
            onChange={(event) => {

              setTel(event.target.value)
      
          }}
          />

         </div>

         <input 
          type="mail" 
          placeholder="Correo electronico o numero de telefono"
          onChange={(event) => {

            setMail(event.target.value)
    
          }}
          />
          <input 
          type="text" 
          placeholder="Url: http://photo.com"
          onChange={(event) => {

            setPhoto(event.target.value)
    
          }}
          />
       <div>
          <input 
          type="password" 
          placeholder="Contraseña"
          onChange={(event) => {

            setPass(event.target.value)
    
          }}
          />
          <input 
          type="password" 
          placeholder="Repetir Contraseña"
          onChange={(event) => {

            setPassRep(event.target.value)
    
          }}
          />
       </div>
      
       
        <input 
        type="submit" 
        value="Crear Cuenta"
        onClick={createUser}
        />

        <Link to='/'>Login</Link>

      </form>
    </div>

	)
}

export default NewUser