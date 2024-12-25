import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import TopRoomCard from '../components/TopRoomCard';
import axios from 'axios';
import HotelMap from '../components/HotelMap';

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

    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
            click() {
                map.locate()
            },
            locationfound(e) {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }

    return (
        <div className='space-y-10'>
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
            <section className='max-w-8xl mx-auto px-5 pb-10'>
                <h2 className='text-3xl font-semibold text-center text-secondary my-8'>Our Location</h2>
                <HotelMap></HotelMap>
            </section>
        </div>
    );
};

export default HomePage;