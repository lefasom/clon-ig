const PERFIL_VACIO =`data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFR
		AWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N
		zc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHwAxQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//E
		ADIQAQACAQIEAwYDCQAAAAAAAAABAgMEEQUSITFBUWE0QnGCscETMtEUIiQzUnKBkaH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgMBBP/
		EAB4RAQEBAAICAwEAAAAAAAAAAAABAhExA0ETIVES/9oADAMBAAIRAxEAPwD6IA9LIAAAAAAAAN27TaXNqZ2x16R3t4QlMHCMVY3zWt
		efKOkJupHZOUKyil5jeKW2+Cy49LgxbcmKkeu3Vq4jTPfBNdNPX3ojvMI+RX8q6PZiYmYnpMeEvGqAAAAAAAAAAAAAAAAAAB08P0v7V
		m2nfkr1tP2cyb4FH8NefGb/AGTq8R2dpClK46RWldqx2iGQMGgADh4hoa6ik3rERliOk+fogNpiZid94nad1tVzikRXXZYiO+0/8aeO
		+k6jlAaoAAAAAAAAAAAAAAAAE5wT2P55Qad4L7F80o30rPaQAYrAAJV7i/t+T4R9FhV7i/t+T4QvHbmunGA2ZgAAAAAAAAAAAAAAAPJ
		8Vp00VjBj5YiImsT0j0VdYeFZq5dJSIn96kcto8mfk6Vl2AMlgACG49WsXwzERzTvvPn2TKB4zmrk1UVrO8UjafirHbmunAA3ZgAAAA
		AAAAAAAAAAACS4Hk5c96TP5q7xHwRrPDlthyVyUna1U6nMdi1DXp8sZsNMkRtzRvs2MGgADDLeMeO17dIrG8qta03ta897TMpnjWeaY
		64a+/1mfTyQrXxz6RqgDRIAAAAAAAAAAAAAAAASJHguKL6i17RExWOm8eMuW8R2JbSRy6XFXypH0bjsPO0AAQvHf5uL+2UYsmvwxl0m
		SvLE2iszXp4q3H0bYv0jQAtIAAAAAAAAAAAADPFiy5rcuKk2n0BgypW2S3LSs2t5RCU03CO1tRb5a/qk8WHHhry4qRWPRF3PSplD4OE
		5b9c1opHlHWUtpdNTTY+TH27zM95bYes7q1XAAl0AB5sjNTwil5m2G80nvtPWEoOy2dFnKtZ9HnwfnxzNf6q9Yc62TEOTUcO0+beYry
		Wn3qrnk/U3KvDt1PDdRh3mkfiU847/AOnF57tJZU8ADrgAAAAAABPYHbw/QTqZ/Eyb1xdvWycw4qYa8uOsVr5Qx0lYrpsUR25YbmGrz
		WkgAl0AAAAAAAAAAcmt0OLU1mdork8Lx93W8k6FVyUthyTjyRtavdikuOUrGfHaI62rO/8AhGvRm8xnQB1wAB//2Q==`;
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './licencia.css'

function Licencia(props) {
    const navigate = useNavigate()


if(props.id){
		const [ userList, setUserList ] = useState([])

		const getUser =() => {
			Axios.get(`http://localhost:3001/SelectUser/${props.id}`).then((response)=>{
				setUserList(response.data)
			})
			.catch((e)=>{
				console.log(e)
			})	
		}
		useEffect(() => {getUser()},[])

		return(<>	
			
			{userList.map((val,index)=>{
				return(
					<div className="container-licencia" key={val.id}>
						<div className="licencia">
							<div className="licencia-Left">
								<div id="img">
									<img  src={val.photo || PERFIL_VACIO } alt={val.user} />
								</div>	
							    <h4>{val.name} {val.surname}</h4>		
							</div>
							<div className="licencia-right">
								<div id="user">
									<h1>{val.user}</h1>
									<Link to="">
										<span className="material-symbols-sharp">settings</span>
									</Link>
								</div>
								<button  onClick={()=>{
									navigate(`/EditarPerfil/${val.idUser}`)
								}}>Editar perfil</button>
							</div>
						</div>
					</div>	
				)
			})}
		</>)
		
}else if(props.name){

		const [ userListName, setUserListName ] = useState([])
		

		const getUserName = async () => {
			Axios.get(`http://localhost:3001/SelectUser/${props.name}`).then((response)=>{
				setUserListName(response.data)
			})
			.catch((e)=>{
				console.log(e)
			})	
		}
		useEffect(() => {getUserName()},[])
		

		return(
			<>
		
					
			{userListName.map((val,index)=>{
				return(
					<div className="container-licencia" key={index}>
						<div className="licencia">
							<div className="licencia-Left">
								<div id="img">
									<img  src={val.photo || PERFIL_VACIO } alt={val.user} />
								</div>	
							    <h4>{val.name} {val.surname}</h4>		
							</div>
							<div className="licencia-right">
								<div id="user">
									<h1>{val.user}</h1>
								</div>
								<div className="flex">
									<button onClick={()=>{
										navigate(`/Chat/${val.idUser}`)
									}}>
											Mensaje
									</button>
									
									<button onClick={()=>{
								
										alert('Ahora sigues a :'+val.user)
									}} className="buttonBlue">
											Seguir
									</button>
								</div>	
							</div>
						</div>
					</div>	
				)
			})}
		</>)
		
		
	// }else{
	// 	return (
	// 		<div className="container-licencia">
	// 				<div className="licencia">
	// 					<div className="licencia-Left">
	// 						<div id="img">
						
							
	// 							{/*<span id="user"class="material-icons">account_circle</span>*/}
						
	// 							<img  src={photo} alt="" />
							
								
							
	// 						</div>
	// 				        <h4>{name} {surname}</h4>		

	// 					</div>
	// 					<div className="licencia-right">
	// 						<div>
	// 							<h1>{user}</h1>
	// 							<Link to="">
	// 								<span id="user"class="material-symbols-sharp">settings</span>
	// 							</Link>
	// 						</div>
	// 					<button>Enviar Mensaje</button><button>Seguir</button>

	// 					</div>
	// 				</div>
	// 			</div>	
	// 	)
	// }


}
}

export default Licencia