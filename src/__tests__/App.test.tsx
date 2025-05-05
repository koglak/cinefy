import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('App Component', () => {
    it('renders the Navbar', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        // Check if the Navbar is rendered
        const navbar = screen.getByText(/Cinefy/i);
        expect(navbar).toBeInTheDocument();
    });

    it('renders the Footer', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        // Check if the Footer is rendered
        const footer = screen.getByText(/© 2025 Cinefy. All rights reserved./i);
        expect(footer).toBeInTheDocument();
    });

    it('renders the HomePage by default', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        // Check if the HomePage content is rendered
        const searchInput = screen.getByLabelText(/Search/i);
        expect(searchInput).toBeInTheDocument();
    });
});