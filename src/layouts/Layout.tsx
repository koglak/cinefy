import { LayoutProps } from '../constants/layout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Layout({ children }: LayoutProps) {
    return (
        <div>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}