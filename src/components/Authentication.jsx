import React, { useState } from 'react';
import firebase from 'firebase/app';
import SignInModal from './SignInModal';

const Authentication = (props) => {
  const [email, setEmail] = useState('hello@hh');

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          props.handleUserChange(null);
          props.handleLogIn(false);
        },
        function (error) {
          console.log('Signout Failed');
        }
      );
  };

  const twitterGoogleSignIn = (enteredProvider) => {
    const provider = enteredProvider;
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const token = result.credential.accessToken;
        setIsOpen(false);
        props.handleLogIn(true);
      })
      .catch(function (error) {
        console.log('error', error.code, error.message, error.credential);
      });
  };

  const handleGitHubLogin = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('public_repo');
    provider.addScope('read:org');
    provider.addScope('read:user');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        setIsOpen(false);
        props.handleLogIn(true);
        props.handleDisplayName(result.additionalUserInfo.username);
      })
      .catch(function (error) {
        console.log(error.code, error.message, error.email, error.credential);
      });
  };

  return (
    <>
      {props.user !== null ? (
        <div>
          {props.fake ? (
            <div>
              <p>HELLO CONTACT Fake {props.fake.displayName}</p>
              <img src={props.fake.photoUrl} alt="" />
            </div>
          ) : null}
          <p>
            Hello,{' '}
            {firebase.auth().currentUser.displayName ||
              JSON.parse(localStorage.getItem('displayName'))}
          </p>
          <button onClick={signOut}>Sign out</button>
        </div>
      ) : (
        <button onClick={openModal}>Please sign in</button>
      )}
      <SignInModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        googleSignin={() => twitterGoogleSignIn(new firebase.auth.GoogleAuthProvider())}
        handleGitHubLogin={handleGitHubLogin}
        handleTwitterLogin={() => twitterGoogleSignIn(new firebase.auth.TwitterAuthProvider())}
        signInWithEmailAndPassword={props.signInWithEmailAndPassword}
        createUserWithEmailAndPassword={props.createUserWithEmailAndPassword}
      />
    </>
  );
};

export default Authentication;
