import { BrowserRouter, Routes, Route } from "react-router-dom"


import Layout from "./Layout.jsx";
import SectionOff from "./SectionOff.jsx";
import Chat from '../pages/chat/Chat.jsx'
import EditarPerfil from '../pages/editarPerfil/EditarPerfil.jsx'
import Login from '../pages/login/Login.jsx'
import Logout from '../pages/logout/Logout.jsx'
import NewUser from '../pages/newUser/NewUser.jsx'
import Search from '../pages/search/Search.jsx'
import Historia from '../pages/historia/Historia.jsx'


import Home from '../pages/home/Home.jsx'
import Perfil from '../pages/perfil/Perfil.jsx'
import Perfil_views from '../pages/perfil_views/Perfil_views.jsx'

import { UserContextProvider } from '../context/UserContext'







const Router = () => {

  

  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path="/Perfil/:id" element={<Perfil/>}></Route>
            <Route path="/Home" element={<Home />}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/EditarPerfil/:idUser" element={<EditarPerfil />}></Route>
            <Route path="/Perfil/views/:idUser" element={<Perfil_views/>}></Route>
            <Route path="/Chat/:friend" element={<Chat/>}></Route>
            <Route path="/Historia/:idPhoto" element={<Historia/>}></Route>

            <Route path="/Search" element={<Search/>}></Route>
            <Route path="/Perfil" element={<Perfil />}></Route>
            <Route path="/NewUser" element={<NewUser />}></Route>
            <Route path="*" element={<h1>404</h1>}></Route>
            <Route path="/Home/:idUser" element={<Home />}></Route>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
};

export default Router;