const  createEditBtn = document.querySelector("#create-task")
const   input = document.querySelector("#task-name")
const   taskBox = document.querySelector("#task-box")

const baseUrl = "http://localhost:4000/api"

//variablo global
let TASK_TO_EDIT = null

//falta convertir la respuesta a formato JSON
createEditBtn.addEventListener("click",(e)=>{
    //vamos a hacer una peticion o otra, es decir (post)crearla o (put)editarla, dependiedo si la variable TASK_TO_EDIT esta en null o no

    const creating = !TASK_TO_EDIT //va a estar en true solo si no esta para editar, es decir q si niego un objeto da false !{name: facu} -> false ahora !null -> true

    const path = creating ? "tasks" : `tasks/${TASK_TO_EDIT._id}`;
    const method = creating ? "POST" : "PUT";

    //prueba de conectar el frontend con el backend para eso uso fetch
    fetch(`${baseUrl}/${path}`, {
        method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text: input.value}),
    }).then((res)=>{
        getTasks()
        input.value = ''
        TASK_TO_EDIT = null
        createEditBtn.innerText = "Crear tarea" 
        return res.json() //convertimos la res en un JSON y eso lo mostramos desp, usamos el then porq tambien toma timpo
    }).then((resJson)=>{
        console.log({resJson});
    })
})

function getTasks(){
    taskBox.innerHTML = null //borara preventinamente para que no se dubliquen tareas en el box
    fetch(`${baseUrl}/tasks`).then((res)=>{
        return res.json() //convertimos la res en un JSON y eso lo mostramos desp, usamos el then porq tambien toma timpo
    }).then((resJson)=>{
        const tasks = resJson.data //mostrar las tareas en el html 

        for (const task of tasks) {
            
            const tasksParrafo = document.createElement('p') //crear el elemeto parrafp directament en JS
            const deleteTaskBtn = document.createElement('button') //crear boton para elimiar tareas
            deleteTaskBtn.innerText= 'Borrar'

            const contenedorTask = document.createElement('div')//crear contenedor que agrupe ambos elementos p y button

            tasksParrafo.innerText = task.name //texto que va a tenr adentro ese parrafo
            //funcion tocar parrafo
            tasksParrafo.addEventListener('click', (e)=>{
                input.value = task.name
                createEditBtn.innerHTML = "Editar tarea"
                TASK_TO_EDIT = task //tener globalmente a dispocicion la tarea
                console.log({TASK_TO_EDIT});
            })

            //setear atributos a la boton que borra las tareas, el atributo id es igual al id de la tarea ej: _id: '646527dece6f63560ab2731c' lo tenemos q obtener para poder buscarlas en la DB y despues eliminarlas
            deleteTaskBtn.setAttribute('id', task._id)
            //funcion del boton
            deleteTaskBtn.addEventListener('click', (e)=>{
                //en el objeto e tengo una propiedad de target donde se encuentra el id que necesito 
                //por lo tanto lo almaceno en una cosntante console.log(taskId);
                const taskId= e.target.id

                //en el fetch necesitamos poner la url de nustro backend referenciado con la id guardada anteriormente, ademas de pasarle la configracion de la ruta ya q no es de tipo get si no de tipo delete
                fetch(`${baseUrl}/tasks/${taskId}`,{
                    method: "DELETE",
                    //cuando es exitosa la eliminacion de la tarea tendriamos q eliminar todo el div padre que tiene a el p y boton
                }).then(()=>{
                    const taskDivContainer = deleteTaskBtn.parentElement //guaradmos el div q contiene a la tarea q eliminamos 
                    taskDivContainer.remove()
                })
            })
    
            //ahora desp de configurarlo(taskParrafo) lo tenemos q agregar al taskBox 
            contenedorTask.appendChild(tasksParrafo)
            contenedorTask.appendChild(deleteTaskBtn)
            taskBox.appendChild(contenedorTask)
        }
    })
}


getTasks()