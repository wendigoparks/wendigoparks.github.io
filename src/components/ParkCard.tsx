import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import React from "react"
import { useNavigate } from 'react-router-dom';
import { textArrayToSymbolArray } from './FacilityIcons';

// Create a card for a single park to appear on the search result page.
// Clicking the card for a page can navigate the user to a new page just
// for that park. 
const ParkCard = (props: any): JSX.Element => {
    // props.park will contain the JSON with park information. 
    // Example Park JSON:
    /*
    {
        "id": "12345" --> just generate UUIDs for each park
        "name": "caboose park",
        "state": "Virginia",
        "county": "Montgomery",
        "address": "920 Turner St NE, Blacksburg, VA 24060",
        "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
        "facilites: [{...}, {...}]" each park has an array of facilites like tennis courts, skate park, frisbee golf, 
            etc each of which can have a calendar
    }
    */
    // Props.park must be given:
    // Set each value with a default if not given in props.park
   const name: String = props.park.name ? props.park.name : "Untitled Park";

   // Allows to switch pages to a specific park page and supply the park id 
   const navigate = useNavigate();

    return (
        <div style={{padding: '25px', width: '345px', maxHeight: '300px', minHeight: '300px'}}>
            {/*Paper gives the elevated look*/}
          <Paper elevation={8}  style={{height: '300px'}}>
            <Card style={{height: '300px'}}>
                <CardActionArea onClick={() => {
                    navigate(`/park/${props.park.id}`);
                    }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={props.park.image_url}
                        alt="photo of a park"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" sx={{textDecoration: 'underline'}} display="inline" >
                            {props.park.address}
                        </Typography>
                        <Typography variant="body2" style={{paddingLeft:'5px'}}>
                            ✆ {props.park.phone_nr}
                        </Typography>
                        <Typography variant="body2"  style={{paddingRight:10, fontSize:25}}>
                                {/* Make amenitites a list and then use this: Amenities: {textArrayToSymbolArray(props.park.amenities)} */}
                            {textArrayToSymbolArray(props.park.amenities ? props.park.amenities.split(',') : ["basketball"])}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
          </Paper>
        </div>
    )
}

export default ParkCard;

