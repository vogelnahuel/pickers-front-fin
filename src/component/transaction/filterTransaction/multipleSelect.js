const valorAmodificar = document.querySelector('.multiple-ContenedorInput');
const contenidoSelect = document.querySelector('.multiple-contenido-select');

const checkboxInputAll = document.querySelectorAll('.multiple-checkboxInput');

const inputValor = document.querySelector('#valorAmodificar');
let seleccionadosInput = 0;


//abrirse
valorAmodificar.addEventListener('click',(e)=>{
    e.preventDefault()
    e.stopPropagation()
   const opciones =  document.querySelector('#opciones');
    opciones.style.display="block";
})
//evitar que se propage el evento de hacer click en cualquier lado excepto en las opc
document.querySelector('#opciones').addEventListener('click',(e)=>{
    e.stopPropagation();
})

checkboxInputAll.forEach( inp => inp.addEventListener('click',(e)=>{
    
  
    let todos = false;

    if(e.target.checked===true){
        seleccionadosInput++;
    }
    else if(e.target.checked===false){
        seleccionadosInput--;
    }
    

    if(e.target.id==="Todos"){
        if(e.target.checked===true){
            checkboxInputAll.forEach(inputs=> inputs.checked=true)
            inputValor.placeholder="Todos";
            inputValor.classList.add('multiple-seleccionadoInputColor');
            todos=true;
            seleccionadosInput=checkboxInputAll.length-1;
           
        }else  if(e.target.checked===false){
            checkboxInputAll.forEach(inputs=> inputs.checked=false)
            inputValor.placeholder="Seleccioná el estado";
            inputValor.classList.remove('multiple-seleccionadoInputColor');
            todos=false;
            seleccionadosInput=0;
            
        }
    }

    checkboxInputAll.forEach(inp => inp.checked===false  ?  inp.nextElementSibling.classList.remove('selected'):"" )

    if(seleccionadosInput=== (checkboxInputAll.length-1 ) || todos ===true ) {
        inputValor.placeholder="Todos";
        inputValor.classList.add('multiple-seleccionadoInputColor');
        checkboxInputAll[0].checked=true;
       
        checkboxInputAll.forEach(inp => inp.checked===true  ?  inp.nextElementSibling.classList.add('selected'):"" )
    }
    else if(seleccionadosInput!== (checkboxInputAll.length-1 ) && seleccionadosInput!== 0 && seleccionadosInput <= 3 )  {
        inputValor.placeholder=""
        checkboxInputAll.forEach(inp => inp.checked===true  ?  inputValor.placeholder+=inp.value+"," : "" )
        inputValor.classList.add('multiple-seleccionadoInputColor');
        checkboxInputAll[0].checked=false;
        checkboxInputAll.forEach(inp => inp.checked===true  ?  inp.nextElementSibling.classList.add('selected'):"" )
    }
    else if(seleccionadosInput!== (checkboxInputAll.length-1 ) && seleccionadosInput!== 0 && seleccionadosInput > 3)  {
        inputValor.placeholder=""
        inputValor.placeholder=seleccionadosInput+" Seleccionados";
        inputValor.classList.add('multiple-seleccionadoInputColor');
        checkboxInputAll[0].checked=false;
        checkboxInputAll.forEach(inp => inp.checked===true  ?  inp.nextElementSibling.classList.add('selected'):"" )
    }
    else if(seleccionadosInput=== 0 )  {
        inputValor.placeholder="Seleccioná el estado";
        inputValor.classList.remove('multiple-seleccionadoInputColor');
        checkboxInputAll[0].checked=false;
    }
   
   
    if(seleccionadosInput!== 0 && seleccionadosInput!== (checkboxInputAll.length-1) && inputValor.placeholder[inputValor.placeholder.length-1]===","  ){
        inputValor.placeholder=inputValor.placeholder.substring(0,inputValor.placeholder.length-1);
    }

}))


//cerrar input y escribir las opciones
window.addEventListener('click',(e)=>{
    const opciones =  document.querySelector('#opciones');
    opciones.style.display="none";


})
