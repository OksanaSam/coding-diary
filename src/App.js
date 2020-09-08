import React, { useState, useEffect, useReducer, lazy, Suspense } from 'react';
import './styles/index.scss';
import NewEntry from './components/NewEntry.jsx';
import firebaseConfig from './components/firebaseConfig.jsx';
import 'react-datepicker/dist/react-datepicker.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import withFirebaseAuth from 'react-with-firebase-auth';
// import Authentication from './components/Authentication';
import useDebounce from './use-debounce';
import Cards from './components/Cards';
import ColorPicker from './components/ColorPicker';
import algoliasearch from 'algoliasearch/lite';
// import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { MdAccountCircle } from 'react-icons/md';
import Home from './components/Home';
import Info from './components/Info';
import Header from './components/Header';
import Footer from './components/Footer';

import {
  InstantSearch,
  Hits,
  SearchBox,
  RefinementList,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';

export const UserContext = React.createContext();

const firebaseAppAuth = firebase.auth();

function App({ createUserWithEmailAndPassword, signInWithEmailAndPassword }) {
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

  const handleGlobalChecked = () => {
    setGlobalCheckbox(!globalCheckbox);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleDateSelect = (date) => {
    setDate(date);
  };

  // const Entries = React.lazy(() => import('./Entries'));

  const handleCardsAdd = (newItems) => {
    setItems(newItems);
  };

  // const [user, dispatch] = useReducer(reducer, initialState);
  const searchClient = algoliasearch('MECACEVTIQ', '992684a9f8b18acf0050954944f2f42b');
  const [colorTheme, setColorTheme] = useState('blue');

  const toggleColorTheme = () => {
    setColorTheme((prevState) => (prevState === 'blue' ? 'pink' : 'blue'));
  };
  return (
    <Router basename={process.env.PUBLIC_URL}>
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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/info" component={Info} />
        </Switch>
      </main>
      <Footer />

      {/* <InstantSearch searchClient={searchClient} indexName="dev_OKSANA">
        <div className="inputSearch">
          <h2>Another coding day!</h2>
          <label className="visuallyHidden">Add another story to your coding journey</label>
        </div> */}

      <label htmlFor="globalCheckbox">Global Checkbox</label>
      <input
        name="globalCheckbox"
        type="checkbox"
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
        item="new entry"
        isGlobalChecked={globalCheckbox}
      />

      <Cards items={items} user={user} />
      <ColorPicker />

      {/* <SearchBox /> */}
      {/* <Hits hitComponent={Hit} /> */}
      {/* </InstantSearch> */}
    </Router>
  );
}

// function Hit(props) {
//   return (
//     <article>
//       <h1>
//         <Highlight attribute="name" hit={props.hit} />
//       </h1>
//       <p>
//         <Highlight attribute="description" hit={props.hit} />
//       </p>
//     </article>
//   );
// }

// Hit.propTypes = {
//   hit: PropTypes.object.isRequired,
// };

export default withFirebaseAuth({
  firebaseAppAuth,
})(App);
