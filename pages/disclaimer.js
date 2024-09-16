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
                                        <h2>Disclaimer</h2>
                                    </div>
                                    <div className="single-content">
                                        <p> you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at <a href="mailto:info@thepartycafe.com">info@thepartycafe.com</a></p>
                                        <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>
                                        <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                                        </p>
                                        <h4>Disclaimers For The Party Cafe</h4>
                                        <p>All the information on this website is published in good faith and for general information purposes only. Website Name does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website ( <a href="thepartycafe.com">thepartycafe.com</a> ), is strictly at your own risk. will not be liable for any losses and/or damages in connection with the use of our website</p>
                                        
                                        <p>From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone ‘bad'.</p>
                                        
                                        <p>Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their "Terms of Service" before engaging in any business or uploading any information.</p>
                                        
                                        <h4>Consent</h4>
                                        <p>By using our website, you hereby consent to our disclaimer and agree to its terms.</p>
                                        
                                        <h4>Update</h4>
                                        <p>Should we update, amend or make any changes to this document, those changes will be prominently posted here</p>
                                        
                                        <h4>Contact Us</h4>
                                        <p>
                                        If you have any questions about these terms, please contact us at <a href="mailto:support@thepartycafe.com">support@thepartycafe.com</a>

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
