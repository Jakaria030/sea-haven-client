import { Link } from 'react-router-dom';
import notFoundImage from '../assets/animations/notFound.gif';
const ErrorPage = () => {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center bg-w'>
            <div className='px-20 py-10 bg-white rounded-md shadow-lg'>
                <figure className='w-60 mx-auto'>
                    <img className='w-full mx-auto' src={notFoundImage} />
                </figure>
                <div className='text-center'>
                    <h1 className='text-secondary text-2xl font-semibold mb-4'>OPPS! Page Not Found.</h1>
                    <Link to='/'>
                        <button className='text-xl font-medium px-6 py-2 text-white bg-primary rounded-md active:scale-95 transition-all duration-150 ease-in-out'>Go Back</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;