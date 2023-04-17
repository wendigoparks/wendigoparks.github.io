// JSX to display adding one facility. These will be listed cascadingly when a user
// creates a new park to specify details of each facility/facility of the park

import React from "react";
import { textArrayToSymbolArray } from "./FacilityIcons";
import { Button, TextField } from "@mui/material";
import AddCourts from "./AddCourts";

const AddFacility = (props: any ): JSX.Element => {

    // State variables for facility values
    const [name, setName] = React.useState(props.facility);
    const [address, setAddress] = React.useState(props.address);
    const [description, setDescription] = React.useState("");
    const [capacity, setCapacity] = React.useState("");
    const [numberOfCourts, setNumberOfCourts] = React.useState("");
    const [courtsArray, setCourtsArray] = React.useState<any[]>([]);

    // use these setters, so that values are propogated up to parent
    const setFacilityName = (newName: string) => {
        setName(newName);
        props.updateFacilityInformation({
            name:newName, 
            address:address, 
            description:description, 
            capacity:capacity,
            courts:courtsArray,
        }, props.index);
    }

    const setFacilityAddress = (newAddress: string) => {
        setAddress(newAddress);
        props.updateFacilityInformation({
            name:name, 
            address:newAddress, 
            description:description, 
            capacity:capacity,
            courts:courtsArray,
        }, props.index);
    }

    const setFacilityDescription = (newDescription: string) => {
        setDescription(newDescription);
        props.updateFacilityInformation({
            name:name, 
            address:address, 
            description:newDescription, 
            capacity:capacity,
            courts:courtsArray,
        }, props.index);
    }

    const setFacilityCapacity = (newCapacity: string) => {
        setCapacity(newCapacity);
        props.updateFacilityInformation({
            name:name, 
            address:address, 
            description:description, 
            capacity:newCapacity,
            courts:courtsArray,
        }, props.index);
    }

    // court indicies to modify the array correctly

    // For allowing creator to edit the court names and reservability
    const [showCourtsModal, setShowCourtsModal] = React.useState(false);

    // props.facility contains the string name of the facility. set the icon and certain words like
    // court or field accordingly

    // call 'courts' different things dependng on the sport
    const getPhraseForCourts = (): String => {
        if (props.facility === "Baseball" || props.facility === "Soccer" || props.facility === "Football" || props.facility === "Dog Park") {
            return "fields";
        } else if (props.facility === "Frisbee Disc Golf" || props.facility === "Golf") {
            return "courses";
        } else if (props.facility === "Skate Park") {
            return "skate parks"
        } else {
            return "courts";
        }
    }

    // Create an array of courts to be mapped into jsx for the number of courts chosen
    const createCourtsArray = (numString: string) => {
        const num = parseInt(numString);
        setNumberOfCourts(numString);
        let newCourtsArray = [];
        for (let i = 0; i < num; i++) {
            // make a spot for each court in courtsArray
            newCourtsArray.push({name:getPhraseForCourts().substring(0, getPhraseForCourts().length - 1) + " " + (i + 1), reservable:true});
        }
        console.log(newCourtsArray);
        setCourtsArray(newCourtsArray);
    }

    // moves from child AddCourts component up here to parent AddFacility component, lets the child
    // change its values at its array in the index.
    const setCourtValues = (newValues: any, index: number) => {
        let newCourtsArray = courtsArray;
        newCourtsArray[index] = newValues;
        setCourtsArray(newCourtsArray);
        props.updateFacilityInformation({
            name:name, 
            address:address, 
            description:description, 
            capacity:capacity,
            courts:newCourtsArray,
        }, props.index);
    }

    // Actual parameters of facility that will be editable are: name, address, capacity, description ?

    return (
        <div style={{width:"95%"}}>
            {
                showCourtsModal ? 
                <div>
                    <div className="HorizontalFacilityBar" style={{
                        backgroundColor: "lightBlue",
                        display:'flex',
                        flexWrap: 'wrap',
                        justifyContent:'space-evenly',
                        alignItems:'center',
                        paddingTop:'18px',
                        paddingBottom:'18px',
                        border: '3px solid #c7f1c4',
                    }}>
                        {
                            courtsArray.map((courtValues, index) => (
                                <AddCourts setCourtValues={setCourtValues} index={index} key={index} court={courtValues} />
                            ))
                        }
                    </div>
                    <div className="LeaveCourtsButton">
                        <Button
                            variant='contained'
                            onClick={() => {setShowCourtsModal(false)}}
                        >
                            Back To Facility
                        </Button>
                    </div>
                </div>
                :
                <div className="HorizontalFacilityBar" style={{
                    backgroundColor: "lightcyan",
                    display:'flex',
                    flexWrap: 'wrap',
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
                                setFacilityName(event.target.value)} }
                        />
                    </div>
                    <div className="facilityAddress" style={{ }}>
                    <TextField 
                            id="outlined-basic" 
                            label="Facility Address" 
                            variant="outlined" 
                            value={address}
                            // color="success" could have focused text field a color other than blue
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setFacilityAddress(event.target.value)} }
                        />
                    </div>
                    <div className="facilityDescription" style={{ }}>
                    <TextField 
                            id="outlined-basic" 
                            label="Facility Description" 
                            variant="outlined" 
                            value={description}
                            // color="success" could have focused text field a color other than blue
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setFacilityDescription(event.target.value)} }
                        />
                    </div>
                    <div className="facilityCapacity" style={{ }}>
                        <TextField 
                            id="outlined-basic" 
                            label="Facility Capacity" 
                            variant="outlined" 
                            value={capacity}
                            // color="success" could have focused text field a color other than blue
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setFacilityCapacity(event.target.value)} }
                        />
                    </div>
                    <div className="FacilityCourts" style={{ }}>
                        <TextField 
                            id="outlined-basic" 
                            label={("Number of " + getPhraseForCourts())}
                            variant="outlined" 
                            value={numberOfCourts}
                            // color="success" could have focused text field a color other than blue
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                createCourtsArray(( parseInt(event.target.value.replace(/[^(\d?\d?)]|\d{3}/g, '')) <= 20 ? 
                                event.target.value.replace(/[^(\d?\d?)]|\d{3}/g, '')
                                : "20" ));
                            } }
                        />
                    </div>
                    <div className="EditCourtsButton">
                        <Button
                            variant='contained'
                            disabled={!numberOfCourts || parseInt(numberOfCourts) < 1}
                            onClick={() => {setShowCourtsModal(true)}}
                        >
                            Edit Courts
                        </Button>
                    </div>
                </div>
            }

            
        </div>
    )
}


export default AddFacility;