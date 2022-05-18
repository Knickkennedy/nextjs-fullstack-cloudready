import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import {useEffect, useState} from 'react';

export const siteTitle = 'Plan your next get away'

export default function Layout({children, home}) {
  const [height, setHeight] = useState('h-full max-h-full')

  const handleResize = () => {
    setHeight(height === 'h-full max-h-full' ? 'h-72 max-h-72' : 'h-full max-h-full')
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [height])

  return (
    <div className={ `${ styles.container } ${height} sm:h-full sm:max-h-full` }>
      <Head>
        <link rel="icon" href="/favicon.ico"/>
        <meta
          name="description"
          content="Maybe we can build an entire app here"
        />
        <meta
          property="og:image"
          content={ `https://og-image.vercel.app/${ encodeURI(
            siteTitle
          ) }.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg` }
        />
        <meta name="og:title" content={ siteTitle }/>
        <meta name="twitter:card" content="summary_large_image"/>
      </Head>
      <main className='min-w-[50%] overflow-y-auto'>
        { children }
      </main>
      { !home && (
        <div className={ styles.backToHome }>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      ) }
    </div>
  )
}