import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
// import styled, { css } from 'styled-components';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, compareAsc } from 'date-fns';
import SelectedTools from './SelectedTools';

const NewEntry = (props) => {
  const [isChecked, setChecked] = useState(false);
  const [textArea, setTextArea] = useState('');

  const [selectedOptions, setSelectedOptions] = useState(
    JSON.parse(localStorage.getItem('selectedTools')) || []
  );

  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) || []);

  useEffect(() => {
    setChecked(props.globalCheckbox);
    localStorage.setItem('selectedTools', JSON.stringify(selectedOptions));
    localStorage.setItem('items', JSON.stringify(items));
  }, [props.globalCheckbox, selectedOptions, items]);

  const handleChecked = () => {
    setChecked(!isChecked);
  };

  const handleTextAreaChange = (e) => {
    setTextArea(e.target.value);
    console.log(textArea);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) {
      Swal.fire({
        title: 'Hm...',
        text: 'Please enter your text',
        confirmButtonText: 'Ok',
      });
    } else {
      // const newItems = [...items];
      // newItems.push({ text: inputValue, done: false });
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
      console.log(dbRef);
      const obj = { tags: selectedOptions, entries: items };
      if (dbRef === null) {
        firebase
          .database()
          .ref('users/' + props.user)
          .set(obj);
      } else {
        dbRef.push(obj);
      }
      console.log('added');
      setItems([]);
      setSelectedOptions([]);

      dbRef.on('value', (snapshot) => {
        const data = snapshot.val();

        console.log('response from database', data);

        const entryList = [];
        for (let key in data) {
          entryList.push({
            log: data[key],
            uniqueId: key,
          });
        }
        props.handleCardsAdd(entryList);
        // setItems(entryList)
      });
    }
  };

  const handleClick = (index) => {
    const newItems = [...items];
    newItems[index].done = !newItems[index].done;
    setItems(newItems);
  };

  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <>
      <SelectedTools selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
      <p>{props.item}</p>
      {/* <p>{props.currentDate ? `${props.currentDate.getMonth()} ${props.currentDate.getDate()} ${props.currentDate.getFullYear()}` : null}</p> */}
      <p>{props.currentDate ? format(props.currentDate, 'do MMMM yyyy') : null}</p>
      <input type="checkbox" onChange={() => handleChecked(props.item)} checked={isChecked} />
      <button onClick={() => handleDelete(props.item)}>delete</button>
      <DatePicker
        styles={{ backgroundColor: 'blue' }}
        selected={props.currentDate}
        onChange={props.handleDateChange}
        onSelect={props.handleDateSelect}
      />

      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        </label>
        <button>Add</button>
      </form>

      <ul>
        {items.map((item, id) => (
          <li key={id}>
            <label>
              <input type="checkbox" checked={item.done} onClick={() => handleClick(id)} />
              <span className={item.done ? 'done' : null}>{item.text}</span>
              <button onClick={() => handleDelete(id)}>X</button>
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleCardSubmit}>Save Entry</button>
    </>
  );
};

export default NewEntry;
