import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LayoutProps } from '../constants/layout';

export default function Layout({ children }: LayoutProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1, padding: '2rem' }}>{children}</main>
            <Footer />
        </div>
    );
}