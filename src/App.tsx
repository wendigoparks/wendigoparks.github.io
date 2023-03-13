import React from 'react';
import './App.css';
import Topbar from "./components/Topbar";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./components/Home";
import Parks from "./components/Parks";
import SearchResults from "./components/SearchResults";

function App() {
    return (
    <div className="App">
        <Router>
            <Topbar />
            <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/search" element={<SearchResults/>} />
                <Route path="/parks" element={<Parks/>} />
                <Route path='*' element={<Navigate to='/Home' />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
