import React from 'react';

const Cards = (props) => {
    return (
        <>
            {
                props.items.length
                ?
                <ul className="here"> 
                    {props.items.map((item, index) => {
                    return (
                        <li className="listResult" key={index}>
                        {/* <p>{item.uniqueId}</p> */}
                        <p>{item.log}</p>
                        </li>
                    );
                    })}
                </ul>
                :  <p>Loading...</p>
            }
        </>
    )
}

export default Cards;