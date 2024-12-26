import { useContext, useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineRateReview, MdUpdate } from 'react-icons/md';
import { AuthContext } from '../provider/AuthProvider';
import axios, { isCancel } from 'axios';
import TitleBanner from '../components/TitleBanner';
import { differenceInDays, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import { errorAlert, successAlert } from '../toastify/toastify';
import NoDataFound from '../components/NoDataFound';
import Loader from '../loader/Loader';
import Swal from 'sweetalert2';
import Title from '../components/Title';

const MyBookingPage = () => {
    const baseURL = import.meta.env.VITE_RootURL;

    const { user } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);
    const [bookingDetails, setBookingDetails] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reviewDate, setReviewDate] = useState(new Date());
    const [currRoomId, setCorrRoomId] = useState(null);
    const [render, setRender] = useState(true);
    const [newDate, setNewDate] = useState(new Date());
    const [currBookedId, setCurrBookedId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                // Fetch both booked rooms and room details from the server
                const { data } = await axios.get(`${baseURL}/booked-room?email=${user.email}`, { withCredentials: true });
                setRooms(data.rooms);
                setBookingDetails(data.bookings);

            } catch (err) {
                setError(err.message);
                errorAlert(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user, render]);

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

        const newReview = { roomId, name, email, photoURL, rating, comment, reviewDate };

        const postData = async () => {
            try {
                const { data } = await axios.post(`${baseURL}/review-room`, { newReview }, { withCredentials: true });
                successAlert('Thanks for giving a review.');
                form.reset();
                // close modal
                document.getElementById('close_modal').click();
            } catch (err) {
                errorAlert(err.message);
            }
        };
        postData();
    };

    // update date 
    const showUpdateModal = (booking_id, room_id) => {
        setCurrBookedId(booking_id);
        setCorrRoomId(room_id);
        document.getElementById('update_modal').showModal();
    }
    const handleUpdateForm = (e) => {
        e.preventDefault();
        // console.log(newDate, currBookedId);

        const updateData = async () => {
            const { data } = await axios.patch(`${baseURL}/booked-room-release/${currBookedId}`, { bookingDate: new Date(), checkInDate: newDate, isCancel: false });

            // update room status
            const res = await axios.patch(`${baseURL}/rooms/${currRoomId}`, { is_booked: true });

            if (data.acknowledged) {
                successAlert('Check-in date updated.')
                setRender(!render);
                document.getElementById('close_update_modal').click();
            } else {
                errorAlert('Check-in date is not updated.')
            }
        };
        updateData();

    }

    // handle cancel booking
    const handleCancelBooking = (_id, booking_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel the booking!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {

                const fetchData = async () => {
                    try {
                        const { data } = await axios.get(`${baseURL}/single-room-get?room_id=${_id}&user_email=${user.email}`, { withCredentials: true });

                        const today = new Date();
                        const checkInDate = new Date(data.checkInDate);

                        const differenceDate = differenceInDays(checkInDate, today);

                        if (differenceDate < 1) {
                            errorAlert('Sorry! You have to cancel the booking atleast one day befor.')
                            return;
                        }

                        // update room status booking status
                        const res1 = await axios.patch(`${baseURL}/rooms/${_id}`, { is_booked: false });
                        const res2 = await axios.patch(`${baseURL}/booked-room/${booking_id}`, { isCancel: true });

                        Swal.fire({
                            title: "Canceled!",
                            text: "Your booking has been canceled.",
                            icon: "success"
                        });
                    } catch (err) {
                        errorAlert(err.message);
                    }
                    setRender(!render);

                }
                fetchData();
            }
        });
    };

    return (
        <div>
            <Title title={'My Bookings'}></Title>
            {/* Banner title */}
            <TitleBanner
                title={'My Bookings Room'}
            ></TitleBanner>

            {
                isLoading ? <Loader></Loader>
                    : (error || bookingDetails.length === 0) ? <NoDataFound></NoDataFound>
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
                                                            <p>Check-in Date: {bookingDetail.isCancel ? 'Booking Cancel' : checkInDate}</p>
                                                        </td>
                                                        <td className='flex flex-col items-center justify-center gap-2'>
                                                            <button onClick={() => handleShowModal(room._id)} className='flex items-center justify-center px-4 py-2 bg-primary rounded-md gap-1 text-secondary active:scale-95 transition-all duration-150 ease-in-out
                                                            '>
                                                                <MdOutlineRateReview className='text-2xl font-semibold' />
                                                                <span className='text-lg font-medium'>Review</span>
                                                            </button>

                                                            <button onClick={() => showUpdateModal(bookingDetail._id, room._id)} className='flex items-center justify-center px-4 py-2 bg-[#10B981] rounded-md gap-1 text-secondary active:scale-95 transition-all duration-150 ease-in-out
                                                            '>
                                                                <MdUpdate className='text-2xl font-semibold' />
                                                                <span className='text-lg font-medium'>Update</span>
                                                            </button>

                                                            <button disabled={bookingDetail.isCancel} onClick={() => handleCancelBooking(room._id, bookingDetail._id)} className='flex items-center justify-center px-4 py-2 bg-[#F87171] rounded-md gap-1 text-secondary active:scale-95 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed
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


            {/* for updated date  */}
            <dialog id='update_modal' className='modal'>
                <div className='modal-box rounded-md'>
                    <form method='dialog'>
                        {/* if there is a button in form, it will close the modal */}
                        <button id='close_update_modal' className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
                    </form>
                    {/* modal body */}
                    <div>
                        <div className='lg:px-5 flex flex-col space-y-3 py-5 lg:py-0'>

                            <form onSubmit={handleUpdateForm} className='space-y-3'>
                                <h2 className='text-xl text-center font-medium text-secondary'>Give A New Chechk-in Date</h2>
                                <label className='input input-bordered flex items-center'>
                                    <DatePicker
                                        selected={newDate}
                                        onChange={(date) => setNewDate(date)}
                                        dateFormat='yyyy-MM-dd'
                                    />
                                </label>
                                <button className='w-full px-6 py-2 bg-primary text-secondary font-semibold text-lg rounded-md active:scale-95 transition-all duration-150 ease-in-out'>Update Date</button>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyBookingPage;
