import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import styled, { css } from 'styled-components'


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

    const Button = styled.button`
        background: transparent;
        border-radius: 3px;
        border: 2px solid blue;
        color: darkblue;
        margin: 0 1em;
        padding: 0.25em 1em;

        ${props =>
            props.primary &&
            css`
            background: blue;
            color: white;
            `};
        `



    return (
        <>
            <p>{props.item}</p>
            <input
                type='checkbox'
                onChange={() => handleChecked(props.item)}
                checked={isChecked}
            />
             <Button onClick={() => handleDelete(props.item)}>delete</Button>
            <form 
                onSubmit={handleSubmit}
            >
                <textarea
                    name="" id="" cols="30" rows="10" placeholder="message"
                    onChange={handleTextAreaChange}
                    // onClick={props.addEntry()}
                    // onKeyPress={handleKeyPress}

                ></textarea>
                <Button type='submit'>Submit</Button>

            </form>
        </>   
    );
};

export default Entry;
