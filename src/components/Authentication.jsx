import React, { useState, useContext} from 'react';
import firebase from 'firebase/app';
import SignInModal from './SignInModal';
import { UserContext } from '../App'


const Authentication = (props) => {
  const newUser = useContext(UserContext);
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
          props.handleUserChange(null);
          props.handleLogIn(false);
      }, function(error) {
          console.log('Signout Failed')
      });
    }

  const twitterGoogleSignIn = (enteredProvider) => {
    const provider = enteredProvider;
    firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      const token = result.credential.accessToken;
      setIsOpen(false);
      props.handleLogIn(true);
    }).catch(function(error) {
      console.log('error', error.code, error.message, error.credential)
    });
  }

  const handleGitHubLogin = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope('public_repo');
  provider.addScope('read:org');
  provider.addScope('read:user');
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      setIsOpen(false);
      props.handleLogIn(true);
      props.handleDisplayName(result.additionalUserInfo.username);
    })
    .catch(function(error) {
      console.log(error.code, error.message, error.email, error.credential)
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

    return (
        <>
        <p>Authentication</p>
        {
          (props.user !== null) 
            ?   
            (<div>
              {(props.fake) ?
              (
              <div>
                <p>HELLO CONTACT Fake {props.fake.displayName}</p>
                <img src={props.fake.photoUrl} alt=""/>
              </div>
              )
              : null}
              <p>Hello, { firebase.auth().currentUser.displayName || JSON.parse(localStorage.getItem('displayName')) }</p>
              <button onClick={signOut}>Sign out</button>
            </div>)
            : <button onClick={openModal}>Please sign in</button>
        }
          <SignInModal
              modalIsOpen={modalIsOpen}
              closeModal={closeModal}
              googleSignin={()=>twitterGoogleSignIn(new firebase.auth.GoogleAuthProvider())}
              handleGitHubLogin={handleGitHubLogin}
              handleTwitterLogin={()=>twitterGoogleSignIn(new firebase.auth.TwitterAuthProvider())}
              signInWithEmailAndPassword={props.signInWithEmailAndPassword}
              createUserWithEmailAndPassword={props.createUserWithEmailAndPassword}
          />
        </>
    )
  }

export default Authentication;