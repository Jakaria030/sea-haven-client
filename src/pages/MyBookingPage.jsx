import { useContext, useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineRateReview, MdUpdate } from 'react-icons/md';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import TitleBanner from '../components/TitleBanner';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import { errorAlert, successAlert } from '../toastify/toastify';

const MyBookingPage = () => {
    const baseURL = import.meta.env.VITE_RootURL;

    const { user } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);
    const [bookingDetails, setBookingDetails] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reviewDate, setReviewDate] = useState(new Date());
    const [currRoomId, setCorrRoomId] = useState(null);

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
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user]);

    // find room with id
    const getRoom = (id) => {
        return rooms.find(room => room._id === id);
    };

    // handle show modal
    const handleShowModal = (_id) => {
        setCorrRoomId(_id);
        document.getElementById('review_modal').showModal();
    };


    // handle review form
    const handleReview = (e) => {
        e.preventDefault();

        const form = e.target;
        const roomId = currRoomId;
        const name = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const rating = parseInt(form.rating.value);
        const comment = form.comment.value;

        const newReview = {roomId, name, email, photoURL, rating, comment, reviewDate};

        const postData = async () => {
            try{
                const { data } = await axios.post(`${baseURL}/review-room`, {newReview});
                successAlert('Thanks for giving a review.');
                form.reset();
                // close modal
                document.getElementById('close_modal').click();
            }catch(err){
                errorAlert(err.message);
            }
        };
        postData();
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
                                <div className='overflow-x-scroll min-w-7xl py-10'>
                                    <table className='table min-w-[1024px]'>
                                        <thead className='bg-primary/50 text-lg text-secondary text-center'>
                                            <tr className='h-10'>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-lg text-secondary text-center items-center'>
                                            {
                                                bookingDetails.map(bookingDetail => {
                                                    const room = getRoom(bookingDetail.roomId);

                                                    if (!room) return null;

                                                    const bookingDate = format(new Date(bookingDetail.bookingDate), 'dd-MM-yyyy');
                                                    const checkInDate = format(new Date(bookingDetail.checkInDate), 'dd-MM-yyyy');

                                                    return (<tr key={bookingDetail._id} className='bg-primary/20 hover:bg-primary/50 transition-all ease-in-out duration-150'>
                                                        <td>
                                                            <figure className='w-60 ring-4 ring-white rounded-md mx-auto'>
                                                                <img className='w-full h-full rounded-md mx-auto' src={room.room_image} />
                                                            </figure>
                                                        </td>
                                                        <td>{room.room_name}</td>
                                                        <td>${room.room_price}</td>
                                                        <td>
                                                            <p>Booking Date: {bookingDate}</p>
                                                            <p>Check-in Date: {checkInDate}</p>
                                                        </td>
                                                        <td className='flex flex-col items-center justify-center gap-2'>
                                                            <button onClick={() => handleShowModal(room._id)} className='flex items-center justify-center px-4 py-2 bg-primary rounded-md gap-1 text-secondary active:scale-95 transition-all duration-150 ease-in-out
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

            {/* review modal */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id='review_modal' className='modal'>
                <div className='modal-box rounded-md'>
                    <form method='dialog'>
                        {/* if there is a button in form, it will close the modal */}
                        <button id='close_modal' className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
                    </form>
                    {/* modal body */}
                    <div>
                        <div className='lg:px-5 flex flex-col space-y-3 py-5 lg:py-0'>
                            {/* confirm booking form */}
                            <form onSubmit={handleReview} className='space-y-3'>
                                <h2 className='text-xl text-center font-medium text-secondary'>Give A Review</h2>
                                <label className='input input-bordered flex items-center gap-2'>
                                    <input type='text' name='name' className='grow' placeholder='Name' defaultValue={user?.displayName} readOnly />
                                </label>
                                <label className='input input-bordered flex items-center'>
                                    <DatePicker
                                        selected={reviewDate}
                                        onChange={(date) => setReviewDate(date)}
                                        dateFormat='yyyy-MM-dd'
                                        readOnly
                                    />
                                </label>
                                <label className='input input-bordered flex items-center gap-2'>
                                    <input type='number' min={1} max={5} name='rating' className='grow' placeholder='Rating(1-5)' required />
                                </label>
                                <textarea placeholder='Comment' name='comment' className='textarea textarea-bordered w-full' required></textarea>
                                <button className='w-full px-6 py-2 bg-primary text-secondary font-semibold text-lg rounded-md active:scale-95 transition-all duration-150 ease-in-out'>Submit Review</button>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default MyBookingPage;
