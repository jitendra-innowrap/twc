import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Search from "../ecommerce/Search";
import { getAllCategory } from "../../util/api";

const Header = ({
    totalCartItems,
    totalCompareItems,
    toggleClick,
    totalWishlistItems,
    headerStyle,
}) => {
    const [isToggled, setToggled] = useState(false);
    const [scroll, setScroll] = useState(0);
    const [headerData, setheaderData] = useState([])
    useEffect(() => {
        fetchHeaderData()
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY >= 100;
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck);
            }
        });
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

    const handleNoUrlLink =(e)=>{
        e.preventDefault();
    }
    const handleToggle = () => setToggled(!isToggled);
    const {announcement_notes, cart_count, result, user_wishlist_count} = headerData;
    const title = announcement_notes?.[0]?.title;
    const url = announcement_notes?.[0]?.redirect_url || "";

    return (
        <>
            <header className={`header-area ${headerStyle} header-height-2`}>
                <div className="header-top header-top-ptb-1 d-none d-lg-block">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-3 col-lg-4">
                                <div className="header-info header-info-left">
                                    <ul>
                                        <li>
                                            <Link href="/#">
                                                <a className="language-dropdown-active">
                                                    <i className="fi-rs-marker"></i>
                                                    Mumbai
                                                    <i className="fi-rs-angle-small-down"></i>
                                                </a>
                                            </Link>
                                            <ul className="language-dropdown">
                                                <li>
                                                    <Link href="/#">
                                                        <a>
                                                            {/* <img
                                                                src="/assets/imgs/theme/flag-fr.png"
                                                                alt=""
                                                            /> */}
                                                            Banglore
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/#">
                                                        <a>
                                                            {/* <img
                                                                src="/assets/imgs/theme/flag-dt.png"
                                                                alt=""
                                                            /> */}
                                                            Pune
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/#">
                                                        <a>
                                                            {/* <img
                                                                src="/assets/imgs/theme/flag-ru.png"
                                                                alt=""
                                                            /> */}
                                                            Delhi
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-4">
                                <div className="text-center">
                                    <div
                                        id="news-flash"
                                        className="d-inline-block"
                                    >
                                        <ul>
                                            <li onClick={()=> console.log(headerData)}>
                                                {title} &nbsp;
                                                <Link href={url}>
                                                    <a> View details</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4">
                                <div className="header-info header-info-right">
                                    <ul>
                                        <li>
                                            {/* <i className="fi-rs-user"></i> */}
                                            {/* <Link href="/page-login-register"> */}
                                                <a>1800 1800 1624 1423</a>
                                            {/* </Link> */}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div
                    className={
                        scroll
                            ? "header-bottom header-bottom-bg-color sticky-bar stick"
                            : "header-bottom header-bottom-bg-color sticky-bar"
                    }
                >
                    <div className="container">
                        <div className="header-wrap header-space-between position-relative">
                            <div className="logo logo-width-1">
                                <Link href="/">
                                    <a>
                                        <img
                                            src="/assets/imgs/theme/party-house.png"
                                            alt="logo"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="header-nav d-none d-lg-flex">
                                <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block">
                                    <nav>
                                        <ul className="menu-links">
                                            {
                                                result?.map((menu, i)=>(
                                                    <li className="position-static" key={menu?.id}>
                                                        <a className="text-black">
                                                            {menu?.name}
                                                            <i className="fi-rs-angle-down"></i>
                                                        </a>
                                                        <ul className="mega-menu">
                                                            {
                                                                menu?.categories?.map((category, i)=>(
                                                                    <li className="sub-mega-menu sub-mega-menu-width-22" key={category?.id}>
                                                                        <Link href={`/${category?.handle}`}>
                                                                            <a className="menu-title">
                                                                                {category?.name}
                                                                            </a>
                                                                        </Link>
                                                                        <ul>
                                                                            {
                                                                                category?.sub_categories?.slice(0, 5)?.map((sub_categorie, i) => (
                                                                                    <li key={sub_categorie?.id}>
                                                                                        <Link href={`/${category?.handle}/${sub_categorie?.handle}`}>
                                                                                            <a>
                                                                                                {sub_categorie?.name}
                                                                                            </a>
                                                                                        </Link>
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                            {category?.sub_categories?.length > 5 && (
                                                                                <li>
                                                                                    <Link href={`/${category?.handle}`}>
                                                                                        <a>See more</a>
                                                                                    </Link>
                                                                                </li>
                                                                            )}
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
                            </div>
                            <div className="header-right">
                                <div className="search-style-2">
                                    <Search />
                                </div>
                                <div className="header-action-right d-none d-lg-block">
                                    <div className="header-action-2">
                                        <div className="header-action-icon-2">
                                            <Link href="/my-profile">
                                                <a>
                                                    <img
                                                        className="svgInject"
                                                        alt="Evara"
                                                        src="/assets/imgs/theme/icons/icon-profile.svg"
                                                    />
                                                    <span className="header-action-name">Profile</span>
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="header-action-icon-2">
                                            <Link href="/page-login-register">
                                                <a>
                                                    <img
                                                        className="svgInject"
                                                        alt="Evara"
                                                        src="/assets/imgs/theme/icons/icon-heart.svg"
                                                    />
                                                    <span className="pro-count blue">
                                                        {totalWishlistItems}
                                                    </span>
                                                    <span className="header-action-name">Wishlist</span>
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="header-action-icon-2">
                                            <Link href="/shop-cart">
                                                <a className="mini-cart-icon">
                                                    <img
                                                        alt="Evara"
                                                        src="/assets/imgs/theme/icons/icon-cart.svg"
                                                    />
                                                    <span className="pro-count blue">
                                                        {totalCartItems}
                                                    </span>
                                                    <span className="header-action-name">Cart</span>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="header-action-right d-block d-lg-none">
                                <div className="header-action-2 gap-1">
                                    <div className="header-action-icon-2">
                                        <Link href="/shop-wishlist">
                                            <a>
                                                <img
                                                    alt="Evara"
                                                    src="/assets/imgs/theme/icons/icon-heart.svg"
                                                />
                                                <span className="pro-count white">
                                                    {totalWishlistItems}
                                                </span>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="header-action-icon-2">
                                        <Link href="/shop-cart">
                                            <a className="mini-cart-icon">
                                                <img
                                                    alt="Evara"
                                                    src="/assets/imgs/theme/icons/icon-cart.svg"
                                                />
                                                <span className="pro-count white">
                                                    {totalCartItems}
                                                </span>
                                            </a>
                                        </Link>
                                        <div className="cart-dropdown-wrap cart-dropdown-hm2">
                                            <ul>
                                                <li>
                                                    <div className="shopping-cart-img">
                                                        <Link href="/products/">
                                                            <a>
                                                                <img
                                                                    alt="Evara"
                                                                    src="/assets/imgs/shop/thumbnail-3.jpg"
                                                                />
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="shopping-cart-title">
                                                        <h4>
                                                            <Link href="/products/">
                                                                <a>
                                                                    Plain
                                                                    Striola
                                                                    Shirts
                                                                </a>
                                                            </Link>
                                                        </h4>
                                                        <h3>
                                                            <span>1 × </span>
                                                            $800.00
                                                        </h3>
                                                    </div>
                                                    <div className="shopping-cart-delete">
                                                        <Link href="/#">
                                                            <a>
                                                                <i className="fi-rs-cross-small"></i>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="shopping-cart-img">
                                                        <Link href="/products/">
                                                            <a>
                                                                <img
                                                                    alt="Evara"
                                                                    src="/assets/imgs/shop/thumbnail-4.jpg"
                                                                />
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="shopping-cart-title">
                                                        <h4>
                                                            <Link href="/products/">
                                                                <a>
                                                                    Macbook Pro
                                                                    2022
                                                                </a>
                                                            </Link>
                                                        </h4>
                                                        <h3>
                                                            <span>1 × </span>
                                                            $3500.00
                                                        </h3>
                                                    </div>
                                                    <div className="shopping-cart-delete">
                                                        <Link href="/#">
                                                            <a>
                                                                <i className="fi-rs-cross-small"></i>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="shopping-cart-footer">
                                                <div className="shopping-cart-total">
                                                    <h4>
                                                        Total
                                                        <span>$383.00</span>
                                                    </h4>
                                                </div>
                                                <div className="shopping-cart-button">
                                                    <Link href="/shop-cart">
                                                        <a>View cart</a>
                                                    </Link>
                                                    <Link href="/shop-checkout">
                                                        <a>Checkout</a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="header-action-icon-2">
                                        <Link href="/my-profile" className="mr-0">
                                            <a className="mr-0">
                                                <img
                                                    alt="Evara"
                                                    src="/assets/imgs/theme/icons/icon-profile.svg"
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="header-action-icon-2 d-block d-lg-none">
                                        <div
                                            className="burger-icon burger-icon-white"
                                            onClick={toggleClick}
                                        >
                                            <span className="burger-icon-top"></span>
                                            <span className="burger-icon-mid"></span>
                                            <span className="burger-icon-bottom"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

const mapStateToProps = (state) => ({
    totalCartItems: state.cart.length,
    totalCompareItems: state.compare.items?.length,
    totalWishlistItems: state.wishlist.items?.length,
});

export const getServerSideProps = async () => {
    
  };

export default connect(mapStateToProps, null)(Header);
