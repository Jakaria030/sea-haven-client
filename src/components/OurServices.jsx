import ourHotel from '../assets/hotel.png';
import { MdLocalLaundryService } from 'react-icons/md';
import { IoIosBed, IoIosTv } from 'react-icons/io';
import { FaWifi } from 'react-icons/fa';

const OurServices = () => {
    return (
        <section className='max-w-8xl mx-auto px-5 pb-10'>
            <div className='flex flex-col md:flex-row gap-5'>
                <figure className='basis-1/2 rounded-md flex items-center justify-center'>
                    <img className='rounded-xl p-2 bg-white' src={ourHotel} />
                </figure>
                <div className='basis-1/2 space-y-5'>
                    <h2 className='text-3xl font-semibold text-secondary '>Our Services</h2>

                    <div className='space-y-3'>
                        <div className="collapse collapse-plus border-2 border-white">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-medium flex items-center gap-2">
                                <FaWifi className='text-3xl' />
                                <h3>Wi-Fi Internet</h3>
                            </div>
                            <div className="collapse-content">
                                <p>Enjoy seamless high-speed WiFi connectivity throughout your stay, keeping you connected at all times.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus border-2 border-white">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-medium flex items-center gap-2">
                                <IoIosTv className='text-3xl' />
                                <h3>TV in Bedroom</h3>
                            </div>
                            <div className="collapse-content">
                                <p>Relax and unwind with a flat-screen TV in every bedroom, offering entertainment at your fingertips.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus border-2 border-white">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-medium flex items-center gap-2">
                                <MdLocalLaundryService className='text-3xl' />
                                <h3>Laundry Services</h3>
                            </div>
                            <div className="collapse-content">
                                <p>Experience hassle-free living with our convenient and reliable laundry services, tailored to your needs.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus border-2 border-white">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-medium flex items-center gap-2">
                                <IoIosBed className='text-3xl' />
                                <h3>Breakfast in Bed</h3>
                            </div>
                            <div className="collapse-content">
                                <p>Indulge in the luxury of breakfast in bed, delivered fresh to start your day with comfort and style.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurServices;