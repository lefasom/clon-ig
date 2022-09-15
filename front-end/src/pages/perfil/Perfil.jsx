import './perfil.css'

import React from 'react'
import { useState, useContext, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import Licencia from '../../components/licencia/Licencia.jsx'
import Menu from '../../components/menu/Menu.jsx'
import MenuUpPerfil from '../../components/menuUpPerfil/MenuUpPerfil.jsx'

import Galery from '../../components/galery/Galery.jsx'

import UserContext from '../../context/UserContext.jsx'


function Perfil() {	
    	const  { id } = useParams() 
    	const Navigate = useNavigate()
		const { idUser, setIdUser } = useContext(UserContext)
		useEffect(() => {

			if( id != null ){ 
				localStorage.setItem('id',id)
				setIdUser(id) 
			}//este me molestaba con q no se podia renderisar una modificacion de contexto dento de un provider
			if(id == undefined && idUser==''){ Navigate('/')}//si no esta dento de en un useEffect no funciona debido a que tiene q ejecutase cada ves q la pagina se actualiza de ahi los [corchetes]

		}, [])

	return (
		<>
		
			<Menu />
			<MenuUpPerfil id={ id || idUser } />
			<Licencia id={ id || idUser } />
			<Galery id={ id || idUser }  />	
			<br/>
			<br/>
			<br/>

		</>
	)
}

export default Perfil