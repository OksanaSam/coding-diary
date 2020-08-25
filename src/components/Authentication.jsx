import React, { useState, useEffect, useContext} from 'react';
import firebaseConfig from "./firebaseConfig.jsx";
import firebase from 'firebase/app';
import SignInModal from './SignInModal';
import { UserContext } from '../App'
// import styled, { css } from 'styled-components'


const firebaseAppAuth = firebase.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  
};


const Authentication = (props) => {

  const newUser = useContext(UserContext);

    const [user, setUser] = useState(props.user);
    const [displayNameTwo, setDisplayNameTwo] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('hello@hh');

    // useEffect(({ displayName } = props) => {
    //   setDisplayNameTwo(displayName)
    // }, [props.displayName])

    // firebase.auth().onAuthStateChanged(user => {
    //   if (user !== null) {
    //     const dbUser = {
    //       email: user.email,
    //       displayName: user.displayName,
    //       photoUrl: user.photoURL,
    //       uid: user.uid
    //     }
    //     firebase.database().ref('users/' + user.uid).set(dbUser);
    //     // setUser(firebase.auth().currentUser.displayName);
    //     props.handleUserChange(firebase.auth().currentUser.displayName)

    //     // setDisplayName()
    //     console.log(firebase.auth().currentUser.displayName);
    //   } else {
    //     console.log('no user');
    //   }
    // });


  

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const signOut = () => {
        firebase
        .auth()
        .signOut()
        .then(function() {
           console.log('Signout Succesfull')
          //  setUser(null);
           props.handleUserChange(null)
           props.handleLogIn(false)
           
     
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
      
            const newUser = result.user.displayName;
            console.log('signed in');
            console.log('newUser', newUser);
            setIsOpen(false);
            // setDisplayNameTwo(result.user.displayName);
            // setUser({...user, display: result.user.displayName});
            props.handleLogIn(true)
            // setToken(result.user.email)
         }).catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
              
            console.log(error.code)
            console.log(error.message)
         });
      }

    const actionCodeSettings = {
        url: 'https://localhost:3000/',
        handleCodeInApp: true,
        dynamicLinkDomain: 'https://localhost:3000/'
    };

    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
        .then(function() {
            window.localStorage.setItem('emailForSignIn', email);
        })
        .catch(function(error) {
            // Some error occurred, you can inspect the code: error.code
    });

    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
    firebase.auth().signInWithEmailLink(email, window.location.href)
      .then(function(result) {
        window.localStorage.removeItem('emailForSignIn');
      })
      .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
      });
  }


    //Linking/re-authentication with email link

    // Construct the email link credential from the current URL.
    // let credential = firebase.auth.EmailAuthProvider.credentialWithLink(
    //     email, window.location.href);

    // // Link the credential to the current user.
    // firebase.auth().currentUser.linkWithCredential(credential)
    // .then(function(usercred) {
    //     // The provider is now successfully linked.
    //     // The phone user can now sign in with their phone number or email.
    // })
    // .catch(function(error) {
    //     // Some error occurred.
    // });


    const handleGitHubLogin = () => {
        const provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('public_repo');
        provider.addScope('read:org');
        provider.addScope('read:user');
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function(result) {
            // const token = result.credential.accessToken;
            const userDisplayName = result.additionalUserInfo.username;
            const newUser = result.user.u.uid;
            console.log(userDisplayName, result.user.uid);
            setUser(userDisplayName);
            setDisplayNameTwo(userDisplayName);
            setIsOpen(false);

          })
          .catch(function(error) {
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
            const token = result.credential.accessToken;
            const secret = result.credential.secret;
            const newUser = result.user;
            setDisplayNameTwo(newUser.displayName);
            setUser(newUser);
            setIsOpen(false);
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

//       const Button = styled.button`
//         background: transparent;
//         border-radius: 3px;
//         border: 2px solid blue;
//         color: darkblue;
//         margin: 0 1em;
//         padding: 0.25em 1em;

//         ${props =>
//           props.primary &&
//           css`
//             background: blue;
//             color: white;
//       `};
// `

      return (
          <>
          <p>Authentication</p>
          {
            (props.user !== null) 
              ?   
              (<div>
                <p>Hello, {props.user}</p>
                <button onClick={signOut}>Sign out</button>
              </div>)
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