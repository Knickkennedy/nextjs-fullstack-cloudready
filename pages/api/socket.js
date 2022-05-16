import {Server} from 'socket.io'

export default async function SocketHandler(req, res) {
  if (!res.socket.server.io) {
    res.socket.server.io = new Server(res.socket.server, {
      path: '/api/socket',
    })

    const io = res.socket.server.io
    io.on('connection', (socket) => {
      const count = io?.engine?.clientsCount
      socket.emit('clients', count);

    })
  }


  res.end()
}