
import Lottie from "lottie-web";
import Link from "next/link";
import { useEffect } from "react";
import notFound from "../public/assets/Lottie/notFound.json"

function Custom404() {
    useEffect(() => {
        Lottie.loadAnimation({
          container: document.getElementById('animation'),
          animationData: notFound,
          renderer: 'svg',
          loop: true,
          autoplay: true,
        });
      }, []);
    return (
        <>
            <main className="main page-404">
                <div className="container">
                    <div className="row align-items-center height-100vh text-center">
                        <div className="col-lg-8 m-auto">
                        <div id="animation" style={{ width: 250, height: 250 , marginInline:"auto"}} />
                            <p className="font-lg text-grey-700 mb-30">
                                The link you clicked may be broken or the page
                                may have been removed.
                            </p>
                                <Link href="/">
                                    <a className="btn btn-default submit-auto-width font-xs hover-up">
                                        Back To Home Page
                                    </a>
                                </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Custom404;
