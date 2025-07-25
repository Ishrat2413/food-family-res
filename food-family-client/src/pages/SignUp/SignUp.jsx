import loginImg from "../../assets/others/authentication2.png"
import loginBg from "../../assets/others/authentication.png"
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate();
    const onSubmit = data => {
        // console.log((data))
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User Created Successfully!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });

                                    navigate('/');
                                }
                            })


                    })
                    .catch(error => console.log(error))
            })

    }


    return (
        <>
            <Helmet>
                <title>Food Family | Sign Up</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen"
                style={{ backgroundImage: `url(${loginBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="hero-content flex-col md:flex-row-reverse gap-x-6 lg:max-w-[1200px] mx-auto rounded-xl shadow-2xl p-28">
                    <div className="text-center md:text-left">
                        <img src={loginImg} alt="" />
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h2 className='text-center font-bold text-2xl mt-4'>Sign Up</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                {/* name */}
                                <input type="text"
                                    {...register("name", { required: true })} name="name" className="input" placeholder="Name" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                                {/* photo url */}
                                <label className="label">Photo URL</label>
                                <input type="text"
                                    {...register("photoURL", { required: true })} name="photoURL" className="input" placeholder="Photo URL" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                                {/* email */}
                                <label className="label">Email</label>
                                <input type="email"
                                    {...register("email", { required: true })} name="email" className="input" placeholder="Email" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                                {/* password */}
                                <label className="label">Password</label>
                                <input type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })} name="password" className="input" placeholder="Enter your Password" />
                                <button
                                    type="button"
                                    className="absolute right-[50px] top-[330px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible className="h-5 w-5" />
                                    ) : (
                                        <AiOutlineEye className="h-5 w-5" />
                                    )}
                                </button>
                                {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 characters</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-600">Password must have 1 uppercase, 1 lowercase, 1 number & 1 special character</span>}
                                <input type="submit" value="Sign Up" className="btn bg-[#D1A054] text-white mt-4" />
                            </fieldset>
                        </form>
                        <div className='text-center m-6 text-sm'>
                            <Link to="/login" className='text-[#D1A054] font-bold'>Already have an Account? Login Here</Link>
                            <p className="py-4">Or sign up with</p>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;