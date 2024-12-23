import Lottie from 'lottie-react';
import loginRegisterLottie from '../assets/animations/login-register-lottie.json';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaGoogle, FaImage, FaKey, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';


const RegisterPage = () => {
    return (
        <section className='w-full h-screen flex items-center justify-center bg-light'>
            <div className='basis-full sm:basis-10/12 lg:basis-2/3 flex flex-col sm:flex-row items-center justify-center rounded-lg shadow-xl bg-white'>

                {/* left content */}
                <div className='basis-1/3 bg-login-register-bg bg-cover bg-center p-8 sm:p-12 text-center space-y-4 sm:rounded-s-lg'>
                    <Lottie className='size-48 sm:size-60 mx-auto' animationData={loginRegisterLottie}></Lottie>
                    <h2 className='text-2xl md:text-3xl font-bold text-white'>Welcome Back</h2>
                    <p className='text-lg text-white leading-6 pb-5'>To keep connected with us please login with your personal info</p>
                    <Link to='/login-page'>
                        <button className='px-8 py-2 rounded-full border text-lg font-semibold text-white'>Login</button>
                    </Link>
                </div>

                {/* right content */}
                <div className='basis-2/3 py-5 sm:py-0 px-8 sm:px-12 text-center'>

                    {/* heading */}
                    <h2 className='text-2xl md:text-3xl font-bold text-primary'>Create An Account</h2>

                    {/* social icons */}
                    <div className='flex gap-3 my-3 justify-center'>
                        <button className='p-2 border rounded-full'>
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
                        <form className='space-y-3'>
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

                            <button className='px-8 py-2 rounded-full border text-lg font-semibold text-white bg-primary'>Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage; 