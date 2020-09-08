import React, { useState } from 'react';
import firebase from 'firebase/app';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EditCardModal(props) {
  const [inputValue, setInputValue] = useState('');
  const [editedEntries, setEditedEntries] = useState(props.item.log.entries);

  const handleDelete = (index) => {
    const newItems = [...editedEntries];
    newItems.splice(index, 1);
    setEditedEntries(newItems);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref(`users/${props.user}`);
    dbRef.once('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data[props.uniqueId].entries);
      if (data[props.uniqueId].entries) {
        dbRef.child(props.uniqueId).update({ entries: editedEntries });
      }
    });
    props.handleClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!inputValue) {
        e.preventDefault();
        Swal.fire({
          title: 'Hm...',
          text: 'Please enter your text',
          confirmButtonText: 'Ok',
        });
      } else {
        setEditedEntries([...editedEntries, { text: inputValue }]);
        e.preventDefault();
        setInputValue('');
      }
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="edit">
              <Form.Label>Delete entries or add new ones</Form.Label>
              <Form.Control
                type="text"
                placeholder={'Add entries'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
                onKeyDown={handleKeyDown}
              />
            </Form.Group>
            {!editedEntries ? null : (
              <ul className="entries">
                {editedEntries.map((entry, id) => {
                  return (
                    <li key={editedEntries.indexOf(entry)}>
                      <button onClick={() => handleDelete(id)}>X</button>
                      {entry.text}
                    </li>
                  );
                })}
              </ul>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: '#25c93f' }} onClick={handleFormSubmit}>
            Save Changes
          </Button>
          <Button style={{ backgroundColor: '#ff5f55' }} onClick={props.handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditCardModal;
