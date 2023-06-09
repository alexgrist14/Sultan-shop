import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import {MemoryRouter, Route, Routes} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Catalog from "./components/Catalog";
import CardProductPage from "./components/CardProductPage";

describe('Test app',()=>{
    test('should be 15 products on first page', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App/>
            </MemoryRouter>
        );
        const products = screen.getAllByTestId('product');
        expect(products).toHaveLength(15);
    });

    test('should be maxPrise is equal 10000',()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
                <App/>
            </MemoryRouter>
        );

        const maxPrice = screen.getByTestId('maxPrice');
        expect(maxPrice).toHaveValue('10000');
    })

    test('should delete all zeros from input value',()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
                <App/>
            </MemoryRouter>
        );

        const maxPrice = screen.getByTestId('maxPrice');
        fireEvent.input(maxPrice,{
            target: {value:"060"}
        });
        expect(screen.queryByTestId('maxPrice')).toHaveValue('');
    })

    test('should delete all non number symbols from input value',()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
                <App/>
            </MemoryRouter>
        );

        const maxPrice = screen.getByTestId('maxPrice');
        fireEvent.input(maxPrice,{
            target: {value:"fake value"}
        });
        expect(screen.queryByTestId('maxPrice')).toHaveValue('0');
    })

    test('should be only 2 products after select first checkbox in producers filter',()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
                <App/>
            </MemoryRouter>
        );
        const firstProducerCheckbox = screen.getByTestId('prod-checkbox-0');
        fireEvent.click(firstProducerCheckbox);
        expect(screen.queryAllByTestId('product')).toHaveLength(2);
    });

    test('should be exact value in input after input',()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
                <App/>
            </MemoryRouter>
        );
            const producerInput = screen.getByTestId('producer-input');
            fireEvent.input(producerInput,{
                target: {value:"AOS"}
            });
            expect(screen.queryByTestId('producer-input')).toHaveValue("AOS");

    });

    test('should be only one product in cart after click button "В корзину"',()=>{
        const {container}=render(
            <MemoryRouter initialEntries={['/']}>
                <App/>
            </MemoryRouter>
        );
        const cartButton = container.querySelector('[data-testid="cart-btn"]') as HTMLElement;
        fireEvent.click(cartButton);
        expect(screen.queryByTestId('cart-products')).toContainHTML('1');

    });

    test('should link to shopping cart after click on cart button',()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
                <App/>
            </MemoryRouter>
        );
        const cartLink = screen.getByTestId('cart-link');
        userEvent.click(cartLink);
        expect(screen.getByTestId('cart-main')).toBeInTheDocument();
    })

    test('should displayed Error page after link to unregistered route',()=>{
        render(
            <MemoryRouter initialEntries={['/notexist']}>
                <App/>
            </MemoryRouter>
        );
        expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    })

    test('shoul open card page after click on name', async()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path='/' element={<Catalog/>}/>
                    <Route path='/product-card/:barcode' element={<CardProductPage/>}/>
                </Routes>
            </MemoryRouter>
        );

            const productsNames = await screen.findAllByTestId('product-name');
            expect(productsNames.length).toBe(15);
            userEvent.click(productsNames[0]);
            expect(screen.getByTestId('card-page')).toBeInTheDocument();
    })
})
