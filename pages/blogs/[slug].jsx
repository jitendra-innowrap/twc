import { useRouter } from "next/router";
import BlogSingle from "../../components/elements/BlogSingle";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import { getBlogDetail } from "../../util/api";


function PageBlogSingle() {
    const router = useRouter();
    const {slug} = router.query;

    const [blogDetail, setBlogDetail] = useState([]);
    useEffect(() => {
      fetchBlogDetail();
    }, [router.query])
    
    const fetchBlogDetail = async () => {
        try {
            const res = await getBlogDetail(slug);
            console.log(res)
            if (res?.code === 1) {
                setBlogDetail(res?.blogs_data);
            } else {
                console.error('Error !', res?.msg)
            }
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <>
            <Layout parent="Home" subLink="/blogs" sub="Blog" subChild={slug}>
                <section className="mt-50 mb-50">
                    <div className="container custom">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <BlogSingle blogDetail={blogDetail?.[0]} />
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default PageBlogSingle;
