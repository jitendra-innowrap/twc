import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SingleProduct from "./../ecommerce/SingleProduct";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import Popup from "reactjs-popup";
import ReactPlayer from "react-player";
import { BiPlayCircle } from "react-icons/bi";

SwiperCore.use([Navigation]);

const FeaturedSlider = ({ products }) => {
    const isTab = useMediaQuery({
        query: '(max-width: 992px)'
      })
      const isPhone = useMediaQuery({
          query: '(max-width: 768px)'
        })
        const isSmallPhone = useMediaQuery({
            query: '(max-width: 575px)'
          })
    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    380: {
                      slidesPerView: 1.5,
                    },
                    480: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                  }}
                navigation={{
                    prevEl: ".custom_prev_f",
                    nextEl: ".custom_next_f",
                }}
                className="custom-class"
            >
                {products.map((product, i) => (
                    <SwiperSlide key={i}>
                        <div className="product-cart-wrap success-story-card">
                            <div className="product-img-action-wrap">
                                <div className="product-img">
                                    <div className="play-btn">
                                        <Popup
                                                trigger={<div><BiPlayCircle/></div>} 
                                                modal 
                                                position="right center"
                                                >
                                                    {
                                                        (close)=>(
                                                            <ReactPlayer className="player" url={"https://www.youtube.com/watch?v=XVwHLwZrIYk&pp=ygUWZXZlbnQgZGVjb3JhdGlvbiB2aWRlbw%3D%3D"} />
                                                        )
                                                    }
                                            </Popup>
                                    </div>
                                        <a>
                                            <img
                                                className="default-img"
                                                src={product.images[0].img}
                                                alt=""
                                            />
                                        </a>
                                </div>
                            </div>
                            <div className="product-content-wrap">
                                <h2>
                                    <a>{product.title}</a>
                                </h2>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>          

            <div
                className="slider-arrow slider-arrow-2 carausel-4-columns-arrow"
                
            >
                <span className="slider-btn slider-prev slick-arrow custom_prev_f">
                    <i className="fi-rs-angle-left"></i>
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_f">
                    <i className="fi-rs-angle-right"></i>
                </span>
            </div>
        </>
    );
};

export default FeaturedSlider;
