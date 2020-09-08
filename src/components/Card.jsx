import React, { useState } from 'react';
import firebase from 'firebase/app';
import Swal from 'sweetalert2';
import EditCardModal from './EditCardModal';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { ImCheckmark } from 'react-icons/im';
import ReactTooltip from 'react-tooltip';

function Card(props) {
  const [showEditModal, setShowEditModal] = useState(false);

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
    setShowEditModal(false);
  };

  const handleCardEdit = (id) => {
    if (!props.user) {
      Swal.fire({
        title: 'Oops...',
        text: 'Please sign in',
        confirmButtonText: 'Ok',
      });
    } else {
      setShowEditModal(true);
    }
  };

  return (
    <div className="card">
      <EditCardModal
        handleClose={handleClose}
        show={showEditModal}
        item={props.item}
        user={props.user}
        uniqueId={props.item.uniqueId}
      />
      <div className="cardButtons">
        <button
          className="editButton"
          onClick={() => handleCardEdit(props.item.uniqueId)}
          data-tip
          data-for="edit"
        >
          <EditIcon />
          <ReactTooltip id="edit">
            <span>Edit entry</span>
          </ReactTooltip>
        </button>
        <p data-tip data-for="date">
          {!props.item.log.entryDate ? null : props.item.log.entryDate}
        </p>
        <ReactTooltip id="date">
          <span>Date cannot be edited</span>
        </ReactTooltip>
        <button
          className="deleteButton"
          onClick={() => handleCardDelete(props.item.uniqueId)}
          data-tip
          data-for="delete"
        >
          <DeleteIcon />
          <ReactTooltip id="delete">
            <span>Delete entry</span>
          </ReactTooltip>
        </button>
      </div>
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
            return (
              <li key={props.item.log.entries.indexOf(entry)}>
                <span>
                  <ImCheckmark />
                </span>
                {entry.text}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Card;
