import React from 'react';
import Modal from 'react-modal';
import EmailPasswordForm from './EmailPasswordForm';


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
          <button onClick={props.googleSignin}>sign in with google</button>
        </div>

        <div>
           <p>OR</p>
        </div>

        <div>
          <button onClick={props.handleGitHubLogin}>sign in with github</button>
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