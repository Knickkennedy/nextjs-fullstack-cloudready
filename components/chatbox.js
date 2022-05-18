import {useEffect, useRef, useState} from 'react'
import io from 'socket.io-client'
import Button from "./button";
import {KeyboardAvoidingView, Platform, TextInput} from "react-native-web";

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

  const sendMessage = async (e) => {
    e.preventDefault()
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

  const style = {
    display: 'flex',
    flex: '1 1 0%',
    '--tw-bg-opacity': '1',
    'background-color': 'rgba(229, 231, 235, var(--tw-bg-opacity))',
    'border-bottom-right-radius': '0.5rem',
    'border-bottom-left-radius': '0.5rem',
    'overflow-y': 'auto'
  }

  const textInputStyle = {
    'width': '100%',
    'height': '100%',
    'border-radius': '0.25rem',
    '--tw-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    'box-shadow': 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
    '--tw-border-opacity': '1',
    'border-color': 'rgba(156, 163, 175, var(--tw-border-opacity))',
    'padding-left': '0.5rem',
    'padding-right': '0.5rem',
    'background-color': 'white'
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
        style={ style }
        keyboardVerticalOffset={ 0 }
      >
        <div className='flex flex-auto flex-col-reverse font-mono overflow-y-auto h-40 max-h-40'>
          { chatLog.length ? (
            chatLog.map((chat, i) => (
              <div key={ "msg_" + i }
                   className={ `bg-white text-sm p-2 mb-1 mt-1 mx-4 max-w-[45%] ${ chat.user === user ? 'self-end rounded-l-md rounded-tr-md' : 'rounded-r-md rounded-tl-md' }` }>
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
          <div className="flex flex-row flex-1 h-full divide-x divide-gray-200 ">
            <div className="pr-2 flex-1 text-sm">
              <TextInput
                blurOnSubmit={false}
                ref={ inputRef }
                type="text"
                value={ message }
                placeholder={ connected ? "Type a message..." : "Connecting..." }
                style={textInputStyle}
                disabled={ !connected }
                onChange={ (e) => {
                  setMessage(e.target.value);
                } }
                onKeyPress={ (e) => {
                  if (e.key === "Enter") {
                    sendMessage(e);
                  }
                } }
              />
            </div>
            <div className="flex flex-col justify-center items-stretch pl-2">
              <Button
                id='send-button'
                className="bg-blue-500 rounded shadow text-sm text-white h-full px-2"
                onClick={ (e) => sendMessage(e) }
                disabled={ !connected }
              >
                SEND
              </Button>
            </div>
          </div>
        </div>
      </KeyboardAvoidingView>
    </>
  )
}