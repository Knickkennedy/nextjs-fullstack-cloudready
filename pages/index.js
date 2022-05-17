import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import Layout from '../components/layout'
import {useEffect, useState} from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'
import Chatbox from '../components/chatbox'

export default function Home(props) {
  const {data: session} = useSession()
  const [user, setUser] = useState('')

  useEffect(() => {
    let user = session?.user?.name?.split(' ')
    setUser(user ? user[0] : 'anonymous')
  }, [session])


  const renderUser = () => {

    return (
      session ? <>Signed in as { session.user.email } <br/>
        <button className='bg-blue-500 rounded shadow text-sm text-white h-full px-2 m-4'
                onClick={ () => signOut() }>Sign Out
        </button>
      </> : <>
        Not signed in <br/>
        <button className='bg-blue-500 rounded shadow text-sm text-white h-full px-2 m-4'
                onClick={ () => signIn() }>Sign In
        </button>
      </>
    )
  }

  return (
    <Layout home>
      <Head>
        <title>Untitled Travel App</title>
        <link rel="stylesheet" href="https://use.typekit.net/oov2wcw.css"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <section className={ `utilStyles.headingMd container` }
      >
        { renderUser() }
      </section>
      <div className='flex flex-col w-full h-72 max-h-72'>
        <div className="py-2 text-white  bg-blue-500 top-0 rounded-t-lg">
          <h1 className="text-center text-2xl font-semibold">Untitled Travel App</h1>
          <h2 className="mt-2 text-center">Chat Room</h2>
        </div>
        <Chatbox user={ user }/>
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
        listings,
      },
    }
  } catch (e) {
    console.error(e)
    return {
      props: {isConnected: false},
    }
  }
}
