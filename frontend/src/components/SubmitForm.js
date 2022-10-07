import React from 'react';
import { useState } from 'react';

function SubmitForm ({bathroomLatLng}) {

    const Checkbox = ({ label, value, onChange }) => {
        return(
            <label>
                <input type="checkbox" checked={value} onChange={onChange} />
                {label}
            </label>

        );
    }

    console.log(bathroomLatLng);

    const [rating, setRating] = useState('');
    const [name, setName] = useState('');
    const [tags, setTags] = useState('');
    const [checkedAccessible, setCheckedAccessible] = React.useState(false);
    const [checkedFree, setCheckedFree] = React.useState(false);
    const [checkedGenderNeutral, setCheckedGenderNeutral] = React.useState(false);
    const [checkedChangingStation, setCheckedChangingStation] = React.useState(false);
    const [checkedShowers, setCheckedShowers] = React.useState(false);


    const handleChangeAcessible = () => {
        setCheckedAccessible(!checkedAccessible);
    }

    const handleChangeFree = () => {
        setCheckedFree(!checkedFree);
    }

    const handleChangeGenderNeutral = () => {
        setCheckedGenderNeutral(!checkedGenderNeutral);
    }

    const handleChangeChangingStation = () => {
        setCheckedChangingStation(!checkedChangingStation);
    }

    const handleChangeShowers = () => {
        setCheckedShowers(!checkedShowers);
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
          />
          <label>Tags</label>
          <Checkbox
            label="Accessible"
            value={checkedAccessible} 
            onChange={handleChangeAcessible}/>
          <Checkbox
            label="Free"
            value={checkedFree} 
            onChange={handleChangeFree}/>
          <Checkbox
            label="Gender Neutral"
            value={checkedGenderNeutral} 
            onChange={handleChangeGenderNeutral}/>
          <Checkbox
            label="Changing Station"
            value={checkedChangingStation} 
            onChange={handleChangeChangingStation}/>
          <Checkbox
            label="Showers"
            value={checkedShowers} 
            onChange={handleChangeShowers}/>

          <button type="submit" className="submitButton">
            Add Bathroom
          </button>
        </form>
      </div>
    );

};

export default SubmitForm;