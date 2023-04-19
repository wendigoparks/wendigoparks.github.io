import React from 'react';
import './Home.css'
import Button from "@mui/material/Button";


function Home() {

    return (
        <div className="middleBox">
            <img className={"logoImg"} src="WenDiGo.png" width="90%"/>
            <h1>Welcome to WenDiGo!</h1>
            <h3>See when public parks are busy, or log in to reserve space ahead of time!</h3>
            <p style={{width: "90%", margin: "auto"}}>WenDiGo is an application designed to provide a platform that public parks and facilities can adopt to
                allow queuing and reservations for their respective locations. The system is also intended to provide
                users with information regarding how busy these parks and facilities are at given times, so they know if
                they would be able to get a spot if they went at a given time. One of the big issues with trying to get
                outside in a place like Blacksburg is that there are only so many places to go, and they are often full
                when you most want to go - WenDiGo aims to solve this and make life easier for both the common resident
                and for the parks themselves. Aside from the main features of reservations and activity information,
                WenDiGo also helps users find new locations they may have not previously visited, all in accordance with
                the specifications they are searching for. In addition to all of this, when users are viewing how busy
                a park or facility is, they can see if there are any groups open to having new people join them in
                whatever activity they are doing. So, WenDiGo not only saves time for users, helps public facilities
                organize park activity, and allows users to discover new exciting locations and activities around them,
                it also encourages people to make new friends, promoting both getting outside and being social at the
                same time.</p>
            <span style={{fontSize: 30}}>Begin by viewing the </span>
            <Button
                href={"/parks"}
                sx={{ color: 'white', bgcolor: 'success.main', my: 3 }}
                variant="contained"
            >
                Parks
            </Button>
            <span style={{fontSize: 30}}> page, or by searching for a park!</span>
        </div>
    );
}

export default Home;
