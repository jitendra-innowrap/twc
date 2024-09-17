import { BsArrowRight } from "react-icons/bs";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import { getBlogs } from "../util/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Blogs({}) {
    let Router = useRouter();

    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
      fetchBlogs();
    }, [Router.query])
    
    const fetchBlogs = async () => {
        try {
            const res = await getBlogs();
            console.log(res.blogs_data)
            if (res?.code === 1) {
                setBlogs(res.blogs_data);
            } else {
                console.error('Error !', res?.msg)
            }
        } catch (error) {
            console.error(error)
        }

    }
    return (
        <>
            <Layout parent="Home" sub="Blogs" subChild="">
                
                <section id="work" className="pt-50 pb-50">
                    <div className="container">
                        <div class="row loop-grid blog-section">
                            {
                                blogs?.map((blog)=>(
                                    <div class="col-lg-4" key={blog.id}>
                                        <article class="wow fadeIn animated hover-up">
                                            <div class="post-thumb img-hover-scale">
                                                <Link href={`/blogs/${blog?.handle}`}>
                                                    <a><img src={blog?.image} alt={blog?.title} 
                                                    style={{height:'260px', objectFit:'cover', width:'100%'}} 
                                                    /></a>
                                                </Link>
                                            </div>
                                            <div class="entry-content-2">
                                                <h3 class="post-title mb-15">
                                                    <Link href={`/blogs/${blog?.handle}`}>
                                                        <a>{blog?.title}</a>
                                                    </Link>
                                                </h3>
                                                <div class="post-exerpt mb-30" dangerouslySetInnerHTML={{ __html: blog?.blog_content }}></div>
                                                <div class="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                                    <div><span class="post-on"><i class="fi-rs-clock"></i> {blog?.blog_post_date || 'unknown'}</span></div>
                                                    <Link href={`/blogs/${blog?.handle}`}>
                                                        <a className="post-link" >Read more <BsArrowRight /></a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="single-content mt-50">
                            <h4>Contact Us</h4>
                            <p>
                            If you have any questions about our press releases or would like to request more information, please don't hesitate to reach out. We're always happy to help., please{" "}
                                <Link href="/contact-us">
                                    <a>contact us</a>
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default Blogs;
