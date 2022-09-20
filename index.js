//  REQUIRES

  const express = require("express")
  const cors = require("cors")
  const Multer = require('multer')
  const fs = require('fs')

  const { v4: uuidv4 } = require('uuid')
  const db = require('./database/db.js')


  const Upload = Multer({ dest: './local_SD/'})
  const app = express()

  const ZONA_DE_HORARIO = new Date()
  const day = ZONA_DE_HORARIO.getDate()
  const mes = ZONA_DE_HORARIO.getMonth()
  const year = ZONA_DE_HORARIO.getYear()+1900


  const hora = day+'-'+mes+'-'+year

  const URL = 'http://localhost:3001/static/' 
  const PORT = 3001

//    MIDDLEWARE

  app.use(cors());// ME PERMITE TRABAJAR CON RUTAS HTTP
  app.use(express.json())
  app.use('/static', express.static('local_SD'))//ME PEMITE ACCEDER A MI BD HUBICADA EN EL SERVIDOR LOCAL

// MYSQL  ============>>>>>>>>>>>  LOGIN

  app.get("/Login", (req, res) => {

      db.query("SELECT * FROM user", (err, result) => {

        if (err) {

          console.log(err);

        } else {

          res.send(result);

        }

      })

  });
  app.get("/SelectUser/:idUser", (req, res) => {

       const idUser = req.params.idUser;
      

        db.query("SELECT * FROM  `user`  WHERE  idUser = ?", idUser, (err, result) => {

        if (err) {

          console.log(err);

        } else {

          res.send(result);

        }

      })

  });
    app.get("/SelectView/:idUser", (req, res) => {

       const idUser = req.params.idUser;
      

        db.query("SELECT * FROM  `user`  WHERE  idUser = ?", idUser, (err, result) => {

        if (err) {

          console.log(err);

        } else {

          res.send(result);

        }

      })

  });
  



  app.post("/createUser", (req, res) => {

      const idUser = uuidv4();
      const name = req.body.name;
      const surname = req.body.surname;
      const user = req.body.user;
      const mail = req.body.mail;
      const pass = req.body.pass;
      const tel = req.body.tel;
      const photo = req.body.photo;


      db.query(`INSERT INTO user 
        (idUser, name, surname, user, mail, pass, tel, photo) 
        VALUES (?,?,?,?,?,?,?,?)`,
        [idUser, name, surname, user, mail, pass, tel, photo],(err, result) => {

          if (err) {

            console.log(err);

          } else {

            res.send("Valores insertados");

          }

      })

  });
    app.put("/PerfilUpdatePhoto", Upload.single('avatar'),(req, res) => {

      let filetype = req.file.mimetype.split('/')[1]
      let newFileName = req.file.filename+'.'+filetype;

      fs.rename(`./local_SD/${req.file.filename}`, `./local_SD/${newFileName}`, () => {
      
      })
    
      const photo =  URL+newFileName || ''
      const idUser = req.body.id // TENER EN CTA QUE SE RECUPERA EL ID DEL BODY formData.append('id', props.id)
    
      db.query(`UPDATE user SET  
      photo = ? WHERE idUser = ?`,
    [ photo, idUser ],(err, result) => {

      if (err) {

        console.log(err);

      } else {

        res.send(result);

      }
        
    })

  });
app.put("/updateDate", (req, res) => {

    const id = req.body.id;
    const name = req.body.nombre;
    const surname = req.body.apellido;
    const user = req.body.nombreDeUsuario;

    db.query(`UPDATE user SET  
    name = ?, surname = ?, user = ? WHERE id = ?`,
    [ name, surname, user, id ],(err, result) => {

      if (err) {

        console.log(err);

      } else {

        res.send(result);

      }
        
    })

  });
  

