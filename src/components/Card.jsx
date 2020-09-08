import React, { useState } from 'react';
import { StylesProvider } from '@material-ui/styles';
// import Card from '@material-ui/core/Card';
import firebase from 'firebase/app';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { makeStyles } from '@material-ui/core/styles';
// import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const CardNew = (props) => {
  const [show, setShow] = useState(false);

  const handleCardDelete = (id) => {
    if (!props.user) {
      Swal.fire({
        title: 'Oops...',
        text: 'Please sign in',
        confirmButtonText: 'Ok',
      });
    } else {
      const dbRef = firebase.database().ref(`users/${props.user}`);
      dbRef.child(id).remove();
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleCardEdit = (id) => {
    if (!props.user) {
      Swal.fire({
        title: 'Oops...',
        text: 'Please sign in',
        confirmButtonText: 'Ok',
      });
    } else {
      setShow(true);
      console.log('edited', id);
      const dbRef = firebase.database().ref(`users/${props.user}`);
      dbRef.once('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        // if (data[id].isRead) {
        //   dbRef.child(index).update({isRead: false});
        // } else {
        //   dbRef.child(index).update({isRead: true});
        // }
      });
    }
  };

  // console.log(JSON.stringify(props.item.log.entries))
  // console.log(JSON.stringify(props.item.log.tags))
  // console.log(JSON.stringify(props.item.uniqueId))

  return (
    <>
      <div className="card">
        <p>{!props.item.log.entryDate ? null : props.item.log.entryDate}</p>
        {!props.item.log.tags ? null : (
          <ul className="tags">
            {props.item.log.tags.map((tag) => {
              return <li key={props.item.log.tags.indexOf(tag)}>{tag}</li>;
            })}
          </ul>
        )}
        {!props.item.log.entries ? null : (
          <ul className="entries">
            {props.item.log.entries.map((entry) => {
              return <li key={props.item.log.entries.indexOf(entry)}>{entry.text}</li>;
            })}
          </ul>
        )}
        {/* <p>{props.uniqueId}</p> */}
        {/* <p>{JSON.stringify(props.item)}</p> */}
        {/* <button>edit</button>
                <button>delete</button> */}
        <button className="editButton" onClick={() => handleCardEdit(props.item.uniqueId)}>
          <EditIcon />
        </button>
        <button className="deleteButton" onClick={() => handleCardDelete(props.item.uniqueId)}>
          <DeleteIcon />
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="primary">Save Changes</Button>
          <Button variant="danger">Delete</Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardNew;
