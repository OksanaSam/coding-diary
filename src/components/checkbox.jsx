// import React from 'react';
import React, { useState, useEffect } from 'react';

const Checkbox = () => {
    const [isChecked, setChecked] = useState(false);

    const handleChecked = () => {
        setChecked(!isChecked);
      };

      const txt;
      if (isChecked) {
      txt = 'checked'
      } else {
      txt = 'unchecked'
      }

    return (
      <>
          
          <input type='checkbox' onChange={handleChecked}/>
          <p>This box is {txt}</p>
         
      </>   
    );
  };
  
  export default Checkbox;