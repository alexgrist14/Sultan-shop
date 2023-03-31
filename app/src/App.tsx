import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Catalog from "./components/Catalog";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import CardProductPage from "./components/CardProductPage";
import {ShoppingCartProvider} from "./context/ShoppingCartContext";
import ShoppingCart from "./components/ShoppingCart";
import AdminPanel from "./components/AdminPanel";
import AddItemForm from "./components/AddItemForm";

function App() {
    const [adminPanelOpen, setAdminPanelOpen] = useState(false);

    const handleAdminPanelToggle = () => {
        setAdminPanelOpen(!adminPanelOpen);
    };

    useEffect(() => {
        if (adminPanelOpen) {
            document.body.classList.add('adminPanel-open');
        } else {
            document.body.classList.remove('adminPanel-open');
        }
    }, [adminPanelOpen]);
    return (
        <div className="App">
            <ShoppingCartProvider>
                <BrowserRouter basename={'/Sultan-shop'}>
                    <Header/>
                    <Routes>
                        <Route path='/product-card/:barcode' element={<CardProductPage/>}/>
                        <Route path='/shopping-cart' element={<ShoppingCart/>}/>
                        <Route path='/admin-panel'
                               element={<AdminPanel isOpen={adminPanelOpen} onToggle={handleAdminPanelToggle}/>}/>
                        <Route path='/add-item' element={<AddItemForm/>}/>
                        <Route path='/' element={<Catalog/>}/>
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </ShoppingCartProvider>
        </div>
    );
}

export default App;
