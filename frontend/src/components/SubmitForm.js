import React from 'react';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import "./SubmitForm.css";

function SubmitForm ({bathroomLatLng}) {

  const navigate = useNavigate();

    const Checkbox = ({ label, value, onChange }) => {
        return(
            <label className='check-box'>
                <input type="checkbox" checked={value} onChange={onChange} />
                {label}
            </label>

        );
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));

    console.log(storedUser)

    // const [loggedInUser, setLoggedInUser] = useState('');

    // useEffect(() => {
    //   const storedUser = localStorage.getItem('user');
    //   if (storedUser) {
    //     const foundUser = JSON.parse(storedUser);
    //     setLoggedInUser(foundUser);
    //     console.log(foundUser)
    //   }

    //   console.log(loggedInUser)
    // }, []);

    console.log(bathroomLatLng);

    const [rating, setRating] = useState('');
    const [name, setName] = useState('');
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

    const submitBathroom = async (e) => {
        
        const newBathroom = {
          position : bathroomLatLng,
          rating : rating,
          name : name,
          tags : {accessible: checkedAccessible, free: checkedFree, genderNeutral: checkedGenderNeutral, changingStation: checkedChangingStation, showers: checkedShowers },
          username : storedUser.username
        }
          
        console.log(newBathroom)
        
        const response = await fetch("/bathroom", {
          method: 'POST',
          body: JSON.stringify(newBathroom),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if(response.status === 201) {
            alert("successfully added the bathroom to DB!");
        } else {
            alert(`Failed to add marker too bad, status code = ${response.status}`);
        }
        navigate("/");
      };

    return (
        
        <div className = "submit-form">
        <form onSubmit={(e) => { e.preventDefault();}}>
          <label className='rating'>Rating</label>
          <select required
            className='select'
            value={rating}
            onChange= {e => setRating(e.target.value)}
            id="rating">
                <option value="" selected>select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
          </select>
          <label className='name'>Name</label>
          <input required
            className='text-box'
            type="text"
            placeholder="Name of location"
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label className='tags'>Tags</label>
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

          <button 
            type="submit" 
            className="button"
            onClick={submitBathroom}>
            Add Bathroom
          </button>
        </form>
      </div>
    );

};

export default SubmitForm;