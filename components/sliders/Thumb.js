import { useState } from "react";
import ReactImageMagnify from 'react-image-magnify';
import Zoom from "react-img-zoom";
import SwiperCore, { Navigation, Thumbs } from "swiper";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ReactPlayer from "react-player";

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
                        {/* <ReactImageMagnify
                        smallImage={{
                            src: item.thumb,
                            width: 300,
                            height: 300,
                        }}
                        largeImage={{
                            src: 'https://github.com/ethanselzer/react-image-magnify/blob/master/example/src/images/wristwatch_1200.jpg?raw=true',
                            width: 1200,
                            height: 1200,
                        }}
                        enlargedImagePosition="over"
                        enlargedImageWidth={1200}
                        enlargedImageHeight={1800}
                        enlargedImageContainerDimensions={{
                            width: '100%',
                            height: '100%',
                        }}
                        /> */}
                        {
                            item.type=="image"?
                            <div className="magnify-image">
                                <Zoom
                                    zoomPosition="original"
                                    img={item.thumb}
                                    zoomScale={2.5}
                                    width={400}
                                    height={400}
                                    ransitionTime={0.5}
                                />
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
