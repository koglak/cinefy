import '../styles/footer.scss';

export default function Footer() {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Cinefy. All rights reserved.</p>
        </footer>
    );
}