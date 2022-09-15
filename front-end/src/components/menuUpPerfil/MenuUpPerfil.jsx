import React, { useState, useEffect, useContext} from 'react'
import { Link, Outlet} from 'react-router-dom'
import Axios from 'axios'
import './menuUpPerfil.css'

import UserContext from '../../context/UserContext.jsx'


function MenuUpPerfil(props) {

		const [ userList, setUserList ] = useState([])
			
		const getUser = () => {
			 Axios.get(`http://localhost:3001/SelectUser/${props.id}`)
			.then((response)=>{
				setUserList(response.data)
			}).catch((e)=>{
				console.log(e)
			})
			
		}
	
		useEffect(() => {
			getUser()
		}, [])


	
	if(props.id){	

		return (
			<>
				<nav className="container-menuUpPerfil">
					<Link to="">
						<span className="material-symbols-sharp">person_add</span>
					</Link>
					<div>
						<h4>{userList.map((val)=>val.user)}</h4>
						<Link className="Link" to="">
							<span className="material-symbols-sharp">expand_more</span>
						</Link>	
					</div>
					<Link to="/">
						<span className="material-symbols-sharp">Logout</span>
					</Link>	
				</nav>
				<Outlet />
			</>
		)
	}else if(props.name){

		const [ viewList, setViewList ] = useState([])

		const getView = () => {
			Axios.get(`http://localhost:3001/SelectView/${props.name}`)
			.then((response)=>{
				setViewList(response.data)	
			})
			.catch((e)=>{
				console.log(e)
			})
		}
		useEffect(() => {
			getView()
		}, [])

	
		return (
			<>
				<nav className="container-menuUpPerfil">
				
					<Link to="/Home">
						<span className="material-symbols-outlined">
							arrow_back_ios
						</span>
					</Link>	
					<div>
						<h4>{viewList.map((val)=>val.user)}</h4>
					</div>
				</nav>
				<Outlet />
			</>
		)
	}
}

export default MenuUpPerfil