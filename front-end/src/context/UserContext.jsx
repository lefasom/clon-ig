import React from 'react'
import { createContext, useState } from 'react'

const Context = createContext({})

export function UserContextProvider({children}){

	const [ idUser, setIdUser] = useState([])
	



return <Context.Provider value={{idUser,setIdUser}}>
	
	{children}

</Context.Provider>

}


export default Context