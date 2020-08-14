import React from 'react';
import Modal from 'react-modal';
import EmailPasswordForm from './EmailPasswordForm';
import { FaTwitterSquare, FaGithub, FaGoogle, FaFacebookSquare } from 'react-icons/fa';




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
        <button onClick={props.closeModal}>close</button>

        <div>
          <button onClick={props.googleSignin}><FaGoogle/></button>
        </div>

        <div>
           <p>OR</p>
        </div>
        <div>
          <button onClick={console.log('facebook')}><FaFacebookSquare/></button>
        </div>

        <div>
           <p>OR</p>
        </div>

        <div>
          <button onClick={props.handleGitHubLogin}><FaGithub/></button>
        </div>
        <div>
          <button onClick={props.handleTwitterLogin}>< FaTwitterSquare/></button>
        </div>

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