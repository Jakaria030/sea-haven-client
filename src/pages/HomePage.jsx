import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import TopRoomCard from '../components/TopRoomCard';
import axios from 'axios';

const HomePage = () => {
    const baseURL = import.meta.env.VITE_RootURL;
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <div>
            <Banner></Banner>

            <section className='max-w-8xl mx-auto px-5 my-10'>
                <h2 className='text-3xl font-semibold text-center text-secondary my-5'>Featured Rooms</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {
                        rooms.map(room => <TopRoomCard
                            key={room._id}
                            room={room}
                        ></TopRoomCard>)
                    }
                </div>
            </section>
        </div>
    );
};

export default HomePage;