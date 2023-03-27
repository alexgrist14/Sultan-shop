import React from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Catalog from "./components/Catalog";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CardProductPage from "./components/CardProductPage";
import {ShoppingCartProvider} from "./context/ShoppingCartContext";
import ShoppingCart from "./components/ShoppingCart";

function App() {
    return (
        <div className="App">
            <ShoppingCartProvider>
                <Router>
                    <Routes>
                        <Route path='/' element={<Header/>}/>
                    </Routes>
                    <Routes>
                        <Route path='/product-card/:barcode' element={
                            <>
                                <Header/>
                                <CardProductPage/>
                            </>
                        }/>
                        <Route path='/shopping-cart' element={
                            <>
                                <Header/>
                                <ShoppingCart/>
                            </>
                        }
                        />
                        <Route path='/' element={<Catalog/>}/>
                    </Routes>
                </Router>
            </ShoppingCartProvider>
            <Footer/>
        </div>
    );
}

export default App;
