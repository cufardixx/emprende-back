/*

//iniciar nodemon "start": "nodemon index.js"


//lo q esta pasando es que nuestrea PC esta actuando de cliente y servidor!!!!!!!!!
//requerrir libreria de dotenv
require('dotenv').config()
//requerrir libreria HTTP server para obtener metodos de red
const http = require('http');
//si queremos leer archivos html en vez de pedacitos como vengo haciendo necesito el modulo fs
const fs = require('fs');





//funcion para el crateServer
function requestController(req,res){
    const method = req.method;
    const url = req.url;
    console.log({url,method});//devuelve / y GET, ahora debo probar q esos paramatros son true
    
   aca lo pruebo y devuelvo el objeto res con el html muy primitivo
    if(method==="GET" && url === "/"){
        res.setHeader("Content-type", "text/html"); //seteo el header de la pag
        res.write("<h1>Aca escribo lo que se envia en el objeto res, envio html</h1>");
        res.end()//termino el proseso, sino queda en loop
        return
    }


    //aca muestro un archivo de l acarpeta pulbic con Fs
    if(method==="GET" && url === "/about"){ 
        res.setHeader("Content-type", "text/html"); //seteo el header de la pag
        //esta funcion es asincrona buscar info
        fs.readFile('./public/about.html', function(err, file){
            if(err){
                console.log("HUBO UN ERROR");
            }
            res.write(file);
            res.end()//termino el proseso, sino queda en loop
            return
        })
        
    }

    if(method==="GET" && url === "/"){ 
        res.setHeader("Content-type", "text/html"); //seteo el header de la pag
        //esta funcion es asincrona buscar info
        fs.readFile('./public/index.html', function(err, file){
            if(err){
                console.log("HUBO UN ERROR");
            }
            res.write(file);
            res.end()//termino el proseso, sino queda en loop
            return
        })
        
    }
}


//ahora creamos el servidor usando http, almaceno el servidor en la constante 'server'. El createServer espera una funcion que es adderia automaticamete como request. La creamos!!
const server = http.createServer(requestController)


//variable de un puerto para que pueda correr en produccion en render.com
const PORT = process.env.PORT
//ahora falta que el servidor se ponga a en escucha en un purto determinado! no hace nada mas q escuchar porq no esta dovolviendo una respuesta en el servidor
server.listen(PORT, function(){
    console.log("Aplicacion corriendo en puerto " + PORT)
})


*///SACAR ESTO PARA QUE ANDE!!!!!!!!!!!!!!