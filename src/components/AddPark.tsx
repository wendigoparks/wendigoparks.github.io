/*
Allow users to add new parks or modify existing parks in the database
*/
import React from "react";
import Box from '@mui/material/Box';
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
//import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';


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
                "amenities": amenitiesValue ? amenitiesValue.join() : defaultAmenities,
                "phone_nr": phone_nr.trim() ? phone_nr.trim() : defaultPhoneNumber,
                "capacity": capacity.trim() ? capacity.trim() : defaultCapacity,
                "image_url": image_url.trim() ? image_url.trim() : defaultImageUrl
            }

            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':  'http://127.0.0.1:8000',
                    'Access-Control-Allow-Methods': 'POST',
                },
                body: JSON.stringify(parkJson)
            };
            // Using Fetch API
            fetch(addParkEndpoint, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // successfully posted! clear fields and alert user
                resetForms();
                alert("Congratulations the park has been successfully added!");
            })
            .catch((err) => {
                console.log(err.message);
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
            <h1>Add or edit a park</h1>

            <Button onClick={() => validateAndSend()} variant="contained" disabled={!(parkName.trim()) || !(address.trim())} > 
                Add Park
            </Button>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField 
                    id="outlined-basic" 
                    label="Park Name *" 
                    variant="outlined" 
                    // color="success" could have focused text field a color other than blue
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setParkName(event.target.value)} }
                />
                <TextField 
                    id="outlined-basic" 
                    label="Description" 
                    variant="outlined" 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setDescription(event.target.value)} }
                />
                <TextField 
                    id="outlined-basic" 
                    label="Address *" 
                    variant="outlined" 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setAddress(event.target.value)} }
                />
                <TextField 
                    id="outlined-basic" 
                    label="Phone Number" 
                    variant="outlined" 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPhoneNumber(event.target.value)} }
                />
                <TextField 
                    id="outlined-basic" 
                    label="Capacity" 
                    variant="outlined" 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setCapacity(event.target.value)} }
                />
                <TextField 
                    id="outlined-basic" 
                    label="Link to Park Image" 
                    variant="outlined" 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setParkImageURL(event.target.value)} }
                />
                <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="multiple-checkbox-label">Facilities</InputLabel>
                    <Select
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
            </Box>
            <p> Your park will appear like this: </p>
            <div style={{display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
            <ParkCard park={{
                "name": parkName,
                "description": description.trim() ? description.trim() : defaultDescription,
                "address": address,
                "amenities": amenitiesValue ? amenitiesValue.join() : defaultAmenities,
                "phone_nr": phone_nr.trim() ? phone_nr.trim() : defaultPhoneNumber,
                "capacity": capacity.trim() ? capacity.trim() : defaultCapacity,
                "image_url": image_url.trim() ? image_url.trim() : defaultImageUrl
            }}/>
            </div>
        </div>
    )
}

export default AddPark;