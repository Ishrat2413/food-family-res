import { FaBook, FaCalendar, FaCalendarCheck, FaComment, FaHome, FaList, FaShoppingCart, FaUsers, FaUtensilSpoon, FaWallet } from "react-icons/fa";
import { FaMessage, FaShop } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart()
    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            {/* Dashboard Side Bar */}
            <div className="w-64 min-h-screen bg-[#294626] text-white">
                <p className="text-2xl font-serif m-4">Food Family <br />Restaurant</p>
                <p className="text-xl font-bold font-serif m-4">Dashboard</p>
                <ul className="menu uppercase ml-3">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink
                                    to='/dashboard/adminHome'
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${isActive
                                            ? 'bg-white text-[#294626] font-semibold shadow-lg'
                                            : 'hover:bg-green-700 hover:bg-opacity-50'
                                        }`
                                    }
                                >
                                    <FaHome />
                                    Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/dashboard/addItems'
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${isActive
                                            ? 'bg-white text-[#294626] font-semibold shadow-lg'
                                            : 'hover:bg-green-700 hover:bg-opacity-50'
                                        }`
                                    }
                                >
                                    <FaUtensilSpoon />
                                    Add Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/dashboard/manageItems'
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${isActive
                                            ? 'bg-white text-[#294626] font-semibold shadow-lg'
                                            : 'hover:bg-green-700 hover:bg-opacity-50'
                                        }`
                                    }
                                >
                                    <FaList />
                                    Manage Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/dashboard/manageBookings'
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${isActive
                                            ? 'bg-white text-[#294626] font-semibold shadow-lg'
                                            : 'hover:bg-green-700 hover:bg-opacity-50'
                                        }`
                                    }
                                >
                                    <FaBook />
                                    Manage Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/dashboard/users'
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${isActive
                                            ? 'bg-white text-[#294626] font-semibold shadow-lg'
                                            : 'hover:bg-green-700 hover:bg-opacity-50'
                                        }`
                                    }
                                >
                                    <FaUsers />
                                    All Users
                                </NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink
                                        to='/dashboard/userHome'
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${isActive
                                                ? 'bg-white text-[#294626] font-semibold shadow-lg'
                                                : 'hover:bg-green-700 hover:bg-opacity-50'
                                            }`
                                        }
                                    >
                                        <FaHome />
                                        User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/dashboard/reservation'
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${isActive
                                                ? 'bg-white text-[#294626] font-semibold shadow-lg'
                                                : 'hover:bg-green-700 hover:bg-opacity-50'
                                            }`
                                        }
                                    >
                                        <FaCalendar />
                                        Reservation
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/dashboard/paymentHistory'
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${isActive
                                                ? 'bg-white text-[#294626] font-semibold shadow-lg'
                                                : 'hover:bg-green-700 hover:bg-opacity-50'
                                            }`
                                        }
                                    >
                                        <FaWallet />
                                        Payment History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/dashboard/cart'
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${isActive
                                                ? 'bg-white text-[#294626] font-semibold shadow-lg'
                                                : 'hover:bg-green-700 hover:bg-opacity-50'
                                            }`
                                        }
                                    >
                                        <FaShoppingCart />
                                        My Cart ({cart.length})
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/dashboard/addReview'
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${isActive
                                                ? 'bg-white text-[#294626] font-semibold shadow-lg'
                                                : 'hover:bg-green-700 hover:bg-opacity-50'
                                            }`
                                        }
                                    >
                                        <FaComment />
                                        Add Review
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/dashboard/myBooking'
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${isActive
                                                ? 'bg-white text-[#294626] font-semibold shadow-lg'
                                                : 'hover:bg-green-700 hover:bg-opacity-50'
                                            }`
                                        }
                                    >
                                        <FaCalendarCheck />
                                        My Booking
                                    </NavLink>
                                </li>
                            </>
                    }
                    <div className="divider"></div>
                    {/* Shared */}
                    <li>
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-white text-[#294626] font-semibold shadow-lg'
                                    : 'hover:bg-green-700 hover:bg-opacity-50'
                                }`
                            }
                        >
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/order/salad'
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-white text-[#294626] font-semibold shadow-lg'
                                    : 'hover:bg-green-700 hover:bg-opacity-50'
                                }`
                            }
                        >
                            <FaList />
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/order/salad'
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-white text-[#294626] font-semibold shadow-lg'
                                    : 'hover:bg-green-700 hover:bg-opacity-50'
                                }`
                            }
                        >
                            <FaShop />
                            Order
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/contact'
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-white text-[#294626] font-semibold shadow-lg'
                                    : 'hover:bg-green-700 hover:bg-opacity-50'
                                }`
                            }
                        >
                            <FaMessage />
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* Dashboard Content */}
            <div className="flex-1 max-w-full mx-auto bg-green-50 px-14 rounded-2xl shadow-2xl">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;