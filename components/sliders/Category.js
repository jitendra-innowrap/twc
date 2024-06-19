import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";
import { useMediaQuery } from "react-responsive";

SwiperCore.use([Navigation]);

const CategorySlider = () => {
    var data = [
        {
            id: 1,
            title: "Balloon Decor",
            img: "category-thumb-1.jpg",
        },
        {
            id: 2,
            title: "Venues",
            img: "category-thumb-2.jpg",
        },
        {
            id: 3,
            title: "Kids Entertainment",
            img: "category-thumb-3.jpg",
        },
        {
            id: 4,
            title: "Photography",
            img: "category-thumb-4.jpg",
        },
        {
            id: 5,
            title: "Catering",
            img: "category-thumb-5.jpg",
        },
        {
            id: 6,
            title: "Wedding Planning",
            img: "category-thumb-6.jpg",
        },
        {
            id: 7,
            title: "DJ Services",
            img: "category-thumb-7.jpg",
        },
        {
            id: 8,
            title: "Event Lighting",
            img: "category-thumb-8.jpg",
        },
    ];
    const isTab = useMediaQuery({
        query: '(max-width: 992px)'
      })
      const isPhone = useMediaQuery({
          query: '(max-width: 575px)'
        })
    
    return (
        <>
            <Swiper
                slidesPerView={isPhone?3:isTab?4:6}
                spaceBetween={20}
                // autoplay={{
                //     delay: 2500,
                //     disableOnInteraction: false,
                // }}
                //loop={false}
                navigation={{
                    prevEl: ".custom_prev_ct1",
                    nextEl: ".custom_next_ct1",
                }}
                className="custom-class"
            >
                {data.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className="card-1">
                            <figure className=" img-hover-scale overflow-hidden">
                               <Link href="/products/shop-grid-right">
                                    <a>
                                        <img
                                            src={`assets/imgs/shop/${item.img}`}
                                            alt=""
                                        />
                                    </a>
                                </Link>
                            </figure>
                            <h5>
                               <Link href="/products/shop-grid-right">
                                    <a>{item.title}</a>
                                </Link>
                            </h5>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* <div
                className="slider-arrow slider-arrow-2 carausel-6-columns-arrow"
                id="carausel-6-columns-arrows"
            >
                <span className="slider-btn slider-prev slick-arrow custom_prev_ct1">
                    <i className="fi-rs-angle-left"></i>
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_ct1">
                    <i className="fi-rs-angle-right"></i>
                </span>
            </div> */}
        </>
    );
};

export default CategorySlider;
