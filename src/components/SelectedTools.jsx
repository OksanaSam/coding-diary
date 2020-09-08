import React from 'react';
import Swal from 'sweetalert2';

function SelectedTools(props) {
  const options = [
    { name: 'Tags…', value: '' },
    { name: 'JavaScript', value: 'JavaScript' },
    { name: 'React', value: 'React' },
    { name: 'Vanilla', value: 'Vanilla' },
    { name: 'Other', value: 'Other' },
  ];

  const handleToolDelete = (index) => {
    const newOptions = [...props.selectedOptions];
    newOptions.splice(index, 1);
    props.setSelectedOptions(newOptions);
  };

  const handleSelect = (e) => {
    if (props.selectedOptions.length > 5) {
      Swal.fire({
        title: 'Hm...',
        text: "You can't add more than 5 tags.",
        confirmButtonText: 'Ok',
      });
    } else if (props.selectedOptions.includes(e.target.value)) {
      Swal.fire({
        title: 'Hm...',
        text: 'You have already added this tag!',
        confirmButtonText: 'Ok',
      });
    } else {
      props.setSelectedOptions([...props.selectedOptions, e.target.value]);
      localStorage.setItem('data', JSON.stringify(props.selectedOptions));
    }
  };

  return (
    <>
      <label htmlFor="tool">
        <select name="tool" id="tool" value={props.selectedOptions} onChange={handleSelect}>
          {options.map((option) => (
            <option
              key={option.value}
              selected={option.value === null ? 'selected' : null}
              value={option.value}
              disabled={option.value === null ? true : null}
            >
              {option.name}
            </option>
          ))}
        </select>
      </label>
      <ul className="selectedOptions">
        {props.selectedOptions.map((option, ind) => {
          return (
            <>
              {props.selectedOptions.length > 0 ? (
                <li key={props.selectedOptions.length}>
                  <button onClick={() => handleToolDelete(ind)}>X</button>
                  {option}
                </li>
              ) : null}
            </>
          );
        })}
      </ul>
    </>
  );
}

export default SelectedTools;
