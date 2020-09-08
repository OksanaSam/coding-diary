import React, { useState } from 'react';
import { BsFileEarmarkCode } from 'react-icons/bs';
import firebase from 'firebase/app';
import SignInModal from './SignInModal';
import Swal from 'sweetalert2';

function Header(props) {
  // Sign-In Modal
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Sign In with Twitter and Google via Firebase
  const twitterGoogleSignIn = (enteredProvider) => {
    const provider = enteredProvider;
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        setIsOpen(false);
        props.handleLogIn(true);
      })
      .catch(function (error) {
        Swal.fire({
          title: 'Oops...',
          text: `An error ${error.message} occurred`,
          confirmButtonText: 'Ok',
        });
      });
  };

  // Sign In with GitHub via Firebase
  const handleGitHubLogin = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('public_repo');
    provider.addScope('read:org');
    provider.addScope('read:user');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        setIsOpen(false);
        props.handleLogIn(true);
      })
      .catch((error) => {
        Swal.fire({
          title: 'Oops...',
          text: `An error ${error.message} occurred`,
          confirmButtonText: 'Ok',
        });
      });
  };

  // Sign Out with all providers via Firebase
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          props.handleUserChange(null);
          props.handleLogIn(false);
          props.handleUserInfo(null);
        },
        (error) => {
          Swal.fire({
            title: 'Oops...',
            text: `Signout failed, an error ${error.message} occurred`,
            confirmButtonText: 'Ok',
          });
        }
      );
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
            <ul className="menu">
              <li>
                {props.user !== null ? (
                  <button onClick={signOut}>Sign out</button>
                ) : (
                  <button onClick={openModal}>Sign in</button>
                )}
              </li>
              {props.userInfo ? (
                <img className="avatar" src={props.userInfo.photoUrl} alt="" />
              ) : null}
            </ul>
          </div>
        </nav>
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
