import React, { useState } from 'react';

const SubmitButton = props =>
<button {...props}>submit</button>;

const EmailPasswordForm = ( {onSubmit} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
    <input
      type="email"
      value={email}
      required
      onChange={(e) => setEmail(e.target.value)}

    />
    <input
      type="password"
      value={password}
      required
      placeholder='enter password'
      onChange={(e) => setPassword(e.target.value)}
    />
      
      <SubmitButton onClick={() => onSubmit(email, password)} />
    </>
  );
}

export default EmailPasswordForm;