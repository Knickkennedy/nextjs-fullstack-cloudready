import {useEffect, useRef, useState} from 'react'
import io from 'socket.io-client'
import Button from "./button";

export default function Chatbox(props) {
  const [user, setUser] = useState('')
  const [numberOfClients, setNumberOfClients] = useState(null)
  const [connected, setConnected] = useState(false)
  const [message, setMessage] = useState('')
  const [chatLog, setChatLog] = useState([])
  const inputRef = useRef(null)
  let socket

  useEffect(() => {
    socket = io(process.env.BASE_URL, {
      path: '/api/socket',
    })

    socket.on('connect', () => {
      setConnected(true)
    })

    socket.on('message', (message) => {
      chatLog.unshift(message)
      setChatLog([...chatLog])
    })

    socket.on('clients', (clientCount) => {
      setNumberOfClients(clientCount)
    })

    if (socket) return () => socket.disconnect()

  }, [])

  useEffect(() => {
    setUser(props.user)
  }, [props.user])

  const sendMessage = async () => {
    if (message) {
      const msg = {
        user: user,
        data: message
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(msg)
      })

      if (response.ok) setMessage('')
    }

    inputRef?.current?.focus()
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-200 rounded-b-lg overflow-auto">
      <div className="flex flex-1 flex-col-reverse font-mono overflow-auto">
        { chatLog.length ? (
          chatLog.map((chat, i) => (
            <div key={ "msg_" + i }
                 className={ `bg-white text-sm p-2 mb-1 mt-1 mx-4 ${ chat.user === user ? 'self-end rounded-l-md rounded-tr-md' : 'rounded-r-md rounded-tl-md' }` }>
                <span>
                  { chat.user === user ? "" : chat.user + ': ' }
                </span>
              { chat.data }
            </div>
          ))
        ) : (
          <div className="text-sm text-center text-gray-400 py-6">
            No chat messages
          </div>
        ) }
      </div>
      <div className="bg-gray-400 p-4 h-20 relative bottom-0 rounded-b-lg">
        <div className="flex flex-row flex-1 h-full divide-gray-200 divide-x">
          <div className="pr-2 flex-1 text-sm">
            <input
              ref={ inputRef }
              type="text"
              value={ message }
              placeholder={ connected ? "Type a message..." : "Connecting..." }
              className="w-full h-full rounded shadow border-gray-400 border px-2"
              disabled={ !connected }
              onChange={ (e) => {
                setMessage(e.target.value);
              } }
              onKeyPress={ (e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              } }
            />
          </div>
          <div className="flex flex-col justify-center items-stretch pl-2">
            <Button
              className="bg-blue-500 rounded shadow text-sm text-white h-full px-2"
              onClick={ sendMessage }
              disabled={ !connected }
            >
              SEND
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}