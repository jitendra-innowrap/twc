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
import { loginApi, logOutApi } from "../util/api";
import { Bounce, toast } from "react-toastify";
import { RiMenuFoldFill } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import Logout from "../components/ecommerce/Dashboard/Logout/Logout";
import Popup from "reactjs-popup";
function Account() {
    const [activeIndex, setActiveIndex] = useState(1);
    const router = useRouter();
    const {tab} = router.query;
    const auth_token = storage.get("auth_token");
    const [breadCrumTitle, setBreadCrumTitle] = useState('')
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu =()=>{
        setMenuOpen(!menuOpen);
    }
    const isPhone = useMediaQuery({
        query: '(max-width: 768px)'
      })
    useEffect(() => {
        if(!auth_token){
            router.push('/page-login-register')
        }
        let index = parseInt(tab);
        setActiveIndex(index);
        if(index===3){
            setActiveIndex(index)
            setBreadCrumTitle('My Address');
        }else if(index===2){
            setActiveIndex(index);
            setBreadCrumTitle('My Orders');
        }else{
            setActiveIndex(1);
            setBreadCrumTitle('My Profile')
        }
    }, [router.query])
    
    const dispatch = useDispatch();

    const handleEmptyCart = () => {
        dispatch(emptyCart());
    };

    const handleOnClick = (index) => {
        router.replace({
            query: { tab:index },
            });
            toggleMenu();
    };

    const handleLogout = async () =>{
        const res = await logOutApi();
        if(res.code==1){
            handleEmptyCart();
            router.push('/page-login-register');
            const randomString = Math.random().toString(36).substring(2);
            const token = btoa(randomString);
            storage.set("web_token", token);
            storage.set("auth_token", null);
            toast.success("logged Out Successfully!", {
                position: "bottom-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
        }else{
            console.log(res.msg)
            toast.error("Something went wrong!", {
                position: "bottom-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
        }
    }

    return (
        <>
            {<Layout parent="Home" sub="Account" subChild={breadCrumTitle}>
                <section className="pt-70 pb-150">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="row">
                                    <div className="col-md-4 position-relative">
                                        <div className={`dashboard-menu ${menuOpen?'dashboard-menu-active':''}`}>
                                            <ul
                                                className="nav flex-column"
                                                role="tablist"
                                            >
                                                {isPhone &&<li className="nav-item mb-20">
                                                    <a
                                                        className={"nav-link active"}
                                                        
                                                    >
                                                        Dashboard
                                                        <span onClick={toggleMenu}><RiMenuFoldFill  style={{position:'absolute', right:'10px', fontSize:'25px'}}/></span>
                                                    </a>
                                                </li>}
                                                <li className="nav-item"  onClick={() => handleOnClick(1)}>
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
                                                    
                                                    <Popup
                                                trigger={<a
                                                    className="nav-link"
                                                >
                                                    <i className="fi-rs-sign-out mr-10"></i>
                                                    Logout
                                                </a>}
                                                modal
                                                position="right center"
                                            >
                                                {
                                                    (close) => (
                                                        <Logout close={close} handleLogout={handleLogout} />
                                                    )
                                                }
                                            </Popup>
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
