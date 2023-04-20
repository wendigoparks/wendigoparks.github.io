

import React, { useEffect } from "react";

const UserReservations = (props: any): JSX.Element => {

    // props.userId will define the id for the user whose reservations we are seeing.

    // the url to get the user's reservations
    const getUserReservationsUrl = "https://capstone3parksapp.azurewebsites.net/reservation/user/" + props.userId;

    // This will hold all of the reservations retreived
    const [reservations, setReservations] = React.useState<any[]>([]);

    // First get all reservations for the user from database
    // This will run once on component mounting
    useEffect(() => {
        console.log('Retreiving from Backend...');
        let newParksArray: any[] = [];
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
        // check if a search query has been supplied in the url, if it has call
        // backend to perfrom the search, if it hasn't, retreive all parks. 
        fetch(getUserReservationsUrl, requestOptions )
        .then(response => response.json())
        .then(data => {
            console.log("Retrived the following data:\n");
            console.log(data);

            setReservations(data);
        }) // end of .then where data is retrieved for park
        .catch(() => {
            console.log("ERROR Failed to retrieve info");
        })
      }, [])


    return (
        <div>
            <p> user has the following reservations: </p>

        </div>
    )
 }

export default UserReservations;