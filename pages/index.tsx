import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {auth,db} from "../firebase/clientApp";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import {collection, doc, getDocs, query, where, getFirestore, getDoc} from "firebase/firestore";


const signOut = async () => {
  await auth.signOut();
}


const Home : React.FC<any> = ({props}:any) => {
  // Router
  const router = useRouter()
  // User Info
  const [user, loading, error ] = useAuthState(auth);
  const [state , setState] = useState<{isRegistered: boolean}>({isRegistered: false});
  const [modules, setModules] = useState<{}[]>([]);


  const signIn = () => {
    router.push('/auth')
  }
  useEffect(() => {
    // Send the user to the auth page if they are not logged in
    // if (!user) {
    //   router.push("/auth");
    // }

    fetchModules();
  },[]);

  const fetchModules = async () => {
    await getDocs(collection(db,"modules")).then((querySnapshot)=>{
      const newData = querySnapshot.docs
          .map((doc)=> {
           return  {...doc.data(),id:doc.id}
          });

      setModules([...newData]);
    })
  }



  return (

    <div className={styles.container}>
      <Head>
        <title>Roberto Next App</title>
        <meta name="description" content="A Typescript React Next.js FireBase FireStore App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>

        <div className={styles.navBar}>
          {user ? `Signed in as: ${user.displayName} | Thanks for signing in.`: 'A Typescript React Next.js FireBase FireStore App'}
          {/*{user!.photoURL? <img src={user!.photoURL} alt={`Photo of ${user!.displayName}`}/> : ''}*/}
        </div>
          <ul className={styles.headerButtons}>
      {user ? (
          <li  className={styles.btn}>
           <a onClick={signOut} className={styles.headerHoverUnderlineAnimation}>Sign Out</a>
          </li>
      ) : (
            <li  className={styles.btn}>
              <a onClick={signIn} className={styles.headerHoverUnderlineAnimation}>Sign in</a>
            </li>
      ) }
        <li  className={styles.btn}>
          <a onClick={()=>{router.push('https://www.robertocannella.com')}}
             className={styles.headerHoverUnderlineAnimation}>My Home Page</a>
        </li>
        <li  className={styles.btn}>
         <a onClick={()=>{router.push('https://github.com/robertocannella')}}
            className={styles.headerHoverUnderlineAnimation}>My GitHub</a>
        </li>
          </ul>
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome!
        </h1>
        <p className={styles.description}>
          <code className={styles.code}>This is a Test Next.js Site. {user ? '': 'Sign in to see more functionality!'}</code>
        </p>

        <h2>&lt; Here are the things I will install &gt;</h2>
        <div className={styles.grid}>

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Next.js &rarr;</h2>
            <p>Active on this install</p>
            <ul><li>Framework build on React</li></ul>
          </a>

          <a href="https://nextjs.org/learn/seo/introduction-to-seo" className={styles.card}>
            <h2>ServerSide Rendering &rarr;</h2>
            <p>Not active on this install</p>
            <ul><li>Improves SEO</li></ul>
          </a>

          <a href="https://cloud.google.com/functions" className={styles.card}>
            <h2>Google Cloud Functions &rarr;</h2>
            <p>Not active on this install</p>
            <ul><li>Run code in the cloud</li><li>Designed around event driven architectures</li></ul>
          </a>

          <a href="https://fontawesome.com/" className={styles.card}>
            <h2>Font Awesome &rarr;</h2>
            <p>Not active on this install</p>
            <ul><li>Great looking SVG font library</li><li>Requires customization under Next.js</li></ul>
          </a>

          <a href="https://www.typescriptlang.org/" className={styles.card}>
            <h2>TypeScript &rarr;</h2>
            <p>Active on this install</p>
            <ul><li>Strongly typed software always wins</li></ul>
          </a>

          <a
            href="https://console.firebase.google.com/"
            className={styles.card}
          >
            <h2>FireStore Data Base &rarr;</h2>
            <p>Active on this install</p>
            <ul><li>Real time database updates</li></ul>

          </a>

          <a
            href="https://firebase.google.com/docs?authuser=0&hl=en"
            className={styles.card}
          >
            <h2>Authentication. &rarr;</h2>
            <p>
              Active on this install.
            </p>
            <ul><li>GitHub</li><li>Google</li></ul>

          </a>
        </div>
      </main>

        <table className={styles.packageTable}>
          <thead className={styles.packageTableHead}>
          <tr>
            <th>Order</th><th>Module</th><th>Installed</th><th>Deployed</th>
          </tr>
          </thead>
          <tbody>
          {modules.map((module:any)=>(
              <tr key={module.id}>
          <td>{module.order}</td><td>{module.name}</td><td>{module.installed ? 'Y' : '×'}</td><td>{module.deployed ? 'Y' : '×'}</td>

              </tr>
          ))}

          </tbody>
        </table>



      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Next.js created by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>


        </a>
        <span>Hosted at Google FireBase</span>
      </footer>
    </div>
  )
}

export default Home
