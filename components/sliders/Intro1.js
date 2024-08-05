import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";



const Intro1 = ({data}) => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                navigation={{
                    prevEl: ".custom_prev_i1",
                    nextEl: ".custom_next_i1",
                }}
                className="hero-slider-1 dot-style-1 dot-style-1-position-1"
            >
            {
                data.map((banner)=>(
                    <SwiperSlide key={banner}>
                                <Link href={banner.redirect_url}>
                                        <img
                                            className="animated slider-1-1 cursor_pointer"
                                            src={banner.image}
                                            alt={banner.title}
                                            />
                                </Link>
            </SwiperSlide>
                ))
            }
            </Swiper>

            {data?.length>1 &&<div className="slider-arrow hero-slider-1-arrow">
                <span className="slider-btn slider-prev slick-arrow custom_prev_i1">
                    <i className="fi-rs-angle-left"></i>
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_i1">
                    <i className="fi-rs-angle-right"></i>
                </span>
            </div>}
        </>
    );
};

export default Intro1;
