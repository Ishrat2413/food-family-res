import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDollarSign, FaEye, FaPrint, FaSearch, FaUser } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";

const AdminFoodPayments = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { data: payments = [], isLoading, refetch } = useQuery({
        queryKey: ['all-payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        }
    });

    // Date formatting function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredPayments = payments.filter(payment => {
        const matchesSearch = payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (payment.transactionId && payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const updateOrderStatus = async (id, status) => {
        try {
            const res = await axiosSecure.patch(`/payments/${id}`, { status });
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Status Updated',
                    text: `Order status changed to ${status}`,
                });
                refetch();
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: `Failed to update order status ${error}`,
            });
        }
    };

    const viewOrderDetails = (payment) => {
        setSelectedOrder(payment);
        setShowModal(true);
    };

    const totalRevenue = payments.reduce((sum, payment) => sum + payment.price, 0);
    const completedOrders = payments.filter(p => p.status === 'completed').length;
    const pendingOrders = payments.filter(p => p.status === 'pending').length;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800">Food Orders Management</h2>
                <p className="text-gray-600">Total Orders: {payments.length}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stats shadow-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                    <div className="stat">
                        <div className="stat-figure text-green-600">
                            <FaDollarSign className="text-3xl" />
                        </div>
                        <div className="stat-title text-gray-700">Total Revenue</div>
                        <div className="stat-value text-green-700">${totalRevenue.toFixed(2)}</div>
                    </div>
                </div>

                <div className="stats shadow-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                    <div className="stat">
                        <div className="stat-figure text-blue-600">
                            <FaUser className="text-3xl" />
                        </div>
                        <div className="stat-title text-gray-700">Completed Orders</div>
                        <div className="stat-value text-blue-700">{completedOrders}</div>
                    </div>
                </div>

                <div className="stats shadow-lg bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200">
                    <div className="stat">
                        <div className="stat-figure text-amber-600">
                            <FaEye className="text-3xl" />
                        </div>
                        <div className="stat-title text-gray-700">Pending Orders</div>
                        <div className="stat-value text-amber-700">{pendingOrders}</div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-base-100 rounded-lg shadow">
                <div className="flex items-center gap-2 w-full md:w-1/2">
                    <FaSearch className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by email, name or transaction ID..."
                        className="input input-bordered w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="select select-bordered w-full md:w-48"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* Orders Table */}
            <div className="card bg-base-100 shadow-lg">
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th>Customer</th>
                                    <th>Order Date</th>
                                    <th>Items</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Transaction ID</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPayments.map((payment) => (
                                    <tr key={payment._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-green-100 text-green-800 rounded-full w-10">
                                                        <span className="text-xs">
                                                            {payment.name ? payment.name.charAt(0).toUpperCase() : 'U'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{payment.name}</div>
                                                    <div className="text-sm text-gray-500">{payment.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {payment.date ? formatDate(payment.date) : 'N/A'}
                                        </td>
                                        <td>
                                            <span className="badge badge-ghost">
                                                {payment.menuItemIds?.length || 0} items
                                            </span>
                                        </td>
                                        <td>${payment.price}</td>
                                        <td>
                                            <select
                                                className={`select select-xs ${
                                                    payment.status === 'completed' ? 'select-success' :
                                                    payment.status === 'pending' ? 'select-warning' :
                                                    'select-error'
                                                }`}
                                                value={payment.status || 'pending'}
                                                onChange={(e) => updateOrderStatus(payment._id, e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="font-mono text-xs">
                                            {payment.transactionId || 'N/A'}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-ghost btn-xs text-blue-600"
                                                onClick={() => viewOrderDetails(payment)}
                                            >
                                                <FaEye /> Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {filteredPayments.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <FaSearch className="text-4xl mx-auto mb-4 text-gray-300" />
                            <p>No orders found matching your criteria</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Details Modal */}
            {showModal && selectedOrder && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-4xl">
                        <h3 className="font-bold text-lg mb-4">Order Details</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h4 className="font-semibold mb-2">Customer Information</h4>
                                <div className="space-y-2">
                                    <p><strong>Name:</strong> {selectedOrder.name}</p>
                                    <p><strong>Email:</strong> {selectedOrder.email}</p>
                                    <p><strong>Order Date:</strong> {selectedOrder.date ? formatDate(selectedOrder.date) : 'N/A'}</p>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-2">Order Information</h4>
                                <div className="space-y-2">
                                    <p><strong>Transaction ID:</strong> {selectedOrder.transactionId || 'N/A'}</p>
                                    <p><strong>Status:</strong> 
                                        <span className={`badge ml-2 ${
                                            selectedOrder.status === 'completed' ? 'badge-success' :
                                            selectedOrder.status === 'pending' ? 'badge-warning' :
                                            'badge-error'
                                        }`}>
                                            {selectedOrder.status || 'pending'}
                                        </span>
                                    </p>
                                    <p><strong>Total Amount:</strong> ${selectedOrder.price}</p>
                                </div>
                            </div>
                        </div>

                        <h4 className="font-semibold mb-2">Order Items</h4>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.items?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>${item.price}</td>
                                        </tr>
                                    )) || (
                                        <tr>
                                            <td colSpan="3" className="text-center text-gray-500">
                                                No item details available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-primary">
                                <FaPrint /> Print Receipt
                            </button>
                            <button className="btn" onClick={() => setShowModal(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminFoodPayments;