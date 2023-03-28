import React, { useEffect } from 'react';
import SearchResults from './SearchResults';


function Parks() {

    // the url to retreive parks from:
    const getAllParksUrl = "https://posthere.io/a800-4e6d-aa31";

    // This will hold all of the parks retreived
    const [parks, setParks] = React.useState<any>([]);

    // First get all parks from database
    // This will run once on component mounting
    useEffect(() => {
        console.log('Retreiving from Backend...');
        let newParksArray: any[] = [];
        const requestOptions = {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        };
        fetch(getAllParksUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("Retrived the following data:\n");
                console.log(data);
                console.log(JSON.parse(data[0].body).name);
                // Will need to process data so that parks ends up with an aray of park JSONs
                const parkJson: JSON = JSON.parse(data[0].body);
                newParksArray.push(parkJson);
                setParks(newParksArray);
            });

      }, [])

    return (
        <div>
            {/* This page could just retrieve ALL parks and pass them to search results */}
            <SearchResults parks={parks}/>
        </div>
);
}

export default Parks;
