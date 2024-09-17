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