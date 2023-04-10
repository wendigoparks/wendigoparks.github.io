// JSX to display adding one facility. These will be listed cascadingly when a user
// creates a new park to specify details of each facility/facility of the park

import React from "react";
import { textArrayToSymbolArray } from "./FacilityIcons";
import { Button, TextField } from "@mui/material";

const AddFacility = (props: any ): JSX.Element => {

    // State variables for facility values
    const [name, setName] = React.useState(props.facility);
    const [capacity, setCapacity] = React.useState("");
    const [numberOfCourts, setNumberOfCourts] = React.useState("");

    // props.facility contains the string name of the facility. set the icon and certain words like
    // court or field accordingly

    // call 'courts' different things dependng on the sport
    const getPhraseForCourts = (): String => {
        if (props.facility === "Baseball" || props.facility === "Soccer" || props.facility === "Football") {
            return "Number of Fields";
        } else if (props.facility === "Frisbee Disc Golf" || props.facility === "Golf") {
            return "Number of courses";
        } else {
            return "Number of courts";
        }
    }

    return (
        <div style={{width:"95%"}}>
            <div className="HorizontalFacilityBar" style={{
                backgroundColor: "lightcyan",
                display:'flex',
                justifyContent:'space-evenly',
                alignItems:'center',
                paddingTop:'18px',
                paddingBottom:'18px',
                border: '3px solid #c7f1c4',
            }}>
                <div className="IconBox" style={{ fontSize:80}}>
                    {textArrayToSymbolArray([props.facility])}
                </div>
                <div className="facilityName" style={{ }}>
                <TextField 
                        id="outlined-basic" 
                        label="Facility Name" 
                        variant="outlined" 
                        value={name}
                        // color="success" could have focused text field a color other than blue
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setName(event.target.value)} }
                    />
                </div>
                <div className="facilityAddress" style={{ }}>
                <TextField 
                        id="outlined-basic" 
                        label="Facility Address" 
                        variant="outlined" 
                        value={name}
                        // color="success" could have focused text field a color other than blue
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setName(event.target.value)} }
                    />
                </div>
                <div className="facilityPhone" style={{ }}>
                <TextField 
                        id="outlined-basic" 
                        label="Facility Phone Number" 
                        variant="outlined" 
                        value={name}
                        // color="success" could have focused text field a color other than blue
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setName(event.target.value)} }
                    />
                </div>
                <div className="facilityCapacity" style={{ }}>
                    <TextField 
                        id="outlined-basic" 
                        label="Facility Capacity" 
                        variant="standard" 
                        value={capacity}
                        // color="success" could have focused text field a color other than blue
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setCapacity(event.target.value)} }
                    />
                </div>
                <div className="FacilityCourts" style={{ }}>
                    <TextField 
                        id="outlined-basic" 
                        label={getPhraseForCourts()}
                        variant="filled" 
                        value={numberOfCourts}
                        // color="success" could have focused text field a color other than blue
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setNumberOfCourts(event.target.value)} }
                    />
                </div>
                <div className="EditCourtsButton">
                    <Button
                        variant='contained'
                        onClick={() => {alert("This will show a modal where you can edit info for the courts")}}
                    >
                        Edit Courts
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default AddFacility;