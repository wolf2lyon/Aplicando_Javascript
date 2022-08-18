//Codigo para poder girar mi tarjeta 
const tarjeta=document.querySelector('#tarjeta'),
      btnAbrirFormulario=document.querySelector('#btn-abrir-formulario'),
      formulario=document.querySelector('#formulario-tarjeta'),
      numeroTarjeta=document.querySelector('#tarjeta .numero'),
      nombreTarjeta=document.querySelector('#tarjeta .nombre'),
      logoMarca=document.querySelector('#logo-marca'),
      firma=document.querySelector('#tarjeta .firma p'),
      CVV=document.querySelector("#cvv .cvv"),
      mesExpiracion=document.querySelector('#tarjeta  .mes'),
      yearExpiracion=document.querySelector('#tarjeta  .year'),
      boton_procesar_pago=document.querySelector(".btn-enviar");
//Acciendo al monto del Dom con la variable monto_total
let monto_total=document.querySelector(".monto_total");
//Variable para cambiar monto
let cambiar_monto; 

function actualizarMonto(precio){
    if(precio==0){
        monto_total.innerHTML=`S/${precio}.00`;    
    }else{
        monto_total.innerHTML=`S/${precio}`;
    }

};
//Volteamos la tarjeta para mostrar el frente.
const mostrarFrente = () => {
	if(tarjeta.classList.contains('active')){
       
		tarjeta.classList.remove('active');
	}
}
//Voltear la tarjeta para mostrar la parte trasera
const mostrarTrasera=()=>{
    if(!tarjeta.classList.contains('active')){
       
		tarjeta.classList.add('active');
	}
}
//Funcion para actualizar el monto total
function sumar_total_productos(){
    let suma=0;
    for(let i=0;i<carrito2.length;i++){
        suma+=carrito2[i].precio*carrito2[i].cantidad;
    }
    return suma;
}

// * Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});
//*Boton de abrir formulario
btnAbrirFormulario.addEventListener('click',()=>{
    btnAbrirFormulario.classList.toggle('active');
    formulario.classList.toggle('active');
});
//Libreria Cleave para cuando el usuario le de click en el boton de Confirmar Compra
var cleave = new Cleave('#inputNumero', {
    creditCard: true,
    onCreditCardTypeChanged: function (type) {
        // update UI ...
        if(type=="visa"){
            logoMarca.innerHTML='';
            const imagen=document.createElement('img');
            imagen.src='../img/visa.png';
            logoMarca.appendChild(imagen);
        }else{
            if(type=="mastercard"){
                logoMarca.innerHTML='';
                const imagen=document.createElement('img');
                imagen.src='../img/mastercard.png';
                logoMarca.appendChild(imagen);
            }
        }
    
        
    }
});
const btn_eliminar=document.querySelector(".boton-eliminar");

//*Select del mes generado dinamicamente
for (let i = 0; i <12; i++) {
    let opcion=document.createElement('option');
    opcion.value=i;
    opcion.innerText=i;
    formulario.selectMes.appendChild(opcion);
}
//*Select del año generado dinamicamente
const yearActual=new Date().getFullYear();
for (let i = yearActual; i <yearActual+8; i++) {
    let opcion=document.createElement('option');
    opcion.value=i;
    opcion.innerText=i;
    formulario.selectYear.appendChild(opcion);
}
//*-----------------------------------------------------
formulario.inputNumero.addEventListener('keyup',(e)=>{
    let valorInput = e.target.value;
    numeroTarjeta.textContent=valorInput;
    if(valorInput==''){numeroTarjeta.textContent='#### ##### #### ####';logoMarca.innerHTML='';}
    mostrarFrente()
});  
formulario.inputCVV.addEventListener('keyup',(e)=>{
    let valorInput=e.target.value;
    CVV.textContent=valorInput;
    mostrarTrasera();
}) 
formulario.inputNombre.addEventListener('keyup',(e)=>{
    let valorInput=e.target.value;
    nombreTarjeta.textContent=valorInput;
    firma.textContent=valorInput;
    if(valorInput==''){nombreTarjeta.textContent='JOSE CORDOVA';firma.textContent='JOSE CORDOVA'}
    mostrarFrente();
})
//Select Mes
formulario.selectMes.addEventListener('change',(e)=>{
    mesExpiracion.textContent=e.target.value;
    mostrarFrente();
})
//Select año        
formulario.selectYear.addEventListener('change',(e)=>{
    yearExpiracion.textContent=e.target.value.slice(2);
    mostrarFrente();
})

let validacionNombre=document.getElementById("inputNombre");
validacionNombre.addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^a-zA-Z\s]/, "");
  });

let validacionEmail=document.getElementById("inputEmail");
validacionEmail.addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^a-zA-Z0-9_.+-]+@[^a-zA-Z0-9-]+\.[^a-zA-Z0-9-.]+$/, "");
    });

let validacionTelefono=document.getElementById("inputTelefono");
validacionTelefono.addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^\d]/, "");
  });

let validacionCVV=document.getElementById("inputCVV");
validacionCVV.addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^\d]/, "");
  });
  //variable del para obtener
