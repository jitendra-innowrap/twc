import Image from "next/image";
import FeatchTab2 from "../components/ecommerce/fetchTabSlider";
import IntroPopup from "./../components/elements/IntroPopup";
import Layout from "./../components/layout/Layout";
import BrandSlider from "./../components/sliders/Brand";
import CategorySlider from "./../components/sliders/Category";
import Intro1 from "./../components/sliders/Intro1";
import { getHomeDetails } from "../util/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import RentalCategory from "../components/ecommerce/Home/RentalCategory";
import RentalCollection from "../components/ecommerce/Home/RentalCollection";
import Preloader from "../components/elements/Preloader";
import CategoryThumbSlider from "../components/sliders/CategoryThumbSlider";
import { BsArrowRight } from "react-icons/bs";


export default function Home() {
    const [data, setData] = useState(null);
    useEffect(() => {
      fetchHomeDetails();
    }, [])

    const fetchHomeDetails = async ()=>{
        try {
            const res  = await getHomeDetails();
            if(res?.code===1){
                setData(res.home_data_list);
            }else{
                console.error('Error !',res?.msg)
            }
            console.log(res.home_data_list)
        } catch (error) {
            console.error(error)
        }

    }
    
    return (
        <>
            {/* <IntroPopup /> */}

                {data ? 
            <Layout noBreadcrumb="d-none" headerStyle="header-style-1">
                <>
                <section className="home-slider position-relative">
                    <Intro1 data={data.slider} />
                </section>

                <section className="popular-categories section-padding mt-md-3 mb-md-4">
                    <div className="container wow fadeIn animated position-relative">
                        <h3 className="section-title text-center mb-20 title-underline">
                        Men's Rental Wear
                        </h3>
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

                {/* <section className="section-padding mt-md-3 mb-md-4">
                    <RentalCategory forHim={data?.rental_2?.[0]} forHer={data?.rental_1?.[0]} />
                </section> */}

                <section className="section-padding mt-md-3 mb-md-4">
                    <RentalCollection data={data} />
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
                                <button className="btn title-btn"><a target="_blank" style={{color:"#fff"}} href={`https://wa.me/+919892745795/?text=Hi i'm interested in Event Booking.
                                                    `}>Consult Event Expert</a></button>
                            </div>
                        </div>
                        <div className="events-collection-slider">
                            <CategoryThumbSlider data={data?.events_collections} />
                            {/* {
                                data?.events_collections.map((event,i)=>(
                                <Link href={`/collection/${event.collection_handle}`} key={event.collection_mapping_id}>
                                    <div className="events-collection-card wow fadeIn animated mb-md-4 mb-sm-4 mb-lg-0">
                                    <div className="image">
                                        <Image
                                            src={event?.collection_image}
                                            layout="fill"
                                            alt="rent-for-women"
                                            />
                                    </div>
                                    <div className="">
                                        <h5 className="text-center mt-20">{event.title}</h5>
                                    </div>
                                    </div>
                                </Link>

                                ))
                            } */}
                        </div>
                    </div>
                </section>

                {/* <section className="section-padding pt-50">
                    <div className="container">
                        <div className="head d-flex justify-content-center align-items-end mb-md-50">
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
                </section> */}

                {/* <section className="section-padding success-stories-section">

                    <div className="container pt-md-25 pb-md-5">
                        <div className="head d-flex justify-content-between align-items-end mb-50">
                            <div className="left">
                                <p>The inspiring tales of our exceptional achievements.</p>
                                <h3 className="section-title title-rightline">
                                    Success Stories
                                </h3>
                            </div>
                        </div>
                        <FeatchTab2 data={data?.success_story} />
                    </div>
                </section> */}
                <section className="section-padding usp-section packages-section">
                    <div className="container">
                        <h3 className="section-title text-center mb-20 title-underline">
                            Browse Packages
                        </h3>
                        <div className="row packages-grid-layout">
                            <div className="column-1 col-12 col-md-6 h-md-100">
                                <div className=" block block-1">
                                    <Image 
                                        src="/assets/imgs/shop/wedding venue-3.jpg"
                                        layout="fill"
                                        quality={100}
                                        className="position-absolute"
                                    />
                                </div>
                            </div>
                            <div className="column-2 col-6 col-md-3 h-md-100">
                                <div className=" block block-2">
                                    <Image 
                                        src="/assets/imgs/shop/wedding stage decor-1.jpg"
                                        layout="fill"
                                        quality={100}
                                        className="position-absolute"
                                    />
                                </div>
                                <div className=" block block-3">
                                    <Image 
                                        src="/assets/imgs/shop/wedding stage decor-3.jpg"
                                        layout="fill"
                                        quality={100}
                                        className="position-absolute"
                                    />
                                </div>
                            </div>
                            <div className="column-3 col-6 col-md-3 h-md-100">
                                <div className=" block block-4">
                                    <Image 
                                        src="/assets/imgs/shop/wedding venue-1.jpg"
                                        layout="fill"
                                        objectFit="cover"
                                        quality={100}
                                        objectPosition="center"
                                        className="position-absolute"
                                    />
                                </div>
                                <div className=" block block-5">
                                    <Image 
                                        src="/assets/imgs/shop/wedding venue-2.jpg"
                                        layout="fill"
                                        quality={100}
                                        className="position-absolute"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-padding usp-section blog-section pb-0">

                <div className="container">
                    <div className="head d-flex justify-content-between align-items-start mb-50">
                        <div className="left">
                            <h3 className="section-title title-rightline">
                            Blogs
                            </h3>
                            <p className="fw-bold mt-20">Find everything you need to make your events a success!</p>
                            <p className="lh-1">Whether it’s event equipment rental or corporate event supplies,</p>
                            <p className="lh-1">enjoy end-to-end solutions from ideas all the way to execution</p>
                        </div>
                        <div className="right">
                            <button className="btn title-btn"><a target="_blank" style={{color:"#fff"}} 
                            href={`/blogs`}>View All</a></button>
                        </div>
                    </div>
                    <div class="row loop-grid">
                            <div class="col-lg-4 mb-4">
                                <article class="wow fadeIn animated hover-up">
                                    <div class="post-thumb img-hover-scale">
                                        <a href="/media-post"><img src="/assets/imgs/blog/blog1.png" alt="" /></a>

                                    </div>
                                    <div class="entry-content-2">
                                        <h3 class="post-title mb-15">
                                            <Link href={"/blogs/the-biggest-wedding-trends-for-2025"}>
                                                <a>The Biggest Wedding Trends for 2025</a>
                                            </Link>
                                        </h3>
                                        <p class="post-exerpt mb-30">Planning a wedding in 2025? The wedding landscape is constantly evolving, and next year promises some exciting trends that cater to modern couples' desires for personalization, sustainability, and unique experiences.</p>
                                        <div class="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                            <div><span class="post-on"><i class="fi-rs-clock"></i> 25 April 2021</span><span class="hit-count has-dot">126k Views</span></div>
                                            <Link className="post-link" href="/blogs/the-biggest-wedding-trends-for-2025"><a>Read more <BsArrowRight /></a></Link>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div class="col-lg-4 mb-4">
                                <article class="wow fadeIn animated hover-up">
                                    <div class="post-thumb img-hover-scale">
                                        <a href="/media-post"><img src="/assets/imgs/blog/blog2.png" alt="" /></a>

                                    </div>
                                    <div class="entry-content-2">
                                        <h3 class="post-title mb-15">
                                            <Link href={"/blogs/the-ultimate-guide-to-choosing-the-perfect-wedding-planner-in-lucknow"}>
                                                <a>The Ultimate Guide to Choosing the Perfect Event Planner in Mumbai</a>
                                            </Link>
                                        </h3>
                                        <p class="post-exerpt mb-30">Indians love weddings, celebrated with joy, laughter, and a lot of fun. They are not just the union of two individuals but also a coming together of two families.</p>
                                        <div class="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                            <div><span class="post-on"><i class="fi-rs-clock"></i> 25 April 2021</span><span class="hit-count has-dot">126k Views</span></div>
                                            <Link className="post-link" href="/blogs/the-ultimate-guide-to-choosing-the-perfect-wedding-planner-in-lucknow"><a>Read more <BsArrowRight /></a></Link>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div class="col-lg-4 mb-4">
                                <article class="wow fadeIn animated hover-up">
                                    <div class="post-thumb img-hover-scale">
                                        <Link href="/blogs/reasons-why-should-brides-rent-their-lehengas-and-not-buy-them">
                                            <a><img src="/assets/imgs/blog/blog4.png" alt="" /></a>
                                        </Link>

                                    </div>
                                    <div class="entry-content-2">
                                        <h3 class="post-title mb-15"><a href="/media-post">Reasons Why Should Brides RENT Their Lehengas & Not Buy Them</a></h3>
                                        <p class="post-exerpt mb-30">All we know is that brides have their dream of having a beautiful lehenga at their wedding. Most brides prefer designer lehengas for their wedding. Many brides spend a lot.</p>
                                        <div class="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                            <div><span class="post-on"><i class="fi-rs-clock"></i> 25 April 2021</span><span class="hit-count has-dot">126k Views</span></div>
                                            <Link className="post-link" href="/blogs/reasons-why-should-brides-rent-their-lehengas-and-not-buy-them"><a>Read more <BsArrowRight /></a></Link>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                </div>
                </section>

                <section className="section-padding usp-section">

                    <div className="container pt-md-5 pb-25">
                        <div className="head d-flex justify-content-between align-items-start mb-50">
                            <div className="left">
                                <h3 className="section-title title-rightline">
                                Why Choose The Party Cafe
                                </h3>
                                <p className="fw-bold mt-20">Find everything you need to make your events a success!</p>
                                <p className="lh-1">Whether it’s event equipment rental or corporate event supplies,</p>
                                <p className="lh-1">enjoy end-to-end solutions from ideas all the way to execution</p>
                            </div>
                            <div className="right">
                                <button className="btn title-btn"><a target="_blank" style={{color:"#fff"}} href={`https://wa.me/+919892745795/?text=Hi i'm interested in Event Booking.
                                                    `}>Consult Our Expert</a></button>
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
                </>
                </Layout>
                :
                <Preloader/>
            }
        </>
    );
}
