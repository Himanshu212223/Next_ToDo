import LoginLogoutButton from '@/ClientComponent/LoginLogoutButton';
import '@/ComponentCss/NavBar.css'
import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className="navBar">
            <p className='logo'>Noting..</p>
            <div className='buttons'>
                <Link href={"/ManageTasks"} className='btn'>Tasks</Link>
                <Link href={"/"} className='btn'>Home</Link>
                <LoginLogoutButton />
            </div>
        </nav>
    );
}

export default NavBar ;