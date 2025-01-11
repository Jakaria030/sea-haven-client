import { IoCallSharp } from "react-icons/io5";
import Title from "../components/Title";
import TitleBanner from "../components/TitleBanner";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import HotelMap from "../components/HotelMap";

const ContactPage = () => {
    return (
        <div>
            <Title title={'Contact'}></Title>

            <TitleBanner title={"Contact Us"}></TitleBanner>


            <section className="max-w-8xl mx-auto px-5 pt-10">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className=" flex-grow space-y-8 p-8 bg-primary/30 rounded-t-md md:rounded-t-none md:rounded-s-md content-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-full">
                                <FaLocationDot className="text-3xl text-primary p-1" />
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold">Address</h4>
                                <p className="text-lg font-medium">Sabirul Way, Kuakata 8600</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-full">
                                <IoCallSharp className="text-3xl text-primary p-1" />
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold">Call</h4>
                                <p className="text-lg font-medium">+8801725490784</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-full">
                                <MdEmail className="text-3xl text-primary p-1" />
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold">Email</h4>
                                <p className="text-lg font-medium">jakariag84@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="basis-1/2 p-8 bg-white rounded-b-md md:rounded-b-none md:rounded-e-md">
                        <h2 className="text-2xl font-semibold  mb-2">Send Message</h2>
                        <form form method="POST" action="https://formsubmit.co/jakariag84@gmail.com" enctype="multipart/form-data" className="space-y-3">
                            <input type="text" name="name" placeholder="Full Name" className="input input-bordered w-full" />
                            <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" />
                            <textarea name="message" className="textarea textarea-bordered w-full" placeholder="Write Message"></textarea> <br />
                            <input type="hidden" name="_template" value="table" />
                            <input type="hidden" name="_captcha" value="false" />
                            <button type="submit" className='w-32 h-10 rounded-md text-lg font-semibold bg-primary'>Send</button>
                        </form>
                    </div>
                </div>
            </section>

            <section className='max-w-8xl mx-auto px-5 pb-10'>
                <h2 className='text-3xl font-semibold text-center text-secondary my-8'>See Map</h2>
                <HotelMap></HotelMap>
            </section>
        </div>
    );
};

export default ContactPage;