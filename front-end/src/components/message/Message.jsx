import Axios from 'axios'
import { useState } from 'react'

import './message.css'

const Message = (props) => {

    const [message, setMessage] = useState([])

    const getMessage = () => {
        Axios.get("http://localhost:3001/Message").then((response) => {
          setMessage(response.data)
        })
    }
    getMessage()

    const deleteMessage = (id) => {
        Axios.delete(`http://localhost:3001/deleteMessage/${id}`).then((response) => {
          setMessage(
          message.filter((val) => {
              return val.id != id;
            })
          );
        });
    };
     
     return(
  
             <div className="message-container">
                {message.map((val, key) => {
                    if(val.cluster===props.cluster){

                        if (val.user===props.name) {

                                 return( 

                                        <> 

                                             <div id="output">

                                                <div className="h1">{val.user}</div>
                                                <div className="p"> {val.msj}</div>

                                                <button onClick={() => {
                                                   deleteMessage(val.id);
                                                }}>
                                                    <span class="material-symbols-outlined">
                                                         delete_forever
                                                    </span>
                                                </button>

                                             </div>

                                        </> 
                                    )
                             }else if(((val.user).indexOf('di'))!=-1){

                                  return( 

                                        <> 

                                             <div id="outputUser1">

                                                                                            
                                                <div className="h1">{val.user}</div>

                                                <div className="p"> {val.msj}</div>

                                             

                                             </div>

                                        </> 
                                    )

                             }else if(((val.user).indexOf('pe'))!=-1){

                                  return( 

                                        <> 

                                             <div id="outputUser2">

                                                                                            
                                                <div className="h1">{val.user}</div>

                                                <div className="p"> {val.msj}</div>

                                             

                                             </div>

                                        </> 
                                    )

                             }else if(((val.user).indexOf('leo'))!=-1){

                                  return( 

                                        <> 

                                             <div id="outputUser3">

                                                                                            
                                                <div className="h1">{val.user}</div>

                                                <div className="p"> {val.msj}</div>

                                             

                                             </div>

                                        </> 
                                    )

                             }else if(((val.user).indexOf('lu'))!=-1){

                                  return( 

                                        <> 

                                             <div id="outputUser4">

                                                                                            
                                                <div className="h1">{val.user}</div>

                                                <div className="p"> {val.msj}</div>

                                             

                                             </div>

                                        </> 
                                    )

                             }else if(((val.user).indexOf('j'))!=-1){

                                  return( 

                                        <> 

                                             <div id="outputUser5">

                                                                                            
                                                <div className="h1">{val.user}</div>

                                                <div className="p"> {val.msj}</div>

                                             

                                             </div>

                                        </> 
                                    )

                             }else if(((val.user).indexOf('M'))!=-1){

                                  return( 

                                        <> 

                                             <div id="outputUser6">

                                                                                            
                                                <div className="h1">{val.user}</div>

                                                <div className="p"> {val.msj}</div>

                                             

                                             </div>

                                        </> 
                                    )

                             }else if(((val.user).indexOf('li'))!=-1){

                                  return( 

                                        <> 

                                             <div id="outputUser7">

                                                                                            
                                                <div className="h1">{val.user}</div>

                                                <div className="p"> {val.msj}</div>

                                             

                                             </div>

                                        </> 
                                    )

                             }else if(((val.user).indexOf('lu'))!=-1){

                                  return( 

                                        <> 

                                             <div id="outputUser8">

                                                                                            
                                                <div className="h1">{val.user}</div>

                                                <div className="p"> {val.msj}</div>

                                             

                                             </div>

                                        </> 
                                    )

                             }else if(((val.user).indexOf('n'))!=-1){

                                  return( 

                                        <> 

                                             <div id="outputUser9">

                                                                                            
                                                <div className="h1">{val.user}</div>

                                                <div className="p"> {val.msj}</div>

                                             

                                             </div>

                                        </> 
                                    )

                             }else{

                                  return( 

                                        <> 

                                             <div id="outputUser">

                                                                                            
                                                <div className="h1">{val.user}</div>

                                                <div className="p"> {val.msj}</div>

                                             

                                             </div>

                                        </> 
                                    )

                        }
                    }
                     
                })} 
                </div>
                 
        )
            
       
      
}
 export default Message;