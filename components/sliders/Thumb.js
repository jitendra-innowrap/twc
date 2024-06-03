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
                                <InnerImageZoom src={item.thumb} zoomSrc={item.thumb} />
                            </div>
                        :
                        <Popup trigger={<img src={item.thumb} alt="evara"/>} modal position="right center">
                            <ReactPlayer className="player" url={item.url} />
                        </Popup>
                        }
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                // loop={false}
                spaceBetween={10}
                slidesPerView={4}
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
        </div>
    );
};

export default ThumbSlider;