// MYSQL  ============>>>>>>>>>>>  ALBUM
 //  app.get("/AlbumInner", (req, res) => {
 //       const idUser = req.params.idUser;

 //      db.query(`
 //     SELECT album.idPhoto
 //            album.photo
 //            album.avatar
 //            album.name
 //            album.meComment
 //            comentarios.comment
 //            comentarios.user
 //            comentarios.time
 //       FROM album 
 // INNER JOIN comentarios
 //         ON album.idPhoto = comentarios.idComment
 //        `, (err, result) => {

 //        if (err) {

 //          console.log(err);

 //        } else {

 //          res.send(result);

 //        }

 //      })

 //  });

  app.get("/Album/:idUser", (req, res) => {
       const idUser = req.params.idUser;

      db.query("SELECT * FROM album  WHERE  idAlbum = ?", idUser, (err, result) => {

        if (err) {

          console.log(err);

        } else {

          res.send(result);

        }

      })

  });
    app.get("/Historia/:idPhoto", (req, res) => {
       const idPhoto = req.params.idPhoto;

      db.query("SELECT * FROM album  WHERE  idPhoto = ?", idPhoto, (err, result) => {

        if (err) {

          console.log(err);

        } else {

          res.send(result);

        }

      })

  });
  app.get("/Album", (req, res) => {
       const idUser = req.params.idUser;

      db.query("SELECT * FROM album ORDER BY idphoto", (err, result) => {

        if (err) {

          console.log(err);

        } else {

          res.send(result);

        }

      })

  });
  app.post("/SaveImage", Upload.single('avatar'),(req, res) => {

      let filetype = req.file.mimetype.split('/')[1]
      let newFileName = req.file.filename+'.'+filetype;

      fs.rename(`./local_SD/${req.file.filename}`, `./local_SD/${newFileName}`, () => {
      
      })

    


      const photo =  URL+newFileName || ''
      const idAlbum = req.body.id // TENER EN CTA QUE SE RECUPERA EL ID DEL BODY formData.append('id', props.id)
    

        
      db.query(`INSERT INTO album ( photo, idAlbum )
      VALUES (?,?)`, [ photo, idAlbum ], (err, result) => {
   
          if (err) {

            console.log(err);

          } else {

            res.send("Valores insertados");

          }

      })

  });

  app.put("/updateAlbum", (req, res) => {

    // const idAlbum = req.body.idAlbum;
    const idPhoto = uuidv4();
    const id = req.body.id;
    const meComment = req.body.mecomment;
    const name = req.body.name;
    // const time = req.body.time;
    const avatar = req.body.avatar;

    db.query(`UPDATE album SET  
    idPhoto = ?, meComment = ?, state = ?, name = ?, avatar = ? WHERE id = ?`,
    [ idPhoto, meComment, false, name, avatar, id ],(err, result) => {

      if (err) {

        console.log(err);

      } else {

        res.send(result);

      }
        
    })

  });

  app.put("/publicarAlbum", (req, res) => {

      const state = req.body.state;
      const id = req.body.id;
   
      db.query("UPDATE album SET  state = ? WHERE id = ?",[ state, id ],(err, result) => {

          if (err) {

            console.log(err);

          } else {

            res.send(result);

          }
        
      })

  });

  app.delete("/deleteHistory/:id", (req, res) => {

      const id = req.params.id;

      db.query("DELETE FROM album WHERE id = ?", id, (err, result) => {

        if (err) {

          console.log(err);

        } else {

          res.send(result);

        }
      })

  });

// MYSQL  ============>>>>>>>>>>>  MENSAJES

  app.get("/Message", (req, res) => {

      db.query("SELECT * FROM message", (err, result) => {

        if (err) {

          console.log(err);

        } else {

          res.send(result);

        }

      })

  });

  app.post("/CreateMessage", (req, res) => {

      const idUser = req.body.idUser;
      const friend = req.body.friend;
      const message = req.body.message;

   

      db.query(`INSERT INTO message 
        (idUser, friend, message) 
        VALUES (?,?,?)`,
        [idUser, friend, message],(err, result) => {

          if (err) {

            console.log(err);

          } else {

            res.send("Valores insertados");

          }

      })

  });
  app.delete("/deleteMessage/:id", (req, res) => {

      const id = req.params.id;

      db.query("DELETE FROM message WHERE id = ?", id, (err, result) => {

        if (err) {

          console.log(err);

        } else {

          res.send(result);

        }
      })

  });

// MYSQL  ============>>>>>>>>>>>  COMENTARIOS
  
  app.get("/Comment", (req, res) => {

      db.query("SELECT * FROM comentarios", (err, result) => {

        if (err) {

          console.log(err);

        } else {

          res.send(result);

        }

      })

  });
    app.get("/Comment/:idPhoto", (req, res) => {
       const idPhoto = req.params.idPhoto;

      db.query("SELECT * FROM comentarios  WHERE  idComment = ?", idPhoto, (err, result) => {

        if (err) {

          console.log(err);

        } else {

          res.send(result);

        }

      })

  });
  app.post("/CreateComment", (req, res) => {

      const idComment = req.body.idComment
      const comment = req.body.comment
      const user = req.body.user
      const time = hora
      const avatar = req.body.avatar
      
   

      db.query(`INSERT INTO comentarios 

        ( idComment, comment, user, time, avatar ) VALUES (?,?,?,?,?)`,

        [ idComment, comment, user, time, avatar ], (err, result) => {

          if (err) {

            console.log(err);

          } else {

            res.send("Valores insertados");

          }

      })

  });
  app.delete("/deleteComment/:id", (req, res) => {

    const id = req.params.id;

    db.query("DELETE FROM comentarios WHERE id = ?", id, (err, result) => {

      if (err) {

        console.log(err);

      } else {

        res.send(result);

      }
    })

  });

///////////////////////////////   LOVE

  app.get("/Love", (req, res) => {

      db.query("SELECT * FROM love", (err, result) => {

        if (err) {

          console.log(err);

        } else {

          res.send(result);

        }

      })

  });
  app.post("/CreateLove", (req, res) => {

      const idLove = req.body.idLove
      const idUser = req.body.idUser
      const love = req.body.love
     
      
   

      db.query(`INSERT INTO love 

        ( idLove, idUser, love ) VALUES (?,?,?)`,

        [ idLove, idUser, love ], (err, result) => {

          if (err) {

            console.log(err);

          } else {

            res.send("Valores insertados");

          }

      })

  });

  app.put("/Love", (req, res) => {

      const love = req.body.love;
      const id = req.body.id;
   
      db.query("UPDATE love SET  love = ? WHERE id = ?",[ love, id ],(err, result) => {

          if (err) {

            console.log(err);

          } else {

            res.send(result);

          }
        
      })

  });
//  INICIO SERVIDOR EN PUERTO 3001

  app.listen(PORT, () => {

    console.log(`base de datos conectada en => http://localhost:${PORT}`)
  
  });
