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
    const [userData, setUserData] = React.useState({'full_name':'George'});

    // url for endpoint to get user data
    const getUserInfoUrl = "http://127.0.0.1:8000";

    // First get user information from database
    // This will run once on component mounting
    useEffect(() => {
        console.log('Retreiving user info from Backend...');
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Access-Control-Allow-Credentials':'true',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':  'http://127.0.0.1:8000',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Accept',
                'Authorization':`Bearer ${localStorage.getItem("userToken")}`
            },
        };
        fetch(getUserInfoUrl, requestOptions )
            .then(response => response.json())
            .then(data => {
                console.log("Retrived the following data:\n");
                console.log(data);
                // Save user data
            });

      }, [])

    // Allows to switch pages to login screen on log out
   const navigate = useNavigate();

    return (
        <div>
            <p> Welcome {userData.full_name} user id: {localStorage.getItem("userID")} </p>
            <Button variant='contained' onClick={() => {
                logOut();
                navigate('/home');
            }}>Log Out</Button>
            <Button variant='contained' onClick={() => {
                alert("Not implemented yet");
            }}>Change Password</Button>
            <p>Display user data here below:</p>
        </div>
    )
}

export default MyAccount;