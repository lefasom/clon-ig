import Axios from 'axios'
import React from 'react'
import { useState } from 'react'

import './library_add.css'

function Library_add(props) {



const [ image, setImage ] = useState({})

const fileOnChange = (event) => {
  setImage(event.target.files[0])
 
}
const sendImage = () => {
  
	let formData = new FormData()
	const id = props.id || localStorage.getItem('id')

	formData.append('avatar', image)
	formData.append('id', id)// TENER EN CTA QUE SE lee con req.body.id
  



	fetch('http://localhost:3001/SaveImage',{
		method: 'post',
		body: formData,
	})
	.then((res) => res.text())
	.then((resBody) => {
		console.log(resBody)
	})
	.catch((error)=>{
		console.log(error)
	})

	    
}
	return (
		<div className="library_add-container">
			
				<input type="file" onChange={fileOnChange}/>
				<button onClick={()=>sendImage()}>Agregar al ALbum</button>
				


		</div>	
	)
}

export default Library_add