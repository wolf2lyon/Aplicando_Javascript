
// Función para cargar el json con fetch
async function fetchProductos() {
    const response = await fetch('./data.json'); // fetch devuelve una promesa
    return await response.json();
}
    let productos=[]
    let carrito=[];
    let userJSON=" ";
    fetchProductos().then(p=>{productos=p;pintar_index()});
    //variable para la suma de productos
    let monto_prodcutos=0;
    //---------------------------------------
    //variable para iterar
    
    let i=0;
    let iteracion=0;
    let iteracion2=0;
    //---------------------------------------
    //variable para poder cambiar mi monto
    let cambiar_monto;
    //
    //variable para mostrar los alert respectivos
    let showalert;
    //---------------------------------------
    //variable para acceder al boton de finalizar la compra
    const btn_fin=document.querySelector("#Finalizar-Compra");
    //variable que me permitira eliminar un producto de mi carrito
    const btn_eliminar=document.querySelector(".boton-eliminar");
    //funcion constructora
    //variable para cambiar el contador fixed de mi header
    let contador_fixed=document.querySelector(".contador_fixed");
    
    function Tienda(nombre,direccion,productos){
        this.nombre=nombre;
        this.direccion=direccion;
        this.productos=productos;
    }
    //---------------------------------------

    //Creando la tienda

    let tienda=new Tienda("Healthy Food","Jr.Bolognesi 391 Magdalena del Mar",productos);
    //---------------------------------------

    //Creando variable para mi contenedor dinamico

    const mostrar_boleta=document.querySelector(".Boleta");
    const mostrar_div=document.querySelector(".contenedor-producto_overflow-y");
    //---------------------------------------
    //Creando variable para actualizar el monto total del DOM

    const monto_total=document.querySelector(".total-precio_mostrar");
    //---------------------------------------
    //Cargar el producto al carrito

    const itemsContainer=document.querySelector('#itemsContainer');
    //---------------------------------------
    //Añadiendo las listas a mi clase de mi html
    function añadirListas(node){
        node.classList.add("col-12");
        node.classList.add("col-md-4");
        node.classList.add("d-flex");
        node.classList.add("justify-content-center");
        node.classList.add("mb-3");
    }
    //Funcion para agregar HTML
    function crearHTML(i){
        let html=document.createElement("div");
        html.innerHTML=`<div class="card shopping d-flex flex-row alto-card-carrito border-2">
        <div class="cantidad-productos d-flex me-2 w-25 align-items-center justify-content-center">
            <div class=" cantidad-color d-flex w-25  justify-content-center ">
                ${carrito[i].cantidad}
            </div>
        </div>
        <img  class="imagen-productos-navegador me-2 "id="pr-12"src=${carrito[i].imagen} alt="imagen">
        <div class="card-body-carrito d-flex flex-column me-2 ms-2 w-25 ">
            <div class="card-title-carrito">${carrito[i].nombre}</div>
            <p class="card-precio-carrito ">s/${carrito[i].precio}</p>
        </div>
        <div class="boton-eliminar"  onclick="eliminar_carrito(${carrito[i].id})"  d-flex align-items-center"><i class="fa-solid fa-trash"></i></div>
        <div class="card-monto-producto d-flex flex-column me-2 ms-2 w-25 ">
            <div class="card-title-monto d-flex justify-content-center">SUBT x PROD</div>
            <div class="card-monto-carrito d-flex justify-content-center">S/${carrito[i].precio*carrito[i].cantidad}</div>
        </div>
        </div>`;
        mostrar_div.appendChild(html);
        }
    //Guardar en el local storage
    function actualizarLocal(arr){
        userJSON=JSON.stringify(arr);
        localStorage.setItem("carrito",userJSON);
        carrito=JSON.parse(userJSON);
    }
    //Funcion que muestra la variable de mi local storage
    function mostrar(){
        let muestra=localStorage.getItem("carrito");
        let comentario=JSON.parse(muestra);
        return comentario;  
    }
    //Funcion para buscar el nombre del producto
    function buscador(nombreproducto){
        let indice=-1;
        for(let j=0;j<carrito.length;j++){
            if(carrito[j].nombre==nombreproducto){
                indice=j;
            }
        }
        return indice;

    }
    //Funcion para eliminar un hijo(div) del contenedor del carrito
    function eliminar_hijos(){
        var elemento= document.querySelector(".contenedor-producto_overflow-y div");
        if (elemento.parentNode) {
            elemento.parentNode.removeChild(elemento);
          }
    } 
    //Funcion para imprimir los nuevos divs actualizados de mi carrito
    function imprimir(){
        for(let i=0;i<carrito.length;i++){
            crearHTML(i);
        }
    }
    //Funcion para eliminar todos los hijos de mi local storage
    function eliminar_todos_hijos(){
        for(let i=0;i<carrito.length;i++){
            eliminar_hijos();
        }
    }
    //Funcion para poder sumar todos mis productos del carrito
    function sumar_total_productos(){
        let suma=0;
        for(let i=0;i<carrito.length;i++){
            suma+=carrito[i].precio*carrito[i].cantidad;
        }
        return suma;
    }
    //Funcion  para cambiar el DOM del Monto Total
    function actualizarMonto(precio){
        monto_total.innerHTML=`S/${precio}`;
    }
    //Funcion para resetear las propiedades de compra en mi carrito
    function carrito_resetear(){
        for(let i=0;i<productos.length;i++){
            productos[i].cantidad=0;
        }
    }
    function carrito_resetear_producto(parametro){
        productos[parametro].cantidad=0;
    }
    //Funicion para saber la cantida de los productos
    function total_producto(){
        let suma=0;
        for(let i=0;i<carrito.length;i++){
            suma+=carrito[i].cantidad;
        }
        return suma;
    }
    //Funcion para añadir una notificacion cada vez que Agrego un producto 
    function mostrarNotificacion(mensaje) {
        Toastify({
            newWindow:false,
            position:'left',
            text: mensaje,
            gravity:'bottom',
            duration: 1500,
            className:"Agregar_Carrito-Notificacion",
            stopOnFocus: true
        }).showToast()
    }
    //Añandiendo al carrito por cada evento
    //primero en la primera condicion
    //---------------------------------------
    function validar(){
        if(localStorage.length==0 && carrito.length==0){
            iteracion2=1;
            iteracion=0;
        }
        if(localStorage.length==1 && carrito.length==0 ){
            iteracion=1;
            iteracion2=0;
            
        }
        if(localStorage.length>0){
           
            console.log(localStorage.length);
            contador_fixed.classList.add("contenedor_fixed_visible");
        }
    }
    //---------------------------------------
    if(localStorage.length==0 && carrito.length==0){
        iteracion2=1;
    }
    if(localStorage.length==1 && carrito.length==0 ){
        iteracion=1;
        iteracion2=0;
    }
    if(localStorage.length>0){
        contador_fixed.classList.add("contenedor_fixed_visible");
    }
    if(localStorage.length==0){
        contador_fixed.classList.remove("contenedor_fixed_visible");
    }
    if(iteracion==1){
    //Pasamos la variable de mi local storage a mi variable carrito para que no se pierda informacion
    carrito=mostrar();
    //Actualizamos la variable iteradora para poder imprimir correctamente mi hmtl de cada  producto
    i=carrito.length-1;
    //Añadiendo la cantidad de los productos al DOM
    contador_fixed.innerHTML=`${total_producto()}`;
    //imprimo mi local storage para no perder informacion en el DOM
    imprimir();
    cambiar_monto=sumar_total_productos();
    actualizarMonto(cambiar_monto);
    }
    function enterCart(idProducto){
        
        validar()
        if(iteracion2==1){
        if(buscador(productos[idProducto-1].nombre) == -1){
        carrito.push(productos.find((r) => r.id == idProducto));
        carrito[i].cantidad++;
        actualizarLocal(carrito);
        crearHTML(i);
        i++;
        }else{
            if(buscador(productos[idProducto-1].nombre)!=-1){
                carrito[buscador(productos[idProducto-1].nombre)].cantidad++;  
                actualizarLocal(carrito);
                eliminar_todos_hijos();
                imprimir();
            }
        }
        cambiar_monto=sumar_total_productos();
        actualizarMonto(cambiar_monto);
       }
       if(iteracion==1){
            contador_fixed.classList.add("contenedor_fixed_visible");
        if(buscador(productos[idProducto-1].nombre) == -1){
            carrito.push(productos[idProducto-1]);
            carrito[i+1].cantidad++;
            actualizarLocal(carrito);
            crearHTML(i+1);
            i++;
            }else{
                if(buscador(productos[idProducto-1].nombre)!=-1){
                    carrito[buscador(productos[idProducto-1].nombre)].cantidad++;  
                    actualizarLocal(carrito);
                    eliminar_todos_hijos();
                    imprimir();
                }
            }
            cambiar_monto=sumar_total_productos();
            actualizarMonto(cambiar_monto);
       }
       if(localStorage.length>0){
        contador_fixed.classList.add("contenedor_fixed_visible");
    }
    //Añadiendo la cantidad de los productos al DOM luego de agregar un producto
    contador_fixed.innerHTML=`${total_producto()}`;
    //Mostrando notificacion 
    mostrarNotificacion(`Se ha agregado un producto`)
    }
    btn_fin.addEventListener("click",()=>{
        window.location.href = "/pages/finalizar_compra.html";
    })
    function eliminar_carrito(id){
        const producto=carrito.find(producto=> producto.id==id);
            if(producto.cantidad===1){
                eliminar_todos_hijos();
                producto.cantidad=0;
                productos[productos.findIndex(productos=>productos.id==id)].cantidad=0;
            	carrito.splice(carrito.findIndex(producto=>producto.id==id),1);
                i--;
                
            } else{
                eliminar_todos_hijos();
            	producto.cantidad--;
                
            }
            actualizarLocal(carrito);
            imprimir();
            if(carrito==""){localStorage.removeItem('carrito');i=0;}
            cambiar_monto=sumar_total_productos();
            actualizarMonto(cambiar_monto);
            //Añadiendo la cantidad de los productos al DOM luego de eliminar cada producto
            contador_fixed.innerHTML=`${total_producto()}`;
            if(localStorage.length==0){
                contador_fixed.classList.remove("contenedor_fixed_visible");
            }
            mostrarNotificacion(`Se ha elminado un producto`)
    }
    //Añandiendo los divs de mis productos
    function pintar_index(){
    const html= productos.map((producto)=>{
        let html1=document.createElement("div");
        html1.innerHTML=`<div class="col-12 col-md-6">
        <div class="card ">
            <div class="car-title">${producto.nombre}</div>
            <div class="card-body">
            <img  class="imagen-productos me-2 "id="pr-12"src=${producto.imagen} alt="imagen">
            <p class="card-text">s/${producto.precio}</p>
            <button id="p1" type="button" onClick="enterCart(${producto.id})" class="btn btn-success  ">AGREGAR</button>
            </div>
        </div>
    </div>`;
        añadirListas(html1);
        itemsContainer.appendChild(html1);
    })
}


//----------------------------------------------------------------------------------------
//Codigo para que mi boton de compras aparezca
const navToggle=document.querySelector(".navegador-toggle");
const navMenu=document.querySelector(".navegador-menu");
navToggle.addEventListener("click",()=>{
    navMenu.classList.toggle("navegador-menu_visible");
})
const navproductToggle=document.querySelector(".navegador-carrito");
const navMenuproduct=document.querySelector(".contenedor-carrito-productos");
navproductToggle.addEventListener("click",()=>{
    navMenuproduct.classList.toggle("contenedor-carrito_visible");
})


    