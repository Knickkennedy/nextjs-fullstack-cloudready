export default (req, res) => {
  if (req.method === 'GET') {
    const count = res?.socket?.server?.io?.engine?.clientsCount
    const json = JSON.stringify({clientCount: count})
    res?.socket?.server?.io?.emit('clients', count);
    res.status(201).json(json)
  }
}