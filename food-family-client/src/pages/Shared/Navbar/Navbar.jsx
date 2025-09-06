import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaShoppingCart, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import useCart from '../../../hooks/useCart';
import useAdmin from '../../../hooks/useAdmin';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [cart] = useCart()
    const [isAdmin] = useAdmin();
    const [showDropdown, setShowDropdown] = useState(false)

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
        setShowDropdown(false)
    }

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    const navOption = <>
        <li><Link to="/">Home</Link></li>
        <li><a>Contact Us</a></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/order/salad">Order Food</Link></li>
        <li><Link to="/dashboard/cart">
            <button className="btn btn-ghost btn-sm sm:btn-md">
                <FaShoppingCart className='text-lg sm:text-xl' /> 
                <div className="badge badge-xs sm:badge-sm badge-secondary">{cart.length}</div>
            </button>
        </Link></li>

        {/* {
            user ? <>
                <li onClick={handleLogOut} className='cursor-pointer lg:hidden'>LogOut</li>
            </> : <>
                <li><Link to="/login">Login</Link></li>
            </>
        } */}
    </>

    return (
        <div className="navbar fixed z-10 bg-black opacity-80 text-white shadow-sm px-2 sm:px-4 md:px-8 lg:px-16 xl:px-36">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-sm lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 p-2 shadow text-black min-w-52">
                        {navOption}
                    </ul>
                </div>
                <Link
                    to="/"
                    className="normal-case text-left flex flex-col leading-tight"
                >
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif">Food Family</span>
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold -mt-1 lg:-mt-2">Restaurant</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 items-center gap-2">
                    {navOption}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? (
                        <div className="relative">
                            <button 
                                onClick={toggleDropdown}
                                className="flex items-center gap-1 text-xs sm:text-sm md:text-base"
                            >
                                <FaUserCircle className="text-lg" />
                                <span className="truncate max-w-24 sm:max-w-none">Hi {user?.displayName}!</span>
                                <FaCaretDown />
                            </button>
                            
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-black z-20">
                                    <Link 
                                        to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"} 
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link 
                                        to="/dashboard/update-profile" 
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        Update Profile
                                    </Link>
                                    <button 
                                        onClick={handleLogOut}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="text-xs sm:text-sm md:text-base">
                            Login
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;