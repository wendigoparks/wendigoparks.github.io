// Page to display one individual facility and its schedule
import React from "react";

const Facility = (props: any): JSX.Element => {

    // needs to be passed props.facility and need to define facility opitons and json structure
    // ie example structure:
    /*
    {
        "id":11
        "category":"Tennis",
        "location":"101 main street",
        "imageURL":"https://mastersystemscourts.com/img/master-systems-courts-tennis-court-1-991x605l.jpg",
        "parkID":"1",

    }
    or how I currently have them:
    {
        "id":1,
        "parkID":1,             // ParkID should just be the park that a specific facility belongs to
        "category":"tennis",
        "name":"Caboose Park Tennis Courts",
        "openTime":"7:00am",
        "closeTime":"10:00pm",  // Should be able to retrieve calender for facility via id and parkid which should be unique.
    }

    */

    return (
        <div className="Facility" style={{backgroundColor:'lightblue', border:'3px solid'}}>
            <span> 
                {/* Display icon for category, as well as facility information and the calendar */}
                <h1>Category is: {props.facility.category} Name: {props.facility.name}</h1> 
            </span>
           
        </div>
    )
}

export default Facility;