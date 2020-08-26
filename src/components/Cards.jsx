import React, {useContext} from 'react';
import CardNew from './Card'
import firebase from 'firebase/app';
import { UserContext } from '../App'


const Cards = (props) => {

const handleConsole = () => {
    console.log(newUser.user)
}

    const newUser = useContext(UserContext);

    const handleCardDelete = (id) => {
        console.log('deleted', id)
        const dbRef = firebase.database().ref(`users/${props.user}`);
        dbRef.child(id).remove();
    }

    const handleCardEdit = (id) => {
        console.log('edited', id)
        const dbRef = firebase.database().ref(`users/${props.user}`);
        dbRef.once('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            // if (data[id].isRead) {
            //   dbRef.child(index).update({isRead: false});
            // } else {
            //   dbRef.child(index).update({isRead: true});
            // }
          });
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
                            {/* <CardNew
                                item={item}
                            /> */}
                            <button onClick={()=> handleCardEdit(item.uniqueId)}>edit</button>
                            <button onClick={()=> handleCardDelete(item.uniqueId)}>delete</button>
                            <button onClick={handleConsole}>console</button>
                        </li>
                    );
                    })}
                </ul>
                
                :  <p>Loading...</p>
            }
            {/* <p>{newUser.user.displayName}</p> */}
        </>
    )
}

export default Cards;