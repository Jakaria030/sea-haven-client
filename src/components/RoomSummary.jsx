import { FaStar } from "react-icons/fa";

const RoomSummary = ({ roomDetails }) => {
    const { _id, room_name, room_image, room_price, room_description, is_booked, features, facilities, guest } = roomDetails;
    return (
        <>
            {/* name and ratings */}
            <div className='flex flex-col md:flex-row justify-between md:items-center'>
                <div>
                    <span className='text-2xl font-semibold'>{room_name}</span>
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
                    {features.map((feature, indx) => <span key={indx} className='badge badge-neutral'>{feature}</span>)}
                </div>
            </div>

            {/* facilities */}
            <div className='space-y-2'>
                <h3 className='text-xl text-secondary font-medium'>Facilities</h3>
                <div className='flex flex-wrap gap-2'>
                    {facilities.map((facility, indx) => <span key={indx} className='badge badge-neutral'>{facility}</span>)}
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
            <div className='lg:flex-grow'>
                <h3 className='text-xl text-secondary font-medium'>Description</h3>
                <p className='text-secondary'>{room_description}</p>
            </div>
        </>
    );
};

export default RoomSummary;