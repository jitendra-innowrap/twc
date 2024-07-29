import React from "react";
import Link from "next/link"
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialFacebook } from "react-icons/sl";
import NewsletterFrom from "../elements/NewletterForm";
import { CiFacebook } from "react-icons/ci";
import { useRouter } from "next/router";

const Footer = () => {
    const router =  useRouter();
    return (
        <>
            <footer className="main">
                <section className="newsletter p-30 mt-30 text-white wow fadeIn animated">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-7 mb-md-3 mb-lg-0">
                                <div className="align-items-center">
                                    <div className="col flex-horizontal-center">
                                        <img
                                            className="icon-email"
                                            src="/assets/imgs/theme/icons/icon-email.svg"
                                            alt=""
                                        />
                                        <h4 className="font-size-20 mb-0 ml-3">
                                            Sign up to Newsletter
                                        </h4>
                                    </div>
                                    <div className="col my-4 my-md-0 des">
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <NewsletterFrom />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-padding footer-mid">
                    <div className="container pt-15 pb-20">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="widget-about font-md mb-md-5 mb-lg-0">
                                    <div className="logo logo-width-1 wow fadeIn animated">
                                        <Link href="/"><a>
                                            <img
                                                src="/assets/imgs/theme/the-party-cafe-logo.png"
                                                alt="logo"
                                            />
                                        </a>
                                        </Link>
                                    </div>
                                    <h5 className="mt-20 mb-10 fw-600 text-grey-4 wow fadeIn animated">
                                        Contact
                                    </h5>
                                    <p className="wow fadeIn animated">
                                        <strong>Address: </strong>301, 3rd Floor, Raheja Point 1,near,<br /> 
                                        Pandit Jawaharlal Nehru Rd, P and T Colony, <br />
                                        Vakola, Santacruz East, Mumbai, <br />
                                        Maharashtra 400055.
                                    </p>
                                    <p className="wow fadeIn animated">
                                        <strong>Phone: </strong><a href="tel:+012222365">+01 2222 365 </a> 
                                        / <a href="tel:+910123456789">(+91) 01 2345 6789</a>
                                    </p>
                                    <h5 className="mb-10 mt-30 fw-600 text-grey-4 wow fadeIn animated">
                                        Follow Us
                                    </h5>
                                    <div className="mobile-social-icon wow fadeIn animated mb-sm-5 mb-md-0">
                                        <a href="#">
                                            <CiFacebook strokeWidth={0.7} size={18} color="#606060" />
                                        </a>
                                        <a href="#">
                                            <FaXTwitter size={18} color="#606060" />
                                        </a>
                                        <a href="#">
                                            <FaInstagram size={18} color="#606060"/>
                                        </a>
                                        <a href="#">
                                            <FaWhatsapp size={18} color="#606060"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <h5 className="widget-title wow fadeIn animated">
                                    About
                                </h5>
                                <ul className="footer-list wow fadeIn animated mb-sm-5 mb-md-0">
                                    <li>
                                        <Link href="/about-us">About Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/media-and-press-release">Media/ Press Release</Link>
                                    </li>
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
                            <div className=" col-md-3">
                                <h5 className="widget-title wow fadeIn animated">
                                    My Account
                                </h5>
                                <ul className="footer-list wow fadeIn animated">
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
                        </div>
                    </div>
                </section>
                <div className="container pb-20 wow fadeIn animated footer-copyright">
                    <div className="row">
                        <div className="col-12 mb-20">
                            <div className="footer-bottom"></div>
                        </div>
                        <div className="col-lg-6">
                            <p className="float-md-left font-sm text-muted mb-0">
                            Copyright &copy; {new Date().getFullYear()},
                                <strong className="text-brand"> The Party Cafe</strong> . All Rights Reserved
                            </p>
                             
                        </div>
                        <div className="col-lg-6">
                            <p className="text-lg-end text-start font-sm text-muted mb-0">
                                Designed by 
                                <strong><a href="https://innowrap.com/" target="_blank"> Innowrap Technologies.</a></strong>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
