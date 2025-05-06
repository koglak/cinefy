import { Typography, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.scss';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <AppBar position="static" >
            <Toolbar className="navbar-toolbar">
                <div className="navbar-icon-container">
                    <span className="navbar-icon">🎬</span>
                </div>
                <Typography
                    variant="h4"
                    className="navbar-logo"
                    onClick={handleLogoClick}
                >
                    Cinefy
                </Typography>
            </Toolbar>
        </AppBar>
    );
}