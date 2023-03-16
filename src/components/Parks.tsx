import React from 'react';
import SearchResults from './SearchResults';


function Parks() {

    return (
        <div>
            {/* This page could just retrieve ALL parks and pass them to search results */}
            <SearchResults parks={{}}/>
        </div>
);
}

export default Parks;
