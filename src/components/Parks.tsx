import React, { useEffect } from 'react';
import SearchResults from './SearchResults';
import { useParams } from 'react-router-dom';


function Parks() {

    // Search query is passed in through url
    const {query} = useParams();

    // the url to retreive parks from:
    const getAllParksUrl = "http://127.0.0.1:8000/parks/";

    // This will hold all of the parks retreived
    const [parks, setParks] = React.useState<any>([]);

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
        if (query) {
            fetch(getAllParksUrl + query, requestOptions )
            .then(response => response.json())
            .then(data => {
                console.log("Retrived the following data:\n");
                console.log(data);
                // console.log(JSON.parse(data[0].body).name);
                // Will need to process data so that parks ends up with an aray of park JSONs
                //const parkJson: JSON = JSON.parse(data[0].body);
                //newParksArray.push(parkJson);
                setParks(data);
            });
        } else {
            fetch(getAllParksUrl, requestOptions )
            .then(response => response.json())
            .then(data => {
                console.log("Retrived the following data:\n");
                console.log(data);
                // console.log(JSON.parse(data[0].body).name);
                // Will need to process data so that parks ends up with an aray of park JSONs
                //const parkJson: JSON = JSON.parse(data[0].body);
                //newParksArray.push(parkJson);
                setParks(data);
            });
        }
      }, [])

    return (
        <div>
            {/* This page could just retrieve ALL parks and pass them to search results */}
            <SearchResults parks={parks}/>
        </div>
);
}

export default Parks;
