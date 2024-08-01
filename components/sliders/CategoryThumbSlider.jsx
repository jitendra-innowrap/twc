import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

SwiperCore.use([Navigation]);

const CategoryThumbSlider = ({data}) => {
    
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);
    const isTab = useMediaQuery({
        query: '(max-width: 992px)'
      })
      const isPhone = useMediaQuery({
          query: '(max-width: 575px)'
        })
        const isSmallPhone = useMediaQuery({
            query: '(max-width: 380px)'
          })
    useEffect(() => {
    // if (mainSwiper) {
    //     mainSwiper?.slideTo(0);
    // }
}, [data, mainSwiper]);
    return (
        <>
        <Swiper
                spaceBetween={10}
                // thumbs={{ swiper: thumbsSwiper }}
                onSwiper={setMainSwiper}
                className="mySwiper2"
            >
            <SwiperSlide>
                <div className="collection-thumb">
                    <div className="collection_thumb_left">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde consequatur, molestias dolor accusantium autem eius ea earum beatae aliquid quibusdam?</p>
                        <h5>Wedding Decoration</h5>
                    </div>
                    <div className="collection_thumb_right">
                        <img
                        //  src={item.collection_image}
                            src="/assets/imgs/theme/collection-thumb-img.png"
                            // alt={item.title}
                        />
                    </div>
                </div>
            </SwiperSlide>
                <SwiperSlide>
                    <div className="collection-thumb">
                        <div className="collection_thumb_left">
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde consequatur, molestias dolor accusantium autem eius ea earum beatae aliquid quibusdam?</p>
                            <h5>Birthday party</h5>
                        </div>
                        <div className="collection_thumb_right">
                            <img
                            //  src={item.collection_image}
                                src="/assets/imgs/theme/category-card-img.png"
                                // alt={item.title}
                            />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="collection-thumb">
                        <div className="collection_thumb_left">
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde consequatur, molestias dolor accusantium autem eius ea earum beatae aliquid quibusdam?</p>
                            <h5>Family Functions</h5>
                        </div>
                        <div className="collection_thumb_right">
                            <img
                            //  src={item.collection_image}
                                src="/assets/imgs/theme/category-card-img.png"
                                // alt={item.title}
                            />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            
        <div className="collection-slider-container position-relative">
        <Swiper
                slidesPerView={isSmallPhone?2.2:isPhone?3.2:isTab?4:5}
                spaceBetween={15}
                navigation={{
                    prevEl: ".custom_prev_ct1",
                    nextEl: ".custom_next_ct1",
                }}
                watchSlidesProgress={true}
                className="custom-class"
                onSwiper={setThumbsSwiper}
            >
            {data?.map((item, i) => (
                 <SwiperSlide key={item.collection_mapping_id} className="">
                     <div className="card-1">
                         <figure className=" img-hover-scale overflow-hidden">
                            <Link href={`/collection/${item.collection_handle}`}>
                                 <a>
                                     <img
                                         src={item.collection_image}
                                        //  src="/assets/imgs/theme/collection-thumb-img.png"
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
        </div>
        </>
    );
};

export default CategoryThumbSlider;
