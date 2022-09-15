import React,{ useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import Menu from '../../components/menu/Menu.jsx'
import './historia.css'

function Historia() {
	const navigate = useNavigate()
	const { idPhoto } = useParams()

	const [ historia, setHistoria ] = useState([])
 	const getHistoria = () => {
	    Axios.get(`http://localhost:3001/Historia/${idPhoto}`)
	    .then((response)=> {
	   		setHistoria(response.data)  
	    })
	    .catch((e)=>{
	    	console.log(e)
	    })
	}
	useEffect(() => { getHistoria()},[])

	return (<>
		<Menu />
		<div className="barFriend">
				<button className="btn" onClick={()=>{
					navigate(-1)
				}}>
					<span className="material-symbols-outlined">
						arrow_back_ios
					</span>
				</button>
					<h4>Explorar</h4>
		</div>
			<div className="albumOne">
					{historia.map(( val, row ) => {
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
									{/*}
									<Comment key={val.idPhoto} avatar={photoUser} idPhoto={val.idPhoto} usuario={usuario}/>
									{*/}	
									
									<div className="comentarios" >
										<button onClick={()=>{
											// setModalClass('modalComentario')
											// modalComentario(val.idPhoto)
										}}>
											Ver los comentarios
										</button>
									</div>
								
							 	 									
								</section> 
							)
					})}
			</div>
	</>)
}

export default Historia