import { useState } from "react";
import SwiperCore, { Navigation, Thumbs } from "swiper";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import Popup from 'reactjs-popup';
import ReactPlayer from "react-player";
import 'reactjs-popup/dist/index.css';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';

SwiperCore.use([Navigation, Thumbs]);

const ThumbSlider = ({ product }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const handleNavigation = (direction) => {
        if (thumbsSwiper) {
            if (direction === 'up') {
                thumbsSwiper.slideNext();
            } else if (direction === 'down') {
                thumbsSwiper.slidePrev();
            }
        }
    };
    return (
        <div className="product-detail-gallary">
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                //loop={false}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                className="mySwiper2"
            >
                {product.gallery.map((item,i) => (
                    <SwiperSlide key={i}>
                        {
                            item.type=="image"?
                            <div className="magnify-image">
                                <InnerImageZoom zoomType="hover" hideHint={true} src={item.thumb} zoomSrc={item.thumb} />
                            </div>
                        :
                        <Popup trigger={<img src={item.thumb} alt="evara"/>} modal position="right center">
                            <ReactPlayer className="player" url={item.url} />
                        </Popup>
                        }
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="small-gallary">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    // loop={false}
                    spaceBetween={10}
                    direction="vertical"
                    slidesPerView={3}
                    freeMode={true}
                    watchSlidesProgress={true}
                    className="mySwiper"
                >
                    {product.gallery.map((item, i) => (
                        <SwiperSlide key={i}>
                            <img src={item.thumb} alt="evara" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="navigation">
                    <button onClick={() => handleNavigation('up')}><i className="fi-rs-angle-up"></i></button>
                    <button onClick={() => handleNavigation('down')}><i className="fi-rs-angle-down"></i></button>
                </div>
            </div>
        </div>
    );
};

export default ThumbSlider;
