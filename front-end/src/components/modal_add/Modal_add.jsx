import React, { useState } from 'react'
import Axios from 'axios'
import './modalAdd.css'

function Modal_add() {
	const [ meComment, setMeComment] = useState('')
	const [ photo, setPhoto ] = useState('')
	const [ historias, setHistorias ] = useState([])

 	const idAlbum = localStorage.getItem('idUser')

	const subirHistoria = () => {

     event.preventDefault();

  
            Axios.post("http://localhost:3001/UpAlbum", {
                idAlbum : idAlbum,
                photo : photo,
                meComment : meComment
                                 
          }).then(() => {
            setHistorias([
              ...historias,
              {
          		idAlbum : idAlbum,
                photo : photo,
                meComment : meComment
                                 
              },
            ]);
          });


	}


	return (
		<div className='modal_add-container'>
			<form>
				<input
	          type="text" 
	          placeholder="Url"
	          onChange={(event) => {

	            setPhoto(event.target.value)
	    
	          }}/>
	          <input 
	          type="text" 
	          placeholder="Algo que decir..."
	          onChange={(event) => {

	            setMeComment(event.target.value)
	    
	          }}
	          />
					<button onClick={subirHistoria}>Subir Historia</button>
					<br />

			</form>	
		</div>
	)
}

export default Modal_add