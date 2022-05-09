export default (req, res) => {
  if (req.method === 'GET') {
    res?.socket?.server?.io?.emit('clients', res?.socket?.server?.io?.engine?.clientsCount);
    res.status(201).json(res?.socket?.server?.io?.engine?.clientsCount)
  }
}