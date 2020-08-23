import React from 'react';
import { StylesProvider } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import firebase from 'firebase/app';




const CardNew = (props) => {

    const handleCardEdit = () => {

    }

    const handleCardDelete = () => {

    }

    console.log(JSON.stringify(props.item.log.entries))
    console.log(JSON.stringify(props.item.log.tags))
    console.log(JSON.stringify(props.item.uniqueId))
    
    return (
        <StylesProvider injectFirst>
            <Card>
                <ul className='tags'>
                {props.item.log.tags.map(tag => {
                    return (
                        <li key={props.item.log.tags.indexOf(tag)}>
                            {tag}
                        </li>
                    )
                })}
                </ul>
                <ul className='entries'>
                {props.item.log.entries.map(entry => {
                    return (
                        <li key={props.item.log.tags.indexOf(entry)}>
                            {JSON.stringify(entry.text)}
                        </li>
                    )
                })}
                </ul>
                {/* <p>{props.uniqueId}</p> */}
                {/* <p>{JSON.stringify(props.item)}</p> */}
                {/* <button>edit</button>
                <button>delete</button> */}
            </Card>
        </StylesProvider>
    )
}

export default CardNew;