import '../styles/global.css'
import {useState} from "react";
import {SessionProvider} from "next-auth/react"

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
      <Component
        { ...pageProps }
        clickAmount={ clickAmount }
        increment={ increment }
      />
    </SessionProvider>
  )
}