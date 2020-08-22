import React from 'react';
import { StylesProvider } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import firebase from 'firebase/app';




const CardNew = (props) => {

    const handleCardEdit = () => {

    }

    const handleCardDelete = () => {

    }
    
    return (
        <StylesProvider injectFirst>
            <Card>
                {/* <p>{props.uniqueId}</p> */}
                <p>{props.log}</p>
                {/* <button>edit</button>
                <button>delete</button> */}
            </Card>
        </StylesProvider>
    )
}

export default CardNew;