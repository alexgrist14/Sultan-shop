import React from 'react';
import './App.css';
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Catalog from "./components/Catalog/index";
import {Route, Routes} from 'react-router-dom';
import CardProductPage from "./components/CardProductPage/index";
import {ShoppingCartProvider} from "./context/ShoppingCartContext";
import ShoppingCart from "./components/ShoppingCart/index";
import AdminPanel from "./components/Admin/AdminPanel";
import AddItemForm from "./components/Admin/AddItemForm";

function App() {
    return (
        <div className="App">
            <ShoppingCartProvider>
                    <Header/>
                    <Routes>
                        <Route path='/product-card/:barcode' element={<CardProductPage/>}/>
                        <Route path='/shopping-cart' element={<ShoppingCart/>}/>
                        <Route path='/admin-panel' element={<AdminPanel/>}/>
                        <Route path='/add-item' element={<AddItemForm/>}/>
                        <Route path='/' element={<Catalog/>}/>
                    </Routes>
                <Footer/>
            </ShoppingCartProvider>
        </div>
    );
}

export default App;
