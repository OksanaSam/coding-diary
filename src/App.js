import React, { useState, useEffect } from 'react';

// Styles
import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Firebase database
import firebaseConfig from './components/firebaseConfig.jsx';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import withFirebaseAuth from 'react-with-firebase-auth';

// Components
import Cards from './components/Cards';
import NewEntry from './components/NewEntry';
import Header from './components/Header';
import Footer from './components/Footer';

const firebaseAppAuth = firebase.auth();

function App({ createUserWithEmailAndPassword, signInWithEmailAndPassword }) {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        const dbUser = {
          email: user.email,
          displayName: user.displayName ? user.displayName : user.email,
          photoUrl: user.photoURL,
          uid: user.uid,
        };
        setUser(user.uid);
        setUserInfo(dbUser);
      }
    });

    let dbRef;
    // setting default user to Oksana (to retrieve the saved data from the database)
    if (user === null) {
      dbRef = firebase.database().ref(`users/wdDaqkYW5yaZwQGAUf9B9JzbZVu2`);
    } else {
      dbRef = firebase.database().ref(`users/${firebase.auth().currentUser.uid}`);
    }
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      let entryList = [];
      for (let key in data) {
        entryList.push({
          log: data[key],
          uniqueId: key,
        });
      }
      setItems(entryList);
    });
  }, [user, isLoggedIn]);

  const handleUserChange = (newUser) => {
    setUser(newUser);
  };

  const handleUserInfo = (newUserInfo) => {
    setUserInfo(newUserInfo);
  };

  const handleLogIn = (boolean) => {
    setIsLoggedIn(boolean);
  };

  const handleCardsAdd = (newItems) => {
    setItems(newItems);
  };

  return (
    <div className="app">
      <Header
        handleLogIn={handleLogIn}
        handleUserChange={handleUserChange}
        user={user}
        signInWithEmailAndPassword={signInWithEmailAndPassword}
        createUserWithEmailAndPassword={createUserWithEmailAndPassword}
        userInfo={userInfo}
        handleUserInfo={handleUserInfo}
      />
      <main>
        <div className="wrapper">
          <NewEntry handleCardsAdd={handleCardsAdd} user={user} />
          <Cards items={items} user={user} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(App);
