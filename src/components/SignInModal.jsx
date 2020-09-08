import React from 'react';
import Modal from 'react-modal';

import { FaTwitterSquare, FaGithub, FaGoogle, FaWindowClose } from 'react-icons/fa';

const SignInModal = (props) => {
  return (
    <>
      <Modal
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          content: {
            background: 'white',
            position: 'absolute',
            top: '25%',
            left: '25%',
            right: '25%',
            bottom: '25%',
            border: '1px solid #ccc',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '10px',
            outline: 'none',
            padding: '20px',
          },
        }}
        isOpen={props.modalIsOpen}
        ariaHideApp={false}
        onRequestClose={props.closeModal}
        contentLabel="SignIn Modal"
      >
        <button className="closeModalButton" onClick={props.closeModal}>
          <FaWindowClose />
        </button>
        <h3>Sign in with Gmail, GitHub or Twitter</h3>
        <div className="modalButtons">
          <button className="gmailButton" onClick={props.googleSignin}>
            <FaGoogle />
          </button>
          <button className="gitHubButton" onClick={props.handleGitHubLogin}>
            <FaGithub />
          </button>
          <button className="twitterButton" onClick={props.handleTwitterLogin}>
            <FaTwitterSquare />
          </button>
        </div>
      </Modal>
    </>
  );
};

export default SignInModal;
