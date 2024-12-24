import Lottie from 'lottie-react';
import loginRegisterLottie from '../assets/animations/login-register-lottie.json';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaGithub, FaGoogle, FaImage, FaKey, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { errorAlert, successAlert } from '../toastify/toastify';
import Spinner from '../loader/Spinner';


const RegisterPage = () => {

    const {createUser, setUser, updateUserProfile, loading, setLoading, signInWithGoogle} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegisterForm = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;

        // valid password check
        if(password.length < 6){
            errorAlert('Password must be at least 6 characters long.');
            return;
        }

        // uppercase letter check
        const uppercaseRegex = /[A-Z]/;
        if(!uppercaseRegex.test(password)){
            errorAlert('Password must contain at least one uppercase letter.');
            return;
        }

        // lowercase letter check
        const lowercaseRegex = /[a-z]/;
        if(!lowercaseRegex.test(password)){
            errorAlert('Password must contain at least one lowercase letter');
            return;
        }

        // create user
        createUser(email, password)
        .then(result => {
            setUser(result.user);
            
            // update user
            updateUserProfile({displayName: name, photoURL: photoURL})
            .then(() => {
                form.reset();
                successAlert('Your have successfully completed registration.');
                navigate(`/`);

            })
            .catch(err => {
                errorAlert(err.message);
                setLoading(false);
            })
        })
        .catch(err => {
            errorAlert(err.message);
            setLoading(false);
        });
    };

    // continue with google
    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(result => {
            setUser(result.user);
            successAlert('You have successfully logged in using Google.');
            navigate(`/`);
        })
        .catch(err => {
            errorAlert('Login failed!');
            setLoading(false);
        });
    };

    return (
        <section className='w-full h-screen flex items-center justify-center bg-light'>
            <div className='basis-full sm:basis-10/12 lg:basis-1/2 flex flex-col sm:flex-row items-center justify-center rounded-lg shadow-xl bg-white'>
                {/* left content */}
                <div className='basis-1/3 bg-login-register-bg bg-cover bg-center p-8 sm:p-12 text-center space-y-4 sm:rounded-s-lg'>
                    <Lottie className='size-48 sm:size-60 mx-auto' animationData={loginRegisterLottie}></Lottie>
                    <h2 className='text-2xl md:text-3xl font-bold text-white'>Welcome Back</h2>
                    <p className='text-lg text-white leading-6 pb-5'>To keep connected with us please login with your personal info</p>
                    <Link to='/login-page'>
                        <button className='w-32 h-12 rounded-full border text-lg font-semibold text-white'>Login</button>
                    </Link>

                    <p className='text-white leading-6 underline'><Link to='/'>Go To Home</Link></p>
                </div>

                {/* right content */}
                <div className='basis-2/3 py-5 sm:py-0 px-8 sm:px-12 text-center'>

                    {/* heading */}
                    <h2 className='text-2xl md:text-3xl font-bold text-primary'>Create An Account</h2>

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

                    <div className='divider pb-5 text-secondary'>or use your email to registration</div>

                    {/* form */}
                    <div className='max-w-5xl '>
                        <form onSubmit={handleRegisterForm} className='space-y-3'>
                            <label className='input input-bordered flex items-center gap-2'>
                                <FaUser className='text-xl opacity-70' />
                                <input type='text' name='name' className='grow' placeholder='Name' required />
                            </label>

                            <label className='input input-bordered flex items-center gap-2'>
                                <FaImage className='text-xl opacity-70' />
                                <input type='url' name='photoURL' className='grow' placeholder='Photo URL' required />
                            </label>

                            <label className='input input-bordered flex items-center gap-2'>
                                <MdEmail className='text-xl opacity-70' />
                                <input type='email' name='email' className='grow' placeholder='Email' required />
                            </label>

                            <label className='input input-bordered flex items-center gap-2'>
                                <FaKey className='text-xl opacity-70' />
                                <input type='password' name='password' className='grow' placeholder='Password' required />
                            </label>

                            <button className='w-32 h-12 rounded-full border text-lg font-semibold text-white bg-primary'>{loading ? <Spinner /> : 'Register'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage; 