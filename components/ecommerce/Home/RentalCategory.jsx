import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function RentalCategory({forHer, forHim}) {
    let herImage = forHer?.collection_image? forHer?.collection_image:"/assets/imgs/banner/For_Her.jpg";
    let hisTitle = forHer?.title? forHim?.title:"";
    let herTitle = forHer?.title? forHer?.title:"";
    let hisImage = forHer?.collection_image? forHim?.collection_image:"/assets/imgs/banner/For_Her.jpg";
    let herHandle = forHer?.collection_image? forHer?.collection_handle:"";
    let hisHandle = forHer?.collection_image? forHim?.collection_handle:"";
    return (
        <div className="container wow fadeIn animated">
            <h3 className="section-title text-center mb-20 title-underline">
                Browse Rental Category
            </h3>
            <div className="mt-md-5">
                <div className="rental-category">
                    <div className="rental-category-card">
                        <Link href={`/collection/${herHandle}`}>
                            <div
                                className="rental-category-card-img wow fadeIn animated"
                            >
                                <Image
                                    src={herImage}
                                    alt={herTitle}
                                    layout="fill"
                                    objectFit="cover"
                                    className="image"
                                />
                                <div className="">
                                    {/* <h5>For Her</h5> */}
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="rental-category-card">
                        <Link href={`/collection/${hisHandle}`}>
                        <div
                            className="rental-category-card-img wow fadeIn animated"
                        >
                            <Image
                                src={hisImage}
                                alt={hisTitle}
                                layout="fill"
                                className="image"
                                objectFit="cover"
                            />
                            <div className="deal-top">
                                {/* <h5>For him</h5> */}
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
