import Head from "next/head";
import {useRouter} from "next/router";

export default function listing() {
  const router = useRouter()
  const data = router.query

  console.log(data)

  return (
    <>
      {
        Object.entries(data).map((object) => {
          return (
            <div key={object.toString()}>
              <div>{ object[0] }: {' '}{object[1]}</div>
            </div>
          )
        })
      }
    </>
  )
}