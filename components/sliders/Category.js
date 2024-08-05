import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";
import { useMediaQuery } from "react-responsive";

SwiperCore.use([Navigation]);

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
                slidesPerView="auto"
                spaceBetween={25}
                navigation={{
                    prevEl: ".custom_prev_ct1",
                    nextEl: ".custom_next_ct1",
                }}
                className="custom-class"
            >
            {data?.map((item, i) => (
                 <SwiperSlide key={item.collection_mapping_id} className="card-1-slide">
                            <Link draggable='false' href={`/collection/${item.collection_handle}`}>
                     <div className="card-1 cursor_pointer">
                         <figure className=" img-hover-scale overflow-hidden">
                                 <a draggable='false' className="w-100">
                                     <img
                                        draggable='false'
                                         src={item.collection_image}
                                        //  src="/assets/imgs/theme/category-card-img.png"
                                         alt={item.title}
                                     />
                                 </a>
                         </figure>
                         <h5>
                         {item.title}
                         </h5>
                     </div>
                             </Link>
                 </SwiperSlide>
             ))}
            </Swiper>

            <div
                className="slider-arrow slider-arrow-2 carausel-6-columns-arrow"
                id="carausel-6-columns-arrows"
            >
                <span className="slider-btn slider-prev slick-arrow custom_prev_ct1">
                    <i className="fi-rs-angle-left"></i>
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_ct1">
                    <i className="fi-rs-angle-right"></i>
                </span>
            </div>
        </>
    );
};

export default CategorySlider;
