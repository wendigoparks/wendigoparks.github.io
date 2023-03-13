import SearchAppBar from "./Topbar"
import ParkCard from "./ParkCard"
import React from "react"

const SearchResults = (props: any): JSX.Element => {

    // For now display this static data, but in the future receive an array of JSONS
    // of parks that meet the search criteria ie props.foundParks

    // TODO set up to grab only a certain amount per page (~20) and allow switching pages

    // TODO set up default images if not given
    const parks = [
        {
            "name": "caboose park",
            "state": "Virginia",
            "county": "Montgomery",
            "address": "920 Turner St NE, Blacksburg, VA 24060",
            "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
        },
        {
            "name": "caboose park2",
            "state": "Virginia",
            "county": "Montgomery",
            "address": "920 Turner St NE, Blacksburg, VA 24060",
            "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
        },
        {
            "name": "caboose park3",
            "state": "Virginia",
            "county": "Montgomery",
            "address": "920 Turner St NE, Blacksburg, VA 24060",
            "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
        },
        {
            "name": "caboose park4",
            "state": "Virginia",
            "county": "Montgomery",
            "address": "920 Turner St NE, Blacksburg, VA 24060",
            "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
        },
        {
            "name": "caboose park5",
            "state": "Virginia",
            "county": "Montgomery",
            "address": "920 Turner St NE, Blacksburg, VA 24060",
            "imageURL": "https://i0.wp.com/stepintoblacksburg.org/wp-content/uploads/2019/03/caboose_park-lg.jpg?fit=2400%2C1600&ssl=1",
        }
    ]

    return (
        <div style={{background:'#c7f1c4'}}>
            {/* <SearchAppBar /> If we wanted to change the top bar by the page the new variation would go here */}
            {
                
                parks != null ?
                <div className="ParkCardFlexBox" style={{
                    background: 'lightgreen',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {
                        parks.map(park => (
                            <ParkCard park={park} />
                        ))
                    }
                </div>
                     :
                    <h1> No Matching Parks Were Found </h1>
                    
            }
        </div>
    )
}

export default SearchResults;