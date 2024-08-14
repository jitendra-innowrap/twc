import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
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
        <div className="bg-variant-light py-5 event-collection-thumb">
            <div className="container">
                <div className="head d-flex justify-content-between align-items-end mb-50">
                                    <div className="left">
                                        <p>Book Everything You Need for your events</p>
                                        <h3 className="section-title title-rightline">
                                            Events Collections
                                        </h3>
                                    </div>
                                    <div className="right">
                                        <button className="btn title-btn"><a target="_blank" style={{color:"#fff"}} href={`https://wa.me/+919892745795/?text=Hi i'm interested in Event Booking.
                                                            `}>Consult Event Expert</a></button>
                                    </div>
                                </div>
                <Swiper
                        spaceBetween={10}
                        // thumbs={{ swiper: thumbsSwiper }}
                        onSwiper={setMainSwiper}
                        loop
                        autoplay={{
                            delay: 2000, // 4 seconds
                            disableOnInteraction: false, // Continue autoplay after interactions
                        }}
                        navigation={{
                            prevEl: ".custom_prev_ct2",
                            nextEl: ".custom_next_ct2",
                        }}
                        pagination={{
                            clickable: true, // Allows clicking on dots to navigate
                        }}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper2"
                    >
                    <SwiperSlide>
                        <div className="collection-thumb  bg-white p-5">
                            <div className="collection_thumb_left">
                                <p>Say "I do" in paradise with our destination wedding planning services. We take care of every detail, from selecting the perfect location to coordinating travel arrangements for you and your guests. Experience the magic of a wedding in a stunning setting, where every moment is tailored to your vision and style. Our team of destination wedding experts will guide you through the process, ensuring a seamless and stress-free experience from start to finish. Enjoy the beauty of your chosen location while we handle the logistics, allowing you to fully immerse yourself in the moment.</p>
                                <h5>Destination Weddings</h5>
                            </div>
                            <div className="collection_thumb_right">
                                <img
                                //  src={item.collection_image}
                                    src="/assets/imgs/banner/event-thumb-5.jpg"
                                    // alt={item.title}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                        <SwiperSlide>
                            <div className="collection-thumb  bg-white p-5">
                                <div className="collection_thumb_left">
                                    <p>Celebrate your love with a perfectly planned engagement party that sets the tone for your journey ahead. Our expert team specializes in creating enchanting atmospheres, from intimate gatherings to grand celebrations. With personalized decor and thoughtful touches, we ensure your engagement is as unforgettable as the love it celebrates.Choose from a variety of themes and styles to match your personality, and let us handle the details while you focus on making memories with your loved ones.</p>
                                    <h5>Engagement <br /> Bliss</h5>
                                </div>
                                <div className="collection_thumb_right">
                                    <img
                                    //  src={item.collection_image}
                                    src="/assets/imgs/banner/event-thumb-6.jpg"
                                        // alt={item.title}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="collection-thumb  bg-white p-5">
                                <div className="collection_thumb_left">
                                    <p>Make your birthday celebration unforgettable with our creative party decor and planning services. Whether it’s a milestone birthday or a fun gathering with friends, we bring your vision to life with vibrant themes, personalized decorations, and engaging activities. Celebrate in style and create cherished memories that last a lifetime! Our team will work closely with you to understand your preferences and create a unique and memorable event that reflects your personality. From custom-made decorations to interactive entertainment, we ensure every detail is carefully curated to make your birthday truly special.</p>
                                    <h5>Birthday Bash Extravaganza</h5>
                                </div>
                                <div className="collection_thumb_right">
                                    <img
                                    //  src={item.collection_image}
                                    src="/assets/imgs/banner/event-thumb-7.jpg"
                                        // alt={item.title}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="collection-thumb  bg-white p-5">
                                <div className="collection_thumb_left">
                                    <p>From corporate events to private parties, our event organizing services ensure a flawless experience from start to finish. We handle everything from venue selection and catering to entertainment and decor, allowing you to focus on enjoying the moment. Trust us to bring your vision to life and create an event that leaves a lasting impression. Our team of event experts will guide you through the planning process, offering creative ideas and practical solutions to make your event a success. With our attention to detail and commitment to excellence, you can relax and enjoy the event, knowing that every aspect is taken care of. These descriptions aim to provide more information about the services, highlight the expertise of the team, and emphasize the personalized and memorable experiences.</p>
                                    <h5>Seamless Event Organizing</h5>
                                </div>
                                <div className="collection_thumb_right">
                                    <img
                                    //  src={item.collection_image}
                                    src="/assets/imgs/banner/event-thumb-8.jpg"
                                        // alt={item.title}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
            </div>
            <div className="d-flex justify-content-center">
            <div
                    className="slider-arrow slider-arrow-2 carausel-6-columns-arrow"
                    id="carausel-6-columns-arrows"
                >
                    <span className="slider-btn slider-prev slick-arrow custom_prev_ct2">
                        <i className="fi-rs-angle-left"></i>
                    </span>
                    <span className="slider-btn slider-next slick-arrow custom_next_ct2">
                        <i className="fi-rs-angle-right"></i>
                    </span>
                </div>
            </div>
        </div>
            
        <div className="container my-5 mb-0">
            <div className="collection-slider-container position-relative">
            <Swiper
                    // slidesPerView={isSmallPhone?2.2:isPhone?3.2:isTab?4:5}
                    slidesPerView="auto"
                    spaceBetween={15}
                    navigation={{
                        prevEl: ".custom_prev_ct1",
                        nextEl: ".custom_next_ct1",
                    }}
                    pagination={{
                        clickable: true, // Allows clicking on dots to navigate
                    }}
                    autoplay={{
                        delay: 2000, // 4 seconds
                        disableOnInteraction: false, // Continue autoplay after interactions
                    }}
                    modules={[Pagination, Autoplay]}
                    watchSlidesProgress={true}
                    className="custom-class"
                    onSwiper={setThumbsSwiper}
                >
                {data?.map((item, i) => (
                    <SwiperSlide key={item.collection_mapping_id} className="w-auto">
                                <Link href={`/collection/${item.collection_handle}`}>
                        <div className="card-1">
                            <figure className=" img-hover-scale overflow-hidden">
                                    <a>
                                        <img
                                            src={item.collection_image}
                                            //  src="/assets/imgs/theme/collection-thumb-img.png"
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
            </div>
        </div>
        </>
    );
};

export default CategoryThumbSlider;
