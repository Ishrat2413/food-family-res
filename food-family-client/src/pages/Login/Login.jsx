import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

import loginImg from "../../assets/others/authentication2.png"
import loginBg from "../../assets/others/authentication.png"
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
    // const captchaRef = useRef(null)
    const [showPassword, setShowPassword] = useState(false);
    const [disabled, setDisabled] = useState(true)

    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                Swal.fire({
                    title: "User Logged In Successfully",
                    showClass: {
                        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
                    },
                    hideClass: {
                        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
                    }
                });
                navigate(from, { replace: true })
            })
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        }
    }

    return (
        <>
            <Helmet>
                <title>Food Family | Log In</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen"
                style={{ backgroundImage: `url(${loginBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                <div className="  lg:max-w-[1200px] mx-auto rounded-xl shadow-2xl p-28">
                    <Link to='/'>Back to Home</Link>
                    <div className='hero-content flex-col md:flex-row gap-x-6'>
                        <div className="text-center md:text-left">
                            <img src={loginImg} alt="" />
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <h2 className='text-center font-bold text-2xl mt-4'>Login</h2>
                            <form onSubmit={handleLogin} className="card-body">
                                <fieldset className="fieldset">
                                    <label className="label">Email</label>
                                    <input type="email" name="email" className="input" placeholder="Email" />
                                    <label className="label">Password</label>
                                    <input type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="input" placeholder="Password" />
                                    <button
                                        type="button"
                                        className="absolute right-[50px] top-[190px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <AiOutlineEyeInvisible className="h-5 w-5" />
                                        ) : (
                                            <AiOutlineEye className="h-5 w-5" />
                                        )}
                                    </button>
                                    <label className="label"><LoadCanvasTemplate /></label>
                                    <input
                                        onBlur={handleValidateCaptcha}
                                        type="text"
                                        name="captcha"
                                        className="input"
                                        placeholder="Type the captcha above"
                                    />
                                    {/* todo: apply disabled for re-captcha */}
                                    <input disabled={disabled} type="submit" value="Login" className="btn bg-[#D1A054] text-white mt-4" />
                                </fieldset>
                            </form>
                            <div className='text-center m-6 text-sm'>
                                <Link to="/signup" className='text-[#D1A054] font-bold'>New here? Create a New Account</Link>
                                <p className='py-4'>Or sign in with</p>
                                <SocialLogin></SocialLogin>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Login;