import '../styles/global.css'
import {useState} from "react";

export default function App({Component, pageProps}) {

  // Example of how easy global context is in Next.Js!

  const [clickAmount, setClickAmount] = useState(0)
  const increment = () => {
    setClickAmount((amount) => amount + 1)
  }

  return (
    <Component
      { ...pageProps }
      clickAmount={clickAmount}
      increment={increment}
    />
  )
}