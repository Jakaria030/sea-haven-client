import { Link } from "react-router-dom";

const TopRoomCard = ({ room }) => {
    const { _id, room_image, room_name, room_price, room_description, is_booked, totalReviews } = room;
    return (
        <div className="bg-white rounded-md flex flex-col h-full hover:shadow-lg transition-all duration-150 ease-in-out">
            <figure className="z-10 overflow-hidden w-full">
                <img className="w-full h-full rounded-t-md hover:scale-110 transition-all duration-150 ease-in-out" src={room_image} />
            </figure>
            <div className="p-3 space-y-2 flex flex-col flex-grow">
                <div className="w-3/4 mx-auto bg-light shadow-md p-2 -mt-12 z-20 relative rounded-sm text-center">
                    <h2 className="text-xl text-secondary font-medium text-center">{room_name}</h2>
                    {
                        is_booked ?
                            <span className="badge badge-warning text-secondary">Booked</span> :
                            <span className="badge badge-accent text-secondary">Available</span>
                    }
                </div>
                <div className="text-center flex flex-col items-center gap-5 flex-grow">
                    <div className="space-y-3">
                        <h1>
                            <span className="text-2xl font-semibold">${room_price}/</span>
                            <sub className="text-lg font-medium">per night</sub>
                        </h1>
                        <p className="text-secondary font-medium">{totalReviews} reviews</p>
                        <p className="text-secondary">{room_description}</p>
                    </div>
                    <div className="mt-auto">
                        <Link to={`/room-details/${_id}`}>
                            <button className="px-6 py-2 bg-primary text-secondary w-full text-lg font-medium active:scale-95 transition-all duration-150 ease-in-out">Book Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TopRoomCard;