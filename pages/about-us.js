import FAQSection from "../components/ecommerce/FAQSection";
import Layout from "../components/layout/Layout";

function About() {
    return (
        <>
            <Layout parent="Home" sub="About" subChild="">
                <section className="section-padding">
                    <div className="container pt-25">
                        <div className="row">
                            <div className="col-lg-6 align-self-center mb-lg-0 mb-4">
                                <h1 className="font-heading mb-40">
                                    ABOUT THE PARTY CAFE
                                </h1>
                                <p>
                                    The Party Cafe is your one-stop online destination for all things event rentals, offering a
                                    comprehensive e-commerce platform that caters to every celebration need. A stunning outfit, a
                                    piece of elegant furniture, captivating decor, even live performing artist are all available at your
                                    fingertips.
                                </p>
                                <h6 className="mt-15 mb-15 text-uppercase font-sm text-brand wow fadeIn animated">
                                    Our Vision
                                </h6>
                                <p>
                                    Our Vision is to transform every event into an unforgettable celebration by providing easy
                                    access to premium party essentials and services.
                                </p>
                                <h6 className="mt-15 mb-15 text-uppercase font-sm text-brand wow fadeIn animated">
                                    Our Mission
                                </h6>
                                <p>
                                    We aim to simplify event planning by providing a carefully curated range of
                                    high-quality rentals and services, ensuring every customer can effortlessly and confidently
                                    create their perfect celebration.
                                </p>
                            </div>
                            <div className="col-lg-6">
                                <img
                                    src="assets/imgs/page/about-1.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="team" className="pt-25 wow fadeIn animated">
                    <div className="container">
                        <div className="row mb-50 align-items-center">
                            <div className="col-md-8">
                                <h6 className="mt-0 mb-15 text-uppercase font-sm text-brand wow fadeIn animated">
                                    Our Team
                                </h6>
                                <h2 className="mb-15 wow fadeIn animated">
                                    Top team of experts
                                </h2>
                                <p className="text-grey-3 wow fadeIn animated ">
                                    We have a team of event enthusiasts and tech innovators The Party Cafe was born from the desire to revolutionize how people plan and execute their special occasions. We understand that every event is unique and are passionate about helping you bring your vision to life.
                                </p>
                            </div>
                            {/* <div className="col-md-4 text-md-end mt-30">
                                <a className="btn btn-outline btn-lg btn-brand-outline font-weight-bold text-brand text-hover-white border-radius-5 btn-shadow-brand hover-up">
                                    All Members
                                </a>
                            </div> */}
                        </div>
                        <div className="position-relative">
                            <div className="row wow fadeIn animated">
                                <div className="col-lg-3 col-6">
                                    <div className="blog-card border-radius-10 overflow-hidden text-center">
                                        <img
                                            src="assets/imgs/about/Zuzer Lucknowala image.png"
                                            alt=""
                                            className="border-radius-10 mb-10 mb-md-30 hover-up"
                                        />
                                        <h4 className="fw-500 mb-0">
                                            Zuzer Lucknowala
                                        </h4>
                                        <p className="fw-400 text-brand mb-10">
                                            Founder
                                        </p>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-6">
                                    <div className="blog-card border-radius-10 overflow-hidden text-center">
                                        <img
                                            src="assets/imgs/about/Mamta Minocha Malkani image.png"
                                            alt=""
                                            className="border-radius-10 mb-10 mb-md-30 hover-up"
                                        />
                                        <h4 className="fw-500 mb-0">
                                            Mamta Minocha Malkani
                                        </h4>
                                        <p className="fw-400 text-brand mb-10">
                                            CEO & Co-Founder
                                        </p>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-6">
                                    <div className="blog-card border-radius-10 overflow-hidden text-center">
                                        <img
                                            src="assets/imgs/about/Rachana Lucknowala image.png"
                                            alt=""
                                            className="border-radius-10 mb-10 mb-md-30 hover-up"
                                        />
                                        <h4 className="fw-500 mb-0">Rachana Lucknowala</h4>
                                        <p className="fw-400 text-brand mb-10">
                                            Advisory Board
                                        </p>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-6">
                                    <div className="blog-card border-radius-10 overflow-hidden text-center">
                                        <img
                                            src="assets/imgs/about/Firoz Lucknowala image.png"
                                            alt=""
                                            className="border-radius-10 mb-10 mb-md-30 hover-up"
                                        />
                                        <h4 className="fw-500 mb-0">
                                            Firoz Lucknowala
                                        </h4>
                                        <p className="fw-400 text-brand mb-10">
                                            Advisory Board
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
{/* 
                <section id="testimonials" className="section-padding">
                    <div className="container pt-25">
                        <div className="row mb-50">
                            <div className="col-lg-12 col-md-12 text-center">
                                <h6 className="mt-0 mb-10 text-uppercase  text-brand font-sm wow fadeIn animated">
                                What We Offer
                                </h6>
                                <h2 className="mb-15 text-grey-1 wow fadeIn animated">
                                The Party Cafe boasts an 

                                    <br /> extensive inventory
                                </h2>
                                <p className="w-50 m-auto text-grey-3 wow fadeIn animated">
                                Our user-friendly website is designed with your comfort in mind, allowing you to easily browse,
                                    compare, and book items. We offer detailed descriptions, high-quality images, and customer
                                    reviews to help you make informed decisions, all in a seamless online experience.
                                </p>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-md-6 col-lg-4">
                                <div className="hero-card box-shadow-outer-6 wow fadeIn animated mb-30 hover-up d-flex">
                                    <div className="hero-card-icon icon-left-2 hover-up ">
                                        <img
                                            className="btn-shadow-brand hover-up border-radius-5 bg-brand-muted"
                                            style={{border:'none'}}
                                            src="assets/imgs/page/avatar-1.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="pl-30">
                                        <h5 className="mb-5 fw-500">Stylish Outfits
                                        </h5>
                                        <p className="font-sm text-grey-5">
                                            Gratifi
                                        </p>
                                        <p className="text-grey-3 truncate-3">
                                            "We have attire for every occasion, from wedding lehengas to cocktail dresses to tuxedos."
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="hero-card box-shadow-outer-6 wow fadeIn animated mb-30 hover-up d-flex">
                                    <div className="hero-card-icon icon-left-2 hover-up ">
                                        <img
                                            className="btn-shadow-brand hover-up border-radius-5 bg-brand-muted"
                                            style={{border:'none'}}
                                            src="assets/imgs/page/avatar-3.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="pl-30">
                                        <h5 className="mb-5 fw-500">Elegant Furniture
                                        </h5>
                                        <p className="font-sm text-grey-5">
                                            Edenred India
                                        </p>
                                        <p className="text-grey-3 truncate-3">
                                            "Tables, chairs, lounge sets, and more to set the perfect ambiance."
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="hero-card box-shadow-outer-6 wow fadeIn animated mb-30 hover-up d-flex">
                                    <div className="hero-card-icon icon-left-2 hover-up ">
                                        <img
                                            className="btn-shadow-brand hover-up border-radius-5 bg-brand-muted"
                                            style={{border:'none'}}
                                            src="assets/imgs/page/avatar-2.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="pl-30">
                                        <h5 className="mb-5 fw-500">Captivating Decor
                                        </h5>
                                        <p className="text-grey-3 truncate-3">
                                            "Lighting, centerpieces, backdrops, and themed decorations."
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="hero-card box-shadow-outer-6 wow fadeIn animated mb-30 hover-up d-flex">
                                    <div className="hero-card-icon icon-left-2 hover-up ">
                                        <img
                                            className="btn-shadow-brand hover-up border-radius-5 bg-brand-muted"
                                            style={{border:'none'}}
                                            src="assets/imgs/page/avatar-4.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="pl-30">
                                        <h5 className="mb-5 fw-500">Live Performance Artists
                                        </h5>
                                        <p className="text-grey-3 truncate-3">
                                            "Musicians, DJs, dancers, and entertainers to elevate your event."
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="hero-card box-shadow-outer-6 wow fadeIn animated mb-30 hover-up d-flex">
                                    <div className="hero-card-icon icon-left-2 hover-up ">
                                        <img
                                            className="btn-shadow-brand hover-up border-radius-5 bg-brand-muted"
                                            style={{border:'none'}}
                                            src="assets/imgs/page/avatar-5.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="pl-30">
                                        <h5 className="mb-5 fw-500">Party Essentials
                                        </h5>
                                        <p className="text-grey-3 truncate-3">
                                            "Tableware, linens, audio-visual equipment, and everything in between."
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row mt-30">
                            <div className="col-12 text-center">
                                <p className="wow fadeIn animated">
                                    <a className="btn btn-brand text-white btn-shadow-brand hover-up btn-lg">
                                        View More
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section> */}
                
                <section id="faqs" className="section-padding">
                    <div className="container pt-25">
                        <div className="row mb-50">
                            <div className="col-lg-12 col-md-12 text-center">
                                <h6 className="mt-0 mb-10 text-uppercase  text-brand font-sm wow fadeIn animated">
                                    FAQ
                                </h6>
                                <h2 className="mb-15 text-grey-1 wow fadeIn animated">
                                    Frequently Asked Questions
                                </h2>
                                <p className="w-50 m-auto text-grey-3 wow fadeIn animated">
                                    We understand that you may have questions about our renting and booking services. Below are some of the most frequently asked questions to help you better understand our process
                                </p>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <FAQSection />
                        </div>

                    </div>
                </section>
            </Layout>
        </>
    );
}

export default About;
