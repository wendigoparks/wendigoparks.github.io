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
import { allFacilities,  textArrayToSymbolArray } from "./FacilityIcons";
import AddFacility from "./AddFacility";
import { userIsLoggedIn } from "./Authentication";


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
    const [state, setState] = React.useState('');
    const [county, setCounty] = React.useState('');
    const [latitude, setLatitude] = React.useState('');
    const [longitude, setLongitude] = React.useState('');
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
                "image_url": image_url.trim() ? image_url.trim() : defaultImageUrl,
                "state":state,
                "county":county,
                "latitude":latitude,
                "longitude":longitude,
                "facilities":facilitiesArray,
            }

            console.log(parkJson);
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

    // amenities is an array of facilities included via their string name
    const [amenitiesValue, setAmenitiesValue] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof amenitiesValue>) => {
        const {
        target: { value },
        } = event;
        createFacilityArray(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    // allows each facility to update its values so park, facility, and court info can all be posted together.
    const [facilitiesArray, setFacilitiesArray] = React.useState<any[]>([]);

    const updateFacilityInformation = (facilityInformation: any, index: number) => {
        let newFacilitiesArray = facilitiesArray;
        let facilityToUpdate = facilitiesArray[index];
        // update fields individually to keep fields not adjusted:
        // currently actual parameters of facility that will be editable are: name, address, capacity, description
        facilityToUpdate.name = facilityInformation.name ? facilityInformation.name : amenitiesValue[index];
        facilityToUpdate.address = facilityInformation.address ? facilityInformation.address : address;
        facilityToUpdate.description = facilityInformation.description;
        facilityToUpdate.capacity = facilityInformation.capacity;
        facilityToUpdate.courts = facilityInformation.courts;
        newFacilitiesArray[index] = facilityToUpdate;
        setFacilitiesArray(newFacilitiesArray);
    }

    const createFacilityArray = (amenitiesArray: string[]) => {
        setAmenitiesValue(amenitiesArray);
        let newFacilitiesArray = [];
        for (let i = 0; i < amenitiesArray.length; i++) {
            // make a spot for each facility in facilitiesArray
            newFacilitiesArray.push({
                /*
                Facilites require the following information:

                name VARCHAR(128) NOT NULL,
                state VARCHAR(32),
                county VARCHAR(64),
                address VARCHAR(512),
                latitude VARCHAR(16),
                longitude VARCHAR(16),
                description VARCHAR(512),
                phone_nr VARCHAR(32),
                type VARCHAR(64) NOT NULL,
                capacity INT,
                image_url VARCHAR(256),
                */
                name:amenitiesArray[i], 
                state:state,
                county:county,
                address:address,
                latitude:latitude,
                longitude:longitude,
                description:"",
                phone_nr:phone_nr,
                type:amenitiesArray[i],
                capacity:"",
                image_url:image_url,
                courts:[],
                monday_hours:"",
                tuesday_hours:"",
                wednesday_hours:"",
                thursday_hours:"",
                friday_hours:"",
                saturday_hours:"",
                sunday_hours:"",
            });
        }
        setFacilitiesArray(newFacilitiesArray);

    }

    return (
        <div>
            <h1>Add a New Park</h1>

            {
                /* Only logged in users (later with higher priveledges can add a park) */
                userIsLoggedIn() ? 
                <Button 
                    onClick={() => validateAndSend()} variant="contained" disabled={!(parkName.trim()) || !(address.trim())}
                > 
                    Add Park
                </Button>
                :
                <h1 style={{color:'red'}}>
                    You Must Be Logged In To Create A Park
                </h1>
            }
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
                            inputProps={{ maxLength: 30 }}
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
                            inputProps={{ maxLength: 40 }}
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
                            inputProps={{ maxLength: 25 }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPhoneNumber(event.target.value)} }
                        />
                    </div>
                    <div className="StateAndCounty" style={{
                        display:'flex',  
                        justifyContent: 'space-around', 
                        alignContent: 'space-around',
                        padding:10
                    }}>
                        <TextField 
                            id="outlined-basic" 
                            label="State" 
                            variant="outlined" 
                            value={state}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setState(event.target.value)} }
                        />
                        <div style={{width: 20}}></div>
                        <TextField 
                            id="outlined-basic" 
                            label="County" 
                            variant="outlined" 
                            value={county}
                            inputProps={{ maxLength: 25 }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setCounty(event.target.value)} }
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
                                setCapacity(event.target.value.replace(/[^(\d?\d?)]|\d{3}/g, ''))} }
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
                            value={latitude}
                            type="number"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setLatitude(event.target.value.replace(/[^0-9]/g, ''))} }
                        />
                        <div style={{width: 20}}></div>
                        <TextField 
                            id="outlined-basic" 
                            label="Longitude" 
                            variant="outlined" 
                            value={longitude}
                            type="number"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setLongitude(event.target.value)} }
                        />
                    </div>
                    {/*
                    <div className="Description" style={{
                        display:'flex',  
                        justifyContent: 'space-around', 
                        alignContent: 'space-around',
                        padding:10
                    }}>
                        <TextField 
                            sx={{width: 465}}
                            id="outlined-basic" 
                            label="Park Description" 
                            variant="outlined" 
                            value={description}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setDescription(event.target.value)} }
                        />
                    </div>
                    */}
                    
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
                <h2 style={{width: 350}} >Here is a preview of how your park will appear to users:</h2>
                <ParkCard notClickable={true} park={{
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
                        <h1>Please provide more information about your park's facilities:</h1>
                        {/* <p>{amenitiesValue.join(', ')}</p> */}
                        {
                            amenitiesValue.map((amenityString, index) => (
                                <AddFacility 
                                    key={amenityString} 
                                    address={address} 
                                    facility={amenityString} 
                                    updateFacilityInformation={updateFacilityInformation}
                                    index={index}
                                />
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