import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import Layout from "../components/layout";
import {useEffect, useState, useRef} from "react";
import {useSession, signIn, signOut} from "next-auth/react";
import io from 'socket.io-client'

export default function Home() {
  const {data: session} = useSession()
  const [input, setInput] = useState('')
  const [chat, setChat] = useState([])
  const [message, setMessage] = useState('')
  const [user, setUser] = useState('')
  const inputRef = useRef(null)
  const [connected, setConnected] = useState(false)
  let socket

  useEffect(() => {

    setUser(session ? session.user.email : 'Knick')
    const socket = io(process.env.BASE_URL, {
      path: '/api/socket',
    })

    console.log(socket.id)

    socket.on('connect', () => {
      console.log('socket connected', socket.id)
      setConnected(true)
    })

    socket.on('message', (message) => {
      chat.push(message)
      setChat([...chat])
    })

    if (socket) return () => socket.disconnect()
  }, [])

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

      if(response.ok) setMessage('')
    }

    inputRef?.current?.focus()
  }

  const renderUser = () => {

    return (
      session ? <>Signed in as { session.user.email } <br/>
        <button onClick={ () => signOut() }>Sign Out</button>
      </> : <>
        Not signed in <br/>
        <button onClick={ () => signIn() }>Sign In</button>
      </>
    )
  }

  return (
    <Layout home>
      <Head>
        <title>I love you, nerdler!</title>
        <link rel="stylesheet" href="https://use.typekit.net/oov2wcw.css"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <section className={ `utilStyles.headingMd container` }
      >
        { renderUser() }
      </section>
      <div className="flex flex-col w-full h-screen">
        <div className="py-4 text-white  bg-blue-500 sticky top-0">
          <h1 className="text-center text-2xl font-semibold">Realtime Chat App</h1>
          <h2 className="mt-2 text-center">in Next.js and Socket.io</h2>
        </div>
        <div className="flex flex-col flex-1 bg-gray-200">
          <div className="flex-1 p-4 font-mono">
            { chat.length ? (
              chat.map((chat, i) => (
                <div key={ "msg_" + i } className="mt-1">
                <span>
                  { chat.user === user ? "Me" : chat.user }
                </span>
                  : { chat.data }
                </div>
              ))
            ) : (
              <div className="text-sm text-center text-gray-400 py-6">
                No chat messages
              </div>
            ) }
          </div>
          <div className="bg-gray-400 p-4 h-20 sticky bottom-0">
            <div className="flex flex-row flex-1 h-full divide-gray-200 divide-x">
              <div className="pr-2 flex-1">
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
                <button
                  className="bg-blue-500 rounded shadow text-sm text-white h-full px-2"
                  onClick={ sendMessage }
                  disabled={ !connected }
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{ `
        .container {
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          max-width: 30%;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      ` }</style>

      <style jsx="true" global="true">{ `
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      ` }</style>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise
    const database = client.db('sample_airbnb')
    const listingsAndReviews = database.collection('listingsAndReviews')

    const options = {
      projection: {_id: 0, name: 1, summary: 1},
      limit: 10
    }

    const listingList = await listingsAndReviews.find({}, options)

    const listings = await listingList.toArray()

    return {
      props: {
        isConnected: true,
        listings
      },
    }
  } catch (e) {
    console.error(e)
    return {
      props: {isConnected: false},
    }
  }
}
