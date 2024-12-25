import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import TopRoomCard from '../components/TopRoomCard';
import axios from 'axios';
import HotelMap from '../components/HotelMap';
import Testimonial from '../components/Testimonial';
import offerImage from '../assets/offer.png';


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


    return (
        <div className='space-y-10'>

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
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {
                        rooms.map(room => <TopRoomCard
                            key={room._id}
                            room={room}
                        ></TopRoomCard>)
                    }
                </div>
            </section>

            {/* our location */}
            <section className='max-w-8xl mx-auto px-5'>
                <h2 className='text-3xl font-semibold text-center text-secondary my-8'>Our Location</h2>
                <HotelMap></HotelMap>
            </section>

            {/* User Review */}
            <section className='max-w-8xl mx-auto px-5 pb-10'>
                <h2 className='text-3xl font-semibold text-center text-secondary my-8'>User Reviews</h2>
                <Testimonial></Testimonial>
            </section>

        </div>
    );
};

export default HomePage;