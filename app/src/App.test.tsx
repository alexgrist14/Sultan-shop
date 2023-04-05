import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {MemoryRouter} from "react-router-dom";

test('renders learn react link', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <App/>
        </MemoryRouter>
    );
    const products = screen.getAllByTestId('product');
    expect(products).toHaveLength(15);
});
