import "react-perfect-scrollbar/dist/css/styles.css";
import "react-responsive-modal/styles.css";
import { wrapper } from "../redux/store";
import StorageWrapper from "../components/ecommerce/storage-wrapper";
import "../public/assets/css/main.css";
import "../public/assets/css/revised-homepage.css";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

// Swiper Slider
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Preloader from "./../components/elements/Preloader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const NEXT_PUBLIC_GTA_ID = "GTM-MHGVLPLH"
const NEXT_PUBLIC_GA_ID = "G-VFQPJ2J8ND"
function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(false);
    const queryClient = new QueryClient()

    useEffect(() => {

        // // Function to check if the device is iOS
        const isIOS = () => {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
        };

        // Disable zooming on iOS devices
        if (isIOS()) {
            const viewportMeta = document.createElement('meta');
            viewportMeta.name = 'viewport';
            viewportMeta.content = 'width=device-width, initial-scale=1.0, user-scalable=no';
            document.getElementsByTagName('head')[0].appendChild(viewportMeta);
        }
        
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
                                <GoogleTagManager gtmId={NEXT_PUBLIC_GTA_ID} />
                                <GoogleAnalytics gaId={NEXT_PUBLIC_GA_ID} />
                        </StorageWrapper>
                </QueryClientProvider>
            ): (
                <Preloader />
            )} 
        </>
    );
}

export default wrapper.withRedux(MyApp);