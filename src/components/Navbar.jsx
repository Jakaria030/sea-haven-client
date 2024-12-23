import { FaUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
    const {user} = useContext(AuthContext);

    // console.log(user);

    const links = <>
        <NavLink to='/' className='hover:text-primary transition-colors duration-100'>Home</NavLink>
        <NavLink to='/room-page' className='hover:text-primary transition-colors duration-100'>Rooms</NavLink>
        <NavLink to='/my-bookings-page' className='hover:text-primary transition-colors duration-100'>My Bookings</NavLink>
        <NavLink to='/contact-page' className='hover:text-primary transition-colors duration-100'>Contact</NavLink>
        <NavLink to='/about-page' className='hover:text-primary transition-colors duration-100'>About</NavLink>
    </>;

    return (
        <div className='bg-white sticky top-0 z-50 shadow-md'>
            <section className='max-w-8xl mx-auto px-5'>
                <div className='navbar mx-0 px-0 py-5'>
                    {/* left content */}
                    <div className='navbar-start space-x-3 lg:space-x-0'>
                        <div className='dropdown'>
                            <div tabIndex={0} role='button' className='lg:hidden'>
                                <GiHamburgerMenu className='text-2xl' />
                            </div>
                            <ul
                                tabIndex={0}
                                className='menu menu-md dropdown-content rounded-lg z-[1] mt-5 w-60 space-y-1 px-3 py-4 shadow bg-primary text-secondary text-md'>
                                {links}
                            </ul>
                        </div>

                        <Link to='/' className='inline-block'>
                            <div className='flex items-center gap-3'>
                                <img className='size-10 sm:size-12' src={logo} alt="Logo" />
                                <p className='text-xl font-bold flex gap-1 text-secondary'><span>Sea</span><span className='text-primary'>Haven</span></p>
                            </div>
                        </Link>
                    </div>

                    {/* center content */}
                    <div className='navbar-center hidden lg:flex'>
                        <ul className='menu menu-horizontal px-1 space-x-5 text-secondary text-lg'>
                            {links}
                        </ul>
                    </div>

                    {/* right content */}
                    <div className='navbar-end text-secondary'>
                        <div className='sm:flex items-center justify-end gap-3 cursor-pointer'>
                            <NavLink to='/login-page'><button className='px-4 py-1 sm:py-2 rounded-sm bg-primary font-semibold text-secondary'>Login</button></NavLink>
                        </div>
                    </div>
                    
                </div>
            </section>
        </div>
    );
};

export default Navbar;