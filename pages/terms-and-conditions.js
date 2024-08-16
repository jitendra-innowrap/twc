import BlogSidebar from "../components/elements/BlogSidebar";
import Layout from "../components/layout/Layout";
import Link from "next/link";

function Terms() {
    return (
        <>
            <Layout parent="Home" sub="Pages" subChild="Terms">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="single-page pr-30 mb-lg-0 mb-sm-5">
                                    <div className="single-header style-2">
                                        <h2>Terms of Service</h2>
                                    </div>
                                    <div className="single-content">
                                        <h4>Introduction</h4>
                                        <p>Welcome to THE PARTY CAFE. These Terms and Conditions ("Terms") govern your access to and use of our website www.thepartycafe.com and any related services, including but not limited to the purchase of products and services. By accessing or using our website, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website.</p>
                                        <h4>Definitions</h4>
                                        <ul>
                                            <li>"Website" refers to www.thepartycafe.com</li>
                                            <li>"User," "You," and "Your" refers to you, the person accessing this website and accepting these Terms</li>
                                            <li>"Company," "We," "Our," and "Us" refers to THE PARTY CAFE</li>
                                            <li>"Party" refers to either you or us</li>
                                            <li>"Content" means any information, data, text, photos, graphics, or other materials appearing on the Website</li>
                                        </ul>
                                        <h4>Acceptance of Terms</h4>
                                        <p>By accessing and using our Website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not use our Website.</p>
                                        <h4>Changes to Terms</h4>
                                        <p>We reserve the right to modify or replace these Terms at any time. Changes will be effective immediately upon posting on the Website. Your continued use of the Website following the posting of any changes constitutes acceptance of those changes.</p>
                                        <h4>User Accounts</h4>
                                        <ol>
                                            <li>To access certain features of the Website, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</li>
                                            <li>You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</li>
                                            <li>You agree to notify us immediately of any unauthorized use of your account or any other breach of security.</li>
                                        </ol>
                                        <h4>Products and Services</h4>
                                        <ol>
                                            <li>We strive to provide accurate descriptions, pricing, and availability information for our products and services. However, we do not warrant that product descriptions or other content on the Website is accurate, complete, reliable, current, or error-free.</li>
                                            <li>We reserve the right to modify or discontinue any product or service without notice. We shall not be liable to you or any third party for any modification, price change, suspension, or discontinuance of any product or service.</li>
                                        </ol>
                                        <h4>Orders and Payments</h4>
                                        <ol>
                                            <li>By placing an order through our Website, you are making an offer to purchase the products or services in your order. All orders are subject to acceptance by us.</li>
                                            <li>Prices for products and services are subject to change without notice. We reserve the right to refuse or cancel any order at our sole discretion.</li>
                                            <li>Payment must be made in full at the time of placing an order. We use third-party payment processors and do not store your payment information.</li>
                                        </ol>
                                        <h4>Shipping and Delivery</h4>
                                        <ol>
                                            <li>Shipping and delivery times are estimates only and may vary. We are not responsible for delays caused by shipping carriers or other factors outside our control.</li>
                                            <li>Risk of loss and title for items purchased from our Website pass to you upon delivery of the items to the carrier.</li>
                                        </ol>
                                        <h4>Cancellations, Returns, and Refunds</h4>
                                        <ol>
                                            <li>Cancellation, return, and refund policies for products and services are outlined in our separate Cancellation and Refund Policy, which is incorporated into these Terms by reference.</li>
                                        </ol>
                                        <h4>Intellectual Property</h4>
                                        <ol>
                                            <li>All content on our Website, including text, graphics, logos, images, and software, is the property of THE PARTY CAFE or its content suppliers and is protected by copyright and other intellectual property laws.</li>
                                            <li>You may not use, reproduce, distribute, modify, or create derivative works from any content from our Website without our express written permission.</li>
                                        </ol>
                                        <h4>User Content</h4>
                                        <ol>
                                            <li>By posting, uploading, or submitting any content to our Website, you grant us a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media.</li>
                                            <li>You represent and warrant that you own or have the necessary rights to such content and that the content does not violate the rights of any third party.</li>
                                        </ol>
                                        <h4>Prohibited Uses</h4>
                                        <p>You agree not to:</p>
                                        <ul>
                                            <li>Use the Website in any way that violates any applicable laws or regulations</li>
                                            <li>Use the Website to transmit any harmful or malicious code</li>
                                            <li>Attempt to gain unauthorized access to any portion of the Website</li>
                                            <li>Use the Website in any manner that could disable, overburden, damage, or impair the Website</li>
                                            <li>Collect or track the personal information of others</li>
                                            <li>Engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Website</li>
                                        </ul>
                                        <h4>Disclaimer of Warranties</h4>
                                        <ol>
                                            <li>The Website and all products and services are provided on an "as is" and "as available" basis without any representations or warranties, express or implied.</li>
                                            <li>We do not warrant that the Website will be uninterrupted, timely, secure, or error-free.</li>
                                        </ol>
                                        <h4>Limitation of Liability</h4>
                                        <p>To the fullest extent permitted by law, THE PARTY CAFE shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Website or any products or services purchased through the Website.</p>
                                        <h4>Indemnification</h4>
                                        <p>You agree to indemnify, defend, and hold harmless THE PARTY CAFE and its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your access to or use of the Website or your violation of these Terms.</p>
                                        <h4>Governing Law and Jurisdiction</h4>
                                        <p>These Terms shall be governed by and construed in accordance with the laws of [Country or State]. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in [City, Country or State].</p>
                                        <h4>Severability</h4>
                                        <p>If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.</p>
                                        <h4>Entire Agreement</h4>
                                        <p>These Terms constitute the entire agreement between you and THE PARTY CAFE regarding the use of the Website and supersede all prior agreements and understandings.</p>

                                        <h4>Contact Us</h4>
                                        <p>
                                            If you have any questions about these Terms, please{" "}
                                            <Link href="/contact-us">
                                                <a>contact us</a>
                                            </Link>
                                            .
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default Terms;
