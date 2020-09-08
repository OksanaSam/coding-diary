import React from 'react';
import CardNew from './Card';

function Cards(props) {
  return (
    <>
      {props.items ? (
        <ul className="here">
          {props.items.map((item) => {
            return (
              <li className="listResult" key={item.uniqueId}>
                <CardNew item={item} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Cards;
