const socket = io();

socket.emit("mensaje", "Mensaje enviado desde el cliente al servidor");
socket.on("mesagge", (data) => {
  console.log(data);
});

const productsRealTime = document.querySelector("#productsRealTime");
const formulario = document
  .querySelector(".formulario")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    let producto = {
      title: document.querySelector("#nombre").value,
      description: document.querySelector("#descripcion").value,
      price: document.querySelector("#precio").value,
      thumbnail: document.querySelector("#url").value,
      code: document.querySelector("#codigo").value,
      status: true,
      stock: document.querySelector("#stock").value,
    };
    socket.emit("productoNuevo", producto);
});
const formularioEliminar = document
  .querySelector(".formularioEliminar")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    let idEliminar = Number(document.querySelector("#idDelete").value)
    socket.emit("idEliminar", idEliminar);
});
socket.on("products", (data) => {
  productsRealTime.innerHTML = "";
  data.forEach(function (e) {
    productsRealTime.innerHTML += `
       <ul>
    <li><h3>Nombre: ${e.title}</h3></li>
    <li>Description: ${e.description} </li>
    <li>Precio: ${e.price} </li>
    <li>Imagenes: ${e.thumbnail} </li>
    <li>Codigo: ${e.code} </li>
    <li>Stock: ${e.stock} </li>
    <li>ID: ${e.id} </li>
</ul>
    `;
  }); 
});




