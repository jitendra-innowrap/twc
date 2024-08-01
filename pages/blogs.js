import { BsArrowRight } from "react-icons/bs";
import Layout from "../components/layout/Layout";
import Link from "next/link";

function About() {
    return (
        <>
            <Layout parent="Home" sub="Blogs" subChild="">
                <section className="section-padding">
                    <div className="container pt-25">
                        <div className="row">
                            <div className="col-lg-6 align-self-center mb-lg-0 mb-4">
                                <h6 className="mt-0 mb-15 text-uppercase font-sm text-brand wow fadeIn animated">
                                Media and Blogs
                                </h6>
                                <h1 className="font-heading mb-40">
                                Welcome to Our Blog
                                </h1>
                                <p>
                                Welcome to our Blog, your ultimate destination for the latest news, insights, and updates from our company. Here, you can explore a wealth of information about our products, services, and the industry at large. We invite you to visit regularly for fresh content that informs and inspires.
                                </p>
                                <p>
                                    Tempus ultricies augue luctus et ut
                                    suscipit. Morbi arcu, ultrices purus dolor
                                    erat bibendum sapien metus. Sit mi,
                                    pharetra, morbi arcu id. Pellentesque
                                    dapibus nibh augue senectus.
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
                <section id="work" className="mt-40 pt-50 pb-50 section-border">
                    <div className="container">
                        <h2 className="mb-50">Recent Press Releases</h2>
                        <div class="row loop-grid">
                            <div class="col-lg-4">
                                <article class="wow fadeIn animated hover-up mb-30">
                                    <div class="post-thumb img-hover-scale">
                                        <a href="/media-post"><img src="/assets/imgs/blog/blog-6.jpg" alt="" /></a>

                                    </div>
                                    <div class="entry-content-2">
                                        <h3 class="post-title mb-15"><a href="/media-post">New Launches Solution for Streamlining Operations</a></h3>
                                        <p class="post-exerpt mb-30">Today, we are excited to announce the launch of our latest enterprise software package designed to help large organizations optimize workflows and boost productivity.</p>
                                        <div class="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                            <div><span class="post-on"><i class="fi-rs-clock"></i> 25 April 2021</span><span class="hit-count has-dot">126k Views</span></div>
                                            <a href="/media-post">Read more <BsArrowRight /></a>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div class="col-lg-4">
                                <article class="wow fadeIn animated hover-up mb-30">
                                    <div class="post-thumb img-hover-scale">
                                        <a href="/media-post"><img src="/assets/imgs/blog/blog-3.jpg" alt="" /></a>

                                    </div>
                                    <div class="entry-content-2">
                                        <h3 class="post-title mb-15"><a href="/media-post">CEO Named One of the Top 50 Tech Leaders</a></h3>
                                        <p class="post-exerpt mb-30">We are proud to announce that we have successfully completed the rigorous certification process for ISO 27001, the international standard for information security management systems.</p>
                                        <div class="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                            <div><span class="post-on"><i class="fi-rs-clock"></i> 25 April 2021</span><span class="hit-count has-dot">126k Views</span></div>
                                            <a href="/media-post">Read more <BsArrowRight /></a>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div class="col-lg-4">
                                <article class="wow fadeIn animated hover-up mb-30">
                                    <div class="post-thumb img-hover-scale">
                                        <a href="/media-post"><img src="/assets/imgs/blog/blog-3.jpg" alt="" /></a>

                                    </div>
                                    <div class="entry-content-2">
                                        <h3 class="post-title mb-15"><a href="/media-post">Company Earns ISO 27001 Certification for Information Security</a></h3>
                                        <p class="post-exerpt mb-30">We are proud to announce that we have successfully completed the rigorous certification process for ISO 27001, the international standard for information security management systems.</p>
                                        <div class="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                            <div><span class="post-on"><i class="fi-rs-clock"></i> 25 April 2021</span><span class="hit-count has-dot">126k Views</span></div>
                                            <a href="/media-post">Read more <BsArrowRight /></a>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div class="col-lg-4">
                                <article class="wow fadeIn animated hover-up mb-30">
                                    <div class="post-thumb img-hover-scale">
                                        <a href="/media-post"><img src="/assets/imgs/blog/blog-3.jpg" alt="" /></a>

                                    </div>
                                    <div class="entry-content-2">
                                        <h3 class="post-title mb-15"><a href="/media-post">Company Earns ISO 27001 Certification for Information Security</a></h3>
                                        <p class="post-exerpt mb-30">We are proud to announce that we have successfully completed the rigorous certification process for ISO 27001, the international standard for information security management systems.</p>
                                        <div class="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                            <div><span class="post-on"><i class="fi-rs-clock"></i> 25 April 2021</span><span class="hit-count has-dot">126k Views</span></div>
                                            <a href="/media-post">Read more <BsArrowRight /></a>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div class="col-lg-4">
                                <article class="wow fadeIn animated hover-up mb-30">
                                    <div class="post-thumb img-hover-scale">
                                        <a href="/media-post"><img src="/assets/imgs/blog/blog-3.jpg" alt="" /></a>

                                    </div>
                                    <div class="entry-content-2">
                                        <h3 class="post-title mb-15"><a href="/media-post">Company Earns ISO 27001 Certification for Information Security</a></h3>
                                        <p class="post-exerpt mb-30">We are proud to announce that we have successfully completed the rigorous certification process for ISO 27001, the international standard for information security management systems.</p>
                                        <div class="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                            <div><span class="post-on"><i class="fi-rs-clock"></i> 25 April 2021</span><span class="hit-count has-dot">126k Views</span></div>
                                            <a href="/media-post">Read more <BsArrowRight /></a>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div class="col-lg-4">
                                <article class="wow fadeIn animated hover-up mb-30">
                                    <div class="post-thumb img-hover-scale">
                                        <a href="/media-post"><img src="/assets/imgs/blog/blog-3.jpg" alt="" /></a>

                                    </div>
                                    <div class="entry-content-2">
                                        <h3 class="post-title mb-15"><a href="/media-post">Company Earns ISO 27001 Certification for Information Security</a></h3>
                                        <p class="post-exerpt mb-30">We are proud to announce that we have successfully completed the rigorous certification process for ISO 27001, the international standard for information security management systems.</p>
                                        <div class="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                            <div><span class="post-on"><i class="fi-rs-clock"></i> 25 April 2021</span><span class="hit-count has-dot">126k Views</span></div>
                                            <a href="/media-post">Read more <BsArrowRight /></a>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div className="single-content mt-50">
                            <h4>Contact Us</h4>
                            <p>
                            If you have any questions about our press releases or would like to request more information, please don't hesitate to reach out. We're always happy to help., please{" "}
                                <Link href="/contact-us">
                                    <a>contact us</a>
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default About;
