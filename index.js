require('dotenv').config() //para poder usar un puerto que elija la maquina
const express = require('express')
const app = express()
const port = process.env.PORT //aca se la asigno

//servir archivos estaticos
app.use(express.static('public'))


//las validaciones con if se remplazo con este poco codigo
//Configurar rutas
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Ahora para poder conectar el front con el back tengo que crear la ruta en este caso user, nos tiene que devolver un arreglo de usuarios
app.get('/user', (req, res) => {
    res.send([{name: "Facundo"}, {name:"Florencia"}])
  })


//Poner a escuchar la APP en un puerto
app.listen(port, () => {
  console.log(`Escucho en el puerto ${port}`)
})