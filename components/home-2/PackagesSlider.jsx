import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";

SwiperCore.use([Navigation]);
let constants = [
    "/assets/imgs/home-page/package1.png",
    "/assets/imgs/home-page/package2.png",
    "/assets/imgs/home-page/package3.png",
    "/assets/imgs/home-page/package1.png",
    "/assets/imgs/home-page/package2.png",
    "/assets/imgs/home-page/package3.png",
]
const PackagesSlider = ({data}) => {
    const isDesktop = useMediaQuery({
        query: '(max-width: 1400px)'
    })
    const isLaptop = useMediaQuery({
        query: '(max-width: 1200px)'
    })
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
                slidesPerView={
                    isSmallPhone? 1 :
                    isPhone? 1.5 :
                    isTab? 2 :
                    isLaptop? 3 :
                    3
                }
                spaceBetween={isPhone?15:25}
                loop
                autoplay={{
                    delay: 3000, // 4 seconds
                    disableOnInteraction: false, // Continue autoplay after interactions
                }}
                navigation={{
                    prevEl: ".custom_prev_ct13",
                    nextEl: ".custom_next_ct13",
                }}
                // pagination={{
                //     clickable: true, // Allows clicking on dots to navigate
                // }}
                // onSwiper={(swiper) => {
                //     const updatePagination = () => {
                //         const perView = swiper.slidesPerViewDynamic();
                //         const totalSlides = swiper.slides.length;
                //         const paginationLength = Math.ceil(totalSlides / perView);
    
                //         // Update the pagination to match the current slidesPerView
                //         swiper.pagination.bullets.forEach((bullet, index) => {
                //             if (index <= 2) {
                //                 bullet.style.display = 'block';
                //             } else {
                //                 bullet.style.display = 'none';
                //             }
                //         });
                //     };
    
                //     swiper.on('resize', updatePagination);
                //     updatePagination(); // Initial pagination update
                // }}
                modules={[Pagination, Autoplay]}
                className="custom-class rental-collection-swiper-slider"
            >
            {data?.map((item, i) => (
                 <SwiperSlide key={item?.collection_mapping_id} className="mb-35">
                            <Link draggable='false' href={`/collection/${item?.collection_handle}`}>
                     <div className="card-1 cursor_pointer">
                         <figure className=" img-hover-scale overflow-hidden">
                                 <a draggable='false' className="w-100">
                                     <img
                                        className="w-100"
                                        draggable='false'
                                         src={item?.collection_image}
                                        //  src={constants[i]}
                                         alt={item?.title}
                                     />
                                 </a>
                         </figure>
                         {/* <h5>
                         {item?.title}
                         </h5> */}
                     </div>
                             </Link>
                 </SwiperSlide>
             ))}
            </Swiper>

            {/* <div
                className="slider-arrow slider-arrow-2 carausel-6-columns-arrow"
                id="carausel-6-columns-arrows"
            >
                <span className="slider-btn slider-prev slick-arrow custom_prev_ct13" style={{height:'75%'}}>
                    <IoArrowBackCircleOutline fontSize={28} />
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_ct13" style={{height:'75%'}}>
                    <IoArrowForwardCircleOutline fontSize={28} />
                </span>
            </div> */}
        </>
    );
};

export default PackagesSlider;
