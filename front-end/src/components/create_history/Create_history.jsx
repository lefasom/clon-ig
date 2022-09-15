import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import './create_history.css'

function Create_history(props) {



/////////////////////////////////////////////// < DATOS DE USUARIO >

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
	


	const [historias, setHistorias] = useState([])
 	const getHistorias = () => {
	    Axios.get(`http://localhost:3001/Album/${props.id}`).then((response)=> {
	   		setHistorias(response.data)  
	    })
	    .catch((e)=>{
	    	console.log(e)
	    })
	}
	 useEffect(() => {
	 		getHistorias() // NO SE LE PONO EL CORCHETE POR QUE QUEREMOS QUE SE ACTUALIZE EN CADA CAMBIO DE ESTADO
	 	
	 })
/////////////////////////////////////////////// </ DATOS DE USUARIO >


/////////////////////////////////////////////// < BORRAR HISTORIA > 
    const deleteimg = (id) => {
        Axios.delete(`http://localhost:3001/deleteHistory/${id}`).then((response) => {
          setHistorias(
         historias.filter((val) => {
              return val.id != id;
            })
          )
        })
        .catch((e)=>{
        	console.log(e)
        })
    }
/////////////////////////////////////////////// </ BORRAR HISTORIA > 


/////////////////////////////////////////////// < MODIFICAR HISTORIAS >  
	const [ name, setName ] = useState('')
	const [ avatar, setAvatar ] = useState('')
	const [ mecomment, setMeComment ] = useState('')

	useEffect(() => {
		userList.map((val) => {
			setName(val.user)
			setAvatar(val.photo)
		})
	})
	const [ modificarHis, setModificarHis ] = useState([])

	const updateAlbum = (id) => {
	    Axios.put("http://localhost:3001/updateAlbum", { mecomment: mecomment, name: name, avatar: avatar, id: id })
	    .then((response) => {      
	        setModificarHis(
	            modificarHis.map((val) => {
	              return val.id == id
	                ? {
	                    id: val.id,
	                    mecomment: mecomment,
	                    name: name,
	                    avatar: avatar
	                  }
	                : val
	            })
	        )
	    })
	    .catch((e)=>{
	    	console.log(e)
	    })
	}
/////////////////////////////////////////////// </ MODIFICAR HISTORIAS >  
/////////////////////////////////////////////// < MODIFICAR ESTADO DE HISTORIA >
	const [ publica, setPublica ] = useState([])
	const [ state, setState ] = useState(false)

    const publicar = (id) => {
	    Axios.put("http://localhost:3001/publicarAlbum", {state: state, id: id })
	    .then((response) => {    
	        setPublica(
	           publica.map((val) => {
	              return val.id == id
	                ? {
	                    id: val.id,
	                    state: state,
	                  }
	                : val
	            })
	        )
	    })
  	}
/////////////////////////////////////////////// </ MODIFICAR ESTADO DE HISTORIA >

	return (
		<div  className="create_history-container">
			
				<h1>Edita tus Historias</h1>

				<div className="detail"> Privado <div id="v0"></div> | Publico <div id="v1"></div></div>
				{historias.map((val, index) =>{
					return(
						<div key={val.idPhoto}>	
							<div className={'v'+val.state}></div>
							<h4>{val.meComment || 'Animate!! Publica'} </h4>
							<input type="text"  placeholder="Has una historia..." onChange={(event) =>{
								setMeComment(event.target.value)
							}}/>
						
							<img src={val.photo} alt="" />
							<div>
								<button onClick={() => {deleteimg(val.id)} }> 
									Borrar 		
						        </button>	

								<button onClick={() => {updateAlbum(val.id)} }> 
									Modificar 		
						        </button>
						        <button onClick={() => {
						        	setState(!state)
						        	publicar(val.id)
						        }}> 
									Estado		
						        </button>
							</div>
						</div>
					)
					
				})}
		</div>
	)
}

export default Create_history