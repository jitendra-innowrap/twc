import { useEffect, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SingleProduct from "./../ecommerce/SingleProduct";

SwiperCore.use([Navigation]);

const RelatedSlider = ({related}) => {

    return (
        <>
            <Swiper
                slidesPerView={4}
                breakpoints={{
                    0: {
                        spaceBetween:10,
                        slidesPerView: 1.3,
                    },
                    300: {
                        spaceBetween:10,
                        slidesPerView: 1.6,
                    },
                    375: {
                        spaceBetween:10,
                        slidesPerView: 1.5,
                    },
                    430: {
                        spaceBetween:10,
                      slidesPerView: 1.7,
                    },
                    480: {
                      spaceBetween:10,
                      slidesPerView: 1.9,
                    },
                    500: {
                        spaceBetween:20,
                      slidesPerView: 1.8,
                    },
                    768: {
                        spaceBetween:30,
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                  }}
                spaceBetween={30}
                //loop={false}
                navigation={{
                    prevEl: ".custom_prev_n",
                    nextEl: ".custom_next_n",
                }}
                className="custom-class"
            >
                {related?.map((product, i) => (
                    <SwiperSlide key={i}>
                        <SingleProduct product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div
                className="slider-arrow slider-arrow-2 carausel-6-columns-arrow"
            >
                <span className="slider-btn slider-prev slick-arrow custom_prev_n">
                    <i className="fi-rs-angle-left"></i>
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_n">
                    <i className="fi-rs-angle-right"></i>
                </span>
            </div>
            
        </>
    );
};

export default RelatedSlider;
