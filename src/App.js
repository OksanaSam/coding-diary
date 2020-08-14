import React, { useContext, useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import Entry from './components/Entry.jsx';
import firebaseConfig from './components/firebaseConfig.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import withFirebaseAuth from 'react-with-firebase-auth';
import SignInModal from './components/SignInModal';
import useDebounce from './use-debounce';


const firebaseAppAuth = firebase.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  
};


function App( {signOut, signInWithGoogle, signInWithGithub, createUserWithEmailAndPassword, signInWithEmailAndPassword} ) {
  const [items, setItems] = useState([]);
  const [currentDate, setDate] = useState(new Date());
  const [globalCheckbox, setGlobalCheckbox] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isSearching, setIsSearching] = useState(false);

  const debouncedItems = useDebounce(items, 500);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
      setIsOpen(true);
  }
  const closeModal = () => {
      setIsOpen(false);
  }



  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     console.log('user is signed in')
    }
  });

  // trying context
const selectOptions = {
  all: false,
  some: false,
  none: true
};



const [checkboxCounter, setCheckboxCounter] = useState(0);



const handleGitHubLogin = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const newUser = result.user;
      console.log(result);
      // console.log('signed in')
      console.log(newUser)
      setIsOpen(false);
      setUser(newUser);
      // ...
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
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
      setToken(result.user.email)
   }).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
		
      console.log(error.code)
      console.log(error.message)
   });
}

const googleSignout = () => {
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

  
  const CheckboxContext = React.createContext(selectOptions.none);
  const value = useContext(CheckboxContext);
  // console.log('value', value);


  
   useEffect(() => {
    let dbRef;
    if (!user) {
      // setUser({displayName: 'Oksana Posobchuk'})
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
      // newData = data;
      
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

 
  const Entries = React.lazy(() => import('./Entries'));
  

  return (
    <div className="App">
      <>
      
      <header>
        
      <div>
        
        {
            items.length
              ?
              <ul className="here"> 
                {items.map((item, index) => {
                  return (
                    <li className="listResult" key={index}>
                      <p>{item.uniqueId}</p>
                      <p>{item.log}</p>
                    </li>
                  );
                })}
              </ul>
              :  <p>Searching...</p>
          }
         
        </div>
     
        {
          user 
            ? 
            <div>
              <p>Hello, {user.displayName}</p>
              <button onClick={googleSignout}>Sign out</button>
            </div>
            : <button onClick={openModal}>Please sign in</button>
        }
      </header>
      <SignInModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        googleSignin={googleSignin}
        handleGitHubLogin={handleGitHubLogin}
        signInWithEmailAndPassword={signInWithEmailAndPassword}
        createUserWithEmailAndPassword={createUserWithEmailAndPassword}
      />
      

       

				<div className="inputSearch">
          <h2>Another coding day!</h2>
					<label className="visuallyHidden">Add another story to your coding journey</label>
          <DatePicker
            selected={currentDate}
            onChange={handleDateChange}
            onSelect={handleDateSelect}
          />
				</div>
        <label htmlFor="">Global Checkbox</label>
        <input
          type='checkbox'
          onChange={handleGlobalChecked}
          defaultChecked={globalCheckbox}
        />

        {
          !user
          ?
          null 
          :
          <Entry
            item='new entry'
            isGlobalChecked={globalCheckbox}
            addEntry={addEntry}
          />
        }
  
        {
          items.length
          ?
          <ul className="search"> 
            {items.map((item, index) => {
              return (
                <li className="listResult" key={index}>
                  <Entry
                    key={index}
                    item={item.uniqueId}
                    isGlobalChecked={globalCheckbox}
                    user={user}

                  />
                </li>
              );
            })}
          </ul>
          : null}
				

			</>
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
