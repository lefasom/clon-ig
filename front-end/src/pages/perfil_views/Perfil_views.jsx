import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './Perfil_views.css'

import Licencia from '../../components/licencia/Licencia.jsx'
import Menu from '../../components/menu/Menu.jsx'
import MenuUpPerfil from '../../components/menuUpPerfil/MenuUpPerfil.jsx'

import Galery from '../../components/galery/Galery.jsx'

function Perfil_views() {



	
    const { idUser } = useParams()
	const id = localStorage.getItem('id')
	


	



	
	return (
		<>

			<Menu />
			<MenuUpPerfil name={ idUser } />
			<Licencia name={ idUser } />
			<Galery name={ idUser } id={id}/>


			
			<br/>
			<br/>
			<br/>

		</>
	)
}

export default Perfil_views