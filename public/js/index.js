const socket = io()
socket.emit("mensaje", "Mensaje enviado desde el cliente al servidor")
socket.on("mesagge", data => {
    console.log(data)
})
socket.on("products", products => {
    console.log(products)
})