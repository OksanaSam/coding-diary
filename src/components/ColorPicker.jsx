'use strict'
import React, { useState } from 'react';
import { ChromePicker  } from 'react-color';
// import reactCSS from 'reactcss'


const ColorPicker = () => {
    const [color, setColor] = useState({
        ddisplayColorPicker: false,
      });
    
    const handleClick = () => {
        setColor({ displayColorPicker: !color.displayColorPicker })
      };
    
    const handleClose = () => {
        setColor({ displayColorPicker: false })
      };
    
    
    const popover = {
        position: 'absolute',
        zIndex: '2',
    }

    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }
    

      return (
        <>
          <div>
            <button onClick={ handleClick }>Pick Color</button>
            { color.displayColorPicker ? <div style={ popover }>
              <div style={ cover } onClick={ handleClose }/>
              <ChromePicker />
            </div> : null }
          </div>
          {/* <Circle /> */}
        </>
    )
}

export default ColorPicker;