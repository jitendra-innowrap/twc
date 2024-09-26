import Head from "next/head";
import { useState } from "react";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import Header from "./Header";
import MobileMenu from "./MobileMenu";

const Layout = ({ children, classList, parent, subLink, sub, subChild, noBreadcrumb, noFooter, headerStyle }) => {
    const [isToggled, setToggled] = useState(false);
    const toggleClick = () => {
        setToggled(!isToggled);
        isToggled ? document.querySelector("body").classList.remove("mobile-menu-active") : document.querySelector("body").classList.add("mobile-menu-active");
    };

    return (
        <>
            <Head>
                <meta charSet='UTF-8' />
                <meta
                    name='robots'
                    content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
                />
                <meta property='og:locale' content='en_US' />
                <meta name='author' content='The Party Cafe' />
                <meta property='og:image:width' content='920' />
                <meta property='og:image:height' content='470' />
                <meta name='twitter:card' content='summary_large_image' />
                <meta
                    property='og:site_name'
                    content='The Party Cafe - Rent Outfits and Book Event Organization Services'
                />
                <meta
                    name='keywords'
                    content='outfit rental, event organization, party, celebration, event planning'
                />
                <title>The Party Cafe</title>
                <meta name="description" content="Rent outfits and book event organization services with The Party Cafe" />
                <meta property='og:image' content={`${process.env.NEXT_PUBLIC_BASE_URL}/layout/og-image.png`} />
                <link rel="icon" href="/favicon.ico" />
                <style>@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Spartan:wght@300;400;500;600;700&display=swap');</style>




                {/* Google Tag Manager */}
                <script
                
                dangerouslySetInnerHTML={{
                    __html: `
                    (function(w,d,s,l,i){
                        w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});
                        var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                        j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                        f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-MHGVLPLH');
                    `,
                }}
                />
                {/* Google Tag Manager (noscript) */}
                <noscript>
                <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-MHGVLPLH"
                    height="0"
                    width="0"
                    style={{ display: 'none', visibility: 'hidden' }}
                />
                </noscript>

                {/* Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-VFQPJ2J8ND"></script>
                <script
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-VFQPJ2J8ND');
                    `,
                }}
                />

            </Head>

            {isToggled && <div className="body-overlay-1" onClick={toggleClick}></div>}

            <Header classList={classList} headerStyle={headerStyle} isToggled={isToggled} toggleClick={toggleClick} />
            <MobileMenu isToggled={isToggled} toggleClick={toggleClick} />
            <main className={`main ${classList}`}>
                <Breadcrumb parent={parent} sub={sub} subLink={subLink} subChild={subChild} noBreadcrumb={noBreadcrumb} />
                {children}
            </main>
            {!noFooter && <Footer />}
        </>
    );
};

export default Layout;