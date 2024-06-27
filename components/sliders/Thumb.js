import { useEffect, useState } from "react";
import SwiperCore, { Navigation, Thumbs } from "swiper";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import Popup from 'reactjs-popup';
import ReactPlayer from "react-player";
import 'reactjs-popup/dist/index.css';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import { getYouTubeThumbnail } from "../../util/util";
import { BiPlayCircle } from "react-icons/bi";
import { useRouter } from "next/router";

SwiperCore.use([Navigation, Thumbs]);

const ThumbSlider = ({ product }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);

    useEffect(() => {
        if (mainSwiper) {
            mainSwiper.slideTo(0);
        }
    }, [product, mainSwiper]);

    return (
        <div className="product-detail-gallary">
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                onSwiper={setMainSwiper}
                className="mySwiper2"
            >
                {product?.map((item, i) => (
                    <SwiperSlide key={i}>
                        {item.file_type == "1" ?
                            <div className="magnify-image">
                                <InnerImageZoom zoomType="hover" hideHint={true} src={item.file} zoomSrc={item.file} />
                            </div>
                            :
                            <Popup trigger={
                                <div className="gallary-video">
                                    <img src={getYouTubeThumbnail(item?.file)} style={{ width: '100%', height: '100%', objectFit: 'cover', }} alt="thumbnail-image" />
                                    <BiPlayCircle fontSize={52} color="#fff" />
                                </div>
                            } modal position="right center">
                                <ReactPlayer className="player" url={item.file} />
                            </Popup>
                        }
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="small-gallary">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    direction="vertical"
                    slidesPerView={3}
                    freeMode={true}
                    watchSlidesProgress={true}
                    navigation={{
                        prevEl: ".miniGallary_prev_n",
                        nextEl: ".miniGallary_next_n",
                    }}
                    className="mySwiper"
                >
                    {product?.map((item, i) => (
                        <SwiperSlide key={i}>
                            {item?.file_type == "1" ?
                                <img src={item.file} draggable={false} alt="evara" />
                                :
                                <div className="gallary-video">
                                    <img src={getYouTubeThumbnail(item?.file)} draggable={false} alt="evara" />
                                    <BiPlayCircle fontSize={28} />
                                </div>
                            }
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="navigation">
                    <button className="miniGallary_prev_n"><i className="fi-rs-angle-up"></i></button>
                    <button className="miniGallary_next_n"><i className="fi-rs-angle-down"></i></button>
                </div>
            </div>
        </div>
    );
};

export default ThumbSlider;
