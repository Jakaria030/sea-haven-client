import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import RoomCard from "../components/RoomCard";


const RoomsPage = () => {
    const baseURL = import.meta.env.VITE_RootURL;
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const { data } = await axios.get(`${baseURL}/rooms`);
                setRooms(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            };
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* filter by price range */}
            <section className='bg-primary py-8'>
                <form className='flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 px-5'>
                    <input type="number" name="minPrice" placeholder="Minimum price" className="input input-bordered w-full max-w-xs shadow-md" />
                    <input type="number" name="maxPrice" placeholder="Maximum price" className="input input-bordered w-full max-w-xs shadow-md" />
                    <button className='px-6 py-2 bg-white rounded-md text-gray-500 text-lg font-semibold shadow-md active:scale-95'>Filter</button>
                </form>
            </section>

            {/* room cards */}
            <section className='max-w-8xl mx-auto px-5 py-8 sm:py-12'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {
                        rooms.map(room => <RoomCard
                            key={room._id}
                            room={room}
                        ></RoomCard>)
                    }
                </div>
            </section>
        </div>
    );
};

export default RoomsPage;