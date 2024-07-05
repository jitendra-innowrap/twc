import "react-perfect-scrollbar/dist/css/styles.css";
import "react-responsive-modal/styles.css";
import { wrapper } from "../redux/store";
import StorageWrapper from "../components/ecommerce/storage-wrapper";
import "../public/assets/css/main.css";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Swiper Slider
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Preloader from "./../components/elements/Preloader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(false);
    const queryClient = new QueryClient()

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        if (typeof window !== "undefined") {
            window.WOW = require("wowjs");
        }
        new WOW.WOW().init();
    }, []);
    return (
        <>
            {!loading ? (
                <QueryClientProvider client={queryClient} >
                        <StorageWrapper>
                        <ToastContainer />
                                <Component {...pageProps} />
                        </StorageWrapper>
                </QueryClientProvider>
            ): (
                <Preloader />
            )} 
        </>
    );
}

export default wrapper.withRedux(MyApp);