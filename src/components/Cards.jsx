import React from 'react';
import CardNew from './Card'



const Cards = (props) => {
    return (
        <>
            {
                props.items.length
                ?
                <ul className="here"> 
                    {props.items.map((item) => {
                    return (
                        <li className="listResult" key={item.uniqueId}>
                            <CardNew
                                log={item.log}
                            />
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