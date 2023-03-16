// park page. 
import React from "react"
import Facility from "./Facility";

const Park = (props: any): JSX.Element => {

    // props.park contains park json

    return (
        <div>
            <button onClick={props.leaveParkView}> Back to search </button>
            <h1>{props.park.name}</h1>
            <img src={props.park.imageURL} style={{width:300}} />

            {/* Show all facilities conntected to this park and their calendars */}
            
            {
                props.park.facilities ?
                props.park.facilities.map((facility: any) => (
                    <Facility facility={facility} parkName={props.park.name} key={facility.id} />)
                )
                :
                <div>
                    <p>No Facilities</p>
                </div>
                }
            
        </div>
    )
}

export default Park;