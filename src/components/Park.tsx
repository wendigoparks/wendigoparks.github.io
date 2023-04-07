// park page. 
import React from "react"
import Facility from "./Facility";
import { useNavigate, useParams } from "react-router-dom";
import './Park.css'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Button from "@mui/material/Button";
import {ButtonBase, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

const Park = (props: any): JSX.Element => {

    // Instead of coming from props, Ideally just need to pass parkID as query parameter into URL
    // that way links can go to specific parks. 
    const { id } = useParams();
    
    // TODO Temporarily store parks in this array, NEED to come from database based on id instead
    const parks = [
        {
            "id": 1,
            "name": "caboose park",
            "state": "Virginia",
            "county": "Montgomery",
            "address": "920 Turner St NE, Blacksburg, VA 24060",
            "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
            "facilities": [{
                    "id":1,
                    "parkID":1,             // ParkID should just be the park that a specific facility belongs to
                    "category":"tennis",
                    "name":"Caboose Park Tennis Courts",
                    "openTime":"7:00am",
                    "closeTime":"10:00pm",  // Should be able to retrieve calender for facility via id and parkid which should be unique.
                    "restrictions":[]
                }, {
                    "id":2,
                    "parkID":1,             // ParkID should just be the park that a specific facility belongs to
                    "category":"skate park",
                    "name":"The Concrete Jungle",
                    "openTime":"7:00am",
                    "closeTime":"10:00pm",  // Should be able to retrieve calender for facility via id and parkid which should be unique.
                    "restrictions":["No children under the age of 10 allowed unsupervised", "No smoking", "No graffiti"]
                }]
        },
        {
            "id": 2,
            "name": "caboose park2",
            "state": "Virginia",
            "county": "Montgomery",
            "address": "920 Turner St NE, Blacksburg, VA 24060",
            "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
            "facilities": []
        },
        {
            "id": 3,
            "name": "caboose park3",
            "state": "Virginia",
            "county": "Montgomery",
            "address": "920 Turner St NE, Blacksburg, VA 24060",
            "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
            "facilities": []
        },
        {
            "id": 4,
            "name": "caboose park4",
            "state": "Virginia",
            "county": "Montgomery",
            "address": "920 Turner St NE, Blacksburg, VA 24060",
            "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
            "facilities": []
        },
        {
            "id": 5,
            "name": "caboose park5",
            "state": "Virginia",
            "county": "Montgomery",
            "address": "920 Turner St NE, Blacksburg, VA 24060",
            "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
            "facilities": []
        }
    ]

    
    // TODO Temporarily store parks in this array, NEED to come from database based on id instead
    let park: any = {
        "id": 0,
        "name": "Park not found in Database",
        "state": "d",
        "county": "d",
        "address": "d",
        "imageURL": "d",
        "facilities": []
    }

    function toTitleCase(s: string) {
        s = s.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        return s;
    }

    parks.forEach(parkJSON => {
        if (parkJSON.id.toString() === id) park = parkJSON;
    });

    // lets us move "back" one page
    const navigate = useNavigate();

    const openModalForFacility = (facility: any): void => {
        
    }
    // Need to decide if a facility modal would open in this react component, or if facilites would just open them themselves.

    return (
        <div className="middleBoxP">
            <Grid container spacing={2}>
                <Grid item>
                    <img alt="complex" src={park.imageURL} className={"parkImg"}/>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item>
                            <Typography gutterBottom variant="h4" component="div">
                                <span>{toTitleCase(park.name)}</span>
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <span>{park.address}</span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <span>{park.county}, {park.state}</span>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                <span>Desc goes here</span>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" endIcon={<KeyboardReturnIcon />} onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            {/* Show all facilities conntected to this park and their calendars */}
            {
                park.facilities ?
                <div className="FacilityFlexBox" style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                    {
                        park.facilities.map((facility: any) => (
                            <Facility facility={facility} parkName={park.name} key={facility.id} />)
                        )
                    }
                </div>
                :
                <div>
                    <p>No Facilities</p>
                </div>
                }
            
        </div>
    )
}

export default Park;