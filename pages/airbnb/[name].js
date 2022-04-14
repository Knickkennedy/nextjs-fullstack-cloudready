import Head from "next/head";
import {useRouter} from "next/router";
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css'

export default function listing({clickAmount, increment}) {
  const router = useRouter()
  const data = router.query

  return (
    <Layout>
      <Head>
        <title>{ data.name }</title>
      </Head>
      <section>
        <h1 className={ utilStyles.headingXl }>
          { data.name }
        </h1>
        <div>
          { data.summary }
        </div>

      </section>
      <section className={ `utilStyles.headingMd container`}>
        <p className={utilStyles.lightText}>
        You clicked this button <strong>{clickAmount}</strong> times! This was passed globally from our app and will appear on subpages.
      </p>
      <button onClick={increment}>
        Click Me
      </button>
      </section>
    </Layout>
  )
}