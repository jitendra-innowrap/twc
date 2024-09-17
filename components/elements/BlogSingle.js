import React from "react";
import Link from "next/link"

const BlogSingle = ({blogDetail}) => {
    console.log(blogDetail)
    return (
        <>
            <div className="single-page pl-30">
                <div className="single-header style-2">
                    <h1 className="mb-30">
                        {blogDetail?.title}
                    </h1>
                    <div className="single-header-meta">
                        <div className="entry-meta meta-1 font-xs mt-15 mb-15">
                           { blogDetail?.author && <span className="post-by">
                                By <a href="#">{blogDetail?.author || "Unknown"}</a>
                            </span>}
                            {blogDetail?.blog_post_date && <span className={`post-on ${blogDetail?.author?'has-dot':''}`}>{blogDetail?.blog_post_date}</span>}
                        </div>
                    </div>
                </div>
                <figure className="single-thumbnail">
                    <img src={blogDetail?.image} alt={blogDetail?.title} />
                </figure>
                <div className="single-content" dangerouslySetInnerHTML={{ __html: blogDetail?.blog_content }}></div>
            </div>
        </>
    );
};

export default BlogSingle;
