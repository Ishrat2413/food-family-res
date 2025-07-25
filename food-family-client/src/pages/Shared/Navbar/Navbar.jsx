import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaShoppingCart } from 'react-icons/fa';
import useCart from '../../../hooks/useCart';
import useAdmin from '../../../hooks/useAdmin';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [cart] = useCart()
    const [isAdmin] = useAdmin();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const navOption = <>
        <li><Link to="/">Home</Link></li>
        <li><a>Contact Us</a></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/order/salad">Order Food</Link></li>
        {/* <li><Link to="/dashboard/adminHome">Dashboard</Link></li> */}
        {
            user? 
        }
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/dashboard/cart">
            <button className="btn btn-ghost">
                <FaShoppingCart className='text-xl'/> <div className="badge badge-sm badge-secondary">{cart.length}</div>
            </button>
        </Link></li>

        {
            user ? <>
                {/* <span>{user?.displayName}</span> */}
                <li onClick={handleLogOut} className='cursor-pointer'>LogOut</li>
            </> : <>
                <li><Link to="/login">Login</Link></li>
            </>
        }

    </>
    return (
        <div className=" navbar fixed z-10 bg-black opacity-80 text-white shadow-sm px-36">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 p-2 shadow">
                        {navOption}
                    </ul>
                </div>
                <a className="btn btn-ghost text-sm">Food Family<br /><span className='text-xl'>Restaurant</span></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 items-center gap-2">
                    {navOption}
                </ul>
            </div>
            <div className="navbar-end">
                {/* <a className="btn">Order</a> */}
                {
                    user ? <><span>Hi {user?.displayName}!</span></> :
                        <></>

                }
            </div>
        </div>
    );
};

export default Navbar;