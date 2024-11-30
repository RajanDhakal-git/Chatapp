const express = require('express')
const app = express()

const {Server} = require('socket.io')

let server = app.listen(3000)
let io = new Server(server ,{
    cors:{
        origin:'https://chatapp-virid-eta.vercel.app/',
        methods:['GET' , 'POST']
    }
})

io.on('connection',(socket)=>{
    socket.on('msg',(data)=> socket.broadcast.emit('rec' , data))
    
})
