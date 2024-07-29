import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";
import { useMediaQuery } from "react-responsive";

SwiperCore.use([Navigation]);

// var data = [
//     {
//         id: 6,
//         title: "Wedding Planning",
//         img: "event-category-2.svg",
//     },
//     {
//         id: 1,
//         title: "Balloon Decor",
//         img: "event-category-4.svg",
//     },
//     {
//         id: 3,
//         title: "Kids Entertainment",
//         img: "event-category-3.svg",
//     },
//     {
//         id: 5,
//         title: "Catering",
//         img: "event-category-6.svg",
//     },
//     {
//         id: 7,
//         title: "DJ Services",
//         img: "event-category-5.svg",
//     },
//     {
//         id: 4,
//         title: "Photography",
//         img: "event-category-1.svg",
//     },
//     {
//         id: 2,
//         title: "Venues",
//         img: "event-category-7.svg",
//     },
// ];
const CategorySlider = ({data}) => {
    const isTab = useMediaQuery({
        query: '(max-width: 992px)'
      })
      const isPhone = useMediaQuery({
          query: '(max-width: 575px)'
        })
        const isSmallPhone = useMediaQuery({
            query: '(max-width: 380px)'
          })
    
    return (
        <>
            <Swiper
                slidesPerView={isSmallPhone?2.5:isPhone?3.5:isTab?4:6}
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
                {data?.map((item, i) => (
                    <SwiperSlide key={item.collection_mapping_id}>
                        <div className="card-1">
                            <figure className=" img-hover-scale overflow-hidden">
                               <Link href={`/collection/${item.collection_handle}`}>
                                    <a>
                                        <img
                                            src={item.collection_image}
                                            alt={item.title}
                                        />
                                    </a>
                                </Link>
                            </figure>
                            <h5>
                                    {item.title}
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
