import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";



const Intro1 = ({data}) => {
    const slideRef = useRef(null);
    const router = useRouter();

    const handleRedirect = (event) => {
        const url = event.currentTarget.getAttribute('data-url'); // Get the data-url attribute
        if (url) {
            router.push(url); // Use Next.js router to navigate
        }
    };

    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop
                autoplay={{
                    delay: 3000, // 4 seconds
                    disableOnInteraction: false, // Continue autoplay after interactions
                }}
                modules={[Autoplay]}
                navigation={{
                    prevEl: ".custom_prev_i1",
                    nextEl: ".custom_next_i1",
                }}
                className="hero-slider-1 dot-style-1 dot-style-1-position-1"
            >
            {
                data.map((banner)=>(
                    <SwiperSlide key={banner}>
                                <div className="hero-slider-link" onClick={handleRedirect} data-url={banner.redirect_url}>
                                </div>
                                        <img
                                            className="animated slider-1-1"
                                            src={banner.image}
                                            alt={banner.title}
                                            ref={slideRef}
                                            />
            </SwiperSlide>
                ))
            }
            </Swiper>

            {data?.length>1 &&<div className="slider-arrow hero-slider-1-arrow">
                <div className="wrapper">
                    <span className="slider-btn slider-prev slick-arrow custom_prev_i1">
                        <i className="fi-rs-angle-left"></i>
                    </span>
                </div>
                <div className="wrapper">
                    <span className="slider-btn slider-next slick-arrow custom_next_i1">
                        <i className="fi-rs-angle-right"></i>
                    </span>
                </div>
            </div>}
        </>
    );
};

export default Intro1;
