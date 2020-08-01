import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import Entry from './components/Entry.jsx';
import firebase from "./components/firebase.jsx";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const selectOptions = {
  all: false,
  some: false,
  none: true
};

function App() {
  const [items, setItems] = useState([]);
  const [currentDate, setDate] = useState(new Date());
  const [globalCheckbox, setGlobalCheckbox] = useState(false);
  
  
  const CheckboxContext = React.createContext(selectOptions.none);
  const value = useContext(CheckboxContext);
  console.log('value', value);
  
  useEffect(() => {
    const entryList = [];

    const dbRef = firebase.database().ref();
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();

      console.log('response from database', data);

      for (let key in data) {
        entryList.push({
          uniqueId: key,
        });
      }

      setItems(entryList);
    })
  }, []);

 
 
  const add = () => {
    console.log('items', items);
    console.log('accessing specific values', items[0].uniqueId);
  };


  const handleDateChange = date => setDate(date);
  const handleDateSelect = date => setDate(date);

  const handleGlobalChecked = () => {
    setGlobalCheckbox(!globalCheckbox);
    console.log(globalCheckbox)
  }



  return (
    <div className="App">
      <>
				<div className="inputSearch">
          <h2>Another coding day!</h2>
					<label className="visuallyHidden">Add another story to your coding journey</label>
					<input
						type="text"
						placeholder="Pick a date"
						name="userInput"
					/>
          
					<button className="searchButton" onClick={() => add()}>Search</button>
          <DatePicker
            selected={currentDate}
            onChange={handleDateChange}
            onSelect={handleDateSelect}
          />
				</div>
        <CheckboxContext.Provider value={selectOptions.none}>
        <input
          type='checkbox'
          onChange={handleGlobalChecked}
          defaultChecked={globalCheckbox}
        />
  
      </CheckboxContext.Provider>
        {items.length ?
        <ul className="search"> 
          {items.map((item, index) => {
            return (
              <li className="listResult" key={index}>
                <Entry
                  key={index}
                  item={item.uniqueId}
                  isGlobalChecked={globalCheckbox}

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

export default App;
