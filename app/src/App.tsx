import React from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Catalog from "./components/Catalog";

function App() {
  return (
    <div className="App">
        <Header/>
        <Catalog/>
        <Footer/>
    </div>
  );
}

export default App;
