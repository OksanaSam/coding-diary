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
          <form>
          <textarea name="" id="" cols="30" rows="10" placeholder="message"></textarea>
      
     
            <input
                type='text'
                // onChange={this.myChangeHandler}
            />
            </form>
         
      </>   
    );
  };
  
  export default Checkbox;