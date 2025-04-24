import React from 'react';
import logo from './logo.svg';
import './App.css';

import Login from "./components/Login";
import Search from "./components/Search";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
