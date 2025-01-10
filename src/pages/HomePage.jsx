import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import TopRoomCard from '../components/TopRoomCard';
import axios from 'axios';
import HotelMap from '../components/HotelMap';
import Testimonial from '../components/Testimonial';
import offerImage from '../assets/offer.png';
import Title from '../components/Title';
import { HiUserGroup } from 'react-icons/hi';
import { FaCommentsDollar, FaHotel, FaStar } from 'react-icons/fa';
import CountUp from 'react-countup';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useInView } from 'react-intersection-observer';
import NoDataFound from '../components/NoDataFound';
import OurServices from '../components/OurServices';


const HomePage = () => {
    const baseURL = import.meta.env.VITE_RootURL;
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchTopRatedRoom = async () => {
            try {
                const { data } = await axios.get(`${baseURL}/top-rooms`)
                setRooms(data);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopRatedRoom();

    }, []);

    // for pop up offer
    useEffect(() => {
        const hasVisited = localStorage.getItem("hasVisited");
        if (!hasVisited) {
            setShowModal(true);
            localStorage.setItem("hasVisited", "true");
        }
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // for count up with scroll
    useEffect(() => {
        AOS.init();
    }, []);


    const [countUp, setCountUp] = useState(null);
    useEffect(() => {
        const fetchForCountUp = async () => {
            const { data } = await axios.get(`${baseURL}/count-up`);
            setCountUp(data);
        };

        fetchForCountUp();
    })

    const data = [
        { title: 'Users', icon: <HiUserGroup className='text-6xl font-bold mb-2' />, count: 50 },
        { title: 'Rooms', icon: <FaHotel className='text-6xl font-bold mb-2' />, count: countUp?.totalRooms },
        { title: 'Reviews', icon: <FaCommentsDollar className='text-6xl font-bold mb-2' />, count: countUp?.totalReviews },
        { title: 'Ratings', icon: <FaStar className='text-6xl font-bold mb-2' />, count: countUp?.totalRatings },
    ];

    return (
        <div className='space-y-10'>
            <Title title={'Home'}></Title>

            {/* Special Offer popup */}
            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box p-0 rounded-md shadow-2xl drop-shadow-2xl">
                        <div>
                            <figure className="relative w-full">
                                <img className="rounded-md" src={offerImage} alt="Offer" />
                                <button
                                    onClick={handleCloseModal}
                                    className="btn btn-sm btn-circle btn-ghost bg-white rounded-full absolute right-2 top-2"
                                >
                                    ✕
                                </button>
                            </figure>
                        </div>
                    </div>
                </div>

            )}

            {/* banner section */}
            <Banner></Banner>

            {/* featured room */}
            <section className='max-w-8xl mx-auto px-5'>
                <h2 className='text-3xl font-semibold text-center text-secondary my-8'>Featured Rooms</h2>
                {rooms ? (<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {
                        rooms.map(room => <TopRoomCard
                            key={room._id}
                            room={room}
                        ></TopRoomCard>)
                    }
                </div>) : <NoDataFound></NoDataFound>}
            </section>

            {/* count up section */}
            <section className='relative bg-cover py-8 md:py-16'>
                <div className='absolute inset-0 bg-count-up-bg bg-cover opacity-30'></div>

                <div className='relative max-w-8xl mx-auto px-5'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                        {data.map((item, index) => {
                            const { ref, inView } = useInView({ threshold: 0.1 });
                            return (
                                <div
                                    key={index}
                                    className='flex flex-col gap-1 items-center justify-center p-8 border-2 border-secondary rounded-md'
                                    ref={ref}
                                >
                                    {item.icon}
                                    <h2 className='text-3xl font-bold text-secondary'>
                                        {inView ? (
                                            <CountUp end={item.count} duration={3} />
                                        ) : (
                                            0
                                        )} +
                                    </h2>
                                    <h3 className='text-xl font-semibold text-secondary'>{item.title}</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* our location */}
            <section className='max-w-8xl mx-auto px-5'>
                <h2 className='text-3xl font-semibold text-center text-secondary my-8'>Our Location</h2>
                <HotelMap></HotelMap>
            </section>

            {/* User Review */}
            <section className='bg-primary/20 pb-10'>
                <h2 className='text-3xl pt-10 font-semibold text-center text-secondary my-8'>User Reviews</h2>
                <div className='max-w-8xl mx-auto px-5'>
                    <Testimonial></Testimonial>
                </div>
            </section>

            {/* our services */}
            <OurServices></OurServices>

        </div>
    );
};

export default HomePage;