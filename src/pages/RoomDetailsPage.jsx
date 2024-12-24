import { useLoaderData } from "react-router-dom";
import RoomDetailsCard from "../components/RoomDetailsCard";
import TitleBanner from "../components/TitleBanner";

const RoomDetailsPage = () => {
    const roomDetails = useLoaderData();
    return (
        <div className="space-y-10">
            {/* title banner */}
            <TitleBanner title={roomDetails.room_name}></TitleBanner>

            {/* room details */}
            <section className='max-w-8xl mx-auto px-5'>
                <RoomDetailsCard
                    roomDetails={roomDetails}
                ></RoomDetailsCard>
            </section>
        </div>
    );
};

export default RoomDetailsPage;