import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Roberto Next App</title>
        <meta name="description" content="A Typescript React Next.js FireBase FireStore App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          <code className={styles.code}>This is a Test Next.js Site</code>
        </p>

        <p>Here are the things I will install</p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Next.js &rarr;</h2>
            <p>Active on this install</p>
          </a>

          <a href="https://www.typescriptlang.org/" className={styles.card}>
            <h2>TypeScript &rarr;</h2>
            <p>Active on this install</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>FireStore Data Base &rarr;</h2>
            <p>Realtime data updates: Not yet active</p>
          </a>

          <a
            href="https://firebase.google.com/docs?authuser=0&hl=en"
            className={styles.card}
          >
            <h2>Authentication. &rarr;</h2>
            <p>
              Fire Base Auth: Not yet active.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
