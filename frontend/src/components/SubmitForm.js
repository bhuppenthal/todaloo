import React from 'react';
import { useState } from 'react';

function SubmitForm ({bathroomLatLng}) {
    console.log(bathroomLatLng);

    const [rating, setRating] = useState('');
    const [name, setName] = useState('');
    const [tags, setTags] = useState('');
    const [checked, setChecked] = React.useState(false);

    const handleChangeCheck = () => {
        setChecked(!checked);
    }

    return (
        
        <div className = "submit-form">
        <form onSubmit={(e) => { e.preventDefault();}}>
          <label>Rating</label>
          <select required
            value={rating}
            onChange= {e => setRating(e.target.value)}
            id="rating">
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
          </select>
          <label>Name</label>
          <input required
            type="text"
            placeholder="Name of location"
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
            class="long_input"
          />
          <label>Tags</label>
          <input 
          type="checkbox"
          checked={checked}
          onChange={handleChangeCheck}
          />

          <button type="submit" className="submitButton">
            Add Bathroom
          </button>
        </form>
      </div>
    );
};

export default SubmitForm;