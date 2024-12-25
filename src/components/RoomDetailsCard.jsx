import { useContext, useState } from 'react';
import RoomSummary from './RoomSummary';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import { errorAlert, successAlert } from '../toastify/toastify';
import {useLocation, useNavigate } from 'react-router-dom';


const RoomDetailsCard = ({ roomDetails }) => {
    const baseURL = import.meta.env.VITE_RootURL;

    const { _id, room_image, room_name, is_booked } = roomDetails;
    const [checkInDate, setCheckInDate] = useState(new Date());
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // loading state
    if (loading) {
        return;
    }


    // handle show modal
    const handleShowModal = () => {
        if(!(user && user?.email)){
            errorAlert('Please login to booked room.');
            navigate('/login-page', {state:location.pathname});
            return;
        }

        document.getElementById('book_now_modal').showModal()
    }

    // handle booking form
    const handleBookingForm = (e) => {
        e.preventDefault();
        const { displayName, photoURL, email } = user;
        const newBooking = {
            roomId: _id,
            email,
            checkInDate,
            bookingDate: new Date()
        };

        const postData = async () => {
            try{
                const { data } = await axios.post(`${baseURL}/booked-room`, {newBooking});
                if(data.acknowledged){
                    const res = await axios.patch(`${baseURL}/rooms/${_id}`, {
                        is_booked: true,
                    });
                    
                    successAlert(`Congrats, You have booked the '${room_name}'.`);
                    navigate('/room-page');
                }else{
                    errorAlert(`Sorry, the room '${room.room_name}' is not booked.`);
                }
                // close modal
                document.getElementById('close_modal').click();
            }catch(err){
                errorAlert(err.message);
            }
        };

        postData();
    };


    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:space-x-5'>
            <figure className='rounded-md ring-4 ring-white'>
                <img className='w-full h-full rounded-md mx-auto' src={room_image} alt='Room Image' />
            </figure>

            <div className='lg:px-5 flex flex-col space-y-3 py-5 lg:py-0'>

                {/* room details */}
                <RoomSummary
                    key={2}
                    roomDetails={roomDetails}
                >
                </RoomSummary>

                {/* button */}
                <div>
                    <button onClick={handleShowModal} className={`w-full px-6 py-2 bg-primary text-secondary font-semibold text-lg rounded-md active:scale-95 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed`} disabled={is_booked}>Book Now</button>
                </div>
            </div>


            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id='book_now_modal' className='modal'>
                <div className='modal-box rounded-md'>
                    <form method='dialog'>
                        {/* if there is a button in form, it will close the modal */}
                        <button id='close_modal' className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
                    </form>
                    {/* modal body */}
                    <div>
                        <div className='lg:px-5 flex flex-col space-y-3 py-5 lg:py-0'>
                            {/* room details */}
                            <RoomSummary
                                key={2}
                                roomDetails={roomDetails}
                            >
                            </RoomSummary>
                            {/* confirm booking form */}
                            <form onSubmit={handleBookingForm} className='space-y-3'>
                                <h2 className='text-xl text-secondary font-medium '>Select Check-in Date</h2>
                                <label className='input input-bordered flex items-center'>
                                    <DatePicker
                                        selected={checkInDate}
                                        onChange={(date) => setCheckInDate(date)}
                                        dateFormat='yyyy-MM-dd'
                                        placeholderText='Select a date'
                                    />
                                </label>
                                <button className='w-full px-6 py-2 bg-primary text-secondary font-semibold text-lg rounded-md active:scale-95 transition-all duration-150 ease-in-out'>Confirm Booking</button>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default RoomDetailsCard;