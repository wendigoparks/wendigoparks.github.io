import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import React from "react"

// Create a card for a single park to appear on the search result page.
// Clicking the card for a page can navigate the user to a new page just
// for that park. 
const ParkCard = (props: any): JSX.Element => {
    // props.park will contain the JSON with park information. 
    // Example Park JSON:
    /*
    {
        "name": "caboose park",
        "state": "Virginia",
        "county": "Montgomery",
        "address": "920 Turner St NE, Blacksburg, VA 24060",
        "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
    }
    */
    // Props.park must be given:
    // Set each value with a default if not given in props.park
   const name: String = props.park.name ? props.park.name : "Untitled Park";

    return (
        <div style={{padding: '25px'}}>
            {/*Paper gives the elevated look*/}
          <Paper elevation={8} >
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={props.park.imageURL}
                        alt="photo of a park"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Address: {props.park.address}
                        </Typography>
                        <div className="CityStateFlexBox" style={{display:'flex'}}>
                            <Typography variant="body2" color="text.secondary">
                                County: {props.park.county}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                State: {props.park.state}
                            </Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
          </Paper>
        </div>
    )
}

export default ParkCard;