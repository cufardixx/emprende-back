console.log("conectado");

const btn = document.getElementById("btn")

btn.addEventListener("click",(e)=>{
    console.log("anda");
    //prueba de conectar el frontend con el backend para eso uso fetch
    fetch("http://localhost:4000/user")
})