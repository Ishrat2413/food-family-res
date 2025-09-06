import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDollarSign, FaUsers, FaUtensils, FaChartLine, FaShoppingCart } from "react-icons/fa";
import { FaBurger, FaArrowTrendUp } from "react-icons/fa6";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
const RADIAN = Math.PI / 180;

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading, error } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        }
    });
    const { data: popularItems = [] } = useQuery({
        queryKey: ['popular-items'],
        queryFn: async () => {
            const res = await axiosSecure.get('/menu?sort=popular&limit=5');
            return res.data;
        }
    });
    if (isLoading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
    );

    if (error) return (
        <div className="alert alert-error max-w-2xl mx-auto mt-8">
            <div className="flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <label>Error: {error.message}</label>
            </div>
        </div>
    );

    if (!stats) return (
        <div className="alert alert-info max-w-2xl mx-auto mt-8">
            <div className="flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <label>No data available</label>
            </div>
        </div>
    );

    // Custom shape for the pie chart
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = chartData.map(data => {
        return { name: data.category, value: data.revenue }
    });

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
                    <p className="text-gray-600 mt-1">
                        Welcome back, <span className="font-semibold text-green-700">{user?.displayName || 'Admin'}</span>
                    </p>
                </div>
                <div className="mt-4 md:mt-0">
                    <div className="stats bg-base-100 shadow flex">
                        <div className="stat p-4 flex flex-col items-center">
                            <div className="stat-value text-lg font-semibold">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                            </div>
                            <div className="stat-desc text-sm">
                                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="stats shadow-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                    <div className="stat">
                        <div className="stat-figure text-green-600">
                            <FaDollarSign className="text-3xl" />
                        </div>
                        <div className="stat-title text-gray-700">Total Revenue</div>
                        <div className="stat-value text-green-700">{formatCurrency(stats.revenue)}</div>
                        <div className="stat-desc flex items-center text-green-600">
                            <FaArrowTrendUp className="mr-1" /> 21% from last month
                        </div>
                    </div>
                </div>

                <div className="stats shadow-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                    <div className="stat">
                        <div className="stat-figure text-blue-600">
                            <FaUsers className="text-3xl" />
                        </div>
                        <div className="stat-title text-gray-700">Total Users</div>
                        <div className="stat-value text-blue-700">{stats.users}</div>
                        <div className="stat-desc flex items-center text-blue-600">
                            <FaArrowTrendUp className="mr-1" /> 8% from last month
                        </div>
                    </div>
                </div>

                <div className="stats shadow-lg bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200">
                    <div className="stat">
                        <div className="stat-figure text-purple-600">
                            <FaShoppingCart className="text-3xl" />
                        </div>
                        <div className="stat-title text-gray-700">Total Orders</div>
                        <div className="stat-value text-purple-700">{stats.orders}</div>
                        <div className="stat-desc flex items-center text-purple-600">
                            <FaArrowTrendUp className="mr-1" /> 15% from last month
                        </div>
                    </div>
                </div>

                <div className="stats shadow-lg bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200">
                    <div className="stat">
                        <div className="stat-figure text-amber-600">
                            <FaBurger className="text-3xl" />
                        </div>
                        <div className="stat-title text-gray-700">Menu Items</div>
                        <div className="stat-value text-amber-700">{stats.menuItems}</div>
                        <div className="stat-desc flex items-center text-amber-600">
                            <FaArrowTrendUp className="mr-1" /> 5 new items this month
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="card-title text-gray-800">Orders by Category</h3>
                            <FaChartLine className="text-green-600 text-xl" />
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                    <XAxis dataKey="category" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value) => [`${value} orders`, 'Quantity']}
                                        contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                    />
                                    <Bar dataKey="quantity" fill="#8884d8" radius={[4, 4, 0, 0]}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="card-title text-gray-800">Revenue by Category</h3>
                            <FaDollarSign className="text-green-600 text-xl" />
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Menu Items Section */}
            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h3 className="card-title text-gray-800 mb-4">Popular Menu Items</h3>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Orders</th>
                                </tr>
                            </thead>
                            <tbody>
                                {popularItems.map(item => (
                                    <tr key={item._id}>
                                        <td>
                                            <div className="flex items-center">
                                                <div className="avatar mr-3">
                                                    <div className="w-10 h-10 rounded-full">
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                </div>
                                                <span className="font-medium">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="capitalize">{item.category}</td>
                                        <td>${item.price}</td>
                                        <td>{item.orderCount || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;