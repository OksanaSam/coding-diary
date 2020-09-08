import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import AddIcon from '@material-ui/icons/Add';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import SelectedTools from './SelectedTools';

const NewEntry = (props) => {
  const [currentDate, setDate] = useState(new Date());
  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleDateSelect = (date) => {
    setDate(date);
  };

  const [selectedOptions, setSelectedOptions] = useState(
    JSON.parse(localStorage.getItem('selectedTools')) || []
  );

  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) || []);

  useEffect(() => {
    localStorage.setItem('selectedTools', JSON.stringify(selectedOptions));
    localStorage.setItem('items', JSON.stringify(items));
  }, [selectedOptions, items]);

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) {
      Swal.fire({
        title: 'Hm...',
        text: 'Please enter your text',
        confirmButtonText: 'Ok',
      });
    } else {
      setItems([...items, { text: inputValue, done: false }]);
      localStorage.setItem('items', JSON.stringify(items));
      setInputValue('');
    }
  };

  const handleCardSubmit = async () => {
    if (!props.user) {
      Swal.fire({
        title: 'Oops...',
        text: 'Please sign in',
        confirmButtonText: 'Ok',
      });
    } else if (items.length < 1) {
      Swal.fire({
        title: 'Oops...',
        text: 'Please add at least one entry!',
        confirmButtonText: 'Ok',
      });
    } else {
      const dbRef = await firebase.database().ref(`users/${props.user}`);
      const obj = {
        tags: selectedOptions,
        entries: items,
        entryDate: format(currentDate, 'do MMMM yyyy'),
      };
      if (dbRef === null) {
        firebase
          .database()
          .ref('users/' + props.user)
          .set(obj);
      } else {
        dbRef.push(obj);
      }
      setItems([]);
      setSelectedOptions([]);

      dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        const entryList = [];
        for (let key in data) {
          entryList.push({
            log: data[key],
            uniqueId: key,
          });
        }
        props.handleCardsAdd(entryList);
      });
    }
  };

  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className="newEntry">
      <div className="selectedDate">
        <DatePicker
          styles={{ backgroundColor: 'blue' }}
          selected={currentDate}
          onChange={handleDateChange}
          onSelect={handleDateSelect}
        />
      </div>
      <SelectedTools selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
      <form onSubmit={handleInputSubmit}>
        <label htmlFor="entry">
          <input
            placeholder="Skills learned"
            type="text"
            name="entry"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button>
          <AddIcon />
        </button>
      </form>
      <p>{currentDate ? format(currentDate, 'do MMMM yyyy') : null}</p>
      <ul>
        {items.map((item, id) => (
          <li key={id}>
            <button onClick={() => handleDelete(id)}>X</button>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
      <button className="saveButton" onClick={handleCardSubmit}>
        Save Entry
      </button>
    </div>
  );
};

export default NewEntry;
