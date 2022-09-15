import React, { useState, useEffect } from 'react'
import Axios from 'axios'

function Comment(props) {
///////////////////////////////////////////////////////////////////// < DATOS DEL USUARIO LOGIADO >
	
	
///////////////////////////////////////////////////////////////////// </ DATOS DEL USUARIO LOGIADO >
///////////////////////////////////////////////////////////////////// < COMENTARIOS DE USUARIO >
	

	const [ comment, setComment ] = useState([])
	const [ comentario, setComentario ] = useState('')
	
    const Comentar = (idPhoto) => {
        Axios.post("http://localhost:3001/CreateComment",
        	{
		        idComment: idPhoto,
		        comment: comentario,
		        user: props.usuario,
		        avatar: props.avatar
          	}).then(() => {
            	setComment([
			    ...comment,{
					idComment: idPhoto,
					comment: comentario,
					user: props.usuario,
					avatar: props.avatar
				},
         	]);
       	});
   }
   
///////////////////////////////////////////////////////////////////// </ COMENTARIOS DE USUARIO >

	return (
		<>
		<div>	
			<input
			type="text" 
			placeholder="Comentario..."
			onChange={(event) => {
            	setComentario(event.target.value)
          	}}
			/>
			<button id="publicar" onClick={() => 
				{Comentar(props.idPhoto)}
			}>
				Publicar
			</button>
		</div>	
	</>
	)
}

export default Comment