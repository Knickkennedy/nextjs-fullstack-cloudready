import {Server} from 'socket.io'

export default async function SocketHandler(req, res){
  if(!res.socket.server.io){
    res.socket.server.io = new Server(res.socket.server, {
      path: '/api/socket',
    })
  }

  res.end()
}