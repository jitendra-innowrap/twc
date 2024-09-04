import Image from "next/image";
import FeatchTab2 from "../components/ecommerce/fetchTabSlider";
import IntroPopup from "./../components/elements/IntroPopup";
import Layout from "./../components/layout/Layout";
import BrandSlider from "./../components/sliders/Brand";
import Intro1 from "./../components/sliders/Intro1";
import { getHomeDetails } from "../util/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import RentalCategory from "../components/ecommerce/Home/RentalCategory";
import RentalCollection from "../components/ecommerce/Home/RentalCollection";
import Preloader from "../components/elements/Preloader";
import CategoryThumbSlider from "../components/sliders/CategoryThumbSlider";
import { BsArrowRight } from "react-icons/bs";
import ScrollToTop from "react-scroll-to-top";
import HeroBanner2 from "../components/home-2/HeroBanner2";
import CategorySlider from "../components/home-2/CategorySlider";
import RentalsSlider from "../components/home-2/RentalsSlider";
import PackagesSlider from "../components/home-2/PackagesSlider";
import ServicesSlider from "../components/home-2/ServicesSlider";

export default function Home() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetchHomeDetails();
    }, [])

    const fetchHomeDetails = async () => {
        try {
            const res = await getHomeDetails();
            if (res?.code === 1) {
                setData(res.home_data_list);
            } else {
                console.error('Error !', res?.msg)
            }
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <>
            {data ?
                <Layout classList="revised" noBreadcrumb="d-none" headerStyle="header-style-1">
                    <>
                        <ScrollToTop smooth />
                        <section className="home-slider position-relative">
                            <HeroBanner2 data={data.slider} />
                        </section>
                        {/* <section className="home-banner section-padding position-relative pb-0">
                            <img src="/assets/imgs/banner/home-banner.png" alt="" style={{ width: '100%', height: 'auto', cursor: 'pointer' }} />
                        </section> */}

                        <section className="popular-categories section-padding">
                            <div className="container wow fadeIn animated position-relative">
                                <div className="section-head d-flex justify-content-ceter w-100">
                                    <h1 className="sr-only">discover</h1>
                                    <h2 className="sr-only">top categories</h2>
                                    <img src="/assets/imgs/home-page/catrgory-head.png" className="heading_image"/>
                                </div>
                                <div className="carausel-6-columns-cover">
                                    <div
                                        className=""
                                        id="carausel-6-columns"
                                    >
                                        <CategorySlider data={data?.browse_events_category} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="popular-categories section-padding">
                            <div className="container wow fadeIn animated position-relative">
                                <div className="section-head d-flex justify-content-ceter w-100">
                                    <h1 className="sr-only">explore</h1>
                                    <h2 className="sr-only">quality rentals</h2>
                                    <img src="/assets/imgs/home-page/rentals-head.png" className="heading_image"/>
                                </div>
                                <div className="carausel-6-columns-cover">
                                    <div
                                        className="position-relative slider-arrow-out"
                                        id="carausel-6-columns"
                                    >
                                        <RentalsSlider data={data?.browse_events_category} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="popular-categories section-padding">
                            <div className="container wow fadeIn animated position-relative">
                                <div className="section-head d-flex justify-content-ceter w-100">
                                    <h1 className="sr-only">most trending</h1>
                                    <h2 className="sr-only">packages</h2>
                                    <img src="/assets/imgs/home-page/packages-head.png" className="heading_image"/>
                                </div>
                                <div className="carausel-6-columns-cover">
                                    <div
                                        className="position-relative slider-arrow-out"
                                        id="carausel-6-columns"
                                    >
                                        <PackagesSlider data={data?.browse_events_category} />
                                    </div>
                                </div>
                                <div className="w-100 d-flex justify-content-center mb-30">
                                    <button className="btn consult-btn">Cunsult an Expert <BsArrowRight/></button>
                                </div>
                            </div>
                        </section>

                        <section className="popular-categories section-padding">
                            <div className="container wow fadeIn animated position-relative">
                                <div className="section-head d-flex justify-content-ceter w-100">
                                    <h1 className="sr-only">vendors</h1>
                                    <h2 className="sr-only">peoples & services</h2>
                                    <img src="/assets/imgs/home-page/services-head.png" className="heading_image"/>
                                </div>
                                <div className="carausel-6-columns-cover">
                                    <div
                                        className="position-relative slider-arrow-out"
                                        id="carausel-6-columns"
                                    >
                                        <ServicesSlider data={data?.browse_events_category} />
                                    </div>
                                </div>
                                <div className="w-100 d-flex justify-content-center mb-30">
                                    <button className="btn consult-btn">Cunsult an Expert <BsArrowRight/></button>
                                </div>
                            </div>
                        </section>



                    </>
                </Layout>
                :
                <Preloader />
            }
        </>
    );
}
