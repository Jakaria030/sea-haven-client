import { useContext, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineRateReview, MdUpdate } from "react-icons/md";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import TitleBanner from "../components/TitleBanner";
import { format } from "date-fns";

const MyBookingPage = () => {
    const baseURL = import.meta.env.VITE_RootURL;

    const { user } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);
    const [bookingDetails, setBookingDetails] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                // Fetch both booked rooms and room details from the server
                const { data } = await axios.get(`${baseURL}/booked-room?email=${user.email}`);
                setRooms(data.rooms);
                setBookingDetails(data.bookings);

            } catch (err) {
                setError(err.message);
            } finally {
                setError(null);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const getRoom = (id) => {
        return rooms.find(room => room._id === id);
    };

    return (
        <div>
            {/* Banner title */}
            <TitleBanner
                title={'My Bookings Room'}
            ></TitleBanner>

            {
                isLoading ? ('Loading...')
                    : error ? ('error...')
                        : (
                            <section className='max-w-8xl mx-auto px-5'>
                                <div className="overflow-x-scroll min-w-7xl py-10">
                                    <table className="table min-w-[1024px]">
                                        <thead className="bg-primary/50 text-lg text-secondary text-center">
                                            <tr className="h-10">
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-lg text-secondary text-center items-center">
                                            {
                                                bookingDetails.map(bookingDetail => {
                                                    const room = getRoom(bookingDetail.roomId);

                                                    if (!room) return null;

                                                    const bookingDate = format(new Date(bookingDetail.bookingDate), 'dd-mm-yyyy');
                                                    const checkInDate = format(new Date(bookingDetail.checkInDate), 'dd-mm-yyyy');

                                                    return (<tr key={bookingDetail._id} className="bg-primary/20">
                                                        <td>
                                                            <figure className="w-60 ring-4 ring-white rounded-md mx-auto">
                                                                <img className="w-full h-full rounded-md mx-auto" src={room.room_image} />
                                                            </figure>
                                                        </td>
                                                        <td>{room.room_name}</td>
                                                        <td>${room.room_price}</td>
                                                        <td>
                                                            <p>Booking Date: {bookingDate}</p>
                                                            <p>Check-in Date: {checkInDate}</p>
                                                        </td>
                                                        <td className='flex flex-col items-center justify-center gap-2'>
                                                            <button className='flex items-center justify-center px-4 py-2 bg-primary rounded-md gap-1 text-secondary active:scale-95 transition-all duration-150 ease-in-out
                                                            '>
                                                                <MdOutlineRateReview className='text-2xl font-semibold' />
                                                                <span className='text-lg font-medium'>Review</span>
                                                            </button>

                                                            <button className='flex items-center justify-center px-4 py-2 bg-[#10B981] rounded-md gap-1 text-secondary active:scale-95 transition-all duration-150 ease-in-out
                                                            '>
                                                                <MdUpdate className='text-2xl font-semibold' />
                                                                <span className='text-lg font-medium'>Update</span>
                                                            </button>

                                                            <button className='flex items-center justify-center px-4 py-2 bg-[#F87171] rounded-md gap-1 text-secondary active:scale-95 transition-all duration-150 ease-in-out
                                                            '>
                                                                <FaRegTrashAlt className='text-2xl font-semibold' />
                                                                <span className='text-lg font-medium'>Cancel</span>
                                                            </button>                                    
                                                        </td>
                                                    </tr>);
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        )
            }

        </div>
    );
};

export default MyBookingPage;
