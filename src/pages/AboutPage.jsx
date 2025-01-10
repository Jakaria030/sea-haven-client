import Title from '../components/Title';
import TitleBanner from '../components/TitleBanner';
import about from '../assets/about.jpg';
import arafat from '../assets/arafat.jpg';
import arnab from '../assets/arnab.jpg';
import nakib from '../assets/nakib.jpg';
import shimul from '../assets/shimul.jpg';
import OurServices from '../components/OurServices';

const AboutPage = () => {
    return (
        <div>
            <Title title={'About'}></Title>

            <TitleBanner title={'About Our Hotel'}></TitleBanner>

            {/* GM Message */}
            <section className='max-w-8xl mx-auto px-5'>
                <div className='mt-10 grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-20'>
                    <figure className='col-span-1 ring-4 rounded-md ring-white shrink-0'>
                        <img className='h-full rounded-md object-cover' src={about} />
                    </figure>
                    <div className='col-span-1 lg:col-span-3 bg-primary/20 p-5 md:p-10 border-l-8 border-primary content-center'>
                        <blockquote className='-space-y-5'>
                            <p className='text-2xl md:text-6xl font-lora text-left'>"</p>
                            <p className='md:text-xl indent-5'>Welcome to Sea Haven Hotel, your perfect escape by the sea. We are here to make your stay relaxing, comfortable, and unforgettable. Let the ocean breeze and our warm hospitality make your visit truly special!</p>
                            <p className='text-2xl md:text-6xl font-lora text-right'>"</p>
                        </blockquote>
                        <address className='text-right'>
                            <p className='text-lg font-semibold font-lora'>General Manager</p>
                            <p>Gulam Jakaria</p>
                        </address>
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section className='pb-5'>
                <h2 className='text-3xl pt-10 font-semibold text-center text-secondary mb-8'>Our Team</h2>
                <div className='max-w-8xl mx-auto px-5'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                        <div className='bg-primary/50 rounded-md'>
                            <figure className='overflow-hidden'>
                                <img className='rounded-t-md hover:scale-105 transition-all duration-150 ease-in-out' src={arafat} />
                            </figure>
                            <div className='text-center py-5'>
                                <h2 className='text-xl font-lora font-semibold'>Arafat Hossen</h2>
                                <p>Director of Operations</p>
                            </div>
                        </div>
                        <div className='bg-primary/50 rounded-md'>
                            <figure className='overflow-hidden'>
                                <img className='rounded-t-md hover:scale-105 transition-all duration-150 ease-in-out' src={arnab} />
                            </figure>
                            <div className='text-center py-5'>
                                <h2 className='text-xl font-lora font-semibold'>Arnab</h2>
                                <p>Managing Director</p>
                            </div>
                        </div>
                        <div className='bg-primary/50 rounded-md'>
                            <figure className='overflow-hidden'>
                                <img className='rounded-t-md hover:scale-105 transition-all duration-150 ease-in-out' src={nakib} />
                            </figure>
                            <div className='text-center py-5'>
                                <h2 className='text-xl font-lora font-semibold'>Ahnaf Nakib</h2>
                                <p>Resident Manager</p>
                            </div>
                        </div>
                        <div className='bg-primary/50 rounded-md'>
                            <figure className='overflow-hidden'>
                                <img className='rounded-t-md hover:scale-105 transition-all duration-150 ease-in-out' src={shimul} />
                            </figure>
                            <div className='text-center py-5'>
                                <h2 className='text-xl font-lora font-semibold'>Eliash Jahan</h2>
                                <p>Generale Manger</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Services */}
            <div className='pt-10'>
                <OurServices></OurServices>
            </div>
        </div>
    );
};

export default AboutPage;