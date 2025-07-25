import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    // so that, ekta specific email er order show kore
    const { user } = useAuth()
    //tan stack query
    const {refetch, data: cart = []} = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`)
            // console.log(user.email)
            return res.data; 
        }
    })
    return [cart, refetch]
};

export default useCart;