import React from 'react';
import './App.css';
import Topbar from "./components/Topbar";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./components/Home";
import Parks from "./components/Parks";
import SearchResults from "./components/SearchResults";
import Park from './components/Park';
import AddPark from './components/AddPark';
import Login from './components/Login';
import MyAccount from './components/MyAccount';

function App() {
    return (
    <div className="App">
        <Router>
            <Topbar />
            <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/search" element={<SearchResults/>} />
                <Route path="/parks/" element={<Parks/>} />
                <Route path="/parks/:query" element={<Parks/>} />
                <Route path="/add park" element={<AddPark/>} />
                {/* Park path will be called with park id query parameter so that specific park can be retreived */}
                <Route path="/Park/:id" element={<Park/>} />
                <Route path="/Login" element={<Login/>} />
                <Route path="/MyAccount" element={<MyAccount/>} />
                <Route path='*' element={<Navigate to='/Home' />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
