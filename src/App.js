import React, { useContext, useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import Entry from './components/Entry.jsx';
import firebaseConfig from './components/firebaseConfig.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import withFirebaseAuth from 'react-with-firebase-auth';
import Authentication from './Authentication';
import useDebounce from './use-debounce';
import Cards from './components/Cards';
import ColorPicker from './components/ColorPicker';



const firebaseAppAuth = firebase.auth();

// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider(),
  
// };


function App( {createUserWithEmailAndPassword, signInWithEmailAndPassword} ) {
  const [items, setItems] = useState([]);
  const [currentDate, setDate] = useState(new Date());
  const [globalCheckbox, setGlobalCheckbox] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const debouncedItems = useDebounce(items, 500);

    // trying context
  const selectOptions = {
    all: false,
    some: false,
    none: true
  };

  const [checkboxCounter, setCheckboxCounter] = useState(0);
  const CheckboxContext = React.createContext(selectOptions.none);
  const value = useContext(CheckboxContext);

  
   useEffect(() => {
    let dbRef;
    if (!user) {
      dbRef = firebase.database().ref(`users/Oksana Posobchuk`);
    } else {
      dbRef = firebase.database().ref(`users/${user.displayName}`);
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
  }, [user]);



  // useEffect(
  //   () => {
  //     // Make sure we have a value (user has entered something in input)
  //     if (debouncedSearchTerm) {
  //       // Set isSearching state
  //       setIsSearching(true);
  //       // Fire off our API call
  //       searchCharacters(debouncedSearchTerm).then(results => {
  //         // Set back to false since request finished
  //         setIsSearching(false);
  //         // Set results state
  //         setResults(results);
  //       });
  //     } else {
  //       setResults([]);
  //     }
  //   },
  //   [debouncedSearchTerm]
  // );

  const handleGlobalChecked = () => {
    setGlobalCheckbox(!globalCheckbox);
  }


  const addEntry = async (entry) => {
    
    const dbRef = await firebase.database().ref(`users/${user.displayName}`);
    dbRef.push(entry);
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();

      console.log('response from database', data);
      
      const entryList = [];
      for (let key in data) {
        entryList.push({
          log: data[key],
          uniqueId: key
        });
      }
      setItems(entryList);
    })
  };


  const handleDateChange = date => setDate(date);
  const handleDateSelect = date => setDate(date);

  // const Entries = React.lazy(() => import('./Entries'));
  

  return (
    <div className="App">
      <>
      <header>
        <Authentication
          user={user}
          signInWithEmailAndPassword={signInWithEmailAndPassword}
          createUserWithEmailAndPassword={createUserWithEmailAndPassword}
        />
      </header>

      <div className="inputSearch">
        <h2>Another coding day!</h2>
        <label className="visuallyHidden">Add another story to your coding journey</label>
        <DatePicker
          styles={ {backgroundColor: 'blue'} }
          selected={currentDate}
          onChange={handleDateChange}
          onSelect={handleDateSelect}
        />
      </div>

        <label htmlFor='globalCheckbox'>Global Checkbox</label>
        <input
          name='globalCheckbox'
          type='checkbox'
          onChange={handleGlobalChecked}
          defaultChecked={globalCheckbox}
        />

        <Entry
          item='new entry'
          isGlobalChecked={globalCheckbox}
          addEntry={addEntry}
        />

        <Cards 
          items={items}
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
