import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Navbar Component', () => {
    it('renders the Cinefy logo', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );

        // Check if the logo text is rendered
        const logo = screen.getByText(/Cinefy/i);
        expect(logo).toBeInTheDocument();
    });

    it('navigates to the home page when the logo is clicked', () => {
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        render(
            <Router>
                <Navbar />
            </Router>
        );

        // Simulate clicking the logo
        const logo = screen.getByText(/Cinefy/i);
        logo.click();

        // Check if navigate was called with the correct path
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('renders the 🎬 icon', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );

        // Check if the icon is rendered
        const icon = screen.getByText('🎬');
        expect(icon).toBeInTheDocument();
    });
});
