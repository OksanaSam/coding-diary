import React, { useState, useEffect } from 'react';
import firebaseConfig from "./firebaseConfig.jsx";
import firebase from 'firebase/app';


const Entry = (props) => {

    const [isChecked, setChecked] = useState();
    const [textArea, setTextArea] = useState('');

    useEffect(() => {
            
        if (props.isGlobalChecked) {
            setChecked(true);
        } else {
            setChecked(false);
        }

        let txt;
        if (isChecked) {
            txt = 'checked'
        } else {
            txt = 'unchecked'
        }
        console.log('props.isGlobalChecked', props.isGlobalChecked)
        
    }, [props.isGlobalChecked, isChecked]);

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
    };


  const addToDataBase = (entry, index) => {
    const dbRef = firebase.database().ref();
    dbRef.push(entry);  
  };



    let txt;
    if (isChecked) {
        txt = 'checked'
    } else {
        txt = 'unchecked'
    }


    return (
        <>
            <p>{props.item}</p>
            <input
                type='checkbox'
                onChange={handleChecked}
                defaultChecked={isChecked}
            />
            <p>This box is {txt}</p>
            
            <form 
                onSubmit={handleSubmit}
            >
                <textarea
                    name="" id="" cols="30" rows="10" placeholder="message"
                    onChange={handleTextAreaChange}
                    // onKeyPress={handleKeyPress}

                ></textarea>
                <button type='submit'>Submit</button>
      
     
            {/* <input
                type='text'
                // onChange={this.myChangeHandler}
            /> */}
            </form>
        </>   
    );
};

export default Entry;
