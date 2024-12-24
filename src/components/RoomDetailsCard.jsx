import { FaStar } from "react-icons/fa";

const RoomDetailsCard = ({ roomDetails }) => {
    const { _id, room_name, room_image, room_price, room_description, is_booked, features, facilities, guest } = roomDetails;

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 space-x-5'>
            <figure className='rounded-md ring-4 ring-white'>
                <img className='w-full h-full rounded-md mx-auto' src={room_image} alt="Room Image" />
            </figure>

            <div className='px-5 flex flex-col space-y-3'>

                {/* name and ratings */}
                <div className='flex justify-between items-center'>
                    <div>
                        <span className='text-xl font-semibold'>{room_name}</span>
                        {
                            is_booked ? <sup className="badge badge-warning text-secondary">Booked</sup> : <sup className="badge badge-accent text-secondary">Available</sup>
                        }
                    </div>
                    <div className='flex items-center text-orange-500'>
                        <FaStar></FaStar>
                        <FaStar></FaStar>
                        <FaStar></FaStar>
                        <FaStar></FaStar>
                        <FaStar></FaStar>
                        <span>(100)</span>
                    </div>
                </div>

                {/* price */}
                <div>
                    <h3><span className='text-xl font-semibold text-secondary'>${room_price}/</span> per night</h3>
                </div>

                {/* features */}
                <div className='space-y-2'>
                    <h3 className='text-xl text-secondary font-medium'>Features</h3>
                    <div className='flex flex-wrap gap-2'>
                        {features.map(feature => <span className='badge badge-neutral'>{feature}</span>)}
                    </div>
                </div>

                {/* facilities */}
                <div className='space-y-2'>
                    <h3 className='text-xl text-secondary font-medium'>Facilities</h3>
                    <div className='flex flex-wrap gap-2'>
                        {facilities.map(facility => <span className='badge badge-neutral'>{facility}</span>)}
                    </div>
                </div>

                {/* guest */}
                <div className='space-y-2'>
                    <h3 className='text-xl text-secondary font-medium'>Guest</h3>
                    <div className='flex flex-wrap gap-2'>
                        <span className='badge badge-neutral'>Adult: {guest.adult}</span>
                        <span className='badge badge-neutral'>Children: {guest.children}</span>
                    </div>
                </div>

                {/* description */}
                <div className='flex-grow'>
                    <h3 className='text-xl text-secondary font-medium'>Description</h3>
                    <p className='text-secondary'>{room_description}</p>
                </div>

                {/* button */}
                <div>
                    <button className='w-full px-6 py-2 bg-primary text-secondary font-semibold text-lg rounded-md active:scale-95 transition-all duration-150 ease-in-out'>Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default RoomDetailsCard;