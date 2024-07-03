import Image from "next/image";
import FeatchTab2 from "../components/ecommerce/fetchTabSlider";
import IntroPopup from "./../components/elements/IntroPopup";
import Layout from "./../components/layout/Layout";
import BrandSlider from "./../components/sliders/Brand";
import CategorySlider from "./../components/sliders/Category";
import Intro1 from "./../components/sliders/Intro1";


export default function Home() {
    return (
        <>
            <IntroPopup />

            <Layout noBreadcrumb="d-none" headerStyle="header-style-1">
                <section className="home-slider position-relative pt-50">
                    <Intro1 />
                </section>

                <section className="popular-categories section-padding mt-15 mb-25">
                    <div className="container wow fadeIn animated">
                        <h3 className="section-title text-center mb-20 title-underline">
                            Browse Events Category
                        </h3>
                        <div className="carausel-6-columns-cover position-relative">
                            <div
                                className="carausel-6-columns"
                                id="carausel-6-columns"
                            >
                                <CategorySlider />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-padding mt-15 mb-25">
                    <div className="container wow fadeIn animated">
                        <h3 className="section-title text-center mb-20 title-underline">
                            Browse Rental Category
                        </h3>
                        <div className="container mt-70">
                            <div className="rental-category">
                                <div className="rental-category-card">
                                    <div
                                        className="rental-category-card-img wow fadeIn animated mb-md-4 mb-sm-4 mb-lg-0"
                                    >
                                        <Image
                                            src={'/assets/imgs/banner/For_Her.jpg'}
                                            layout="fill"
                                            alt="rent-for-women"
                                            quality={100}
                                            objectFit="cover"
                                            className="image"
                                        />
                                        <div className="">
                                            {/* <h5>For Her</h5> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="rental-category-card">
                                    <div
                                        className="rental-category-card-img wow fadeIn animated mb-md-4 mb-sm-4 mb-lg-0"
                                    >
                                        <Image
                                            src={'/assets/imgs/banner/For_Him.jpg'}
                                            layout="fill"
                                            className="image"
                                            alt="rent-for-women"
                                            quality={100}
                                            objectFit="cover"
                                        />
                                        <div className="deal-top">
                                            {/* <h5>For him</h5> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-padding mt-15 mb-25">
                    <div className="container wow fadeIn animated">
                        <h3 className="section-title text-center mb-20 title-underline">
                            Browse Rental Collections
                        </h3>
                        <div className="rental-banner mt-70">
                            <div
                                className="rental-category-card-full image-press wow fadeIn animated mb-md-4 mb-sm-4 mb-lg-0"
                            >
                                <img src="/assets/imgs/banner/rental-banner-2.jpg" alt="" />
                            </div>
                        </div>
                        <div className="rental-collection-grid mt-20">
                            <div
                                className="rental-collection-card-img wow fadeIn image-press animated mb-md-4 mb-sm-4 mb-lg-0"
                            >
                                <img src="/assets/imgs/banner/rental-collection-1.jpeg" alt="" />
                            </div>
                            <div
                                className="rental-collection-card-img wow fadeIn image-press animated mb-md-4 mb-sm-4 mb-lg-0"
                            >
                                <img src="/assets/imgs/banner/rental-collection-2.jpeg" alt="" />
                            </div>
                            <div
                                className="rental-collection-card-img wow fadeIn image-press animated mb-md-4 mb-sm-4 mb-lg-0"
                            >
                                <img src="/assets/imgs/banner/rental-collection-3.jpeg" alt="" />
                            </div>
                            <div
                                className="rental-collection-card-img wow fadeIn image-press animated mb-md-4 mb-sm-4 mb-lg-0"
                            >
                                <img src="/assets/imgs/banner/rental-collection-4.jpeg" alt="" />
                            </div>
                            <div
                                className="rental-collection-card-img wow fadeIn image-press animated mb-md-4 mb-sm-4 mb-lg-0"
                            >
                                <img src="/assets/imgs/banner/rental-collection-5.jpeg" alt="" />
                            </div>
                            <div
                                className="rental-collection-card-img wow fadeIn image-press animated mb-md-4 mb-sm-4 mb-lg-0"
                            >
                                <img src="/assets/imgs/banner/rental-collection-6.jpeg" alt="" />
                            </div>
                        </div>
                    </div>
                </section>



                <section className="section-padding events-section">
                    <div className="container wow fadeIn animated">
                        <div className="head d-flex justify-content-between align-items-end mb-50">
                            <div className="left">
                                <p>Book Everything You Need for your events</p>
                                <h3 className="section-title title-rightline">
                                    Events Collections
                                </h3>
                            </div>
                            <div className="right">
                                <button className="btn title-btn">Consult event expert</button>
                            </div>
                        </div>
                        <div className="events-collection-grid">
                            <div
                                className="events-collection-card wow fadeIn animated mb-md-4 mb-sm-4 mb-lg-0"
                            >
                                <div className="image">
                                    <Image
                                        src={'/assets/imgs/banner/events-collection-1.jpg'}
                                        layout="fill"
                                        alt="rent-for-women"
                                    />
                                </div>
                                <div className="">
                                    <h5 className="text-center mt-20">Catering & Entertainment</h5>
                                </div>
                            </div>
                            <div
                                className="events-collection-card wow fadeIn animated mb-md-4 mb-sm-4 mb-lg-0"
                            >
                                <div className="image">
                                    <Image
                                        src={'/assets/imgs/banner/events-collection-2.jpg'}
                                        layout="fill"
                                        alt="rent-for-women"
                                    />
                                </div>
                                <div className="">
                                    <h5 className="text-center mt-20">Equipments & Furniture</h5>
                                </div>
                            </div>
                            <div
                                className="events-collection-card wow fadeIn animated mb-md-4 mb-sm-4 mb-lg-0"
                            >
                                <div className="image">
                                    <Image
                                        src={'/assets/imgs/banner/events-collection-3.jpg'}
                                        layout="fill"
                                        alt="rent-for-women"
                                    />
                                </div>
                                <div className="">
                                    <h5 className="text-center mt-20">Decoration & Setup</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-padding">
                    <div className="container">
                        <div className="head d-flex justify-content-center align-items-end mb-50">
                            <div className="left">
                                <h3 className="section-title">
                                    We love our clients
                                </h3>
                                <p className="title-underline text-center">And they love us too!</p>
                            </div>
                        </div>
                        <div className="client-icons-grid position-relative wow fadeIn animated">
                            <BrandSlider />
                        </div>
                    </div>
                </section>

                <section className="section-padding success-stories-section">

                    <div className="container pt-25 pb-25">
                        <div className="head d-flex justify-content-between align-items-end mb-50">
                            <div className="left">
                                <p>The inspiring tales of our exceptional achievements.</p>
                                <h3 className="section-title title-rightline">
                                    Success Stories
                                </h3>
                            </div>
                        </div>
                        <FeatchTab2 />
                    </div>
                </section>

                <section className="section-padding usp-section">

                    <div className="container pt-25 pb-25">
                        <div className="head d-flex justify-content-between align-items-start mb-50">
                            <div className="left">
                                <h3 className="section-title title-rightline">
                                Why Choose Party House
                                </h3>
                                <p className="fw-bold mt-20">Find everything you need to make your events a success!</p>
                                <p className="lh-1">Whether it’s event equipment rental or corporate event supplies,</p>
                                <p className="lh-1">enjoy end-to-end solutions from ideas all the way to execution</p>
                            </div>
                            <div className="right">
                                <button className="btn title-btn">Consult event expert</button>
                            </div>
                        </div>
                        <div className="usp-icons-grid position-relative wow fadeIn animated">
                            <div className="usp-card">
                                <img
                                    src={'/assets/imgs/usp/usp-1.svg'}
                                    width={160}
                                    height={120}
                                    className="image"
                                    alt="best price guanrantee"
                                />
                                <h5>best price guanrantee</h5>
                            </div>
                            <div className="usp-card">
                                <img
                                    src={'/assets/imgs/usp/usp-2.svg'}
                                    width={160}
                                    height={120}
                                    className="image"
                                    alt="Unlimited Supplies"
                                />
                                <h5>Unlimited Supplies</h5>
                            </div>
                            <div className="usp-card">
                                <img
                                    src={'/assets/imgs/usp/usp-3.svg'}
                                    width={160}
                                    height={120}
                                    className="image"
                                    alt="Trusted Quality partners"
                                />
                                <h5>Trusted Quality partners</h5>
                            </div>
                            <div className="usp-card">
                                <img
                                    src={'/assets/imgs/usp/usp-4.svg'}
                                    width={160}
                                    height={120}
                                    className="image"
                                    alt="Fast Customer Service"
                                />
                                <h5>Fast Customer Service</h5>
                            </div>
                            <div className="usp-card">
                                <img
                                    src={'/assets/imgs/usp/usp-5.svg'}
                                    width={160}
                                    height={120}
                                    className="image"
                                    quality={100}
                                    alt="Quick Delivery"
                                />
                                <h5>Quick Delivery</h5>
                            </div>
                        </div>
                    </div>
                </section>

            </Layout>
        </>
    );
}
