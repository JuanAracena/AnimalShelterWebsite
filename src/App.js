import React from 'react';
import './App.css';

import Login from "./components/Login";
import Search from "./components/Search";
import Match from "./components/Match";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/match" element={<Match />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
