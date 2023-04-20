// Will showcase a user's account, their most recently visited parks, their upcoming reservations, and will allow
// them to logout, change their password, and delete their account. Potentially could even show
// friends of theirs and allow people to view other people's account through a page similar to this one, without the
// acount modification features but with options for user profiles to be public or private.

import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "./Authentication";

const MyAccount = () => {

    // variable to hold user's data
    const [userData, setUserData] = React.useState({username:"", email:"", full_name:"",});
    
    // Allows to switch pages to login screen on log out
    // Also allows to switch pages to login page if user is not already logged in and tries to access My Account page
    const navigate = useNavigate();

    // url for endpoint to get user data
    const getUserInfoUrl = "https://capstone3parksapp.azurewebsites.net/users/me";

    // First get user information from database
    // This will run once on component mounting
    useEffect(() => {
        console.log('Retreiving user info from Backend...');
        fetch(getUserInfoUrl, {
            method: 'GET', 
            headers: { 'Access-Control-Allow-Credentials':'true',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':  'https://capstone3parksapp.azurewebsites.net/',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Accept',
                'authjwt_cookie_samesite': 'none'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log("Retrived the following data:\n");
            console.log(data);
            // Save user data if successfull - redirect to login page if not 
            if (data.username) {
                setUserData(data);
            } else {
                logOut();
                navigate('/login');
            }
        })
        .catch((err) => {
            console.log(err.message);
            console.log("Unable to obtain My Account info, error contacting database.")
            logOut();
            navigate('/login');
        });

      }, [])

    

    return (
        <div>
            <h3> Welcome {userData.full_name ? userData.full_name : "User"}</h3>
            <h2> Manage your account: </h2>
            <Button variant='contained'  onClick={() => {
                logOut();
                navigate('/home');
            }}>Log Out</Button>
            <span style ={{padding:10}}></span>
            <Button variant='contained'  onClick={() => {
                alert("Not implemented yet");
            }}>Make Account Private</Button>
            <span style ={{padding:10}}></span>
            <Button variant='contained'  onClick={() => {
                alert("Not implemented yet");
            }}>Change Password</Button>
            <h2> Account information: </h2>
            <h3>Your username is {userData.username}</h3>
            <h3>Your email address is {userData.email}</h3>
            <p>Show user's calendar of reservations here:</p>
            <p>Show other users you are following: and make each one clickable to view their schedules. </p>
            <p>Let users put in usernames of other users to follow them here: </p>
        </div>
    )
}

export default MyAccount;