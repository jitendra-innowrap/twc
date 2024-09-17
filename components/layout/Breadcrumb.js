
import Link from "next/link";

const Breadcrumb = ({parent, sub, subChild, subLink, noBreadcrumb}) => {
    return (
        <>
            <div className={`page-header breadcrumb-wrap ${noBreadcrumb}`}>
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/"><a>
                            {parent}
                        </a>
                        </Link>
                            <div className="sub">
                                <span></span> 
                                {subLink ?<Link href={subLink}>{sub}</Link> :sub}
                            </div>
                            {subChild &&
                        <div className="sub">
                            <span></span>
                            {subChild}
                        </div>
                            } 
                    </div>
                </div>
            </div>
        </>
    );
};

export default Breadcrumb;
