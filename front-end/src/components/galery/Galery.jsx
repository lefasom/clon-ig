
import { useState, useEffect } from 'react'
import React from 'react'
import Axios from 'axios'

import Count from '../count/Count.jsx'
import Library_add from '../library_add/Library_add.jsx'
import Create_history from '../create_history/Create_history.jsx'
import Comment from './Comment.jsx'
import PERFIL_VACIO from '../../images/noLog/noLog.jpg'


import './galery.css'

function Galery(props) {
	var contador=0
	
	///////////////////////////////////////////////////////////////////// < MANEJO DE BOTONERA >	
	const [ clase, setClase ] = useState('albumGrid')
	const [ library, setLibrary ] = useState(false)
	const [ createHistory, setCreateHistory ] = useState(false)
	///////////////////////////////////////////////////////////////////// </ MANEJO DE BOTONERA >
	///////////////////////////////////////////////////////////////////// < DATOS DEL USUARIO LOGIADO >
	const [ usuario, setUsuario] = useState('')
	const [ photoUser, serPhotoUser ] = useState('')

	const [ userList, setUserList ] = useState([])

	const getUser = async () => {
		Axios.get(`http://localhost:3001/SelectUser/${props.id}`).then((response)=>{
			setUserList(response.data)
		})
		.catch((e)=>{
			console.log(e)
		})	
	}
	useEffect(() => {
		getUser()
		userList.map((val) => {
			setUsuario(val.user)
			serPhotoUser(val.photo)
		})
	})
	
	
	///////////////////////////////////////////////////////////////////// </ DATOS DEL USUARIO LOGIADO >
	///////////////////////////////////////////////////////////////////// < HISTORIAS DE USUARIO >
	const [ historias, setHistorias ] = useState([])
 	const getHistorias = () => {
	    Axios.get(`http://localhost:3001/Album/${props.id}`)
	    .then((response)=> {
	   		setHistorias(response.data)  
	    })
	    .catch((e)=>{
	    	console.log(e)
	    })
	}
	useEffect(() => { getHistorias() })
	const [ historiasName, setHistoriasName ] = useState([])
 	const getHistoriasName = () => {
	    Axios.get(`http://localhost:3001/Album/${props.name}`)
	    .then((response)=> {
	   		setHistoriasName(response.data)  
	    })
	    .catch((e)=>{
	    	console.log(e)
	    })
	}
	useEffect(() => { getHistoriasName() })
	///////////////////////////////////////////////////////////////////// </ HISTORIAS DE USUARIO >
	/////////////////////////////////////////////< MODAL COMENTARIOS > ///////////////////
	const [ modalClass, setModalClass ] = useState('modalSalir')
	const [ comment, setComment ] = useState([])
	const modalComentario = (idPhoto) => {
			Axios.get(`http://localhost:3001/Comment/${idPhoto}`).then((response) => {
				setComment(response.data)
			})
			.catch((e)=>{
				console.log(e)
			})	
	}
	const deleteComment = (id) => {
	    Axios.delete(`http://localhost:3001/deleteComment/${id}`).then((response) => {
	    	setComment(
	    comment.filter((val) => {
	        		return val.id != id;
	        	})
	      	);
	    });
	};
	/////////////////////////////////////////////</ MODAL COMENTARIOS > ///////////////////
	//////////////////////////////////////////////////////////////////// < BOTONERA >
if(props.id && props.name==null){
		if(library){
			return(	<>
				<div className="container-galery">
					<Count />	
					<div className="view">
						<button onClick={() => {
							setClase('albumGrid')
							setLibrary(false)
							setCreateHistory(false)
						}}>
							<span className="material-symbols-outlined">grid_on</span>
						</button>
						<button onClick={() => {
							setClase('albumOne')
							setLibrary(false)
							setCreateHistory(false)
						}}>
							<span className="material-symbols-outlined">crop_portrait</span>
						</button>
						<button onClick={() => {
							setLibrary(true)
							setCreateHistory(false)
						}}>
							<span className="material-symbols-outlined">library_add</span>
						</button>
						<button onClick={() => {
							setCreateHistory(true)
							setLibrary(false)
						}}>
							<span className="material-symbols-outlined">photo_library</span>
						</button>
						<button>
							<span className="material-symbols-outlined">account_box</span>
						</button>
					</div>
				    <div>
						<Library_add id={ props.id } />
					</div>
				</div>
			</>)
		}else if(createHistory){
			return(	<>
				<div className="container-galery">
					<Count />
					<div className="view">
						<button onClick={() => {
							setClase('albumGrid')
							setLibrary(false)
							setCreateHistory(false)
						}}><span className="material-symbols-outlined">grid_on</span></button>
						<button onClick={() => {
							setClase('albumOne')
							setLibrary(false)
							setCreateHistory(false)
						}}><span className="material-symbols-outlined">crop_portrait</span></button>
						<button onClick={() => {
							setLibrary(true)
							setCreateHistory(false)
						}}><span className="material-symbols-outlined">library_add</span></button>
						<button onClick={() => {
							setCreateHistory(true)
							setLibrary(false)
						}}><span className="material-symbols-outlined">photo_library</span></button>
						<button><span className="material-symbols-outlined">account_box</span></button>
					</div>
			      	<div>
						<Create_history id={ props.id } />
					</div>
				</div>
			</>)
		}else{
			return (
				<div className="container-galery">
					<Count />
					<div className="view">
						<button onClick={() => {
							setClase('albumGrid')
							setLibrary(false)
							setCreateHistory(false)
						}}><span className="material-symbols-outlined">grid_on</span></button>
						<button onClick={() => {
							setClase('albumOne')
							setLibrary(false)
							setCreateHistory(false)
						}}><span className="material-symbols-outlined">crop_portrait</span></button>
						<button onClick={() => {
							setLibrary(true)
							setCreateHistory(false)
						}}><span className="material-symbols-outlined">library_add</span></button>
						<button onClick={() => {
							setCreateHistory(true)
							setLibrary(false)
						}}><span className="material-symbols-outlined">photo_library</span></button>
						<button><span className="material-symbols-outlined">account_box</span></button>
					</div>

	{/*////////////////////////////////////////////////////// </ BOTONERA >*/}

	{/* ////////////////////////////////////////////////// < HISTORIAS Y COMENTARIOS >*/}
		        <div className={modalClass}>
		        	<button onClick={()=>{setModalClass('modalSalir')}}>
		        		<span className="material-symbols-outlined">
							arrow_back_ios
						</span>
		        	</button>
					<div  className='comment'>	
						{comment.map((val,index)=>{
								if (val.user == usuario) {
									return(
										<div className="flexComment" key={val.id}>
											<div className="img">
												<img src={val.avatar||PERFIL_VACIO} alt=""/>
											</div>
											<div className="colum">
												<h4 className="miH4">{val.user}</h4>
												<p>{val.comment}</p>
												
											</div>
											<div className="hora">
												<button onClick={() => 
													{deleteComment(val.id)}
												}>
													<span className="material-symbols-sharp">delete</span>
												</button>
											</div>
										</div>
									)
								}else{
									return(
										<div className="flexComment" key={val.id}>
											<div className="img">
												<img src={val.avatar||PERFIL_VACIO} alt=""/>
											</div>
											<div className="colum">
												<h4 className="h4">{val.user}</h4>
												<p>{val.comment}</p>
											</div>
										</div>
									)
								}
							
						})}
					</div>

		        </div>
		        <div className={clase}>
					{historias.map(( val, row ) => {
						if(val.state == 1 && clase == 'albumOne'){
							return(
								<section key={val.idPhoto} >
						 			<div className="flex">
										<div id="img">
											<img src={val.avatar || PERFIL_VACIO } alt={val.name}/>
										</div>
										<h3>{val.name}</h3>
									</div>
									<img src={val.photo} alt=""/>
								
									
									<div className="msj">
										<h3>{val.name}</h3>
										<h5>{val.meComment}</h5>
									</div>

									<Comment key={val.idPhoto} avatar={photoUser} idPhoto={val.idPhoto} usuario={usuario}/>
										
									
									<div className="comentarios" >
										<button onClick={()=>{
											setModalClass('modalComentario')
											modalComentario(val.idPhoto)
										}}>
											Ver los comentarios
										</button>
									</div>
								
							 	 									
								</section> 
							)
						}else if(val.state == 1){
							return(
								<section key={val.idPhoto} >
									<img src={val.photo} alt=""/>
								</section> 
							)
						}
					})}
				</div>
			</div>
		)
	}
 	 /////////////////////////////////////////</ HISTORIAS Y COMENTARIOS >
 	 /////////////////////////////////////////< Espectador de historias >

	}else if(props.name){
		

			return(	<>
				 <div className={modalClass}>
				<div className="border">
					<button onClick={()=>{setModalClass('modalSalir')}}>
		        		<span className="material-symbols-outlined">
							arrow_back_ios
						</span>
		        	</button>
				</div>
		        	

					<div  className='comment'>	
						{comment.map((val,index)=>{
								if (val.user == usuario) {
									return(
										<div className="flexComment"key={val.id} >
											<div className="img">
												<img src={val.avatar||PERFIL_VACIO} alt=""/>
											</div>
											<div className="colum">
												<h4 className="miH4">{val.user}</h4>
												<p>{val.comment}</p>
												<p id="time">{val.time}</p>
												
											</div>
											<div className="hora">
												<button onClick={() => 
													{deleteComment(val.id)}
												}>
													<span className="material-symbols-sharp">delete</span>
												</button>
											</div>
										</div>
									)
								}else{
									return(
										<div className="flexComment" key={val.id}>
											<div className="img">
												<img src={val.avatar||PERFIL_VACIO} alt=""/>
											</div>
											<div className="colum">
												<h4 className="h4">{val.user}</h4>
												<p>{val.comment}</p>
												<p id="time">{val.time}</p>
											</div>
										</div>
									)
								}
							
						})}
					</div>

		        </div>
					<div className="container-galery">
						<Count />	
						<div className="view">
							<button onClick={() => {
								setClase('albumGrid')
								setLibrary(false)
							}}><span className="material-symbols-outlined">grid_on</span></button>
							<button onClick={() => {
								setClase('albumOne')
								setLibrary(false)
							}}><span className="material-symbols-outlined">crop_portrait</span></button>
						</div>
					</div>
					 <div className={clase}>
					
					 	
					 
					{historiasName.map(( val, row ) => {
						if(val.state == 1 && clase == 'albumOne'){
							return(
								<section key={val.idPhoto} >
						 			<div className="flex">
										<div id="img">
											<img src={val.avatar || PERFIL_VACIO } alt={val.name}/>
										</div>
										<h3>{val.name}</h3>
									</div>
									<img src={val.photo} alt=""/>
									<div className="msj">
										<h3>{val.name}</h3>
										<h5>{val.meComment}</h5>
									</div>
									
							 	 	<Comment avatar={photoUser} idPhoto={val.idPhoto} usuario={usuario}/>

									<div className="comentarios" >
										<button onClick={()=>{
											setModalClass('modalComentario')
											modalComentario(val.idPhoto)
										}}>
											Ver los comentarios
										</button>
									</div>
														
								</section> 
							)
						}else if(val.state == 1){
							return(
								<section key={val.idPhoto} >
									<img src={val.photo} alt=""/>
								</section> 
							)
						}
					})}
					
				</div>


			</>)
 	 /////////////////////////////////////////</ Espectador de historias >
		
	}
}

export default Galery



