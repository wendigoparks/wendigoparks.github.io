// Add courts will directly modify their values in their array hopefully
// as props are passed by refrence.

import { TextField } from "@mui/material";
import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const AddCourts = (props: any): JSX.Element => {

    // props.court contains the current values for court name and reservability
    // props.setCourtValues is a function to update the courts
    // props.index is this courts index in the array of courts

    return (
        <div style={{padding:10}}>   
            <div className="CourtName" style={{ }}>
                <TextField 
                        id="outlined-basic" 
                        label="Name" 
                        variant="standard" 
                        defaultValue={props.court.name}
                        // color="success" could have focused text field a color other than blue
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            props.setCourtValues({name:event.target.value, reservable:props.court.reservable}, props.index)} }
                    />
            </div>
            <div className="CourtAllowReservations" style={{ }}>
            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked={props.court.reservable} 
                    onClick={() => {console.log(!props.court.reservable); props.setCourtValues({name:props.court.name, reservable:(!props.court.reservable)}, props.index)}}
                />} label="Allow Reservations" />
            </FormGroup>
            </div>
        </div>
    )
}

export default AddCourts;