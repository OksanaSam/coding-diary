import React, { useState } from 'react';
import Cards from './Cards';
import ColorPicker from './ColorPicker';
import NewEntry from './NewEntry';

function Home(props) {
  const [currentDate, setDate] = useState(new Date());
  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleDateSelect = (date) => {
    setDate(date);
  };
  return (
    <>
      <label htmlFor="globalCheckbox">Global Checkbox</label>
      <input
        name="globalCheckbox"
        type="checkbox"
        onChange={props.handleGlobalChecked}
        defaultChecked={props.globalCheckbox}
      />

      <NewEntry
        handleCardsAdd={props.handleCardsAdd}
        currentDate={currentDate}
        displayName={props.displayName}
        user={props.user}
        handleDateChange={handleDateChange}
        handleDateSelect={handleDateSelect}
        item="new entry"
        globalCheckbox={props.globalCheckbox}
      />
      <Cards items={props.items} user={props.user} />
      <ColorPicker />
    </>
  );
}

export default Home;
