import '../styles/globals.css'
import {useState} from "react";
import {SessionProvider} from "next-auth/react"
import Head from 'next/head'

export default function App({
                              Component,
                              pageProps: {session, ...pageProps},

                            }) {

  // Example of how easy global context is in Next.Js!

  const [clickAmount, setClickAmount] = useState(0)
  const increment = () => {
    setClickAmount((amount) => amount + 1)
  }

  return (
    <SessionProvider session={ session }>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <Component
        { ...pageProps }
        clickAmount={ clickAmount }
        increment={ increment }
      />
    </SessionProvider>
  )
}