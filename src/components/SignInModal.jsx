import React from 'react';
import Modal from 'react-modal';
import EmailPasswordForm from './EmailPasswordForm';
import { FaTwitterSquare, FaGithub, FaGoogle, FaFacebookSquare } from 'react-icons/fa';
import styled, { css } from 'styled-components'



const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid blue;
  color: darkblue;
  margin: 0 1em;
  padding: 0.25em 1em;

  ${props =>
    props.primary &&
    css`
      background: blue;
      color: white;
    `};
`




const SignInModal = (props) => {
    
    function afterOpenModal() {
    // console.log('modal is open');
    }

    return (
        <>
        <Modal
            isOpen={props.modalIsOpen}
            ariaHideApp={false}
            onAfterOpen={afterOpenModal}
            onRequestClose={props.closeModal}
            contentLabel="Example Modal"
        >
        <Button onClick={props.closeModal}>close</Button>
        <Button primary onClick={props.googleSignin}><FaGoogle/></Button>
        <Button primary onClick={console.log('facebook')}><FaFacebookSquare/></Button>
        <Button primary onClick={props.handleGitHubLogin}><FaGithub/></Button>
        <Button primary onClick={props.handleTwitterLogin}>< FaTwitterSquare/></Button>
        

        <div>
            <p>OR</p>
        </div>

        <div>
          <h1>sign in with email</h1>
          <EmailPasswordForm
            onSubmit={props.signInWithEmailAndPassword}
          />
        </div>

        <div>
          <h1>Don't have an account? Sign up</h1>
          <EmailPasswordForm
            onSubmit={props.createUserWithEmailAndPassword}  
          />
        </div>
      </Modal>
        </>
    )
}

export default SignInModal;