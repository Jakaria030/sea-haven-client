import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { errorAlert } from "../toastify/toastify";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import NoDataFound from "./NoDataFound";



const Testimonial = () => {
    const baseURL = import.meta.env.VITE_RootURL;
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const ratings = [];
    for (let i = 1; i <= 5; i++) {
        ratings.push(i);
    }

    useEffect(() => {
        setIsLoading(true);
        const fetchReviews = async () => {
            try {
                const { data } = await axios.get(`${baseURL}/reviews`);
                setReviews(data);
            } catch (err) {
                errorAlert(err.message);
            } finally{
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div>
            {
                (!isLoading && reviews.length > 0) ? <Swiper
                modules={[Pagination]}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                speed={1000}
                spaceBetween={30}
                breakpoints={{
                    640: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                    1280: {
                      slidesPerView: 4,
                    },
                  }}
            >
                {
                    reviews.map(review => <SwiperSlide key={review?._id}>
                        <div className="space-y-3 bg-primary/20 p-5 rounded-md flex flex-col justify-between">
                            <div className="flex justify-start items-center gap-5">
                                <figure className="w-16 h-16 ring-2 rounded-full ring-white">
                                    <img className="w-full h-full rounded-full" src={review?.photoURL} alt="User" />
                                </figure>
                                <div className="space-y-1">
                                    <h2 className="text-xl font-semibold text-secondary">{review?.name}</h2>
                                    <div className="flex items-center">
                                        {ratings.map((i) => {
                                            if (i <= review.rating) {
                                                return <FaStar key={i} className="text-xl text-orange-400" />;
                                            } else {
                                                return <FaStar key={i} className="text-xl text-gray-400" />;
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-lg text-secondary line-clamp-3">
                                    {review?.comment || "No comments available."}
                                </p>
                            </div>
                        </div>

                    </SwiperSlide>)
                }
            </Swiper>
            : <NoDataFound></NoDataFound> }
            
        </div>
    );
};

export default Testimonial;
