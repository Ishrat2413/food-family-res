import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = () => {
        if (user && user.email) {
            // console.log(user.email, food)
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: 'success',
                            title: `${name} Added to your cart!`,
                            showConfirmButton: false,
                            timer: 1400
                        });
                        // refetch carts to update the cart items count
                        refetch();
                    }
                })

        }
        else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to Add to Cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Log In!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // send user to login page
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={image}
                    alt={name} />
            </figure>
            <p className="absolute right-0 mr-4 mt-4 p-2 rounded-2xl bg-black text-white">${price}</p>
            <div className="card-body text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button
                        onClick={handleAddToCart}
                        className="bg-slate-100 text-yellow-700 font-semibold px-6 py-2 rounded-2xl border-b-4 border-yellow-500 hover:bg-[#0E1323] hover:text-yellow-500 transition-colors duration-300">
                        ADD TO CART
                    </button>
                </div>

            </div>
        </div>
    );
};

export default FoodCard;