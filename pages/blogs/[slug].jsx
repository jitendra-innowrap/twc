import Head from "next/head";
import BlogSingle from "../../components/elements/BlogSingle";
import Layout from "../../components/layout/Layout";
import { getBlogDetail } from "../../util/api";
function PageBlogSingle({ blogDetail, slug, host }) {
    const blogTitle = blogDetail?.[0]?.title || 'Blog Post';
    const author = blogDetail?.[0]?.author || 'The Party Cafe';
    const blogDescription = blogDetail?.[0]?.blog_content
    ? blogDetail[0].blog_content.substring(0, 100) + (blogDetail[0].blog_content.length > 100 ? "..." : "")
    : 'Blog description';
    const blogImage = blogDetail?.[0]?.image || '/default-image.jpg'; // Use a default image if none is provided
    const blogUrl = `${host}/blogs/${slug}`; // Dynamic host based on environment

    return (
        <>
            <Head>
                {/* Primary Meta Tags */}
                <title>{blogTitle}</title>
                <meta name="description" content={blogDescription} />
                <meta name="keywords" content="blog, article, news, latest updates" />
                <meta name="author" content={author} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={blogTitle} />
                <meta property="og:description" content={blogDescription} />
                <meta property="og:image" content={blogImage} />
                <meta property="og:url" content={blogUrl} /> {/* Dynamic URL here */}

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content={blogImage} />
                <meta name="twitter:title" content={blogTitle} />
                <meta name="twitter:description" content={blogDescription} />
                <meta name="twitter:image" content={blogImage} />

                {/* Optional - Set the page language */}
                <meta httpEquiv="content-language" content="en" />
            </Head>
            <Layout parent="Home" subLink="/blogs" sub="Blogs" subChild={slug}>
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

// This function runs on the server for each request
export async function getServerSideProps(context) {
    const { slug } = context.params;
    const req = context.req;

    // Corrected: Use req.headers.host, as there's no 'hostname' header
    const hostname = req.headers.host || 'localhost'; // Fallback to 'localhost' if host is unavailable

    // Get the protocol (consider x-forwarded-proto for proxies)
    const protocol = req.headers['x-forwarded-proto'] || 'http'; // Detect protocol (http/https)

    // Full URL including protocol and hostname
    const host = `${protocol}://${hostname}`;

    try {
        // Fetch blog detail based on slug
        const res = await getBlogDetail(slug);
        
        // Check for valid response and blog data
        if (res?.code === 1) {
            return {
                props: {
                    blogDetail: res.blogs_data || [], // Pass blog data to the component
                    slug,
                    host
                },
            };
        } else {
            console.error('Error fetching blog data:', res?.msg);
            return {
                notFound: true, // Return 404 page if there is an error
            };
        }
    } catch (error) {
        console.error('Error fetching blog data:', error);
        return {
            notFound: true, // Return 404 page if fetching fails
        };
    }
}

export default PageBlogSingle;
