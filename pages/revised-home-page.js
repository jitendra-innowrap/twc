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
import ScrollToTop from "react-scroll-to-top";
import HeroBanner2 from "../components/home-2/HeroBanner2";
import RentalSlider from "../components/home-2/RendalSlider";

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
                <section className="home-banner section-padding position-relative pb-0">
                    <img src="/assets/imgs/banner/home-banner.png" alt="" style={{width:'100%', height:'auto', cursor:'pointer'}} />
                </section>

<section className="popular-categories section-padding mt-md-3 mb-md-4">
    <div className="container wow fadeIn animated position-relative">
        <div className="section-head d-flex justify-content-between">
            <h3 className="section-title text-center mb-20 title-underline">
            Rental
            </h3>
            <Link href={'/collection/suit'}>
                <button className="btn title-btn">
                    <span className="mr-5">View All</span> <BsArrowRight fontSize={22}/>
                </button>
            </Link>
        </div>
        <div className="carausel-6-columns-cover">
            <div
                className=""
                id="carausel-6-columns"
            >
                <RentalSlider data={data?.browse_events_category} />
            </div>
        </div>
    </div>
</section>

<section className="popular-categories section-padding mt-md-3 mb-md-4">
    <div className="container wow fadeIn animated position-relative">
        <div className="section-head d-flex justify-content-between">
            <h3 className="section-title text-center mb-20 title-underline">
            Packages
            </h3>
            <Link href={'/collection/suit'}>
                <button className="btn title-btn">
                    <span className="mr-5">View All</span> <BsArrowRight fontSize={22}/>
                </button>
            </Link>
        </div>
        <div className="carausel-6-columns-cover">
            <div
                className=""
                id="carausel-6-columns"
            >
                <RentalSlider data={data?.browse_events_category} />
            </div>
        </div>
    </div>
</section>

<section className="services section-padding">
    <div className="container wow fadeIn animated position-relative">
        <div className="section-head d-flex justify-content-between">
            <h3 className="section-title text-center mb-20 title-underline">
            Services
            </h3>
            <Link href={'/collection/suit'}>
                <button className="btn title-btn">
                    <span className="mr-5">All Categories</span> <BsArrowRight fontSize={22}/>
                </button>
            </Link>
        </div>
        <div className="usp-icons-grid position-relative wow fadeIn animated">
        <div className="usp-card">
            <img
                src={'/assets/imgs/shop/category-thumb-8.jpg'}
                width={160}
                height={120}
                className="image"
                alt="Convenience"
            />
            <div className="usp-value">
            <h5>Sunny Wears</h5>
            <p>Our one-stop-shop approach means you can find everything you need for your event in one place, saving you time and effort.
            </p>
            </div>
        </div>
        <div className="usp-card">
            <img
                src={'/assets/imgs/shop/category-thumb-2.jpg'}
                width={160}
                height={120}
                className="image"
                alt="Variety"
            />
            <div className="usp-value">
            <h5>Variety Collection</h5>
            <p>We offer an extensive range of high-quality items and services to suit various themes, styles, and budgets.
            </p>
            </div>
        </div>
        <div className="usp-card">
            <img
                src={'/assets/imgs/shop/category-thumb-3.jpg'}
                width={160}
                height={120}
                className="image"
                alt="Quality Assurance"
            />
            <div className="usp-value">
            <h5>Quality Footwears</h5>
            <p>All our items and service providers are carefully vetted to ensure top-notch quality for your event.
            </p>
            </div>
        </div>
        <div className="usp-card">
            <img
                src={'/assets/imgs/shop/category-thumb-1.jpg'}
                width={160}
                height={120}
                className="image"
                alt="Cost-Effective"
            />
            <div className="usp-value">
            <h5>Casuals</h5>
            <p>Renting allows you to access premium items at a fraction of the cost of buying, helping you create a luxurious event within your budget.
            </p>
            </div>
        </div>
        <div className="usp-card">
            <img
                src={'/assets/imgs/shop/category-thumb-6.jpg'}
                width={160}
                height={120}
                className="image"
                quality={100}
                alt="Sustainability"
            />
            <div className="usp-value">
            <h5>Party Decor</h5>
            <p>By choosing to rent instead of buy, you're making an environmentally friendly choice, reducing waste from single-use party items.
            </p>
            </div>
        </div>
        <div className="usp-card">
            <img
                src={'/assets/imgs/shop/category-thumb-4.jpg'}
                width={160}
                height={120}
                className="image"
                quality={100}
                alt="Customer Support"
            />
            <div className="usp-value">
            <h5>Seasonals</h5>
            <p> Our dedicated team is ready to assist you at every step, ensuring a smooth and enjoyable planning process.
            </p>
            </div>
        </div>
    </div>
    </div>
</section>

 

<section className="section-padding usp-section">

