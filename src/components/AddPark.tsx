/*
Allow users to add new parks or modify existing parks in the database
*/
import React from "react";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import ParkCard from "./ParkCard";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { allFacilities, facilitesToIcon, textArrayToSymbolArray } from "./FacilityIcons";
import AddFacility from "./AddFacility";


const AddPark = (): JSX.Element => {

    // Endpoint to send POST request to backend
    const addParkEndpoint = "http://127.0.0.1:8000/park"; // "https://localhost:8000/park";

    // Default values for non-required fields if an invalid
    // input is given:
    const defaultImageUrl = "https://www.tigard-or.gov/home/showpublishedimage/2810/637698863440870000";
    const defaultDescription = "No Description Given";
    const defaultAmenities = "Amenities Unknown";
    const defaultPhoneNumber = "None";
    const defaultCapacity = "Unknown";

    /*
        New parks need to conform to this schema

        name: str
        description: str | None = None
        address: str | None = None
        amenities: str | None = None
        phone_nr: str | None = None
        capacity: int | None = None
        image_url: str | None = None
    */

    const [parkName, setParkName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [phone_nr, setPhoneNumber] = React.useState('');
    const [capacity, setCapacity] = React.useState('');
    const [image_url, setParkImageURL] = React.useState('');

    // After user successfully adds a park reset all of the forms
    const resetForms = () => {
        setParkName("");
        setDescription("");
        setAddress("");
        setPhoneNumber("");
        setCapacity("");
        setParkImageURL("");
        setAmenitiesValue([]);
    }

    const validateAndSend = () => {
        // Make sure necessary park data is provided IE
        // name and address, set everything else to defaults if not
        // provided, and then try to send this new park to the backend as a new park.
        // For now assume park name and address are only required attributes 
        if (parkName.trim() !== "" && address.trim() !== "") {
            // build park JSON object and send it to backend endpoint:
            const parkJson = {
                "name": parkName,
                "description": description.trim() ? description.trim() : defaultDescription,
                "address": address,
                "amenities": amenitiesValue ? amenitiesValue.join(',') : defaultAmenities,
                "phone_nr": phone_nr.trim() ? phone_nr.trim() : defaultPhoneNumber,
                "capacity": capacity.trim() ? capacity.trim() : defaultCapacity,
                "image_url": image_url.trim() ? image_url.trim() : defaultImageUrl
            }

            console.log("amenities looks like: \n" + amenitiesValue.join(','))
            // Using Fetch API
            fetch(addParkEndpoint, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':  'http://127.0.0.1:8000',
                    'Access-Control-Allow-Methods': 'POST',
                },
                body: JSON.stringify(parkJson),
                credentials: 'include'
            })
            .then((response) => { 
                if (!response.ok) {throw new Error(String(response.status)); }
                else {return response.json(); } })
            .then((data) => {
                console.log(data);
                // successfully posted! clear fields and alert user
                resetForms(); // not working as intended
                alert("Congratulations the park has been successfully added!");
            })
            .catch((err) => {
                console.log(err.message);
                alert("Unable to add park to the database")
            });

        } else {
            alert("A New Park must have a Name and an Address. Please enter values and try again.")
        }
    }

    

    const [amenitiesValue, setAmenitiesValue] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof amenitiesValue>) => {
        const {
        target: { value },
        } = event;
        setAmenitiesValue(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };



    return (
        <div>
            <h1>Add a new park</h1>

            <Button 
                onClick={() => validateAndSend()} variant="contained" disabled={!(parkName.trim()) || !(address.trim())}
            > 
                Add Park
            </Button>
            <div className="FormsAndPreview" style={{
                display:'flex',
                justifyContent:'space-around',
                flexWrap:'wrap',
                padding:20
            }}>
                <div className="AllForms" style={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignContent: 'center'
                }}>
                    <div className="NameAndAddress" style={{
                        display:'flex', 
                        justifyContent: 'space-around', 
                        alignContent: 'space-around',
                        padding:10
                    }}>
                        <TextField 
                            id="outlined-basic" 
                            label="Park Name *" 
                            variant="outlined" 
                            value={parkName}
                            // color="success" could have focused text field a color other than blue
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setParkName(event.target.value)} }
                        />
                        <div style={{width: 20}}></div>
                        <TextField 
                            id="outlined-basic" 
                            label="Address *" 
                            variant="outlined" 
                            value={address}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setAddress(event.target.value)} }
                        />
                    </div>
                    <div className="DescriptionAndNumber" style={{
                        display:'flex',  
                        justifyContent: 'space-around', 
                        alignContent: 'space-around',
                        padding:10
                    }}>
                        <TextField 
                            id="outlined-basic" 
                            label="Description" 
                            variant="outlined" 
                            value={description}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setDescription(event.target.value)} }
                        />
                        <div style={{width: 20}}></div>
                        <TextField 
                            id="outlined-basic" 
                            label="Phone Number" 
                            variant="outlined" 
                            value={phone_nr}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPhoneNumber(event.target.value)} }
                        />
                    </div>
                    <div className="CapacityAndImage" style={{
                        display:'flex',  
                        justifyContent: 'space-around', 
                        alignContent: 'space-around',
                        padding:10
                    }}>
                        <TextField 
                            // style={{backgroundColor:'white'}}
                            id="outlined-basic" 
                            label="Capacity" 
                            variant="outlined" 
                            value={capacity}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setCapacity(event.target.value.replace(/[^0-9]/g, ''))} }
                        />
                        <div style={{width: 20}}></div>
                        <TextField 
                            id="outlined-basic" 
                            label="Link to Park Image" 
                            variant="outlined" 
                            value={image_url}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setParkImageURL(event.target.value)} }
                        />
                    </div>
                    <div className="LatitudeAndLongitude" style={{
                        display:'flex',  
                        justifyContent: 'space-around', 
                        alignContent: 'space-around',
                        padding:10
                    }}>
                        <TextField 
                            // style={{backgroundColor:'white'}}
                            id="outlined-basic" 
                            label="Latitude" 
                            variant="outlined" 
                            value={capacity}
                            type="number"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setCapacity(event.target.value.replace(/[^0-9]/g, ''))} }
                        />
                        <div style={{width: 20}}></div>
                        <TextField 
                            id="outlined-basic" 
                            label="Longitude" 
                            variant="outlined" 
                            value={image_url}
                            type="number"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setParkImageURL(event.target.value)} }
                        />
                    </div>
                    <div className="Facilities">
                    <FormControl sx={{ m: 1, width: 465 }}  >
                        <InputLabel id="multiple-checkbox-label">Facilities</InputLabel>
                        <Select 
                        style={{fontSize:25}}
                        labelId="multiple-checkbox-label"
                        id="multiple-checkbox"
                        multiple
                        value={amenitiesValue}
                        onChange={handleChange}
                        input={<OutlinedInput label="Facilities" />}
                        renderValue={(selected) => textArrayToSymbolArray(selected)}
                        //MenuProps={MenuProps}
                        >
                        {allFacilities.map((facility) => (
                            <MenuItem key={facility} value={facility}>
                            <Checkbox checked={amenitiesValue.indexOf(facility) > -1} />
                            <ListItemText primary={facility} />
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    </div>
                </div>
            <div className="PreviewTextAndCard">
                <div style={{display:'flex',
                            flexDirection:'column',
                            justifyContent: 'center',
                            alignItems: 'center'}}
                >
                <ParkCard park={{
                    "name": parkName,
                    "description": description.trim() ? description.trim() : defaultDescription,
                    "address": address,
                    "amenities": amenitiesValue ? amenitiesValue.join(',') : defaultAmenities,
                    "phone_nr": phone_nr.trim() ? phone_nr.trim() : defaultPhoneNumber,
                    "capacity": capacity.trim() ? capacity.trim() : defaultCapacity,
                    "image_url": image_url.trim() ? image_url.trim() : defaultImageUrl
                }}/>
                </div>
            </div>
            </div>
                {
                    amenitiesValue[0] ? 
                    
                    <div className="Add Facilities" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <h1>Your Park has the following Facilities:</h1>
                        <p>{amenitiesValue.join(', ')}</p>
                        {
                            amenitiesValue.map(amenityString => (
                                <AddFacility facility={amenityString} />
                            ))
                        }
                    </div>
                    :
                    <div></div>
                }

        </div>
    )
}

export default AddPark;