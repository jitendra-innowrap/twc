import Head from "next/head";
import { useState } from "react";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import Header from "./Header";
import MobileMenu from "./MobileMenu";

const Layout = ({ children, classList, parent, subLink, sub, subChild, noBreadcrumb, noFooter, headerStyle, host }) => {
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
                <meta
                    property='og:site_name'
                    content='The Party Cafe - Rent Outfits and Book Event Organization Services'
                />
                <meta
                    name='keywords'
                    content='outfit rental, event organization, party, celebration, event planning'
                />
                {/* Optional - Set the page language */}
                <meta httpEquiv="content-language" content="en" /><meta property='og:image' content={`${host}/layout/open-graph-image.png`} />
                <link rel="icon" href="/favicon.ico" />
                {/* Primary Meta Tags */}
                <title>The Party Cafe</title>
                <meta name="description" content="Rent outfits and book event organization services with The Party Cafe." />
                <meta name="author" content={"The Party Cafe"} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={"The Party Cafe"} />
                <meta property="og:description" content={'Rent outfits and book event organization services with The Party Cafe'} />
                <meta property="og:image" content={`${host}/layout/open-graph-image.png`} />
                <meta property="og:url" content={host} /> {/* Dynamic URL here */}

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content={`${host}/layout/open-graph-image.png`} />
                <meta name="twitter:title" content={"The Party Cafe"} />
                <meta name="twitter:description" content={'Rent outfits and book event organization services with The Party Cafe'} />
                <meta name="twitter:image" content={`${host}/layout/open-graph-image.png`} />

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
// getServerSideProps to dynamically retrieve hostname
export const getServerSideProps = async ({ context }) => {
    const req = context.req;
    const hostname = req.headers.hostname || req.headers.host;
    // Get the host name dynamically
    const protocol = req.headers['x-forwarded-proto'] || 'http'; // Detect protocol (http/https)
    const host = `${protocol}://${hostname}`; // Full URL including hostname

    return {
        props: {
            host, // Pass the dynamic hostname as a prop to the Layout component
        },
    };
};
export default Layout;