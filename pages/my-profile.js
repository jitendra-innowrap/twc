import Layout from "../components/layout/Layout";
import React, { useEffect, useState } from "react";
import Link from "next/link"
import MyProfile from "../components/ecommerce/Dashboard/MyProfile";
import MyOrders from "../components/ecommerce/Dashboard/MyOrders";
import MyAddress from "../components/ecommerce/Dashboard/MyAddress";
import { useRouter } from "next/router";
import storage from "../util/localStorage";
import { useDispatch } from "react-redux";
import { emptyCart } from "../redux/Slices/cartSlice";
function Account() {
    const [activeIndex, setActiveIndex] = useState(1);
    const router = useRouter();
    const tab = router.query.tab;
    const auth_token = storage.get("auth_token");

    useEffect(() => {
        handleOnClick(tab ? parseInt(tab, 10) : 1);
        if(!auth_token){
            router.push('/')
        }
    }, [])
    const dispatch = useDispatch();

    const handleEmptyCart = () => {
        dispatch(emptyCart());
    };

    const handleOnClick = (index) => {
        setActiveIndex(index); // remove the curly braces
    };

    const handleLogout = () =>{
        const randomString = Math.random().toString(36).substring(2);
        const token = btoa(randomString);
        storage.set("web_token", token);
        storage.set("auth_token", null);
        handleEmptyCart();
        router.push('/page-login-register')
    }

    return (
        <>
            {<Layout parent="Home" sub="Pages" subChild="Account">
                <section className="pt-70 pb-150">
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
                                                        <i className="fi-rs-user mr-10"></i>
                                                        My Profile
                                                    </a>
                                                </li>
                                                <li className="nav-item" onClick={() => handleOnClick(2)}>
                                                    <a
                                                        className={activeIndex === 2 ? "nav-link active" : "nav-link"}
                                                        
                                                    >
                                                        <i className="fi-rs-shopping-bag mr-10"></i>
                                                        My Orders
                                                    </a>
                                                </li>
                                                <li className="nav-item" onClick={() => handleOnClick(3)}>
                                                    <a
                                                        className={activeIndex === 3 ? "nav-link active" : "nav-link"}
                                                        
                                                    >
                                                        <i className="fi-rs-marker mr-10"></i>
                                                        My Address
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link"
                                                        onClick={handleLogout}
                                                    >
                                                        <i className="fi-rs-sign-out mr-10"></i>
                                                        Logout
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="tab-content dashboard-content">
                                            <div
                                                className={activeIndex === 1 ? "tab-pane fade show active" : "tab-pane fade"}
                                                id="account-detail"
                                                role="tabpanel"
                                                aria-labelledby="account-detail-tab"
                                            >
                                               {activeIndex === 1 && <MyProfile />}
                                            </div>
                                            <div
                                                className={activeIndex === 2 ? "tab-pane fade show active" : "tab-pane fade"}
                                                id="orders"
                                                role="tabpanel"
                                                aria-labelledby="orders-tab"
                                            >
                                                {activeIndex === 2 && <MyOrders />}
                                            </div>
                                            <div
                                                className={activeIndex === 3 ? "tab-pane fade show active" : "tab-pane fade"}
                                                id="address"
                                                role="tabpanel"
                                                aria-labelledby="address-tab"
                                            >
                                                {activeIndex === 3 && <MyAddress />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>}
        </>
    );
}

export default Account;
