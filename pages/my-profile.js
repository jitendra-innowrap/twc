import Layout from "../components/layout/Layout";
import React, { useState } from "react";
import Link from "next/link"
import MyProfile from "../components/ecommerce/Dashboard/MyProfile";
import MyOrders from "../components/ecommerce/Dashboard/MyOrders";
import MyAddress from "../components/ecommerce/Dashboard/MyAddress";
function Account() {
    const [activeIndex, setActiveIndex] = useState(1);

    const handleOnClick = (index) => {
        setActiveIndex(index); // remove the curly braces
    };
    return (
        <>
            <Layout parent="Home" sub="Pages" subChild="Account">
                <section className="pt-150 pb-150">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="dashboard-menu">
                                            <ul
                                                className="nav flex-column"
                                                role="tablist"
                                            >
                                                <li className="nav-item" onClick={() => handleOnClick(1)}>
                                                    <a
                                                        className={activeIndex === 1 ? "nav-link active" : "nav-link"}
                                                        
                                                    >
                                                        <i className="fi-rs-settings-sliders mr-10"></i>
                                                        Dashboard
                                                    </a>
                                                </li>
                                                <li className="nav-item" onClick={() => handleOnClick(2)}>
                                                    <a
                                                        className={activeIndex === 2 ? "nav-link active" : "nav-link"}
                                                        
                                                    >
                                                        <i className="fi-rs-user mr-10"></i>
                                                        MY Profile
                                                    </a>
                                                </li>
                                                <li className="nav-item" onClick={() => handleOnClick(3)}>
                                                    <a
                                                        className={activeIndex === 3 ? "nav-link active" : "nav-link"}
                                                        
                                                    >
                                                        <i className="fi-rs-shopping-bag mr-10"></i>
                                                        My Orders
                                                    </a>
                                                </li>
                                                <li className="nav-item" onClick={() => handleOnClick(4)}>
                                                    <a
                                                        className={activeIndex === 4 ? "nav-link active" : "nav-link"}
                                                        
                                                    >
                                                        <i className="fi-rs-marker mr-10"></i>
                                                        My Address
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/page-login-register">
                                                    <a
                                                        className="nav-link"
                                                        
                                                    >
                                                        <i className="fi-rs-sign-out mr-10"></i>
                                                        Logout
                                                    </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="tab-content dashboard-content">
                                            <div
                                                className={activeIndex === 1 ? "tab-pane fade show active" : "tab-pane fade"}
                                                id="dashboard"
                                                role="tabpanel"
                                                aria-labelledby="dashboard-tab"
                                            >
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5 className="mb-0">
                                                            Hello Aman!
                                                        </h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <p>
                                                            From your account
                                                            dashboard. you can
                                                            easily check &amp;
                                                            view your &nbsp;
                                                            <a href="#">
                                                                recent orders
                                                            </a>&nbsp;
                                                            , manage your &nbsp;
                                                            <a href="#">
                                                                shipping and
                                                                billing
                                                                addresses
                                                            </a>&nbsp;
                                                            and&nbsp;
                                                            <a href="#">
                                                                edit your
                                                                password and
                                                                account details.
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className={activeIndex === 2 ? "tab-pane fade show active" : "tab-pane fade"}
                                                id="account-detail"
                                                role="tabpanel"
                                                aria-labelledby="account-detail-tab"
                                            >
                                                <MyProfile />
                                            </div>
                                            <div
                                                className={activeIndex === 3 ? "tab-pane fade show active" : "tab-pane fade"}
                                                id="orders"
                                                role="tabpanel"
                                                aria-labelledby="orders-tab"
                                            >
                                                <MyOrders />
                                            </div>
                                            <div
                                                className={activeIndex === 4 ? "tab-pane fade show active" : "tab-pane fade"}
                                                id="address"
                                                role="tabpanel"
                                                aria-labelledby="address-tab"
                                            >
                                                <MyAddress />
                                            </div>
                                        </div>
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

export default Account;
