import React, { useContext, useState, useEffect, lazy, Suspense } from 'react';
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
import Swal from "sweetalert2";



const firebaseAppAuth = firebase.auth();

// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider(),
  
// };


function App( {createUserWithEmailAndPassword, signInWithEmailAndPassword} ) {
  const [items, setItems] = useState([]);
  const [currentDate, setDate] = useState(new Date());
  const [selectedDate, setSeletedDate] = useState();
  const [globalCheckbox, setGlobalCheckbox] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const debouncedItems = useDebounce(items, 500);
  const [displayName, setDisplayName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    // trying context
  const selectOptions = {
    all: false,
    some: false,
    none: true
  };

  const [checkboxCounter, setCheckboxCounter] = useState(0);
  const CheckboxContext = React.createContext(selectOptions.none);
  const value = useContext(CheckboxContext);


  const handleUserChange = (newUser) => {
    setUser(newUser)
  }

  const handleLogIn = () => {
    setIsLoggedIn(true)
  } 

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
  //     console.log(firebase.auth().currentUser);
  //   } else {
  //     console.log('no user');
  //   }
  // });

  
   useEffect(() => {

    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        const dbUser = {
          email: user.email,
          displayName: user.displayName,
          photoUrl: user.photoURL,
          uid: user.uid
        }
        firebase.database().ref('users/' + user.uid).set(dbUser);
        console.log(firebase.auth().currentUser);
        setUser(firebase.auth().currentUser.displayName);
      } else {
        console.log('no user');
      }
    });
  
    let dbRef;
    if (user === null) {
      dbRef = firebase.database().ref(`users/Oksana Samokhvalova`);
    } else {
      dbRef = firebase.database().ref(`users/${user}`);
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
    // console.log(selectedDate)
  }

  const handleDateSelect = date => {
    setDate(date);
    // console.log(selectedDate)
  }
  // const Entries = React.lazy(() => import('./Entries'));
  
  const handleCardsAdd = (newItems) => {
    setItems(newItems);
  }

  return (
    <div className="App">
      <>
      <header>
        <Authentication
          handleLogIn={handleLogIn}
          displayName={displayName}
          handleUserChange={handleUserChange}
          user={user}
          signInWithEmailAndPassword={signInWithEmailAndPassword}
          createUserWithEmailAndPassword={createUserWithEmailAndPassword}
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
          // selectedDate={selectedDate}
          handleCardsAdd={handleCardsAdd}
          currentDate={currentDate}
          displayName={displayName}
          user={user}
          handleDateChange={handleDateChange}
          handleDateSelect={handleDateSelect}
          item='new entry'
          isGlobalChecked={globalCheckbox}
          // addEntry={addEntry}
        />

        <Cards 
          items={items}
          displayName={displayName}
        />
        <ColorPicker />
			 </>
    </div>
  );
}

export default withFirebaseAuth({
  // providers,
  firebaseAppAuth,
})(App);
