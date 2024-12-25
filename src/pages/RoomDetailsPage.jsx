import { useLoaderData } from "react-router-dom";
import RoomDetailsCard from "../components/RoomDetailsCard";
import TitleBanner from "../components/TitleBanner";
import { useEffect, useState } from "react";
import axios from "axios";
import { errorAlert } from "../toastify/toastify";
import Review from "../components/Review";

const RoomDetailsPage = () => {
    const baseURL = import.meta.env.VITE_RootURL;

    const roomDetails = useLoaderData();
    const [reviews, setReviews] = useState(null);
    const [totalReviews, setTotalReviews] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`${baseURL}/reviews/${roomDetails._id}`);
                setReviews(data);
                setTotalReviews(data.length);

                let count = 0;
                for(const review of data){
                    count = count + review['rating'];
                }

                setTotalRatings(count);
            } catch (err) {
                errorAlert(err.message);
            }
        };

        if (roomDetails._id) {
            getData();
        }

    }, []);

    return (
        <div className="space-y-10 mb-10">
            {/* title banner */}
            <TitleBanner title={roomDetails.room_name}></TitleBanner>

            {/* room details */}
            <section className='max-w-8xl mx-auto px-5'>
                {
                    roomDetails && (
                        <RoomDetailsCard
                            roomDetails={roomDetails}
                            totalRatings={totalRatings}
                            totalReviews={totalReviews}
                        ></RoomDetailsCard>
                    )
                }
            </section>

            {/* user reviews */}
            <section className='max-w-8xl mx-auto px-5'>
                {
                    reviews &&
                    (
                        
                        <div className="grid grid-cols-1 gap-5">
                            {reviews.map(review => <Review
                                key={review._id}
                                review={review}
                            ></Review>)}
                        </div>
                    )
                }
            </section>
        </div>
    );
};

export default RoomDetailsPage;