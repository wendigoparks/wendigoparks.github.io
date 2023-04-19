// park page. 
import React, { useEffect } from "react"
import Facility from "./Facility";
import { useNavigate, useParams } from "react-router-dom";
import './Park.css'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Button from "@mui/material/Button";
import {ButtonBase, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

const Park = (props: any): JSX.Element => {
    // TODO Temporarily store parks in this array, NEED to come from database based on id instead

    // lets us move "back" one page
    const navigate = useNavigate();

    // Instead of coming from props, Ideally just need to pass parkID as query parameter into URL
    // that way links can go to specific parks. 
    const { id } = useParams();

    // the url to retreive a specific park from:
    const getParkUrl = "http://127.0.0.1:8000/park/" + id; // + park_id
    // the url to retreive a specific park from:
    const getParkFacilitiesUrl = "http://127.0.0.1:8000/facilities/" + id; // + park_id
    // the url to retreive a specific park from:
    const getParkCourtsUrl = "http://127.0.0.1:8000/courts/"; // + facility_id

    // This will hold all of the parks retreived
    const [park, setPark] = React.useState<any>({});
    const [retrievedPark, setRetreivedPark] = React.useState<boolean>(true);

    // Hold park's facilities
    const [facilities, setFacilities] = React.useState<any>([{}]);

    // First get all parks from database
    // This will run once on component mounting
    useEffect(() => {
        console.log('Retreiving from Backend...');
        let newParksArray: any[] = [];
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Access-Control-Allow-Credentials':'true',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':  'http://127.0.0.1:8000',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Accept'
            },
        };
        // check if a search query has been supplied in the url, if it has call
        // backend to perfrom the search, if it hasn't, retreive all parks. 
        fetch(getParkUrl, requestOptions )
        .then(response => response.json())
        .then(data => {
            console.log("Retrived the following data:\n");
            console.log(data);
            // console.log(JSON.parse(data[0].body).name);
            // Will need to process data so that parks ends up with an aray of park JSONs
            //const parkJson: JSON = JSON.parse(data[0].body);
            //newParksArray.push(parkJson);
            setPark(data);
            setRetreivedPark(true);
            // Now retrieve facilities for the park!
            fetch(getParkFacilitiesUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                // should be receiving facilities here
                console.log("received the following facilities:");
                console.log(data);
                // save facilities retreived
                setFacilities(data);
            })



        }) // end of .then where data is retrieved for park
        .catch(() => {
            console.log("ERROR Failed to retrieve info for park with id:" + id);
            navigate(-1); // send user back a page
        })
      }, [id])
    
    

    function toTitleCase(s: string) {
        if (!s) return "";
        s = s.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        return s;
    }



    const openModalForFacility = (facility: any): void => {
        
    }
    // Need to decide if a facility modal would open in this react component, or if facilites would just open them themselves.

    return (
        <div>
        {
            retrievedPark ?
            <div className="middleBoxP">
                <Grid container spacing={2}>
                    <Grid item>
                        <img alt="complex" src={park.image_url} className={"parkImg"}/>
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
                    facilities ?
                    <div className="FacilityFlexBox" style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                        {
                            facilities.map((facility: any) => (
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
            :
            <div>
                <p>Could'nt find park</p>
            </div>
        }
        </div>
    )
}

export default Park;