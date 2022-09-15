import React, { useEffect, useState } from 'react'
import { Link , Outlet } from 'react-router-dom'
import Modal_add from '../../components/modal_add/Modal_add.jsx'

import './menu.css'

function Menu() {
   

   const [ clase, setClase ] = useState('hidden')

   const Modal = () => {
   		if(clase=='hidden'){
   			setClase('block')
   		}else{
   			setClase('hidden')
   		}
   }
	
   
   	return(
   		<>
   		<div className={clase}>
   			<Modal_add />
   		</div>	
   		

		<nav className="menu">
			<Link to="/Home">
				<span className="material-icons">home</span>
			</Link>
			<Link to="/Search">
				<span className="material-symbols-sharp">search</span>
			</Link>

				
				<span  onClick={() => {Modal()}} className="material-symbols-sharp">add_circle</span>
				<span className="material-symbols-sharp">favorite</span>

			<Link to="/Perfil">
				<span id="user"className="material-icons">account_circle</span>
			</Link>
		</nav>
		<Outlet />
		</>
   	)


   }




export default Menu