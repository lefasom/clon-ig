import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Axios from 'axios'

import { useState, useContext, useEffect } from 'react'

import UserContext from '../../context/UserContext.jsx'
import PERFIL_VACIO from '../../images/noLog/noLog.jpg'

import './chat.css'

function Chat() {


	const navigate = useNavigate()
	const { idUser } = useContext(UserContext)
	const { friend } = useParams()

	const [ message, setMessage ] = useState('')
	const [ mensaje, setMensaje ] = useState([])
	
    const send = () => {
        Axios.post("http://localhost:3001/CreateMessage",
        	{
			        idUser: idUser,
			        friend: friend,
			        message: message

          	}).then(() => {
            	setMensaje([
			    ...mensaje,{
					idUser: idUser,
			        friend: friend,
			        message: message
				},
         	]);
       	});
   }
	const [ msj, setMsj ] = useState([])

 	const getMsj = () => {
	    Axios.get(`http://localhost:3001/Message`)
	    .then((response)=> {
	   		setMsj(response.data)  
	    })
	    .catch((e)=>{
	    	console.log(e)
	    })
	}
	useEffect(() => { getMsj() })

	const deleteMsj = (id) => {
	    Axios.delete(`http://localhost:3001/deleteMessage/${id}`).then((response) => {
	    	setMsj(
	    msj.filter((val) => {
	        		return val.id != id;
	        	})
	      	);
	    });
	};
	const [ usuario, setUsuario] = useState('')
	const [ photoUser, serPhotoUser ] = useState('')

	const [ userList, setUserList ] = useState([])

	const getUser = async () => {
		Axios.get(`http://localhost:3001/SelectUser/${friend}`).then((response)=>{
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
	
	return(
		<div>
			<div className="barFriend">
				<button className="btn" onClick={()=>{
					navigate(-1)
				}}>
					<span className="material-symbols-outlined">
						arrow_back_ios
					</span>
				</button>
				<img src={photoUser || PERFIL_VACIO} alt=""/>
				<h4>{usuario}</h4>
			</div>
			<div className="acoto">
				
			
			{msj.map((val)=>{
				if((val.idUser==idUser && val.friend==friend )||
					(val.idUser==friend && val.friend==idUser ) ){
					if(val.idUser==idUser){
					    return(
							<div key={val.id} className="message">
								<div className="me">
									<p>{val.message}</p>
								
									<button onClick={() => 
										{deleteMsj(val.id)}
									}>
										<span className="material-symbols-sharp">delete</span>
									</button>
								</div>
							</div>
						)
					}else{
					    return(	
							<div key={val.id} className="messageFriend">	
								<div className="myFriend">
									<img src={photoUser||PERFIL_VACIO} alt=""/>
									<p>{val.message}</p>
								</div>
							</div>
						)
					}	
				}
			})}
			</div>
						<form className="send" onSubmit={(event)=>{
							event.preventDefault()
							send()
						}}>
							<input type="text" name="" id="" placeholder="Enviar mensaje..." onChange={(event)=>{
								setMessage(event.target.value)
							}}/>
							
							<div>
								<button>
									<span className="material-symbols-outlined">imagesmode</span>
								</button>
								<button>
									<span className="material-symbols-outlined">favorite</span>
								</button>
							</div>
							
						</form>
			
					
			
	    </div>


	    )
	
 }

export default Chat


