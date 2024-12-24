import { Swiper, SwiperSlide } from 'swiper/react';
import slide1 from '../assets/carousel/1.png';
import slide2 from '../assets/carousel/2.png';
import slide3 from '../assets/carousel/3.jpg';
import { Link } from 'react-router-dom';
// Import Swiper styles
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


const Banner = () => {

    // static data for slider
    const slider = [
        { id: 1, image: slide1, title: 'Sunset Serenity Suite', subTitle: 'Experience Tranquility with Stunning Sunset Views!' },
        { id: 2, image: slide2, title: 'Ocean Breeze Room', subTitle: 'Wake Up to the Sound of Waves - Your Seaside Retreat Awaits!' },
        { id: 3, image: slide3, title: 'Coastal Comfort Haven', subTitle: 'Relax in Style by the Sea - Your Dream Escape Starts Here!' },
    ];

    return (
        <section>
            <Swiper
                modules={[Pagination]}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                speed={1000}
            >
                {
                    slider.map(slide => <SwiperSlide key={slide.id}>
                        <div className='relative'>
                            <figure>
                                <img className='h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full object-cover opacity-90' src={slide.image} />
                            </figure>
                            <div className='absolute top-1/2 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1/2 bg-white/50 p-4 rounded-lg space-y-2 text-center mx-5'>
                                <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-secondary'>{slide.title}</h1>
                                <h3 className='text-secondary font-semibold pb-2'>{slide.subTitle}</h3>
                                <Link to='/room-page'><button className='bg-primary px-4 py-2 rounded-sm text-lg text-center font-medium text-secondary'>See More</button></Link>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Banner;