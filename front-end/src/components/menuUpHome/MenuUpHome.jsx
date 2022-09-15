import React from 'react'
import logo from'../../images/logo/logoinstagram.png'
import './menuUpHome.css'

function MenuUpHome() {
	return (
	
			
	<nav className="container-menuUpHome">	
		<div className="search">
			<span className="material-symbols-outlined">photo_camera</span>
		</div>
		<img src={logo} />
		<div className="search">
		   		<span className="material-symbols-outlined">send</span>
		</div>
	</nav>	
		
	)
}

export default MenuUpHome