import React from 'react';
import Modal from 'react-modal';
import EmailPasswordForm from './EmailPasswordForm';
import { FaTwitterSquare, FaGithub, FaGoogle } from 'react-icons/fa';
// import styled, { css } from 'styled-components'

// const Button = styled.button`
//   background: transparent;
//   border-radius: 3px;
//   border: 2px solid blue;
//   color: darkblue;
//   margin: 0 1em;
//   padding: 0.25em 1em;

//   ${props =>
//     props.primary &&
//     css`
//       background: blue;
//       color: white;
//     `};
// `

const SignInModal = (props) => {
  function afterOpenModal() {}

  return (
    <>
      <Modal
        isOpen={props.modalIsOpen}
        ariaHideApp={false}
        onAfterOpen={afterOpenModal}
        onRequestClose={props.closeModal}
        contentLabel="Example Modal"
      >
        <button onClick={props.closeModal}>close</button>
        <button onClick={props.googleSignin}>
          <FaGoogle />
        </button>
        <button onClick={props.handleGitHubLogin}>
          <FaGithub />
        </button>
        <button onClick={props.handleTwitterLogin}>
          <FaTwitterSquare />
        </button>

        <div>
          <p>OR</p>
        </div>

        <div>
          <h1>sign in with email</h1>
          <EmailPasswordForm onSubmit={props.signInWithEmailAndPassword} />
        </div>

        <div>
          <h1>Don't have an account? Sign up</h1>
          <EmailPasswordForm onSubmit={props.createUserWithEmailAndPassword} />
        </div>
      </Modal>
    </>
  );
};

export default SignInModal;
