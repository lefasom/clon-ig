import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './search.css'
import Axios from 'axios'
import Menu from '../../components/menu/Menu.jsx'
function Search() {
	const navigate = useNavigate()
	const [ album, setAlbum ] = useState([])

	const getAlbum = () => {
		Axios.get('http://localhost:3001/Album').then((response)=>{
			setAlbum(response.data)
		}).catch((error)=>{
			console.error(error)
		})
	}
	useEffect(() => {
		getAlbum()
	}, [])

	 const deleteimg = (id) => {
        Axios.delete(`http://localhost:3001/deleteHistory/${id}`).then((response) => {
          setAlbum(
         album.filter((val) => {
              return val.id != id;
            })
          )
        })
        .catch((e)=>{
        	console.log(e)
        })
    }

    const verImg = (id) => {
    	alert(id)
    }
	return (
		<div>
		<Menu />
			<div className="searchis">
				<input placeholder="Buscar" type="text"/>
			</div>
			<div className="muro">
				
			
			{album.map((val)=>{
				return(
					
						<img onClick={()=>{navigate(`/Historia/${val.idPhoto}`)}} key={val.id} src={val.photo} alt="" />
					
					)
			})}	
			</div>
		</div>
	)
}

export default Search