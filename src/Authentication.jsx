import React, { useState, useEffect } from 'react';
import firebaseConfig from "./components/firebaseConfig.jsx";
import firebase from 'firebase/app';
import SignInModal from './components/SignInModal';
import styled, { css } from 'styled-components'


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
    const [email, setEmail] = useState('hello@hh');

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

    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: 'https://localhost:3000/',
        // This must be true.
        handleCodeInApp: true,
        // iOS: {
        //   bundleId: 'com.example.ios'
        // },
        // android: {
        //   packageName: 'com.example.android',
        //   installApp: true,
        //   minimumVersion: '12'
        // },
        dynamicLinkDomain: 'https://localhost:3000/'
    };

    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
        .then(function() {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem('emailForSignIn', email);
        })
        .catch(function(error) {
            // Some error occurred, you can inspect the code: error.code
    });

    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation');
    }
    // The client SDK will parse the code from the link for you.
    firebase.auth().signInWithEmailLink(email, window.location.href)
      .then(function(result) {
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
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


    const handleGitHubLogin = async () => {
      setIsOpen(false);
      console.log("signing")
        const provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('public_repo');
        provider.addScope('read:org');
        provider.addScope('read:user');
        const result = await firebase
          .auth()
          .signInWithPopup(provider);
          // const token = result.credential.accessToken;
          // The signed-in user info.
          const newUser = result.user;
          console.log(result);
          // console.log('signed in')
          console.log(newUser)
          setUser(newUser);
          setIsOpen(false);
          
          // .then(function(result) {
          //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          //   // ...
          // })
          // .catch(function(error) {
          //   // Handle Errors here.
          //   const errorCode = error.code;
          //   const errorMessage = error.message;
          //   // The email of the user's account used.
          //   const email = error.email;
          //   // The firebase.auth.AuthCredential type that was used.
          //   const credential = error.credential;
          //   // ...
          // });
      }


      const handleTwitterLogin = () => {
        const provider = new firebase.auth.TwitterAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function(result) {
            // This gives you a Twitter Access Token. You can use it to access the Twitter API.
            const token = result.credential.accessToken;
            const secret = result.credential.secret;
            // The signed-in user info
            const newUser = result.user;
            console.log("Twitter", result);
            // console.log('signed in')
            // console.log(newUser)
            // console.log('twitterSignin')
            // setIsOpen(false);
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
            user 
              ? 
              <div>
                <p>Hello, {user.displayName}</p>
                <button onClick={signOut}>Sign out</button>
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