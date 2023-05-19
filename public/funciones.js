//funciones 

//definicion
function suma(parametro1,parametro2=0){
    //console.log({parametro1,parametro2});
    //if(typeof parametro1!== 'number' || typeof parametro2 !== 'number'){
    //    throw Error("Ambos parametros deben ser 'number'")
    //}
    let total = parametro1 + parametro2;
    return total
}

const argumento1 = 5
const argumento2 = 4

//invocar, llamr o ejecutar una funcion
console.table({
    constantes: suma(argumento1,argumento2),
    valores: suma(10,4),
    expreciones: suma(2+2,4*2),
    error1: suma(3), //arroja NaN porq no esta recibiendo el segundo parametro
    error2: suma(2,"2"),
    error3: suma("Facundo","Picia"),
})






//arrow funcion  calculo de Tasa Metabólica Basal

const personas = [
    {
      nombre: 'Juan',
      peso: 70,
      edad: 25,
      sexo: 'masculino',
      altura: 175
    },
    {
      nombre: 'María',
      peso: 60,
      edad: 30,
      sexo: 'femenino',
      altura: 165
    },
    {
      nombre: 'Facundo',
      peso: 91,
      edad: 22,
      sexo: 'masculino',
      altura: 190
    }
  ];
  

const parametrosTMB = (obj) =>{

    for(let i=0;i<obj.length;i++){
        //console.log(obj[i].sexo);
        if(obj[i].sexo === 'masculino'){
            //console.log('correcto');
            let TMB = 66 + 13.75 * obj[i].peso + 5 * obj[i].altura - 6.75 * obj[i].edad;
            console.log('El calculo de Tasa Metabólica Basal para '+ obj[i].nombre + ': ' + TMB);
        }
        else if(obj[i].sexo === 'femenino'){
            //console.log('correcto');
            let TMB =  655 + 9.56 * obj[i].peso + 1.85 * obj[i].altura - 4.68 * obj[i].edad;
            console.log('El calculo de Tasa Metabólica Basal para '+ obj[i].nombre + ': ' + TMB);
        }
        else{console.log('no es masculino ni femenino');}
    }
}
  
  parametrosTMB(personas);

