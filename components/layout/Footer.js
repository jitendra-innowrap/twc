import React from "react";
import Link from "next/link"
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { SlSocialFacebook } from "react-icons/sl";
import NewsletterFrom from "../elements/NewletterForm";
import { CiFacebook } from "react-icons/ci";
import { useRouter } from "next/router";
import { AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
    const router =  useRouter();
    return (
        <>
            <footer className="main">
                <section className="section-padding footer-mid">
                    <div className="container pt-15 pb-20">
                        <div className="row">
                            <div className="col-md-6 col-lg-4">
                                <div className="widget-about font-md mb-40">
                                    <div className="logo logo-width-1 wow fadeIn animated">
                                        <Link href="/"><a>
                                            <img
                                                src="/assets/imgs/theme/the-party-cafe-yellow-icon.png"
                                                alt="logo"
                                            />
                                        </a>
                                        </Link>
                                    </div>
                                    <h5 className="widget-title mt-20 mb-10 fw-600 wow fadeIn animated">
                                        Contact Us
                                    </h5>
                                    <p className="wow fadeIn animated">
                                        <strong>Address: </strong>301, 3rd Floor, Raheja Point 1,near,<br /> 
                                        Pandit Jawaharlal Nehru Rd, P and T Colony, <br />
                                        Vakola, Santacruz East, Mumbai, <br />
                                        Maharashtra 400055.
                                    </p>
                                    <p className="wow fadeIn animated">
                                        <strong>Phone: </strong><a href="tel:18002127338">18002127338 </a> 
                                        / <a href="tel:+919987888703">(+91) 9987888703</a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <h5 className="widget-title wow fadeIn animated">
                                    Quick Links
                                </h5>
                                <ul className="footer-list wow fadeIn animated mb-40">
                                    <li>
                                        <Link href="/about-us">About Us</Link>
                                    </li>
                                    {/* <li>
                                        <Link href="/media-and-press-release">Media/ Press Release</Link>
                                    </li> */}
                                    <li>
                                        <Link href="/contact-us">Contact Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/disclaimer">Disclaimer</Link>
                                    </li>
                                    <li>
                                        <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
                                    </li>
                                    <li>
                                        <Link href="/privacy-policy">Privacy Policies</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <h5 className="widget-title wow fadeIn animated">
                                    My Accounts
                                </h5>
                                <ul className="footer-list wow fadeIn animated mb-40">
                                    <li>
                                        <Link href={`/page-login-register?referrerUrl=${router?.asPath}`}>Sign In</Link>
                                    </li>
                                    <li>
                                        <Link href="/my-profile">My Profile</Link>
                                    </li>
                                    <li>
                                        <Link href="/shop-cart">View Cart</Link>
                                    </li>
                                    <li>
                                        <Link href="/shop-wishlist">My Wishlist</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className=" col-lg-4">
                                <div className="newsletter-title ">
                                <h5 className="widget-title wow fadeIn animated">
                                Newsletter 
                                </h5>
                                <img
                                    className="icon-email"
                                    src="/assets/imgs/theme/icons/icon-email.png"
                                    alt=""
                                />
                                </div>
                                
                                <ul className=" wow fadeIn animated">
                                        <div className="col-12">
                                            <NewsletterFrom />
                                        </div>
                                    <div className="d-grid justify-content-start mt-5">
                                    <h5 className="mb-10 mt-30 fw-600 wow text-start widget-title fadeIn animated">
                                        Follow Us
                                    </h5>
                                    <div className="mobile-social-icon wow fadeIn animated mb-sm-5 mb-md-0">
                                        <a href={` https://www.facebook.com/profile.php?id=61563337004364`}>
                                            <CiFacebook strokeWidth={0.7} size={32} color="#fff" />
                                        </a>
                                        <a href={`https://x.com/thepartycafe94`}>
                                            <FaXTwitter size={30} color="#fff" />
                                        </a>
                                        <a href={`https://www.linkedin.com/company/the-party-cafe?trk=profile-position`}>
                                            <CiLinkedin size={35} strokeWidth={0.4} color="#fff" />
                                        </a>
                                        <a href={`https://www.instagram.com/thepartycafeofficial?igsh=M2R2bG5hbGJ3bjF3&utm_source=qr`}>
                                            <FaInstagram size={30} color="#fff"/>
                                        </a>
                                        <a href={`https://wa.me/+919892745795/?text=Hi`}>
                                            <FaWhatsapp size={30} color="#fff"/>
                                        </a>
                                        <a href={`https://www.youtube.com/@ThePartyCafe`}>
                                            <AiOutlineYoutube size={35} color="#fff"/>
                                        </a>
                                    </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="pb-20 wow fadeIn animated footer-copyright">
                        <div className="col-12 mb-20">
                            <div className="footer-bottom"></div>
                        </div>
                        <div className="col-lg-12">
                            <p className="float-md-left font-sm mb-0 text-center">
                            Copyright &copy; {new Date().getFullYear()},
                                <Link href='/'><a><strong className="text-primary-light-1"> The Party Cafe</strong></a></Link> . All Rights Reserved
                            </p>
                             
                        
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
