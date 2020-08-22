import React from 'react';
import CardNew from './Card'
import firebase from 'firebase/app';


const Cards = (props) => {

    const handleCardDelete = (id) => {
        console.log('deleted', id)
        const dbRef = firebase.database().ref(`users/${props.displayName}`);
        dbRef.child(id).remove();
    }

    const handleCardEdit = (id) => {
        console.log('edited', id)
        const dbRef = firebase.database().ref(`users/${props.displayName}`);
        // dbRef.child(id).remove();
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
    return (
        <>
            {
                props.items.length
                ?
                <ul className="here"> 
                    {props.items.map((item) => {
                    return (
                        <li className="listResult" key={item.uniqueId}>
                            <CardNew
                                log={item.log}
                            />
                            <button onClick={()=> handleCardEdit(item.uniqueId)}>edit</button>
                            <button onClick={()=> handleCardDelete(item.uniqueId)}>delete</button>
                        </li>
                    );
                    })}
                </ul>
                :  <p>Loading...</p>
            }
        </>
    )
}

export default Cards;