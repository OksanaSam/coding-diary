import React, { useState, useEffect } from 'react';


const Entry = (props) => {

    const [isChecked, setChecked] = useState();

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
            <button>Hello</button>
        </>   
    );
};

export default Entry;
