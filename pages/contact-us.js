import ContactForm from "../components/elements/ContactForm";
import Layout from "../components/layout/Layout";

import Link from "next/link"

function Contact() {
    return (
        <>
            <Layout parent="Home" sub="Contact" subChild="">
                <section className="hero-2 bg-green" style={{minHeight:'unset', padding:'80px 0'}}>
                    <div className="hero-content" style={{position:'inherit'}}>
                        <div className="container">
                            <div className="text-center">
                                <h4 className="text-brand mb-20">
                                    Get in touch
                                </h4>
                                <h1 className="mb-20 wow fadeIn animated font-xxl fw-900">
                                    Let's Talk About <br />
                                    Your{" "}
                                    <span className="text-style-1">Idea</span>
                                </h1>
                                <p className="w-50 m-auto wow fadeIn animated">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Harum quam eius placeat, a
                                    quidem mollitia at accusantium reprehenderit
                                    pariatur provident nam ratione incidunt
                                    magnam sequi.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pt-50 pb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-10 m-auto">
                                <div className="contact-from-area padding-20-row-col wow FadeInUp">
                                    <h3 className="mb-10 text-center">
                                        Drop Us a Line
                                    </h3>
                                    <p className="text-muted mb-30 text-center font-sm">
                                        Lorem ipsum dolor sit amet consectetur.
                                    </p>
                                    <ContactForm />
                                    <p className="form-messege"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default Contact;
