import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';


const Entry = (props) => {

    const [isChecked, setChecked] = useState(false);
    const [textArea, setTextArea] = useState('');

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
        if (!textArea) return;
        addToDataBase(textArea);
        props.addEntry(textArea);
        console.log(textArea)
    }

    const handleKeyPress = (e) => {
        e.preventDefault();
        if (e.key === "Enter") {
            // if (!textArea) return;
            addToDataBase(textArea);
        } else {
            alert('No entry')
        }
    }


    const addToDataBase = (entry, index) => {
        const dbRef = firebase.database().ref(`users/${props.user.displayName}`);
        dbRef.push(entry);
    }

    const handleDelete = (index) => {
        const dbRef = firebase.database().ref(`users/${props.user.displayName}`);
        dbRef.child(index).remove();
    };


    return (
        <>
            <p>{props.item}</p>
            <input
                type='checkbox'
                onChange={() => handleChecked(props.item)}
                checked={isChecked}
            />
             <button onClick={() => handleDelete(props.item)}>delete</button>
            <form 
                onSubmit={handleSubmit}
            >
                <textarea
                    name="" id="" cols="30" rows="10" placeholder="message"
                    onChange={handleTextAreaChange}
                    // onClick={props.addEntry()}
                    // onKeyPress={handleKeyPress}

                ></textarea>
                <button type='submit'>Submit</button>

            </form>
        </>   
    );
};

export default Entry;
