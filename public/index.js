const  createBtn = document.querySelector("#create-task")
const   input = document.querySelector("#task-name")

const baseUrl = "http://localhost:4000/api"

//falta convertir la respuesta a formato JSON
createBtn.addEventListener("click",(e)=>{
    //prueba de conectar el frontend con el backend para eso uso fetch
    fetch(`${baseUrl}/tasks`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text: input.value}),
    }).then((res)=>{
        return res.json() //convertimos la res en un JSON y eso lo mostramos desp, usamos el then porq tambien toma timpo
    }).then((resJson)=>{
        console.log({resJson});
    })
})

function getTask(){
    fetch(`${baseUrl}/tasks`).then((res)=>{
        return res.json
    }).then((resJson)=>{
        console.log({resJson});
    })
} 


getTask()