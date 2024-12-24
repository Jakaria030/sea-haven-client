import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
    const {_id, room_name, room_image, room_price, is_booked} = room;

    return (
        <Link to={`/room-details/${_id}`} className='bg-white rounded-md '>
            <figure className='z-10 overflow-hidden w-full'>
                <img className='w-full h-full rounded-t-md hover:scale-110 transition-all duration-150 ease-in-out' src={room_image} />
            </figure>
            <div className='p-3 space-y-2'>
                <div className='w-3/4 mx-auto bg-light shadow-md p-2 -mt-12 z-20 relative rounded-sm text-center'>
                    <h2 className='text-xl text-secondary font-medium text-center'>{room_name}</h2>
                    {
                        is_booked ? <span className="badge badge-warning text-secondary">Booked</span> : <span className="badge badge-accent text-secondary">Available</span>
                    }
                </div>
                <div className='text-center py-2 space-y-2'>
                    <h1><span className='text-2xl font-semibold'>${room_price}/</span><sub className='text-lg font-medium'>per night</sub> </h1>
                    <p>100 reviews</p>
                </div>
            </div>
        </Link>
    );
};

export default RoomCard;