// Page to display one individual facility and its schedule
import React, {useEffect, useState} from "react";
import {facilityToIcon, textArrayToSymbolArray} from './FacilityIcons';
import SportsTennisOutlinedIcon from "@mui/icons-material/SportsTennisOutlined";
import {Grid, IconButton, Select, Stack} from "@mui/material";
import Paper from "@mui/material/Paper";
import './Facility.css'
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import dayjs, {Dayjs} from "dayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const Facility = (props: any): JSX.Element => {

    const [startHour, setStartHour] = useState<number| string>(0);
    const [startMinute, setStartMinute] = useState<number| string>(0);
    const [endHour, setEndHour] = useState<number| string>(0);
    const [endMinute, setEndMinute] = useState<number| string>(0);
    const [amPM, setAMPM] = useState(false) //false for am, true for pm
    const [court, setCourt] = useState<number| string>(1);
    const [participants, setParticipants] = useState<number| string>(1);
    const [date, setDate] = useState<Dayjs|null>(dayjs(new Date()));
    const [res, setRes] = useState<any[]>([]);

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

    console.log("Facility: ", props.facility);

    const getResUrl = "https://capstone3parksapp.azurewebsites.net/reservation/facility/" + props.facility.id; //

    useEffect(() => {
        console.log('Retreiving from Backend...');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Credentials':'true',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':  'https://capstone3parksapp.azurewebsites.net/',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Accept'
            },
        };
        fetch(getResUrl, requestOptions )
            .then(response => response.json())
            .then(data => {
                console.log("Retrived the following data:\n");
                console.log(data);

                setRes(data);

            }) // end of .then where data is retrieved for park
            .catch(() => {
                console.log("ERROR Failed to retrieve info for facility with id:" + props.facility.id);
                //navigate(-1); // send user back a page
            })
    }, [props.facility.id])

    //Need the user ID here
    const addResEndpoint = "https://capstone3parksapp.azurewebsites.net/reservation/" + "madeUpUser"; // endpoint to add park endpoint

    function handleSubmit() {
        if(startHour>endHour||(startHour==endHour&&startMinute>endMinute)){
            alert("End time cannot be after start time!")
        }
        else{
            //Get reservations for court
            //Ensure there are no conflicts
            // Make sure necessary park data is provided IE
            // name and address, set everything else to defaults if not
            // provided, and then try to send this new park to the backend as a new park.
            // For now assume park name and address are only required attributes
            if (true) {
                // build park JSON object and send it to backend endpoint:
                const reservationJson = {
                    date: date?.toDate(),
                    start_time: startHour+":"+startMinute+":00",
                    end_time: endHour+":"+endMinute+":00",
                    group_size: participants,
                    court_id: props.facility.courts[court as number -1].id
                }

                console.log(reservationJson);
                // Using Fetch API
                fetch(addResEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin':  'https://capstone3parksapp.azurewebsites.net',
                        'Access-Control-Allow-Methods': 'POST',
                    },
                    body: JSON.stringify(reservationJson),
                    credentials: 'include'
                })
                    .then((response) => {
                        if (!response.ok) {throw new Error(String(response.status)); }
                        else {return response.json(); } })
                    .then((data) => {
                        console.log(data);
                        // successfully posted! clear fields and alert user
                        alert("Congratulations the park has been successfully added!");
                    })
                    .catch((err) => {
                        console.log(err.message);
                        alert("Unable to add reservation to the database")
                    });

            } else {
                alert("Invalid reservation.")
            }
        }
    }

    function toTitleCase(s: string) {
        if (!s) return "";
        s = s.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        return s;
    }

    return (
        <div className="Facility" style={{backgroundColor:'#AADE9EFF', }}>
            <span> 
                    <Grid container spacing={1} >
                        <Grid item xs={12}>
                            <Paper sx={{
                                paddingTop: 2,
                                backgroundColor: "#d0e0d1"
                            }}
                            >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker sx={{minWidth: 150,  marginLeft: 2, marginTop: 3  }} label="Date"
                                                onChange={(val) => setDate(val)} value={date}
                                    />
                                </LocalizationProvider>
                                <FormControl variant="filled" sx={{ m: 1,maxWidth: 170}}>
                                    <InputLabel >Court</InputLabel>
                                    <Select value={court} onChange={e => setCourt(e.target.value)} sx={{
                                        m: 2
                                    }}>
                                        {Array(typeof(props.facility.courts)!='undefined'?props.facility.courts.length:1).fill(true).map((_, i) =>
                                            <MenuItem value={i+1} key={"c"+i}>{i+1}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                <FormControl variant="filled" sx={{ m: 1, maxWidth: 170}}>
                                    <InputLabel >Start Hour</InputLabel>
                                    <Select value={startHour} onChange={e => setStartHour(e.target.value)} sx={{
                                        m: 2
                                    }}>
                                        {
                                            Array(24).fill(true).map((_, i) =>
                                                <MenuItem value={i} key={"ss"+i}>{i}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl variant="filled" sx={{ m: 1, maxWidth: 170}}>
                                    <InputLabel >Minute</InputLabel>
                                    <Select value={startMinute} onChange={e => setStartMinute(e.target.value)} sx={{
                                        m: 2,
                                        marginLeft: 0
                                    }}>
                                        <MenuItem value={0}>0</MenuItem>
                                        <MenuItem value={15}>15</MenuItem>
                                        <MenuItem value={30}>30</MenuItem>
                                        <MenuItem value={45}>45</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="filled" sx={{ m: 1, maxWidth: 170}}>
                                    <InputLabel >End Hour</InputLabel>
                                    <Select value={endHour} onChange={e => setEndHour(e.target.value)} sx={{
                                        m: 2
                                    }}>
                                        {
                                            Array(24).fill(true).map((_, i) =>
                                                <MenuItem value={i} key={"ss"+i}>{i}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl variant="filled" sx={{ m: 1, maxWidth: 170}}>
                                    <InputLabel >Minute</InputLabel>
                                    <Select value={endMinute} onChange={e => setEndMinute(e.target.value)} sx={{
                                        m: 2,
                                        marginLeft: 0
                                    }}>
                                        <MenuItem value={0}>0</MenuItem>
                                        <MenuItem value={15}>15</MenuItem>
                                        <MenuItem value={30}>30</MenuItem>
                                        <MenuItem value={45}>45</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="filled" sx={{ m: 1, maxWidth: 170}}>
                                    <InputLabel >Participants</InputLabel>
                                    <Select value={participants} onChange={e => setParticipants(e.target.value)} sx={{
                                        m: 2
                                    }}>
                                        {Array(4).fill(true).map((_, i) =>
                                                <MenuItem value={i+1} key={"mi"+i}>{i+1}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                <Button onClick={handleSubmit} variant="contained" sx={{
                                    p: 2,
                                    marginTop: 3
                                }}>
                                    Submit Reservation
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper
                                sx={{
                                    height: 250,
                                    width: 175,
                                    marginLeft: 2
                                }}
                            >
                                <span className={"parkCategory"}>{toTitleCase(props.facility.category)}</span><br/>
                                <div className="facilityIcon" style={{fontSize:50}}>
                                    {facilityToIcon[props.facility.type]}   
                                </div>
                                <span>{typeof(props.facility.courts)!='undefined'?props.facility.courts[court as number -1].name:""}</span>
                                <FormControl sx={{ m: 1, marginTop: 5, minWidth: 125}}>
                                    <InputLabel >Time Display</InputLabel>
                                    <Select defaultValue={"AM"} sx={{
                                        m: 2
                                    }} onChange={e => setAMPM(e.target.value==="AM"? false: true)}>
                                        <MenuItem value={"AM"}>AM</MenuItem>
                                        <MenuItem value={"PM"}>PM</MenuItem>
                                    </Select>
                                </FormControl>
                            </Paper>
                        </Grid>
                      <Grid item xs={10}>
                        <Grid container justifyContent="center" spacing={0}>
                            {
                                Array(12).fill(true).map((_, i) =>
                                    <Stack key={"s"+i} spacing={0}>
                                        {Array(4).fill(true).map((_, j) =>
                                            <Paper
                                                sx={{
                                                    paddingLeft: 2,
                                                    paddingRight: 2,
                                                    paddingBottom: 1,
                                                    paddingTop: 1,
                                                    backgroundColor: ((!amPM&&startHour<=i&&endHour>=i)||(amPM&&startHour<=i+12&&endHour>=i+12))
                                                    &&!((i==startHour&&(startMinute>j*15)||(i==endHour&&(endMinute<=j*15)))||
                                                        ((amPM&&i+12==startHour)&&(startMinute>j*15)||((amPM&&i+12==endHour)&&(endMinute<=j*15))))
                                                        ? "forestgreen":(false?"red":"white")//Add logic here to check if reservation is valid or if slot is full
                                                }}
                                            >
                                                <span className={"timeText"}>{amPM? i+12: i}:{(j*15).toString().padStart(2, '0')}</span>
                                                <br/>
                                                <span className={"capacityText"}>0/8</span>
                                            </Paper>
                                            
                                    )}
                                    </Stack>
                                )
                            }
                        </Grid>
                    </Grid>
                    </Grid>
            </span>
           
        </div>
    )
}

export default Facility;