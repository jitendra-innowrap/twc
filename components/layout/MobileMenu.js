import { useEffect, useState } from "react";

import Link from "next/link";
import useClickOutside from "../../util/outsideClick";
import { getAllCategory } from "../../util/api";

const MobileMenu = ({ isToggled, toggleClick }) => {
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    });
    const [headerData, setheaderData] = useState([])

    useEffect(() => {
        fetchHeaderData()
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

    let domNode = useClickOutside(() => {
        setIsActive({
            status: false,
        });
    });
    const {announcement_notes, cart_count, result, user_wishlist_count} = headerData;

    return (
        <>
            <div className={isToggled ? "mobile-header-active mobile-header-wrapper-style sidebar-visible" : "mobile-header-active mobile-header-wrapper-style"}>
                <div className="mobile-header-wrapper-inner">
                    <div className="mobile-header-top">
                        <div className="mobile-header-logo">
                            <Link href="/index">
                                <a>
                                    <img src="/assets/imgs/theme/logo.svg" alt="logo" />
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
                        <div className="mobile-search search-style-3 mobile-header-border">
                            <form action="#">
                                <input type="text" placeholder="Search for items…" />
                                <button type="submit">
                                    <i className="fi-rs-search"></i>
                                </button>
                            </form>
                        </div>
                        <div className="mobile-menu-wrap mobile-header-border">
                            <nav>
                                <ul className="mobile-menu" ref={domNode}>
                                    {
                                        result?.map((menu, i) => (
                                            <li key={menu?.id} className={isActive.key == i ? "menu-item-has-children active" : "menu-item-has-children"}>
                                                <span className="menu-expand" onClick={() => handleToggle(i)}>
                                                    <i className="fi-rs-angle-small-down"></i>
                                                </span>
                                                <Link href="#">
                                                    {menu?.name}
                                                </Link>
                                                <ul className={isActive.key == i ? "dropdown" : "d-none"}>
                                                    {
                                                        menu?.categories?.map((category, i) => (
                                                            <li className="menu-item-has-children" key={category?.id}>
                                                                <span className="menu-expand"></span>
                                                                <Link href={`/${category?.handle}`}>
                                                                    <a>{category?.name}</a>
                                                                </Link>
                                                                <ul className="dropdown">
                                                                    {
                                                                        category?.sub_categories?.map((sub_categorie, i) => (
                                                                            <li key={sub_categorie?.id}>
                                                                                <Link href={`/${category?.handle}/${sub_categorie?.handle}`}>
                                                                                    <a>{sub_categorie?.name}</a>
                                                                                </Link>
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
                            <div className="single-mobile-header-info">
                                <Link href="/page-login-register">
                                    <a>Log In / Sign Up </a>
                                </Link>
                            </div>
                            <div className="single-mobile-header-info">
                                <Link href="#">
                                    <a>1800 1800 1624 1423</a>
                                </Link>
                            </div>
                        </div>
                        <div className="mobile-social-icon">
                            <h5 className="mb-15 text-grey-4">Follow Us</h5>
                            <Link href="#">
                                <a>
                                    <img src="/assets/imgs/theme/icons/icon-facebook.svg" alt="" />
                                </a>
                            </Link>
                            <Link href="#">
                                <a>
                                    <img src="/assets/imgs/theme/icons/icon-twitter.svg" alt="" />
                                </a>
                            </Link>
                            <Link href="#">
                                <a>
                                    <img src="/assets/imgs/theme/icons/icon-instagram.svg" alt="" />
                                </a>
                            </Link>
                            <Link href="#">
                                <a>
                                    <img src="/assets/imgs/theme/icons/icon-pinterest.svg" alt="" />
                                </a>
                            </Link>
                            <Link href="#">
                                <a>
                                    <img src="/assets/imgs/theme/icons/icon-youtube.svg" alt="" />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
