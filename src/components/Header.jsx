import React, { useState, useEffect, useReducer, lazy, Suspense } from 'react';
import { FaBars } from 'react-icons/fa';
// import Authentication from './Authentication';
import { MdAccountCircle } from 'react-icons/md';
import { BsFileEarmarkCode } from 'react-icons/bs';
import firebase from 'firebase/app';
import SignInModal from './SignInModal';

function Header(props) {
  const [isClosed, setisClosed] = useState(true);

  const [colorTheme, setColorTheme] = useState('blue');

  const toggleColorTheme = () => {
    setColorTheme((prevState) => (prevState === 'blue' ? 'pink' : 'blue'));
  };

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
      <header>
        <nav className="navigation">
          <div className="navWrapper">
            <div className="brand">
              <BsFileEarmarkCode />
              <p>CodingDiary</p>
            </div>
            {/* <button className="toggle" onClick={props.toggleColorTheme}>Toggle</button> */}
            <ul className={`menu ${isClosed ? null : 'open'}`}>
              <li></li>
              <li>
                {props.user !== null ? (
                  <button onClick={signOut}>Sign out</button>
                ) : (
                  <button onClick={openModal}>Sign in</button>
                )}
              </li>
              {props.fake ? <img className="avatar" src={props.fake.photoUrl} alt="" /> : null}
            </ul>
            <button className="hamburger" tabIndex="0" onClick={() => setisClosed(!isClosed)}>
              <FaBars />
            </button>
          </div>
        </nav>
        {props.user !== null ? (
          <div>
            {props.fake ? (
              <div>
                <p>HELLO CONTACT Fake {props.fake.displayName}</p>
                {/* <img src={props.fake.photoUrl} alt="" /> */}
              </div>
            ) : null}
            <p>
              Hello,{' '}
              {firebase.auth().currentUser.displayName ||
                JSON.parse(localStorage.getItem('displayName'))}
            </p>
          </div>
        ) : null}
        <SignInModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          googleSignin={() => twitterGoogleSignIn(new firebase.auth.GoogleAuthProvider())}
          handleGitHubLogin={handleGitHubLogin}
          handleTwitterLogin={() => twitterGoogleSignIn(new firebase.auth.TwitterAuthProvider())}
          signInWithEmailAndPassword={props.signInWithEmailAndPassword}
          createUserWithEmailAndPassword={props.createUserWithEmailAndPassword}
        />
      </header>
    </>
  );
}

export default Header;
