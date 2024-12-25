import { FaStar } from "react-icons/fa";

const Review = ({ review }) => {
    const { name, photoURL, rating, comment } = review;
    const ratings = [];
    for (let i = 1; i <= 5; i++){
      ratings.push(i);
    }

    return (
        <div className="space-y-3 bg-primary/20 p-5 rounded-md">
            <div className="flex justify-start items-center gap-5">
                <figure className="w-16 h-16 ring-2 rounded-full ring-white">
                    <img className="w-full h-full rounded-full" src={photoURL} />
                </figure>
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-secondary">{name}</h2>
                    <div className='flex items-center'>
                        
                        {
                            ratings.map(i => {
                                if(i <= rating){
                                    return <FaStar key={i} className="text-xl text-orange-400"></FaStar>;
                                }else{
                                    return <FaStar key={i} className="text-xl text-gray-400"></FaStar>
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            <div>
                <p className="text-lg text-secondary">{comment}</p>
            </div>
        </div>
    );
};

export default Review;