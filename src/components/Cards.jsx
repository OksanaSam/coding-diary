import React from 'react';
import Card from './Card';

function Cards(props) {
  return (
    <>
      {props.items ? (
        <ul>
          {props.items.map((item) => {
            return (
              <li key={item.uniqueId}>
                <Card item={item} user={props.user} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No entries yet...</p>
      )}
    </>
  );
}

export default Cards;
