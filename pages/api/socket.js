import {Server} from 'socket.io'

export default async function SocketHandler(req, res){
  if(!res.socket.server.io){
    res.socket.server.io = new Server(res.socket.server, {
      path: '/api/socket',
    })
  }

  console.log(res.socket.server.io.engine.clientsCount)
  console.log(res.socket.server.io.of('/').sockets.size)

  res.end()
}