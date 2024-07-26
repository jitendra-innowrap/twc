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
                    <div className="container wow fadeIn animated">
                        <h3 className="section-title text-center mb-20 title-underline">
                            Browse Events Category
                        </h3>
                        <div className="carausel-6-columns-cover position-relative">
                            <div
                                className=""
                                id="carausel-6-columns"
                            >
                                <CategorySlider data={data?.browse_events_category} />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-padding mt-md-3 mb-md-4">
                    <RentalCategory forHim={data?.rental_2?.[0]} forHer={data?.rental_1?.[0]} />
                </section>

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
                                <button className="btn title-btn">Consult event expert</button>
                            </div>
                        </div>
                        <div className="events-collection-grid">
                            {
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
                            }
                        </div>
                    </div>
                </section>

                <section className="section-padding">
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
                </section>

                <section className="section-padding success-stories-section">

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
                </section>

                <section className="section-padding usp-section">

                    <div className="container pt-md-5 pb-25">
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
                </>
                </Layout>
                :
                <Preloader/>
            }
        </>
    );
}
