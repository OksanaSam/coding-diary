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

    const [selectedOptions, setSelectedOptions] = useState(
        JSON.parse(localStorage.getItem('data')) || []
    );


    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem('items')) || []
    );

    useEffect(() => {
        setChecked(props.isGlobalChecked); 
        localStorage.setItem('data', JSON.stringify(selectedOptions));
        localStorage.setItem('items', JSON.stringify(items));

    }, [props.isGlobalChecked, selectedOptions, items]);


   


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
            // const newItems = [...items];
            // newItems.push({ text: inputValue, done: false });
            setItems([...items, { text: inputValue, done: false }]);
            localStorage.setItem('items', JSON.stringify(items))
            setInputValue('');
        }
    }

    
    const handleCardSubmit = () => {
        if (items.length < 1) {
            Swal.fire({
                title: 'Oops...',
                text: 'Please add at least one entry!',
                confirmButtonText: 'Ok',
            });
        } else {
            const dbRef = firebase.database().ref(`users/${props.displayName}`);
            const obj = { tags: selectedOptions, entries: items };
            dbRef.push(obj);
            console.log('added');
            setItems([]);
            setSelectedOptions([]);
        }
    }




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

    const handleToolDelete = (index) => {
        const newOptions = [...selectedOptions];
        newOptions.splice(index, 1);
        setSelectedOptions(newOptions);
    };

    const handleSelect = (e) => {
        if (selectedOptions.length > 5) {
            Swal.fire({
                title: 'Hm...',
                text: "You can't add more than 5 tags.",
                confirmButtonText: 'Ok',
            });
        } else if (selectedOptions.includes(e.target.value)) {
            Swal.fire({
                title: 'Hm...',
                text: 'You have already added this tag!',
                confirmButtonText: 'Ok',
            });
        } else {
            setSelectedOptions([...selectedOptions, e.target.value])
            localStorage.setItem('data', JSON.stringify(selectedOptions))
        }
    }

    

    return (
        <>
            <select
                name='tool'
                id='tool'
                value={selectedOptions}
                onChange={handleSelect}>
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
            <ul>
                {selectedOptions.map((option, ind) => {return (
                    <>
                    <li key={selectedOptions.length}>{option}</li>
                    {(selectedOptions.length > 0)
                    ?
                    <>
                        {/* <input type='checkbox' /> */}
                        <button onClick={() => handleToolDelete(ind)}>X</button>
                    </>
                    :
                    null}

                    </>
                    )}
                )}
            </ul>
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
        <button onClick={handleCardSubmit}>Save Entry</button>
        </>   
    );
};

export default NewEntry;