let input_numero_tarjeta=document.querySelector("#inputNumero");
  //---------------------------------------------------------------------
  //Declaro mi variable al objeto usuario para que pueda validar sus datos 
  function Usuario(nombre,correo,numero){
    this.nombre=nombre;
    this.correo=correo;
    this.numero=numero;
}
  //Declaro mi variable del contenedor de los productos de finalizacion de la compra
   let mostrar_productos=document.querySelector(".body-TotalPrecio");
  //LLamo al carrito del local storage
  function mostrar(){
    let muestra=localStorage.getItem("carrito");
    let comentario=JSON.parse(muestra);
    return comentario;  
}
    let carrito2=mostrar();
  //Crear HTML
  function crearHTML(i){
    let html=document.createElement("div");
    html.innerHTML=` <div class="card m-1 d-flex justify-content-between flex-row  ">
    <div class="contador ps-1 d-flex align-items-center">${carrito2[i].cantidad}</div>
    <div class="imagen-contenedora">
        <img  class="imagen-productos-FinalizarCompra  "id="pr-12"src="../${carrito2[i].imagen}" alt="imagen">
    </div>
    <div class="contenedor-InformacionCompra d-flex flex-column justify-content-start">
         <p class="title-InformacionCompra p-0 m-0 fw-bold title-InformacionCompra">${carrito2[i].nombre}</p>
         <p class="precio-InformacionCompra p-0 m-0 fw-bold">s/${carrito2[i].precio}</p>
    </div>
    <div class="boton-eliminar d-flex align-items-center"  onclick="eliminar_carrito(${carrito2[i].id})"><i class="fa-solid fa-trash"></i></div>
    <div class="SubTotal-InformacionCompra d-flex flex-column justify-content-center align-content-center ">
        <p class="titleSubtotal-InformacionCompra p-0 m-0 fw-bold">SUB TOTAL</p>
        <p class="precioSubtotal-InformacionCompra p-0 m-0 fw-bold">s/${carrito2[i].precio*carrito2[i].cantidad}</p>
    </div>
    </div>`;
    mostrar_productos.appendChild(html);
    };
    function imprimirHTML(){
        for (let i = 0; i < carrito2.length; i++) {
            crearHTML(i);
        }
    }
    function eliminar_hijos(){
        var elemento= document.querySelector(".body-TotalPrecio div");
        if (elemento.parentNode) {
            elemento.parentNode.removeChild(elemento);
          }
    } 
    function eliminar_todos_hijos(){
        for(let i=0;i<carrito2.length;i++){
            eliminar_hijos();
        }
    }
    function actualizarLocal(arr){
        userJSON=JSON.stringify(arr);
        localStorage.setItem("carrito",userJSON);
        carrito=JSON.parse(userJSON);
    }
    if( carrito2===null){}else{
        imprimirHTML();
        cambiar_monto=sumar_total_productos();
        actualizarMonto(cambiar_monto);  
    };
    function eliminar_carrito(id){ 
        const producto=carrito2.find(producto=> producto.id==id);
            if(producto.cantidad===1){
                eliminar_todos_hijos();
                producto.cantidad=0;
            	carrito2.splice(carrito2.findIndex(producto=>producto.id==id),1);
            } else{
                eliminar_todos_hijos();
            	producto.cantidad--;
                
            }
            actualizarLocal(carrito2);
            imprimirHTML();
            if(carrito2==""){localStorage.removeItem('carrito');}
                cambiar_monto=sumar_total_productos();
                actualizarMonto(cambiar_monto);
            
    };
//Boton que realizara la finalizacion de la compra en la tienda

boton_procesar_pago.addEventListener('click',(e)=>{
    let usuario=new Usuario(validacionNombre.value,validacionEmail.value,validacionTelefono.value);
    e.preventDefault();
    
    if( validacionNombre.value!="" && validacionEmail.value!="" && validacionCVV.value!="" && validacionTelefono.value!="" && input_numero_tarjeta.value!=""){
     if(carrito2!=null){carrito2.length>0 ? showalert=0:showalert=1;
        eliminar_todos_hijos();
        carrito2=[];
        localStorage.removeItem('carrito');
     
        actualizarMonto(0.0);
        
        showalert==0
        ?    Swal.fire({
                title: `'SU COMPRA SE HA REALIZADO CON ÉXITO ${usuario.nombre.toUpperCase()}!!'`,
                text: `'Te llegará un correo a esta dirección ${usuario.correo} y un mensaje de confirmación al número: ${usuario.numero} Gracias por confiar en nosotros!!!`,
                imageUrl: '../img/ConfirmacionMessage.png',
                imageWidth: 200,
                imageHeight: 150,
                confirmButtonText:'✓',
                confirmButtonColor:'#198754',
                imageAlt: 'Custom image',
              })
        :
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Intente comprar un producto',
              })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Intente comprar un producto',
                  })
            }
            validacionNombre.value="";
            validacionEmail.value="";
            validacionCVV.value="";
            validacionTelefono.value="";
            input_numero_tarjeta.value="";
            setTimeout(()=>{window.location.href = "../index.html";},2550)
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Porfavor llenar todos los datos solicitados',
              })
        }
})


