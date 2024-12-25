import Lottie from 'lottie-react';
import loginRegisterLottie from '../assets/animations/login-register-lottie.json';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFacebook, FaGithub, FaGoogle, FaKey } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { errorAlert, successAlert } from '../toastify/toastify';
import Spinner from '../loader/Spinner';


const LoginPage = () => {

    const {signInUser, setUser, loading, setLoading, signInWithGoogle} = useContext(AuthContext);
    const navigate = useNavigate();
    const {state} = useLocation();

    
    const handleLoginForm = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // login user
        signInUser(email, password)
        .then(result => {
            setUser(result.user);
            form.reset();
            successAlert('You have successfully logged in using your email.');
            navigate(`${state ? state : '/'}`);
        })
        .catch(err => {
            errorAlert('Please enter valid credentials.');
            setLoading(false);
        });
    };

    // continue with google
    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(result => {
            setUser(result.user);
            successAlert('You have successfully logged in using Google.');
            navigate(`${state ? state : '/'}`);
        })
        .catch(err => {
            errorAlert('Login failed!');
            setLoading(false);
        });
    };

    return (
        <section className='w-full h-screen flex items-center justify-center bg-light'>
            <div className='basis-full sm:basis-10/12 lg:basis-1/2 flex flex-col sm:flex-row items-center justify-center rounded-lg shadow-xl bg-white mx-5'>
                {/* left content */}
                <div className='basis-2/3 py-5 sm:py-0 px-4 sm:px-12 text-center relative'>
                    {/* heading */}
                    <h2 className='text-2xl md:text-3xl font-bold text-primary'>Login Your Account</h2>

                    {/* social icons */}
                    <div className='flex gap-3 my-3 justify-center'>
                        <button onClick={handleGoogleSignIn} className='p-2 border rounded-full'>
                            <FaGoogle className='text-2xl text-secondary' />
                        </button>
                        <button className='p-2 border rounded-full'>
                            <FaFacebook className='text-2xl text-secondary' />
                        </button>
                        <button className='p-2 border rounded-full'>
                            <FaGithub className='text-2xl text-secondary' />
                        </button>
                    </div>

                    <div className='divider pb-5 text-secondary'>or use your email to login.</div>

                    {/* form */}
                    <div className='max-w-5xl '>
                        <form onSubmit={handleLoginForm} className='space-y-3'>
                            <label className='input input-bordered flex items-center gap-2'>
                                <MdEmail className='text-xl opacity-70' />
                                <input type='email' name='email' className='grow' placeholder='Email' required />
                            </label>

                            <label className='input input-bordered flex items-center gap-2'>
                                <FaKey className='text-xl opacity-70' />
                                <input type='password' name='password' className='grow' placeholder='Password' required />
                            </label>

                            <button className='w-32 h-12 rounded-full border text-lg font-semibold text-white bg-primary'>{loading ? <Spinner /> : 'Login'}</button>
                        </form>
                    </div>
                </div>

                {/* right content */}
                <div className='basis-1/3 bg-login-register-bg bg-cover bg-center p-4 sm:p-12 text-center space-y-4 rounded-bl-lg rounded-br-lg sm:rounded-bl-none sm:rounded-tr-lg'>
                    <Lottie className='size-48 sm:size-60 mx-auto' animationData={loginRegisterLottie}></Lottie>
                    <h2 className='text-2xl md:text-3xl font-bold text-white'>New Here?</h2>
                    <p className='text-lg text-white leading-6 pb-5'>Register now and discover amazing deals for your perfect hotel booking!</p>
                    <Link to='/register-page'>
                        <button className='w-32 h-12 rounded-full border text-lg font-semibold text-white'>Register</button>
                    </Link>
                    <p className='text-white leading-6 underline'><Link to='/'>Go To Home</Link></p>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;