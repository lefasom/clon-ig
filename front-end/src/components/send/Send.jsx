import React,{ useState } from 'react'
import Axios from 'axios'

function Send(props) {

	const [msj, setMsj] = useState('')
    const [message, setMessage] = useState([])	

	const getMessage = () => {
	    Axios.get("http://localhost:3001/Message").then((response) => {
	         setMessage(response.data)
	    })
    }
	getMessage()

		const send = () => {
	

	    Axios.post("http://localhost:3001/createMessage", {
	      user: props.name,
	      msj: msj,
	      cluster: props.cluster

	    }).then(() => {
	      setMessage([
	        ...message,
	        {
	          user: props.name,
		      msj: msj,
		      cluster: props.cluster

	        },
	      ]);
	     });
	   
    };
	return (
		<div id="send">

         				
						<input 
						type="text" 
						placeholder="Escribir..." 
						id="message"
		  				onChange={(event) => {
	                

       					setMsj(event.target.value);
       			

         				}}/>
         				
						<button
						onClick={send}
						>
							<span class="material-symbols-outlined">send</span>
						</button>
					</div>
	)
}

export default Send