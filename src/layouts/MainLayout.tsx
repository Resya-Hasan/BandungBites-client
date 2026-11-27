import { Outlet } from 'react-router';
import { Navbar } from '../components/layout/navbar';

const MainLayout = () => {
    return (
        <>
            <Navbar />

            <main>
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout;