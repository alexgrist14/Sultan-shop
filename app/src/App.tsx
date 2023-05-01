import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Catalog from "./components/Catalog/index";
import {Route, Routes} from 'react-router-dom';
import CardProductPage from "./components/CardProductPage/index";
import {ShoppingCartProvider} from "./context/ShoppingCartContext";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import AdminPanel from "./components/Admin/AdminPanel";
import AddItemForm from "./components/Admin/AddItemForm";
import ErrorPage from "./components/ErrorPage";

function App() {
    return (
        <div className="App">
            <ShoppingCartProvider>
                    <Header/>
                    <Routes>
                        <Route path='/product-card/:barcode' element={<CardProductPage data-testid='card-page'/>}/>
                        <Route path='/shopping-cart' element={<ShoppingCart/>}/>
                        <Route path='/admin-panel' element={<AdminPanel/>}/>
                        <Route path='/add-item' element={<AddItemForm/>}/>
                        <Route path='/' element={<Catalog/>}/>
                        <Route path='/*' element={<ErrorPage/>}/>
                    </Routes>
                <Footer/>
            </ShoppingCartProvider>
        </div>
    );
}

export default App;
