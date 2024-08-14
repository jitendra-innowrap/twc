import { useEffect, useState } from "react";

import Link from "next/link";
import useClickOutside from "../../util/outsideClick";
import { getAllCategory } from "../../util/api";
import { useRouter } from "next/router";
import { SlSocialFacebook } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import storage from "../../util/localStorage";
import Popup from "reactjs-popup";
import Logout from "../ecommerce/Dashboard/Logout/Logout";
import { CiFacebook } from "react-icons/ci";
import { useMediaQuery } from "react-responsive";

const MobileMenu = ({ isToggled, toggleClick }) => {
    const isTab = useMediaQuery({
        query: '(max-width: 992px)'
      })
    const [user, setUser] = useState(null);


    const router = useRouter();
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    });
    const [headerData, setheaderData] = useState([])

    useEffect(() => {
        let storedUser = storage.get("auth_token");
        setUser(storedUser);
        if(isTab){
            fetchHeaderData();
        }
    },[]);  
    const fetchHeaderData =async ()=>{
        try {
            const response = await getAllCategory();
            console.log('fetch success: ', response)
            setheaderData(response.data)
          } catch (error) {
            console.error('there is an error: ',error);
          }
    }
    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            });
        } else {
            setIsActive({
                status: true,
                key,
            });
        }
    };
    const handleCategory =(url)=>{
        router.push(url);
        toggleClick();
    }

    let domNode = useClickOutside(() => {
        setIsActive({
            status: false,
        });
    });
    const {announcement_notes, cart_count, result, user_wishlist_count} = headerData;
    
    if(!isTab){
        return
    }else{
        return (
            <>
                <div className={isToggled ? "mobile-header-active mobile-header-wrapper-style sidebar-visible" : "mobile-header-active mobile-header-wrapper-style"}>
                    <div className="mobile-header-wrapper-inner">
                        <div className="mobile-header-top">
                            <div className="mobile-header-logo">
                                <Link href="/index">
                                    <a>
                                        <img src="/assets/imgs/theme/the-party-cafe-yellow-icon.png" alt="the-party-cafe-logo" />
                                    </a>
                                </Link>
                            </div>
                            <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
                                <button className="close-style search-close" onClick={toggleClick}>
                                    <i className="icon-top"></i>
                                    <i className="icon-bottom"></i>
                                </button>
                            </div>
                        </div>
                        <div className="mobile-header-content-area">
                            <div className="mobile-menu-wrap mobile-header-border">
                                <nav>
                                    <ul className="mobile-menu" ref={domNode}>
                                        {
                                            result?.map((menu, i) => (
                                                <li key={menu?.id} className={isActive.key == i ? "menu-item-has-children active" : "menu-item-has-children"}>
                                                    <div onClick={() => handleToggle(i)}>
                                                        <span className="menu-expand">
                                                            <i className="fi-rs-angle-small-down"></i>
                                                        </span>
                                                        <a style={{color:`${isActive.key == i ? '#088178':'#000'}`}}>
                                                            {menu?.name}
                                                        </a>
                                                    </div>
                                                    <ul className={isActive.key == i ? "dropdown" : "d-none"}>
                                                        {
                                                            menu?.categories?.map((category, i) => (
                                                                <li className="menu-item-has-children" key={category?.id}>
                                                                    <span className="menu-expand"></span>
                                                                    {/* <Link href={`/${category?.handle}`}> */}
                                                                        <a className="fw-bold">{category?.name}</a>
                                                                    {/* </Link> */}
                                                                    <ul className="dropdown">
                                                                        {
                                                                            category?.sub_categories?.map((sub_categorie, i) => (
                                                                                <li key={sub_categorie?.id}>
                                                                                        <a onClick={()=>{handleCategory(`/products/${category?.handle}/${sub_categorie?.handle}`)}}>{sub_categorie?.name}</a>
                                                                                </li>
                                                                            ))
                                                                        }
    
                                                                    </ul>
                                                                </li>
                                                            ))
                                                        }
    
                                                    </ul>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                            </div>
                            <div className="mobile-header-info-wrap mobile-header-border">
                                <div className="single-mobile-header-info mt-30">
                                    <Link href="/contact-us">
                                        <a>  </a>
                                    </Link>
                                </div>
                                {user?<div className="single-mobile-header-info">
                                    {/* <Link href="/my-profile"> */}
                                    <Popup
                                        trigger={<a
                                            className="nav-link"
                                        >
                                            <i className="fi-rs-sign-out mr-10"></i>
                                            Logout
                                        </a>}
                                        modal
                                        lockScroll
                                        position="right center"
                                    >
                                        {
                                            (close) => (
                                                <Logout close={close} closeMenu={toggleClick} />
                                            )
                                        }
                                    </Popup>
                                    {/* </Link> */}
                                </div>:
                                <div className="single-mobile-header-info">
                                    <Link href={`/page-login-register?referrerUrl=${router?.asPath}`}>
                                        <a>Log In / Sign Up </a>
                                    </Link>
                                </div>}
                                <div className="single-mobile-header-info">
                                    <Link href="tel:1800180016241423">
                                        <a>1800 1800 1624 1423</a>
                                    </Link>
                                </div>
                            </div>
                            <div className="mobile-social-icon">
                                <h5 className="mb-15 text-grey-4">Follow Us</h5>
                                    <a href={`https://www.facebook.com/`}
                                        target="_blank">
                                        <CiFacebook strokeWidth={0.7} size={18} color="#606060" />
                                    </a>
                                    <a href={`https://twitter.com/`}
                                        target="_blank">
                                        <FaXTwitter size={18} color="#606060" />
                                    </a>
                                    <a href={`https://twitter.com/`}
                                        target="_blank">
                                        <FaInstagram size={18} color="#606060" />
                                    </a>
                                    <a href={`https://wa.me/`}
                                        data-action="share/whatsapp/share"
                                        target="_blank">
                                        <FaWhatsapp size={18} color="#606060" />
                                    </a>
                            </div>
                            <div className="header-info header-info-left mt-20">
                                <ul>
                                    <li>
                                        <Link href="/#">
                                            <a className="language-dropdown-active">
                                                <i className="fi-rs-marker"></i>
                                                {headerData?.region_data?.[0]?.region_name}
                                                <i className="fi-rs-angle-small-down"></i>
                                            </a>
                                        </Link>
                                        <ul className="language-dropdown">
                                            {
                                                headerData?.region_data?.map((region, i) => (
                                                    <li key={i}>
                                                        <Link href="/">
                                                            <a>
                                                                {/* <img
                                                                            src="/assets/imgs/theme/flag-fr.png"
                                                                            alt=""
                                                                        /> */}
                                                                {region?.region_name}
                                                            </a>
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-12 mt-20">
                                <div className="text-center">
                                    <div
                                        id="news-flash"
                                        className="d-inline-block"
                                    >
                                        <ul>
                                            <li className="">
                                                {headerData?.announcement_notes?.[0]?.title} &nbsp;
                                                <Link href={headerData?.announcement_notes?.[0]?.redirect_url || ""}>
                                                    <a className="d-block"> View details</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default MobileMenu;
