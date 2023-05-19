require('dotenv').config() //para poder usar un puerto que elija la maquina
const express = require('express')
const app = express()
const port = process.env.PORT //aca se la asigno PORT
const mongoose = require('mongoose') //llamar a mongoose
const Schema = mongoose.Schema //sirve para almacenar el esquema de una tarea me imagino q es el tipo de dato



//conectar a mongoose
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Conexion exitosa');
}).catch((err)=>{
  console.log('Error al conectarse a la DB');
})

//definir esquema de la tarea, las restricciones q va atenr nuestra tarea en la BD nombre y estado
const taskSchema = new Schema({
  name: String,
  done: Boolean,
  //createdBy:
})

//Generar el modelo de nustra colleccion de tareas que va a almacenar los modelos(TAREAS con su esquema)
const Task= mongoose.model("Task", taskSchema, "Tasks") //TASKS es la coleccion

//servir archivos estaticos
app.use(express.static('public'))

//crear un middelware para parciar informacion y concatenarla en un strig para loego convertirlo en un obj JSON se utiliza: Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json())

//usar middelware que no es mas q una funcion q devuelve otra funcion con tres parametros, muy IMPORT EL NEXT() al final
app.use((req,res,next)=>{
  //console.log('No especifica ruta del middelware');
  //console.log('Middelware 1');
  next()
})


//entender el funcinamiento de un middelware
const logger = {
  logThis: (queLogeo)=>{
    return (req,res,next)=>{
      console.log('Middelware 2 ', queLogeo);
      next()
    }
  },
}

//se le puede expecificar una ruta como primer parametro de la primera funcion
app.use('/facundo', logger.logThis("Logeamos essssstoooo"))


//configuracion de ruta tipo POST en un middelware
app.post("/api/tasks", function(req, res) {
  const body = req.body;
  console.log({ body });
  Task.create({
    name: body.text,
    done: false,
    hello: "hola",
  }).then((createdTask)=>{

    res.status(200).json({ ok: true, message: "Tarea creada con éxito", data: createdTask });
  }).catch((err)=>{
    res.status(400).json({ok: false, message: "Error al crear la tarea"})
  })
});


//configuracion de ruta tipo DELETE en un middelware
//a la ruta le engo que decir que espero recibir un id de la tarea que se esta eliminando '/:id'
app.delete("/api/tasks/:id", function(req, res) {
  const id = req.params.id; //me guardo el id
  Task.findByIdAndDelete(id).then((deletedTask)=>{
    res.status(200).json({ok: true, data:deletedTask})
  }).catch((err)=>{
    res.status(400).json({ok: false, message: "Error en eliminar tarea"})
  })
});


//configuracion de ruta tipo get en un middelgare
app.get("/api/tasks", function(req,res){
  Task.find().then((tasks)=>{
      res.status(200).json({ok: true, data: tasks})
  }).catch((err)=>{
      res.status(400).json({ok: false, message: "Error al encontrar la tarea ",err})
  })
})


//Ahora para poder conectar el front con el back tengo que crear la ruta en este caso user, nos tiene que devolver un arreglo de usuarios
//app.get('/user', (req, res) => {
//    res.send([{name: "Facundo"}, {name:"Florencia"}])
//  })


//Poner a escuchar la APP en un puerto
app.listen(port, () => {
  console.log(`Escucho en el puerto ${port}`)
})