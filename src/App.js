import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import Entry from './components/Entry.jsx';
import EmailPasswordForm from './components/EmailPasswordForm.jsx';
import firebaseConfig from './components/firebaseConfig.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import withFirebaseAuth from 'react-with-firebase-auth';
import Modal from 'react-modal';



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


const [modalIsOpen, setIsOpen] = useState(false);
function openModal() {
  setIsOpen(true);
}

function afterOpenModal() {
  // console.log('modal is open');
}

function closeModal(){
  setIsOpen(false);
}




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
    if (!user) return;

    const dbRef = firebase.database().ref(`users/${user.displayName}`);
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
    
    // console.log('state', items);
    // console.log('updated state', items[0].log);


  
    // console.log('response from database', newData)
  
  }, [user]);


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
    
    // console.log('updated state');
    // console.log('state 2', items);
    
  };



  console.log('state outside', items);



  const handleDateChange = date => setDate(date);
  const handleDateSelect = date => setDate(date);

  const handleGlobalChecked = () => {
    setGlobalCheckbox(!globalCheckbox);
    console.log(globalCheckbox)
  }



  return (
    <div className="App">
      <>
      <header>
        <div>
          {
            items.length && user
              ?
              <ul className="here"> 
                {items.map((item, index) => {
                  console.log('info to display', item)
                  return (
                    <li className="listResult" key={index}>
                      <p>{item.uniqueId}</p>
                      <p>{item.log}</p>
                    </li>
                  );
                })}
              </ul>
              :  <p>No Data</p>
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
       
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>

        <div>
          {/* <h1>sign in with google</h1> */}
          <button onClick={googleSignin}>sign in with google</button>
       </div>

       <div><p>OR</p></div>

        <div>
          {/* <h1>sign in with github</h1> */}
          <button onClick={handleGitHubLogin}>sign in with github</button>
        </div>

        <div><p>OR</p></div>

        <div>
          <h1>sign in with email</h1>
          <EmailPasswordForm
            onSubmit={signInWithEmailAndPassword}
          />
        </div>

        <div>
          <h1>Don't have an account? Sign up</h1>
          <EmailPasswordForm
            onSubmit={createUserWithEmailAndPassword}
           
          />
        </div>
           
         
        
      </Modal>
     

       

				<div className="inputSearch">
          <h2>Another coding day!</h2>
					<label className="visuallyHidden">Add another story to your coding journey</label>
          <DatePicker
            selected={currentDate}
            onChange={handleDateChange}
            onSelect={handleDateSelect}
          />
				</div>

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
        

        {/* <CheckboxContext.Provider value={selectOptions.none}>
        <input
          type='checkbox'
          onChange={handleGlobalChecked}
          defaultChecked={globalCheckbox}
        />
  
      </CheckboxContext.Provider> */}
        {
          items.length && user
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

// export default App;

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
