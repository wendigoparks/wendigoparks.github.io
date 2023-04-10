
// Icons are coming from: https://mui.com/material-ui/material-icons/ 
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import SportsBaseballOutlinedIcon from '@mui/icons-material/SportsBaseballOutlined';
import SportsGolfOutlinedIcon from '@mui/icons-material/SportsGolfOutlined';
import SportsCricketOutlinedIcon from '@mui/icons-material/SportsCricketOutlined';
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined';
import SportsTennisOutlinedIcon from '@mui/icons-material/SportsTennisOutlined';
import SportsVolleyballOutlinedIcon from '@mui/icons-material/SportsVolleyballOutlined';
import SkateboardingOutlinedIcon from '@mui/icons-material/SkateboardingOutlined';
import DiscFullOutlinedIcon from '@mui/icons-material/DiscFullOutlined';
import SportsFootballOutlinedIcon from '@mui/icons-material/SportsFootballOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import React, { ReactElement } from 'react';
const uuidv4 = require('uuid');


const allFacilities: string[] = [
    'Basketball',
    'Baseball',
    'Dog Park',
    'Football',
    'Frisbee Disc Golf',
    'Golf',
    'Pickleball',
    'Soccer',
    'Skate Park',
    'Tennis',
    'Volleyball',
    'Other'
]

const facilitesToIcon: { [key: string]: ReactElement<any, any> } = {
    'Basketball': <SportsBasketballOutlinedIcon fontSize='inherit' key={uuidv4.v4()}/>,
    'Baseball': <SportsBaseballOutlinedIcon fontSize='inherit' key={uuidv4.v4()} />,
    'Dog Park': <PetsOutlinedIcon fontSize='inherit' key={uuidv4.v4()} />,
    'Football': <SportsFootballOutlinedIcon fontSize='inherit' key={uuidv4.v4()} />,
    'Frisbee Disc Golf': <DiscFullOutlinedIcon fontSize='inherit' key={uuidv4.v4()} />,
    'Golf': <SportsGolfOutlinedIcon  fontSize='inherit' key={uuidv4.v4()}/>,
    'Pickleball': < SportsCricketOutlinedIcon fontSize='inherit' key={uuidv4.v4()} />,
    'Soccer': <SportsSoccerOutlinedIcon fontSize='inherit' key={uuidv4.v4()} />,
    'Skate Park': <SkateboardingOutlinedIcon fontSize='inherit' key={uuidv4.v4()} />,
    'Tennis': <SportsTennisOutlinedIcon fontSize='inherit' key={uuidv4.v4()} />,
    'Volleyball': <SportsVolleyballOutlinedIcon fontSize='inherit' key={uuidv4.v4()} />,
    'Other': <HelpOutlineOutlinedIcon fontSize='inherit' key={uuidv4.v4()} />
}

const textArrayToSymbolArray = (textArray: string[]):any => {
    return textArray.map(text => facilitesToIcon[text]);
}

export {allFacilities, facilitesToIcon, textArrayToSymbolArray};