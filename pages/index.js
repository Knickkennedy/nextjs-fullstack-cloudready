import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import Link from 'next/link'
import Layout from "../components/layout";
import utilStyles from '../styles/utils.module.css'

export default function Home({isConnected, listings, clickAmount, increment}) {
  return (
    <Layout home>
      <Head>
        <title>Next Mongo App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <section className={ `utilStyles.headingMd container`}>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js with MongoDB!</a>
        </h1>
      </section>
      <section className={ `utilStyles.headingMd container`}>
        <p className={utilStyles.lightText}>
        You clicked this button <strong>{clickAmount}</strong> times! This was passed globally from our app and will appear on subpages.
      </p>
      <button onClick={increment}>
        Click Me
      </button>
      </section>
      <section className={ `${ utilStyles.headingMd } ${ utilStyles.padding1px } container` }>
        { isConnected ? (
          <>
            <h2 className={ utilStyles.headingLg }>You are connected to MongoDB</h2>
            <ul className={ utilStyles.list }>
              {
                listings.map(listing => {
                  return (
                    <li className={ utilStyles.listItem } key={ listing.name }>
                      <Link href={ {
                        pathname: `/airbnb/${ encodeURIComponent(listing.name) }`,
                        query: listing
                      } }>
                        <a>Go to { listing.name }</a>
                      </Link>
                      <br/>
                    </li>
                  )
                })
              }
            </ul>
          </>
        ) : (
          <h2 className={ utilStyles.headingLg }>
            You are NOT connected to MongoDB. Check the <code>README.md</code>{ ' ' }
            for instructions.
          </h2>
        ) }
      </section>
      <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p>
       <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>
        </div>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{ ' ' }
          <img src="/vercel.svg" alt="Vercel Logo" className="logo"/>
        </a>
      </footer>

      <style jsx="true" >{ `
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
