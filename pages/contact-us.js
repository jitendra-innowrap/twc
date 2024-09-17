import ContactForm from "../components/elements/ContactForm";
import Layout from "../components/layout/Layout";

import Link from "next/link"

function Contact() {
    return (
        <>
            <Layout parent="Home" sub="Contact" subChild="">
                <section className="pb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-10 m-auto">
                                <div className="contact-from-area padding-20-row-col wow FadeInUp">
                                    <div className="section-head d-flex flex-column align-items-center w-100 mt-40 mb-40">
                                        <div className="heading">
                                            <h2 className="font-heading">
                                                Drop us a line
                                            </h2>
                                        </div>
                                        <p className=" col-md-8 m-auto text-center">We aim to respond to all inquiries within 24 business hours. For urgent matters related to an upcoming event, please call our customer support line.</p>
                                    </div>
                                    {/* <p className="text-muted mb-30 text-center font-sm">
                                        Lorem ipsum dolor sit amet consectetur.
                                    </p> */}
                                    <ContactForm />
                                    <p className="form-messege"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container editor-content-static pt-50 pb-50">
                    <div className="container">
                    <p>We're here to help make your event extraordinary. Whether you have a question, need assistance, or want to provide feedback, we'd love to hear from you.</p>
                    
                    <div className="row ">
                        <div className="col-12 col-md-6 mt-30">
                            <div className="border p-3 h-100">
                            <h4 className="mt-0">General Inquiries</h4>
                            <p>For general questions about our services, products, or how The Party Cafe works:</p>
                            <p>Email: <a href="mailto:sales@thepartycafe.com">sales@thepartycafe.com</a></p>
                            <p>Phone: (+91) 01 2345 6789</p>
                            <p>Hours: [11am to 7pm]</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mt-30">
                            <div className="border p-3 h-100">
                            <h4 className="mt-0">Customer Support</h4>
                            <p>For assistance with orders, deliveries, or any issues:</p>
                            <p>Email: <a href="mailto:sales@thepartycafe.com">sales@thepartycafe.com</a></p>
                            <p>Phone: (+91) 01 2345 6789</p>
                            <p>Live Chat: Available on our website during business hours</p>
                            <p>Hours: [11am to 7pm]</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mt-30">
                            <div className="border p-3 h-100">
                            <h4 className="mt-0">Hiring Opportunities</h4>
                            <p>Interested in joining The Party Cafe team? We're always looking for passionate individuals:</p>
                            <p>Email: <a href="mailto:sales@thepartycafe.com">sales@thepartycafe.com</a></p>
                            <p>Please include your resume and a cover letter explaining why you'd be a great fit for our team.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mt-30">
                            <div className="border p-3 h-100">
                            <h4 className="mt-0">Vendor Partnerships</h4>
                            <p>If you're a vendor interested in partnering with The Party Cafe:</p>
                            <p>Email: <a href="mailto:sales@thepartycafe.com">sales@thepartycafe.com</a></p>
                            <p>Please include information about your products or services and why you think they'd be a great addition to our offerings.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mt-30">
                            <div className="border p-3 h-100">
                            <h4 className="mt-0">Media Inquiries</h4>
                            <p>For press-related questions or interview requests:</p>
                            <p>Email: <a href="mailto:marketing@thepartycafe.com">marketing@thepartycafe.com</a></p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mt-30">
                            <div className="border p-3 h-100">
                            <h4 className="mt-0">Feedback and Suggestions</h4>
                            <p>We value your input! If you have ideas on how we can improve our service:</p>
                            <p>Email: <a href="mailto:sales@thepartycafe.com">sales@thepartycafe.com</a></p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mt-30">
                            <div className="border p-3 h-100">
                                <h4 className="mt-0">Visit Us</h4>
                                <p>While we primarily operate online, our corporate office is located at:</p>
                                <address>301, 3rd Floor, Raheja Point 1, <br />
                                    near Pandit Jawaharlal Nehru Rd, 
                                    P and T Colony, Vakola,  <br />
                                    Santacruz East, Mumbai, <br />
                                    Maharashtra 400055</address>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mt-30">
                            <div className="border p-3 h-100">
                                <h4 className="mt-0">Social Media</h4>
                                <p>Connect with us on social media for event inspiration, tips, and updates:</p>
                                <p>
                                    Instagram: <a href="https://www.instagram.com/thepartycafeofficial" target="_blank" rel="noopener noreferrer">@thepartycafeofficial</a>
                                </p>
                                <p>
                                    Pinterest: <a href="https://www.pinterest.com/thepartycafeofficial" target="_blank" rel="noopener noreferrer">The Party Cafe</a>
                                </p>

                                </div>
                            </div>
                    </div>

                    <p className="col-md-8 mt-40 m-auto text-center">Thank you for choosing The Party Cafe. We look forward to helping you create unforgettable celebrations!</p>
                    

                    </div>

                </section>
            </Layout>
        </>
    );
}

export default Contact;
