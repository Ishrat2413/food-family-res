import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <div>
                <Helmet>
                    <title>Dashboard | Payment History</title>
                </Helmet>
                <SectionTitle heading="Payment History" subHeading="See where you pay what!"></SectionTitle>
                <h2 className="text-2xl font-serif font-bold my-4">Total Payments: {payments.length}</h2>
            </div>
            <div className="overflow-x-auto rounded-t-2xl">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className="bg-[#294626] text-white">
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Transaction ID</th>
                            <th>Payment Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) =>
                                <tr key={payment._id}>
                                    <th> {index + 1}</th>
                                    <td>{payment.email}</td>
                                    <td>${payment.price}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.date}</td>
                                    <td>{payment.status}</td>
                                    {/* <td>
                                        {
                                            user.role === 'admin' ? 'Admin' : <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className='btn bg-[#294626] p-2 rounded'>
                                                <FaUsers className="text-white text-lg" />
                                            </button>
                                        }
                                    </td>
                                    <td><button
                                        onClick={() => handleDeleteUser(user)}
                                        className='btn bg-red-600 p-2 rounded'>
                                        <FaTrash className="text-white text-sm" />
                                    </button></td> */}
                                </tr>

                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;