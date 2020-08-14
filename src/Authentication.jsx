import React, { useState, useEffect } from 'react';
import firebaseConfig from "./components/firebaseConfig.jsx";
import firebase from 'firebase/app';
import SignInModal from './components/SignInModal';

const firebaseAppAuth = firebase.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  
};


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     console.log('user is signed in')
    }
  });

 

const Authentication = (props) => {
    const [user, setUser] = useState(props.user);
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }

    const googleSignout = () => {
        firebase
        .auth()
        .signOut()
        .then(function() {
           console.log('Signout Succesfull')
           setUser(null);
     
        }, function(error) {
           console.log('Signout Failed')  
        });
     }

     const googleSignin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
         firebase
         .auth()
         .signInWithPopup(provider)
         .then(function(result) {
            const token = result.credential.accessToken;
            console.log(result.user.email);
      
            const newUser = result.user;
            console.log(token);
            console.log(newUser);
            console.log('signed in');
            setIsOpen(false);
            setUser(newUser);
            // setToken(result.user.email)
         }).catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
              
            console.log(error.code)
            console.log(error.message)
         });
      }

    const handleGitHubLogin = () => {
        const provider = new firebase.auth.GithubAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const newUser = result.user;
            console.log(result);
            // console.log('signed in')
            console.log(newUser)
            setIsOpen(false);
            setUser(newUser);
            // ...
          })
          .catch(function(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
          });
      }


      const handleTwitterLogin = () => {
        const provider = new firebase.auth.TwitterAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // const token = result.credential.accessToken;
            // The signed-in user info.
            const newUser = result.user;
            console.log("Twitter", result);
            // console.log('signed in')
            // console.log(newUser)
            // console.log('twitterSignin')
            // setIsOpen(false);
            setUser(newUser);
          })
          .catch(function(error) {
            // Handle Errors here.
            console.log('error', error)
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
          });
      }
      
      return (
          <>
          <p>Authentication</p>
          {
            user 
              ? 
              <div>
                <p>Hello, {user.displayName}</p>
                <button onClick={googleSignout}>Sign out</button>
              </div>
              : <button onClick={openModal}>Please sign in</button>
          }
           <SignInModal
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                googleSignin={googleSignin}
                handleGitHubLogin={handleGitHubLogin}
                handleTwitterLogin={handleTwitterLogin}
                signInWithEmailAndPassword={props.signInWithEmailAndPassword}
                createUserWithEmailAndPassword={props.createUserWithEmailAndPassword}
            />
          </>
      )
}

export default Authentication;