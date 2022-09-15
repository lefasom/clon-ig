import React from 'react'
import {createContext} from 'react'


const Context = createContext({
	idUser:"NO LOGEADO - sin idUser",
	user: "NO LOGEADO - sin user",
	username: "NO LOGEADO - sin username",
	surname: "NO LOGEADO - sin surname"
})
export default Context 