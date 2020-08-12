import React from 'react';

export default function Entries(props){
    return (
      <>   
        {
            props.items.length && props.user
    ?
    <ul className="here"> 
      {props.items.map((item, index) => {
        return (
          <li className="listResult" key={index}>
            <p>{item.uniqueId}</p>
            <p>{item.log}</p>
          </li>
        );
      })}
    </ul>
    :  <p>No Data</p>
}
</>
   );
   }

