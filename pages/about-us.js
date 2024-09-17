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
                                <div className="section-head d-flex flex-column flex-start w-100 mb-20">
                                    <div className="heading">
                                        <h2 className="font-heading">
                                            About 
                                        </h2>
                                    </div>
                                </div>
                                <p>
                                    The Party Cafe is your one-stop online destination for all things event rentals, offering a
                                    comprehensive e-commerce platform that caters to every celebration need. A stunning outfit, a
                                    piece of elegant furniture, captivating decor, even live performing artist are all available at your
                                    fingertips.
                                </p>
                                <h4 className="mt-15 subheading-blue mb-15 text-uppercase font-sm text-brand wow fadeIn animated">
                                    Our Vision
                                </h4>
                                <p>
                                    Our Vision is to transform every event into an unforgettable celebration by providing easy
                                    access to premium party essentials and services.
                                </p>
                                <h4 className="mt-15 subheading-blue mb-15 text-uppercase font-sm text-brand wow fadeIn animated">
                                    Our Mission
                                </h4>
                                <p>
                                    We aim to simplify event planning by providing a carefully curated range of
                                    high-quality rentals and services, ensuring every customer can effortlessly and confidently
                                    create their perfect celebration.
                                </p>
                            </div>
                            <div className="col-lg-6">
                                <img
                                    style={{width:'100%', height:'auto'}}
                                    src="assets/imgs/page/about-us.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="team" className="pt-25 wow fadeIn animated">
                    <div className="container">
                        <div className="row mb-50 align-items-center">
                                <div className="section-head  mb-20 d-flex flex-column align-items-center w-100">
                                    <div className="heading">
                                        <h2 className="font-heading">
                                            Our Team 
                                        </h2>
                                    </div>
                                </div>
                                <p className="col-md-8 text-center m-auto text-grey-3 wow text-center fadeIn animated ">
                                    We have a team of event enthusiasts and tech innovators The Party Cafe was born from the desire to revolutionize how people plan and execute their special occasions. We understand that every event is unique and are passionate about helping you bring your vision to life.
                                </p>
                            <div className="col-md-8">
                            </div>
                            {/* <div className="col-md-4 text-md-end mt-30">
                                <a className="btn btn-outline btn-lg btn-brand-outline font-weight-bold text-brand text-hover-white border-radius-5 btn-shadow-brand hover-up">
                                    All Members
                                </a>
                            </div> */}
                        </div>
                        <div className="position-relative">
                            <div className="row wow fadeIn our-team animated">
                                <div className="d-flex justify-content-center">
                                    <div className="">
                                        <div className="team-card border-radius-10 overflow-hidden text-center">
                                            <img
                                                src="assets/imgs/about/Zuzer Lucknowala.png"
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

                                    <div className="">
                                        <div className="team-card border-radius-10 overflow-hidden text-center">
                                            <img
                                                src="assets/imgs/about/Mamta Minocha Malkani image.png"
                                                alt=""
                                                className="border-radius-10 mb-10 mb-md-30 hover-up"
                                            />
                                            <h4 className="fw-500 mb-0">
                                                Mamta Minocha Malkani
                                            </h4>
                                            <p className="fw-400 text-brand mb-10">
                                                Founder
                                            </p>
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="team-card border-radius-10 overflow-hidden text-center">
                                            <img
                                                src="assets/imgs/about/Party Cruisers Limited.png"
                                                alt=""
                                                className="border-radius-10 mb-10 mb-md-30 hover-up"
                                            />
                                            <h4 className="fw-500 mb-0">
                                                Party Cruisers Limited
                                            </h4>
                                            <p className="fw-400 text-brand mb-10">
                                                Founder
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center mt-30">
                                    <div className="">
                                        <div className="team-card border-radius-10 overflow-hidden text-center">
                                            <img
                                                src="assets/imgs/about/Rachana Lucknowala image.png"
                                                alt=""
                                                className="border-radius-10 mb-10 mb-md-30 hover-up"
                                            />
                                            <h4 className="fw-500 mb-0">Rachana Lucknowala</h4>
                                            <p className="fw-400 text-brand mb-10">
                                                Advisory
                                            </p>
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="team-card border-radius-10 overflow-hidden text-center">
                                            <img
                                                src="assets/imgs/about/Firoz Lucknowala.png"
                                                alt=""
                                                className="border-radius-10 mb-10 mb-md-30 hover-up"
                                            />
                                            <h4 className="fw-500 mb-0">
                                                Firoz Lucknowala
                                            </h4>
                                            <p className="fw-400 text-brand mb-10">
                                                Advisory
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section id="faqs" className="section-padding">
                    <div className="container pt-25">
                        <div className="row mb-50">
                            <div className="col-lg-12 col-md-12 text-center">
                                <div className="section-head d-flex flex-column align-items-center w-100 mb-20">
                                    <div className="heading">
                                        <h2 className="font-heading">
                                            Faq 
                                        </h2>
                                    </div>
                                </div>
                                <p className="col-md-8 m-auto text-grey-3 wow fadeIn animated">
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
