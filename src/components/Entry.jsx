import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
// import styled, { css } from 'styled-components';
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import { format, compareAsc } from 'date-fns';



const options = [
    { name: 'Select…', value: '' },
    { name: 'JavaScript', value: 'JavaScript' },
    { name: 'React', value: 'React' },
    { name: 'Vanilla', value: 'Vanilla' },
    { name: 'Other', value: 'Other' }
];


const NewEntry = (props) => {
    const [isChecked, setChecked] = useState(false);
    const [textArea, setTextArea] = useState('');
    const [selectedOption, setSelectedOption] = useState(options[0].value);
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        setChecked(props.isGlobalChecked); 
    }, [props.isGlobalChecked]);

    const handleChecked = () => {
        setChecked(!isChecked);
    };

    const handleTextAreaChange = (e) => {
        setTextArea(e.target.value);
        console.log(textArea)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue) {
            Swal.fire({
                title: 'Hm...',
                text: 'Please enter your text',
                confirmButtonText: 'Ok',
            });
        } else {
            const newItems = [...items];
            newItems.push({ text: inputValue, done: false });
            setItems(newItems);
            setInputValue('');
        }
    }

    
    const handleCardSubmit = (e) => {
        e.preventDefault();
        if (!textArea && !inputValue) {
            Swal.fire({
                title: 'Hm...',
                text: 'Please add at least one entry',
                confirmButtonText: 'Ok',
            });
        } else {
            props.addEntry(textArea);
        }
    }


    // const handleDelete = (index) => {
    //     if (!props.user) {
    //         Swal.fire({
    //           title: 'Oops...',
    //           text: 'Please sign in',
    //           confirmButtonText: 'Ok',
    //         })
    //     } else {
    //         const dbRef = firebase.database().ref(`users/${props.user.displayName}`);
    //         dbRef.child(index).remove();
    //     }
    // };

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
            <select
                name='tool'
                id='tool'
                value={selectedOption}
                onChange={e => setSelectedOption(e.target.value)}>
                {options.map(option => (
                    <option
                    key={option.value}
                    selected={option.value === null ? 'selected' : null}
                    value={option.value}
                    disabled={option.value === null ? true : null} 
                    >
                        {option.name}
                    </option>
            ))}
            </select>
                <p className="selectedTool">{selectedOption}</p>
            <p>{props.item}</p>
            {/* <p>{props.currentDate ? `${props.currentDate.getMonth()} ${props.currentDate.getDate()} ${props.currentDate.getFullYear()}` : null}</p> */}
            <p>{props.currentDate ? format(props.currentDate, "do MMMM yyyy") : null}</p>
            <input
                type='checkbox'
                onChange={() => handleChecked(props.item)}
                checked={isChecked}
            />
             <button onClick={() => handleDelete(props.item)}>delete</button>
             <DatePicker
                styles={ {backgroundColor: 'blue'} }
                selected={props.currentDate}
                onChange={props.handleDateChange}
                onSelect={props.handleDateSelect}
            />

        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </label>
          <button>Add</button>
        </form>

        <ul>
          {items.map((item, id) => (
            <li key={id}>
              <label>
                <input
                  type="checkbox"
                  checked={item.done}
                  onClick={() => handleClick(id)}
                />
                <span className={item.done ? "done" : null}>{item.text}</span>
                <button onClick={() => handleDelete(id)}>X</button>
              </label>
              </li>
          ))}
        </ul>
        </>   
    );
};

export default NewEntry;
