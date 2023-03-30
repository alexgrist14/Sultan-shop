import React from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Catalog from "./components/Catalog";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CardProductPage from "./components/CardProductPage";
import {ShoppingCartProvider} from "./context/ShoppingCartContext";
import ShoppingCart from "./components/ShoppingCart";
import AdminPanel from "./components/AdminPanel";
import AddItemForm from "./components/AddItemForm";

function App() {
    return (
        <div className="App">
            <ShoppingCartProvider>
                <Router>
                    <Header/>
                    <Routes>
                        <Route path='/product-card/:barcode' element={<CardProductPage/>}/>
                        <Route path='/shopping-cart' element={<ShoppingCart/>}/>
                        <Route path='/admin-panel' element={<AdminPanel/>}/>
                        <Route path='/add-item' element={<AddItemForm/>}/>
                        <Route path='/' element={<Catalog/>}/>
                    </Routes>
                </Router>
                <Footer/>
            </ShoppingCartProvider>
        </div>
    );
}

export default App;
