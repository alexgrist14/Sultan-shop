import React from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Catalog from "./components/Catalog";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CardProductPage from "./components/CardProductPage";

function App() {
  return (
    <div className="App">
        <Header/>
        <Router>
            <Routes>
                <Route path='/product-card/:barcode' element={<CardProductPage/>}/>
                <Route path='/' element={<Catalog/>}/>
            </Routes>
        </Router>
        <Footer/>
    </div>
  );
}

export default App;
