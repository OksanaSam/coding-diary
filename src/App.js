import React, { useState, useEffect, useReducer, lazy, Suspense } from 'react';
import './styles/index.scss';
import firebaseConfig from './components/firebaseConfig.jsx';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import withFirebaseAuth from 'react-with-firebase-auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './components/Cards';
import ColorPicker from './components/ColorPicker';
import NewEntry from './components/NewEntry';
import Header from './components/Header';
import Footer from './components/Footer';

export const UserContext = React.createContext();

const firebaseAppAuth = firebase.auth();

function App({ createUserWithEmailAndPassword, signInWithEmailAndPassword }) {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [displayName, setDisplayName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fake, setFake] = useState(null);

  const [checkboxCounter, setCheckboxCounter] = useState(0);

  const handleUserChange = (newUser) => {
    setUser(newUser);
  };

  const handleDisplayName = (newDisplayName) => {
    setDisplayName(newDisplayName);
    localStorage.setItem('displayName', JSON.stringify(newDisplayName));
  };

  const handleLogIn = (boolean) => {
    setIsLoggedIn(boolean);
  };

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
        setFake(dbUser);
      } else {
        console.log('no user');
      }
    });

    let dbRef;
    if (user === null) {
      dbRef = firebase.database().ref(`users/Oksana Samokhvalova`);
    } else {
      dbRef = firebase.database().ref(`users/${firebase.auth().currentUser.uid}`);
    }
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();

      console.log('response from database', data);

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

  const handleCardsAdd = (newItems) => {
    setItems(newItems);
  };
  const [colorTheme, setColorTheme] = useState('blue');

  const toggleColorTheme = () => {
    setColorTheme((prevState) => (prevState === 'blue' ? 'pink' : 'blue'));
  };

  return (
    <>
      <Header
        colorTheme={colorTheme}
        toggleColorTheme={toggleColorTheme}
        handleLogIn={handleLogIn}
        displayName={displayName}
        handleUserChange={handleUserChange}
        handleDisplayName={handleDisplayName}
        user={user}
        signInWithEmailAndPassword={signInWithEmailAndPassword}
        createUserWithEmailAndPassword={createUserWithEmailAndPassword}
        fake={fake}
      />
      <main className={`main-container ${colorTheme}`}>
        <div className="wrapper">
          <NewEntry handleCardsAdd={handleCardsAdd} displayName={displayName} user={user} />
          <Cards items={items} user={user} />
          <ColorPicker />
        </div>
      </main>
      <Footer />
      {/* <div className="inputSearch">
        <h2>Another coding day!</h2>
        <label className="visuallyHidden">Add another story to your coding journey</label>
      </div>{' '} */}
    </>
  );
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(App);
