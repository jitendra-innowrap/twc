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
import ScrollTopSvg from "../components/home-2/ScrollTopSvg";

export default function Home() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetchHomeDetails();
    }, [])

    const fetchHomeDetails = async () => {
        try {
            const res = await getHomeDetails();
            if (res?.code === 1) {
                setData(res?.home_data_list);
            } else {
                console.error('Error !', res?.msg)
            }
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <>
            <Layout classList="revised" noBreadcrumb="d-none" headerStyle="header-style-1">
            {data ?
                    <>
                        <ScrollToTop smooth component={<ScrollTopSvg/>} />
                        <section className="home-slider position-relative">
                            <HeroBanner2 data={data.slider} />
                        </section>
                        {/* <section className="home-banner section-padding position-relative pb-0">
                            <img src="/assets/imgs/banner/home-banner.png" alt="" style={{ width: '100%', height: 'auto', cursor: 'pointer' }} />
                        </section> */}

                        {data?.top_category?.data?.length > 0 && <section className="popular-categories section-padding">
                            <div className="container wow fadeIn animated position-relative">
                            <div className="section-head d-flex flex-column align-items-center w-100">
                                    <div className="heading">
                                        <h2>Discover</h2>
                                    </div>
                                    <h3 className="subheading">{data?.top_category?.group_name}</h3>
                                </div>
                                <div className="carausel-6-columns-cover">
                                    <div
                                        className=""
                                        id="carausel-6-columns"
                                    >
                                        <CategorySlider data={data?.top_category?.data} />
                                    </div>
                                </div>
                            </div>
                        </section>}

                        {data?.quality_rentals?.data?.length > 0 && <section className="popular-categories section-padding">
                            <div className="container wow fadeIn animated position-relative">
                            <div className="section-head d-flex flex-column align-items-center w-100">
                                    <div className="heading">
                                        <h2>Explore</h2>
                                    </div>
                                    <h3 className="subheading">{data?.quality_rentals?.group_name}</h3>
                                </div>
                                <div className="carausel-6-columns-cover">
                                    <div
                                        className="position-relative"
                                        id="carausel-6-columns"
                                    >
                                        <RentalsSlider data={data?.quality_rentals?.data} />
                                    </div>
                                </div>
                            </div>
                        </section>}

                        {data?.packages?.data?.length > 0 && <section className="popular-categories section-padding">
                            <div className="container wow fadeIn animated position-relative">
                            <div className="section-head d-flex flex-column align-items-center w-100">
                                    <div className="heading">
                                        <h2>Most Trending</h2>
                                    </div>
                                    <h3 className="subheading">{data?.packages?.group_name}</h3>
                                </div>
                                <div className="carausel-6-columns-cover">
                                    <div
                                        className="position-relative"
                                        id="carausel-6-columns"
                                    >
                                        <PackagesSlider data={data?.packages?.data} />
                                    </div>
                                </div>
                                <div className="w-100 d-flex justify-content-center mb-30">
                                <Link target="_blank" href={`https://wa.me/+919892745795/?text=Hi, I'm interested in The Party Cafe Services.
                                        `}>
                                    <button className="btn consult-btn">Consult an Expert <BsArrowRight/></button>
                                        </Link>
                                </div>
                            </div>
                        </section>}

                        {data?.people_and_services?.data?.length > 0 && <section className="popular-categories section-padding" style={{paddingBottom:'50px'}}>
                            <div className="container wow fadeIn animated position-relative">
                            <div className="section-head d-flex flex-column align-items-center w-100">
                                    <div className="heading">
                                        <h2>Entertainment</h2>
                                    </div>
                                    <h3 className="subheading">{data?.people_and_services?.group_name}</h3>
                                    {/* <img src="/assets/imgs/home-page/services-head.png" className="heading_image"/> */}
                                </div>
                                <div className="carausel-6-columns-cover">
                                    <div
                                        className="position-relative slider-arrow-out"
                                        id="carausel-6-columns"
                                    >
                                        <ServicesSlider data={data?.people_and_services?.data} />
                                    </div>
                                </div>
                                <div className="w-100 d-flex justify-content-center mb-30">
                                <Link target="_blank" href={`https://wa.me/+919892745795/?text=Hi, I'm interested in The Party Cafe Services.
                                        `}>
                                    <button className="btn consult-btn">Consult an Expert <BsArrowRight/></button>
                                        </Link>
                                </div>
                            </div>
                        </section>}

                        {data?.blogs?.length > 0 && <section className="section-padding popular-categories usp-section blog-section pt-0">
                            <div className="container">
                                <div className="head d-flex justify-content-between align-items-start mb-50">
                                <div className="section-head d-flex flex-column align-items-center w-100">
                                    <div className="heading">
                                        <h2>Enjoy Ideas</h2>
                                    </div>
                                    <h3 className="subheading">Blogs & Articles</h3>
                                    
                                    <p  className="lh-1 mt-3 text-center">Whether it’s event equipment rental or corporate event supplies,</p>
                                        <p  className="lh-1 text-center">enjoy end-to-end solutions from ideas all the way to execution</p>
                                </div>
                                </div>
                                <div class="row loop-grid">
                                    {
                                        data?.blogs?.slice(0,3).map((blog)=>(
                                            <div class="col-lg-4 mb-4" key={blog?.id}>
                                        <article class="wow fadeIn animated hover-up">
                                            <div class="post-thumb img-hover-scale">
                                                <Link href={`/blogs/${blog?.handle}`}>
                                                    <a><img src={blog?.image} alt={blog?.title} 
                                                    style={{height:'260px', objectFit:'cover', width:'100%'}} 
                                                    /></a>
                                                </Link>
                                            </div>
                                            <div class="entry-content-2">
                                                <h3 class="post-title mb-15">
                                                    <Link href={`/blogs/${blog?.handle}`}>
                                                        <a>{blog?.title}</a>
                                                    </Link>
                                                </h3>
                                                <div class="post-exerpt mb-30" dangerouslySetInnerHTML={{ __html: blog?.blog_content }}></div>
                                                <div class="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                                    <div><span class="post-on"><i class="fi-rs-clock" style={{transform:'translateY(2px)'}}></i> {blog?.blog_post_date || 'unknown'}</span></div>
                                                    <Link href={`/blogs/${blog?.handle}`}>
                                                        <a className="post-link" >Read more <BsArrowRight /></a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                        ))
                                    }
                                </div>
                                
                                {data?.blogs?.data?.length>3 && <div className="w-100 d-flex justify-content-center mb-30">
                                    <Link href="/blogs">
                                    <button className="btn consult-btn">View All <BsArrowRight/></button>
                                    </Link>
                                </div>}
                            </div>
                        </section>}
                        
                        <section className="section-padding usp-section popular-categories section-bg-gradient">

                            <div className="container pt-md-5 pb-25">
                                <div className="head d-flex justify-content-between align-items-start mb-50">
                                    <div className="section-head d-flex flex-column align-items-center w-100">
                                        <div className="heading">
                                            <h2>Why Us</h2>
                                        </div>
                                        <h3 className="subheading">The Party Cafe</h3>
                                        <h4 className="subheading-blue">From weddings to corporate events, birthdays to festive gatherings, we've got you covered</h4>
                                        <p className="lh-1 mt-3 text-center">India's go-to destination for all things celebration.</p>
                                        <p className="lh-1 text-center">Browse our menu, and let us serve up the perfect ingredients for your event!</p>
                                    </div>
                                </div>
                        
                                <div className="why-to-choose position-relative wow fadeIn animated">
                                    <div className="usp-card">
                                        <img
                                            src={'/assets/imgs/why-us/Convenience.png'}
                                            width={160}
                                            height={120}
                                            className="image"
                                            alt="Convenience"
                                        />
                                        <div className="usp-value">
                                            <h5>Convenience</h5>
                                            <p>Plan events effortlessly with ease.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="usp-card">
                                        <img
                                            src={'/assets/imgs/why-us/Variety.png'}
                                            width={160}
                                            height={120}
                                            className="image"
                                            alt="Variety"
                                        />
                                        <div className="usp-value">
                                            <h5>Variety</h5>
                                            <p>Explore countless options for celebrations.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="usp-card">
                                        <img
                                            src={'/assets/imgs/why-us/QA.png'}
                                            width={160}
                                            height={120}
                                            className="image"
                                            alt="Quality Assurance"
                                        />
                                        <div className="usp-value">
                                            <h5>Quality Assurance</h5>
                                            <p>Assurance Only trusted vendors and venues.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="usp-card">
                                        <img
                                            src={'/assets/imgs/why-us/Support.png'}
                                            width={160}
                                            height={120}
                                            className="image"
                                            quality={100}
                                            alt="Customer Support"
                                        />
                                        <div className="usp-value">
                                            <h5>Customer Support</h5>
                                            <p>Support available whenever you need.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <div className="w-100 d-flex justify-content-center mt-20 mb-30">
                                    <Link target="_blank" href={`https://wa.me/+919892745795/?text=Hi, I'm interested in The Party Cafe Services.
                                        `}>
                                        <button className="btn consult-btn">Consult an Expert <BsArrowRight/></button>
                                    </Link>
                                </div>
                        </section>




                    </>
                :
                <Preloader />
            }
            </Layout>
        </>
    );
}
