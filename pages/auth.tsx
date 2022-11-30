// auth.tsx
import React from "react";
import {NextPage} from "next";
import app, {auth , db} from "../firebase/clientApp";
import {getAuth, getRedirectResult, GoogleAuthProvider, GithubAuthProvider,
    fetchSignInMethodsForEmail, signInWithEmailAndPassword,signInWithPopup, signInWithRedirect} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import {addDoc, collection, getDocs, query, where} from "firebase/firestore";
import {UserCredential} from "firebase/auth";
import styles from '../styles/Auth.module.css'



// getRedirectResult(auth)
//     .then( (result) => {
//         // This gives you a Google Access Token. You can use it to access Google APIs.
//         if (!result)
//             throw Error;
//
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential!.accessToken;
//
//         // The signed-in user info.
//         const user = result.user;
//         console.log("user", user)
//     }).catch((error) => {
//     // Handle Errors here.
//     console.log(error)
// });

const Auth:NextPage = () => {

    const auth = getAuth(app);
    const googleAuthProvider = new GoogleAuthProvider();
    const gitHubAuthProvider = new GithubAuthProvider()
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter()

    if (loading) {
        return <div>Loading...</div>
    }
    if (user) {
        router.push('/')
        return <div>Loading...</div>
    }
    const popUpSignUp = async (authProvider: GoogleAuthProvider | GithubAuthProvider) => {
        try {

            const res = await signInWithPopup(auth, authProvider);
            const user = res.user;
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            console.log(docs)
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: authProvider.providerId,
                    email: user.email,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                });
            }
        } catch (error: any) {
            console.error(error)
            //handleAuthAccountExists(auth,error,router,authProvider)
        }
    }
    const redirectSignUp = async (authProvider: GoogleAuthProvider | GithubAuthProvider) => {
        await signInWithRedirect(auth, authProvider)
        try {
            const result: UserCredential | null = await getRedirectResult(auth);
            if (!result) {
                throw new Error(`"result is NULL`)
            }
            ;

            const credential = GithubAuthProvider.credentialFromResult(result);
            if (credential) {
                const token = credential.accessToken
            }
            ;

            const user = result.user
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: authProvider.providerId,
                    email: user.email,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                });
            }
        } catch (err: any) {
            if (err.code === 'auth/account-exists-with-different-credential') {
                //handleAuthAccountExists(auth, err,router,authProvider)
            }

        }

    }
    return (
        <div>
            <h1>Next Js Login Login</h1>
            <p>Please sign-in:</p>
            <button className={styles.google} onClick={() => {
                popUpSignUp(googleAuthProvider)
            }}>Sign in and Register With Google
            </button>
            <button className={styles.gitHub} onClick={() => {
                redirectSignUp(gitHubAuthProvider)
            }}>Sign in and Register With GitHub
            </button>
            <div id="firebaseui-auth-container"></div>
        </div>
    );
    function promptUserForPassword(): string {
        alert("Enter Password")
        return "password"
    }


    function handleAuthAccountExists  (auth: any, error: any,router:any,authProvider:any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log("handleAccountExists")
        let pendingCred = error.credential;


        // Get sign-in methods for this email.
        fetchSignInMethodsForEmail(auth,email).then(function (methods: any) {
            console.log("fetching emails")
            // Step 3.
            // If the user has several sign-in methods,
            // the first method in the list will be the "recommended" method to use.
            console.log(methods[0])
            if (methods[0] !== authProvider) {
                // Asks the user their password.
                // In real scenario, you should handle this asynchronously.
                let password = promptUserForPassword(); // TODO: implement promptUserForPassword.
                signInWithEmailAndPassword(auth, email, password).then(function (result: any) {
                    // Step 4a.
                    console.log(result)
                    return result.user.linkWithCredential(pendingCred);
                }).then(function () {
                    // GitHub account successfully linked to the existing Firebase user.
                    console.log("redirecting after failed attempt")
                    //router.push('/')
                });
                return;
            }
        });
    }

}
export default Auth;