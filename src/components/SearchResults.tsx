import ParkCard from "./ParkCard"
import React from "react"
import Park from "./Park";
import { useState } from "react";


const SearchResults = (props: any): JSX.Element => {

    // For now display this static data, but in the future receive an array of JSONS
    // of parks that meet the search criteria ie props.foundParks

    // TODO set up to grab only a certain amount per page (~20) and allow switching pages

    // TODO set up default images if not given
    const parks = [
        {
            "id": 1,
            "name": "caboose park",
            "state": "Virginia",
            "county": "Montgomery",
            "address": "920 Turner St NE, Blacksburg, VA 24060",
            "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
            "facilities": [{
                    "id":1,
                    "parkID":1,             // ParkID should just be the park that a specific facility belongs to
                    "category":"tennis",
                    "name":"Caboose Park Tennis Courts",
                    "openTime":"7:00am",
                    "closeTime":"10:00pm",  // Should be able to retrieve calender for facility via id and parkid which should be unique.
                    "restrictions":[]
                }, {
                    "id":2,
                    "parkID":1,             // ParkID should just be the park that a specific facility belongs to
                    "category":"skate park",
                    "name":"The Concrete Jungle",
                    "openTime":"7:00am",
                    "closeTime":"10:00pm",  // Should be able to retrieve calender for facility via id and parkid which should be unique.
                    "restrictions":["No children under the age of 10 allowed unsupervised", "No smoking", "No graffiti"]
                }]
        },
        {
            "id": 2,
            "name": "caboose park2",
            "state": "Virginia",
            "county": "Montgomery",
            "address": "920 Turner St NE, Blacksburg, VA 24060",
            "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
        },
        {
            "id": 3,
            "name": "caboose park3",
            "state": "Virginia",
            "county": "Montgomery",
            "address": "920 Turner St NE, Blacksburg, VA 24060",
            "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
        },
        {
            "id": 4,
            "name": "caboose park4",
            "state": "Virginia",
            "county": "Montgomery",
            "address": "920 Turner St NE, Blacksburg, VA 24060",
            "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
        },
        {
            "id": 5,
            "name": "caboose park5",
            "state": "Virginia",
            "county": "Montgomery",
            "address": "920 Turner St NE, Blacksburg, VA 24060",
            "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
        }
    ]
    
    // Holds value of the selected park to display, if no park is selected all parks
    // that were searched for will be shown
    const [selectedPark, setSelectedPark] = useState({});

    const parkClicked = (parkID: number): void => {
        // when a park is clicked it passes the park id passed to it to this function,
        // which can then find the corresponding park and set it to be the value for selectedPark. 
        let matchingPark: any = null;
        parks.forEach(park => {
            if (park.id === parkID) {
                matchingPark = park;
            }
        }); 

        // Now selectedPark will display rather than the park cards. 
        console.log("park clicked called park is:")
        if (matchingPark != null) {
            setSelectedPark(matchingPark);
        } else {
            alert("Unable to display the selected park");
        }
    }

    const leaveParkView = (): void => {
        // return selectedPark to an empty JSON so that all searched for parks will be displayed again
        setSelectedPark({});
        console.log("leave park view called")
    }

    return (
        <div style={{background:'#c7f1c4'}}>
            {/* <SearchAppBar /> If we wanted to change the top bar by the page the new variation would go here */}
            {   /* Show selected park page once a park is clicked, or show all parks that match the search results
                    if none are selected */ 
                Object.keys(selectedPark).length != 0 ? 
                <Park park={selectedPark} leaveParkView={leaveParkView} />
                : 
                <div>
                    <h1>Parks matching your search:</h1>
                    {
                        parks != null ?
                        <div className="ParkCardFlexBox" style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {
                                parks.map((park: any) => (
                                    <ParkCard 
                                        park={park} 
                                        key={park.id}  
                                        parkClicked={parkClicked}
                                    />
                                ))
                            }
                        </div>
                        :
                        <h1> No Matching Parks Were Found </h1>
                    }
                </div>
            }
        </div>
    )
}

export default SearchResults;