<div className="container pt-md-5 pb-25">
    <div className="head d-flex justify-content-between align-items-start mb-50">
        <div className="left">
            <h3 className="section-title title-rightline">
            Why Choose The Party Cafe?
            </h3>
            <p className="fw-bold mt-20 usp-desc">India's go-to destination for all things celebration. From weddings to corporate events, birthdays to festive gatherings, we've got you covered. Our vast 'menu' offers everything from stunning decorations to designer outfits, all available for rent.
            </p>
            <p className="lh-1 mt-3">Browse our menu, and let us serve up the perfect ingredients for your event!
            </p>
        </div>
        <div className="right">
            <button className="btn title-btn"><a target="_blank" style={{color:"#fff"}} href={`https://wa.me/+919892745795/?text=Hi i'm interested in Event Booking.
                                `}>Consult Our Expert</a></button>
        </div>
    </div>
    <div className="why-to-choose position-relative wow fadeIn animated">
        <div className="usp-card">
            <img
                src={'/assets/imgs/usp/usp-5.svg'}
                width={160}
                height={120}
                className="image"
                alt="Convenience"
            />
            <div className="usp-value">
            <h5>Convenience</h5>
            <p>Our one-stop-shop approach means you can find everything you need for your event in one place, saving you time and effort.
            </p>
            </div>
        </div>
        <div className="usp-card">
            <img
                src={'/assets/imgs/usp/usp-2.svg'}
                width={160}
                height={120}
                className="image"
                alt="Variety"
            />
            <div className="usp-value">
            <h5>Variety</h5>
            <p>We offer an extensive range of high-quality items and services to suit various themes, styles, and budgets.
            </p>
            </div>
        </div>
        <div className="usp-card">
            <img
                src={'/assets/imgs/usp/usp-3.svg'}
                width={160}
                height={120}
                className="image"
                alt="Quality Assurance"
            />
            <div className="usp-value">
            <h5>Quality Assurance</h5>
            <p>All our items and service providers are carefully vetted to ensure top-notch quality for your event.
            </p>
            </div>
        </div>
        {/* <div className="usp-card">
            <img
                src={'/assets/imgs/usp/usp-1.svg'}
                width={160}
                height={120}
                className="image"
                alt="Cost-Effective"
            />
            <div className="usp-value">
            <h5>Cost-Effective</h5>
            <p>Renting allows you to access premium items at a fraction of the cost of buying, helping you create a luxurious event within your budget.
            </p>
            </div>
        </div>
        <div className="usp-card">
            <img
                src={'/assets/imgs/usp/usp-6.svg'}
                width={160}
                height={120}
                className="image"
                quality={100}
                alt="Sustainability"
            />
            <div className="usp-value">
            <h5>Sustainability</h5>
            <p>By choosing to rent instead of buy, you're making an environmentally friendly choice, reducing waste from single-use party items.
            </p>
            </div>
        </div> */}
        <div className="usp-card">
            <img
                src={'/assets/imgs/usp/usp-4.svg'}
                width={160}
                height={120}
                className="image"
                quality={100}
                alt="Customer Support"
            />
            <div className="usp-value">
            <h5>Customer Support</h5>
            <p> Our dedicated team is ready to assist you at every step, ensuring a smooth and enjoyable planning process.
            </p>
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
                                        <Link href={"/blogs/the-biggest-wedding-trends-for-2025"}>
                                            <a><img src="/assets/imgs/blog/blog1.png" alt="" /></a>
                                        </Link>
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
                                            <Link href="/blogs/the-biggest-wedding-trends-for-2025">
                                                <a className="post-link" >Read more <BsArrowRight /></a>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div class="col-lg-4 mb-4">
                                <article class="wow fadeIn animated hover-up">
                                    <div class="post-thumb img-hover-scale">
                                        <Link href="/blogs/the-ultimate-guide-to-choosing-the-perfect-wedding-planner-in-lucknow">
                                            <a><img src="/assets/imgs/blog/blog2.png" alt="" /></a>
                                        </Link>
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
                                            <Link href="/blogs/the-ultimate-guide-to-choosing-the-perfect-wedding-planner-in-lucknow">
                                                <a className="post-link" >Read more <BsArrowRight /></a>
                                            </Link>
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
                                        <h3 class="post-title mb-15">
                                            <a href="/media-post"></a>
                                            <Link href={"/blogs/reasons-why-should-brides-rent-their-lehengas-and-not-buy-them"}>
                                                <a>Reasons Why Should Brides RENT Their Lehengas & Not Buy Them</a>
                                            </Link>
                                        </h3>
                                        <p class="post-exerpt mb-30">All we know is that brides have their dream of having a beautiful lehenga at their wedding. Most brides prefer designer lehengas for their wedding. Many brides spend a lot.</p>
                                        <div class="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                            <div><span class="post-on"><i class="fi-rs-clock"></i> 25 April 2021</span><span class="hit-count has-dot">126k Views</span></div>
                                            <Link href="/blogs/reasons-why-should-brides-rent-their-lehengas-and-not-buy-them">
                                                <a className="post-link" >Read more <BsArrowRight /></a>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
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
