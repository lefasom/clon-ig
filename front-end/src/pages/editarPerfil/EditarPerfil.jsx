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

import { useParams } from 'react-router-dom'
import './editarPerfil.css'
import React, { useState, useEffect, useContext} from 'react'
import { Link, Outlet, useNavigate} from 'react-router-dom'
import Axios from 'axios'

import Menu from '../../components/menu/Menu.jsx'


function EditarPerfil() {

	const [ userList, setUserList ] = useState([])
	const { idUser } = useParams()
	//////////////////////////////////////////////////////////////////////////////////
	const [ image, setImage ] = useState({})

	const fileOnChange = (event) => {
	  setImage(event.target.files[0])
	 
	}
	const sendImage = () => {
	  
		let formData = new FormData()

		formData.append('avatar', image)
		formData.append('id', idUser)// TENER EN CTA QUE SE lee con req.body.id
	  
		const id = idUser || localStorage.getItem('id')



		fetch('http://localhost:3001/PerfilUpdatePhoto',{
			method: 'put',
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

	///////////////////////////////////////////////

		const navigate = useNavigate()
		const [ cP, setCP ] = useState('cPHidden')

			
		const getUser = () => {
			 Axios.get(`http://localhost:3001/SelectUser/${idUser}`)
			.then((response)=>{
				setUserList(response.data)
			}).catch((e)=>{
				console.log(e)
			})
			
		}
	
		useEffect(() => {
			getUser()
		}, [userList])
	
/////////////////////////////////////////////////////
	const [ nombre, setNombre ] = useState('')
	const [ apellido, setApellido ] = useState('')
	const [ nombreDeUsuario, setNombreDeUsuario ] = useState('')
	const [ data, setData ] = useState([])
	
	const updateDate = (id) => {
	    Axios.put("http://localhost:3001/updateDate", { nombre: nombre, apellido: apellido, nombreDeUsuario: nombreDeUsuario, id: id })
	    .then((response) => {      
	        setData(
	            data.map((val) => {
	              return val.id == id
	                ? {
	                    id: val.id,
	                    nombre: nombre,
	                    apellido: apellido,
	                    nombreDeUsuario: nombreDeUsuario,
	                  }
	                : val
	            })
	        )
	    })
	    .catch((e)=>{
	    	console.log(e)
	    })
	}
	return (
		<>
			<Menu />
			<div className={cP}>
			{userList.map((val)=>{
					return(
						<form key={val.id}>
							<input type="file" onChange={fileOnChange}/>
							<div>
							<button onClick={(e)=>{
								e.preventDefault()
								setCP('cPHidden')
							}}>Cancelar</button>
							<button onClick={(e)=>{
								sendImage()
								e.preventDefault()
								setCP('cPHidden')

							}}
							>Modificar</button>
							</div>
						</form>
					)
				})}
			
			</div>
			<nav className="container-menuUpPerfil">
					<button className="btn" onClick={()=>{
						navigate(-1)
					}}>
						<span className="material-symbols-outlined">
							arrow_back_ios
						</span>
					</button>
					<div>
						
					</div>
					<Link to="/">
						<span className="material-symbols-sharp">Logout</span>
					</Link>	
				</nav>
				<Outlet />
				{userList.map((val)=>{
					return(
						<div key={val.idUser} className="cambiarFoto">
							<div>
								<img src={val.photo||PERFIL_VACIO} alt=""/>
							</div>
							<div className="button">
								<h4>{val.user}</h4>
								<button onClick={()=>{setCP('cP')}}>Cambiar foto del perfil</button>	
							</div>
						</div>
						)
				})}
			
			{userList.map((val)=>{
				return(<div key={val.idUser}>
						<div className="nombre">
				<h4>Nombre</h4>
				<input onChange={(e)=>{
					if(e.target.value==''){
						setNombre(e.target.value || val.name)
					}else{
						setNombre(e.target.value || val.name)
					}
				}} type="text" placeholder={val.name}/>	
				<h4>Apellido</h4>
				<input onChange={(e)=>{
					setApellido(e.target.value || val.surname)
				}} type="text" placeholder={val.surname}/>
				<p>Para ayudar a que las personas descubran tu cuenta,
				 usa el nombre por el que te conoce la gente,
				 ya sea tu nombre completo, apodo o nombre comercial.
				</p>
				<p>
				Solo puedes cambiar tu nombre dos veces en un plazo de 14 días.
				</p>
			</div>
			<div className="nombreDeUsuario">
				<h4>Nombre de usuario</h4>
				<input onChange={(e)=>{
					setNombreDeUsuario(e.target.value || val.user)
				}} type="text" placeholder={val.user}/>	
				<p> En la mayoría de los casos, podrás volver 
					a cambiar tu nombre de usuario a sombra_leo
				    dentro de 14 días más. 
				</p>
				<button>
				Mas informacion
				</button>
			</div>
			<div className="sitioWeb">
				<h4>Sitio web</h4>
				<input type="text" placeholder="Sitio web"/>	
			</div>
			<div className="biografia">
				<h4>Biografia</h4>
				<input type="text" />
				<p>0/150</p>
			</div>
			<div className="informacionPersonal">
				<h4>informacion personal</h4>
				<p> 
					Proporciona tu información personal,
				 	incluso si la cuenta se usa para un negocio, una mascota,
				 	etc. Esta información no se incluirá en tu perfil público.
				</p>
			</div>
			<div className="sitioWeb">
				<h4>Correo electronico</h4>
				<input type="text" name="" id="" placeholder={val.mail}/>
			</div>
			<div className="sitioWeb">
				<h4>Numero de telefono</h4>
				<input type="text" name="" id="" placeholder={val.tel}/>
			</div>	
			<div className="sitioWeb">
				<h4>sexo</h4>
				<input type="text" name="" id="" placeholder="Prefiero no decirlo"/>
			</div>

			
				
			<div className="sugerencias">
				<h4>Sugerencias de cuentas similares</h4>
				<p>
					Incluye tu cuenta cuando recomiendes cuentas
					similares que a otras personas les puedan
					interesar seguir.
				</p>
			</div>	
			<div className="enviar">
				<button onClick={()=>{
					updateDate(val.id)
						navigate(-1)

				}} className="btn1"> 
					Enviar
				</button>
				<button className="btn2">
					Desactivar mi cuenta temporalmente
				</button>

			</div>
					</div>)
			})}
			
		
		</>
	)
}

export default EditarPerfil