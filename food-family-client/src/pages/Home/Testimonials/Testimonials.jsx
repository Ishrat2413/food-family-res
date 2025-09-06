import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { FaUser } from "react-icons/fa";

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://food-family-res.onrender.com/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);

    return (
        <section className="my-10">
            <SectionTitle
                subHeading="What our Customer Says about Us"
                heading={"Reviews"}>
            </SectionTitle>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {reviews.map(review => (
                    <SwiperSlide key={review._id}>
                        <div className="m-10 md:m-24 flex flex-col items-center text-center">
                            <div className="avatar mb-4">
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                                    {review.image ? (
                                        <img src={review.image} alt={review.name} className="rounded-full" />
                                    ) : (
                                        <FaUser className="text-2xl text-green-600" />
                                    )}
                                </div>
                            </div>

                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />

                            <p className="py-6 text-lg italic text-gray-700">"{review.review}"</p>

                            <h3 className="text-2xl font-semibold text-orange-500">{review.name}</h3>

                            {review.date && (
                                <p className="text-sm text-gray-500 mt-2">
                                    {new Date(review.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {reviews.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p>No reviews yet. Be the first to share your experience!</p>
                </div>
            )}
        </section>
    );
};

export default Testimonials;