import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './home.css'
import { useNavigate } from 'react-router-dom'

import Menu from '../../components/menu/Menu.jsx'
import MenuUpHome from '../../components/menuUpHome/MenuUpHome.jsx'


function Home() {
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

	const [ comentario, setComentario ] = useState('')
	const [ love, setLove ] = useState([])


	const [ historias, setHistorias ] = useState([])
	const [ userList, setUserList ] = useState([])
	const [ comment, setComment ] = useState([])

	const idUser = localStorage.getItem('idUser')
	const usuario = localStorage.getItem('user')



		//    historias 
		useEffect(() => {
		  const getHistorias = () => {
	        Axios.get("http://localhost:3001/Album").then((response) => {
	          setHistorias(response.data)
	        })
	     }
	    getHistorias()
		}, [])
	  


	   // usuarios

	   useEffect(() => {
	   				const getUser = () => {

				Axios.get("http://localhost:3001/Login").then((response) => {
						setUserList(response.data)
					})
			}
			getUser()
	   }, [])



  
		// comentarios
		 useEffect(() => {
			const getComment = () => {

				Axios.get("http://localhost:3001/Comment").then((response) => {
						setComment(response.data)
					})
			}
			getComment()
	  }, [])

	 const Comentar = (idPhoto) => {


            Axios.post("http://localhost:3001/CreateComment", {

	            idComment: idPhoto,

	            comment: comentario,

	            user: usuario
              
          }).then(() => {
            setComment([
              ...comment,
              {
    			idComment: idPhoto,

	            comment: comentario,

	            user: usuario

              },
            ]);
          });

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

 //                                 LOVE

useEffect(() => {

	const getLove = () => {

				Axios.get("http://localhost:3001/Love").then((response) => {
						setComment(response.data)
					})
			}
	getLove()

}, [])



  // const love = (id) => {

  //   Axios.put("http://localhost:3001/LikeComment", {love: love, id: id }).then((response) => {
           
  //       setComment(

  //          comment.map((val) => {

  //             return val.id == id
  //               ? {
  //                   id: val.id,
  //                   love: love,
  //                 }
  //               : val;
  //           })

  //       );

  //   });
    
  // };
		// navigate
			const Navigate = useNavigate()

			const nav = (name) => {
					Navigate(`/Perfil/views/${name}`)
			}
			


	return (
	  <>	
	  	<Menu />
			<MenuUpHome />
			<div className="container-bottom">
		 		<div className="history scroll">
					<div className="flex">
						{userList.map((val,key)=>(
		 				  <div key={key}className="perfil">
		 						<div className="img">
		 					    <img src={val.photo || PERFIL_VACIO } alt="" />
		 						</div>
		 						<button  onClick={() => {nav(val.idUser)}}><h3>{val.user}</h3></button>
		 				  </div>
		 			  ))}
		 			</div>
		 		</div> 
			</div>
		</>
		// <>


			

			
		// 		<div className="container-bottom">
				
				

		// 			<div className="history scroll">
		// 				<div className="flex">
		// 					{userList.map((val,key)=>(
		// 				    <div key={key}className="perfil">

		// 								<div className="img">
		// 					    		<img src={val.photo} alt="" />
		// 								</div>
		// 								<button  onClick={() => {nav(val.idUser)}}><h3>{val.user}</h3></button>

		// 				    </div>
		// 			  	))}
		// 				</div>
		// 			</div> 

		// 	{historias.map((val,key) =>{
		// 	if(val.state==1){
		// 		return(
		// 		<div className="history" key={key}>


		// 			<div className="perfil">
		// 			    <div className="img">
		// 			  		<img src={val.avatar} alt="" />
		// 				</div>

		// 			{userList.map((vala,key)=>{
		// 						if(val.idAlbum==vala.idUser){

		// 							return(
		// 		           			<>
		// 								<button 
		// 								key={key}
		// 								onClick={() => {nav(vala.user)}}>
		// 								<h1>{val.name}</h1>
		// 								</button>
		// 							</>
		// 								)


		// 						}
		// 			})}



					
						
		// 			</div>
																			
		// 			<img src={val.photo} alt=""/>

									
					
						
		// 		     			   <div class="left">
				     			
		// 	           {love.map((valc)=>{
			          
			           	
		// 	           				console.log('bika')
			           
				     			   	

		// 				})}
				     			   
		// 								<div className="comment">	
		// 								    <input
		// 								    type="text" 
		// 								    placeholder="Comentario..."
		// 								   	onChange={(event) => {
	 //            							setComentario(event.target.value)
	 //          						}}
		// 								    />
		// 								    <button onClick={() => {Comentar(val.idPhoto)}}>
		// 											<span class="material-symbols-sharp">send</span>
		// 								    </button>
		// 								</div>	
											
										
												
		// 							</div>

		// 							<div className="history-content">

		// 					        	<div className="msj">
		// 											<h3>{val.name}</h3>
		// 											<h5>{val.meComment}</h5>
		// 								</div>
		// 				 {comment.map((valb,key)=>{

		// 					if (val.idPhoto==valb.idComment) {
		// 						if (valb.user == usuario) {
		// 						return(<>
		// 							<div key={key}>
		// 								   <div className="flex">
		// 										<h4>{valb.user}</h4>
		// 										<p>{valb.comment}</p>
		// 										<button onClick={() => {deleteComment(valb.id)}}>
		// 											<span class="material-symbols-sharp">delete</span>
		// 										</button>
		// 									</div>
		// 									<div className="hora">
		// 										<p>{valb.time}</p>
		// 									</div>
		// 							</div>
		// 							</>)


		// 						}else{
		// 							return(<>
		// 							<div>
		// 								   <div className="flex">
		// 										<h4>{valb.user}</h4>
		// 										<p>{valb.comment}</p>
												
		// 									</div>
		// 									<div className="hora">
		// 										<p>{valb.time}</p>
		// 									</div>
		// 							</div>
				
		// 						</>)

		// 						}

		// 					return(<>
		// 						<div>
		// 							   <div className="flex">
		// 									<h4>{valb.user}</h4>
		// 									<p>{valb.comment}</p>
		// 									<button onClick={() => {deleteComment(valb.id)}}>
		// 										<span class="material-symbols-sharp">delete</span>
		// 									</button>
		// 								</div>
		// 								<div className="hora">
		// 									<p>{valb.time}</p>
		// 								</div>
										
										
		// 						</div>
										
							     	


		// 						</>)
						
		// 					}

		// 				})}	

		// 						</div>			
		// 		</div>				

		// 	)	
		// 	}})} 

				  
				 

				 
		// 		</div>
		// 		<br/>
		// 		<br/>
		// 		<br/>
		
		// </>
	
	)
}

export default Home