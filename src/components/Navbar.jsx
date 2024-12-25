import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { errorAlert, successAlert } from '../toastify/toastify';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const links = <>
        <NavLink to='/home-page' className='lg:hover:text-primary transition-colors duration-100'>Home</NavLink>
        <NavLink to='/room-page' className='lg:hover:text-primary transition-colors duration-100'>Rooms</NavLink>
        {(user && user?.email) && (<NavLink to='/my-bookings-page' className='lg:hover:text-primary transition-colors duration-100'>My Bookings</NavLink>)}
        <NavLink to='/contact-page' className='lg:hover:text-primary transition-colors duration-100'>Contact</NavLink>
        <NavLink to='/about-page' className='lg:hover:text-primary transition-colors duration-100'>About</NavLink>
    </>;

    // sing out user
    const handleSignOutUser = () => {
        signOutUser()
        .then(() => {
            successAlert('You have been logged out successfully.');
            navigate('/');
        })
        .catch(err => {
            errorAlert(err.message);
        });
    };

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
                            {
                                user ? <div className='dropdown'>
                                    <div tabIndex={0} role='button' className='size-10 sm:size-12 rounded-full ring-2 ring-primary flex items-center justify-center cursor-pointer'>
                                        <img className='size-full rounded-full p-1' src={user?.photoURL} alt="User" />
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className='menu menu-md dropdown-content rounded-sm z-[1] mt-5 shadow bg-white right-0'>
                                        <button onClick={handleSignOutUser} className='px-4 py-2 rounded-sm bg-primary font-semibold text-secondary'>Logout</button>
                                    </ul>
                                </div> : <NavLink to='/login-page' state={location?.pathname}><button className='px-4 py-2 rounded-sm bg-primary font-semibold text-secondary'>Login</button></NavLink>
                            }
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Navbar;