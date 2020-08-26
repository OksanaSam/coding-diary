import React, { useState, useEffect, useReducer, lazy, Suspense } from 'react';
import './App.css';
import NewEntry from './components/NewEntry.jsx';
import firebaseConfig from './components/firebaseConfig.jsx';
import 'react-datepicker/dist/react-datepicker.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import withFirebaseAuth from 'react-with-firebase-auth';
import Authentication from './components/Authentication';
import useDebounce from './use-debounce';
import Cards from './components/Cards';
import ColorPicker from './components/ColorPicker';

export const UserContext = React.createContext();

const firebaseAppAuth = firebase.auth();

function App( {createUserWithEmailAndPassword, signInWithEmailAndPassword} ) {
  const [items, setItems] = useState([]);
  const [currentDate, setDate] = useState(new Date());
  const [globalCheckbox, setGlobalCheckbox] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const debouncedItems = useDebounce(items, 500);
  const [displayName, setDisplayName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fake, setFake] = useState(null);



  const [checkboxCounter, setCheckboxCounter] = useState(0);


  const handleUserChange = (newUser) => {
    setUser(newUser)
  }

  const handleDisplayName = (newDisplayName) => {
    setDisplayName(newDisplayName)
    localStorage.setItem('displayName', JSON.stringify(newDisplayName))
  }

  const handleLogIn = (boolean) => {
    setIsLoggedIn(boolean)
  } 

   useEffect(() => {

    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        const dbUser = {
          email: user.email,
          displayName: user.displayName ? user.displayName : user.email,
          photoUrl: user.photoURL,
          uid: user.uid
        }
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
          uniqueId: key
        });
      }
      setItems(entryList);
    })

  }, [user, isLoggedIn]);

  const handleGlobalChecked = () => {
    setGlobalCheckbox(!globalCheckbox);
  }

  const handleDateChange = date => {
    setDate(date);
  }

  const handleDateSelect = date => {
    setDate(date);
  }

  // const Entries = React.lazy(() => import('./Entries'));
  
  const handleCardsAdd = (newItems) => {
    setItems(newItems);
  }

  // const [user, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
     <>
      <header>
        <Authentication
          handleLogIn={handleLogIn}
          displayName={displayName}
          handleUserChange={handleUserChange}
          handleDisplayName={handleDisplayName}
          user={user}
          signInWithEmailAndPassword={signInWithEmailAndPassword}
          createUserWithEmailAndPassword={createUserWithEmailAndPassword}
          fake={fake}
        />
      </header>

      <div className="inputSearch">
        <h2>Another coding day!</h2>
        <label className="visuallyHidden">Add another story to your coding journey</label>
      </div>

        <label htmlFor='globalCheckbox'>Global Checkbox</label>
        <input
          name='globalCheckbox'
          type='checkbox'
          onChange={handleGlobalChecked}
          defaultChecked={globalCheckbox}
        />

        <NewEntry
          handleCardsAdd={handleCardsAdd}
          currentDate={currentDate}
          displayName={displayName}
          user={user}
          handleDateChange={handleDateChange}
          handleDateSelect={handleDateSelect}
          item='new entry'
          isGlobalChecked={globalCheckbox}
        />

        <Cards 
          items={items}
          user={user}
        />
        <ColorPicker />
    </>
    </div>
   
  );
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(App);
