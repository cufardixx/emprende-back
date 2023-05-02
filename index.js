//lo q esta pasando es que nuestrea PC esta actuando de cliente y servidor!!!!!!!!!
//requerrir libreria de dotenv
require('dotenv').config()
const { log } = require('console');
//requerrir libreria HTTP server para obtener metodos de red
const http = require('http');




//funcion para el crateServer
function requestController(){
    console.log('recibimos una nuevo pedido!!->Request');
}

//ahora creamos el servidor usando http, almaceno el servidor en la constante 'server'. El createServer espera una funcion que es adderia automaticamete como request. La creamos!!
const server = http.createServer(requestController)


//variable de un puerto para que pueda correr en produccion en render.com
const PORT = process.env.PORT
//ahora falta que el servidor se ponga a en escucha en un purto determinado! no hace nada mas q escuchar porq no esta dovolviendo una respuesta en el servidor
server.listen(PORT, ()=>{
    console.log("Aplicacion corriendo en puerto " + PORT)
})