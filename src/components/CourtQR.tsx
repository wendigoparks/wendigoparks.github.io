// Users are directed here when scanning a QR Code should give them 
// to option to request the NEXT availability for this specific court
// OR direct them to log in to make a reservation. 

import { Button } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const CourtQR = (props: any): JSX.Element => {

    // court id should be passed in the url, 
    const { courtId } = useParams();

    // Grab court info from back end using useEffect and display it here ?? or not

    // This component out of ALL Components needs to be optimized for mobile viewing. 
    const getNextAvailability = () => {
        // Ask backend for next availability then tell user when
        // that will be and what random username they will have it under
        console.log(courtId);
    }

    return (
        <div>
            <p style={{fontSize:100}}> you got here from a qr code didn't you squidward</p>
            <div className="CourtInfoFlexbox" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
                <h1> Court info here just like on QR page</h1>
                <Button
                    onClick={getNextAvailability}
                    variant="contained"
                > 
                    Get Next Availability Now
                </Button>
                <Button
                    onClick={() => {alert("takes you to login screen with park id passed to pull user to that park after logging in")}}
                    variant="contained"
                >
                    Log In to make a reservation further in the future.
                </Button>
            </div>
        </div>
    )
}

export default CourtQR;