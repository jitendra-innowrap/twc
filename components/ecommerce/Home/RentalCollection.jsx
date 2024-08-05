import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'

export default function RentalCollection({data}) {
    let rentalCollectionData = {
        banner:{
            id:data.banner_collection?.[0]?.collection_mapping_id,
            image:data.banner_collection?.[0]?.collection_image,
            title:data.banner_collection?.[0]?.title,
            handle:data.banner_collection?.[0]?.collection_handle,
        },
        grid:[
            {
                id:data.rental_3?.[0]?.collection_mapping_id,
                image:data.rental_3?.[0]?.collection_image,
                title:data.rental_3?.[0]?.title,
                handle:data.rental_3?.[0]?.collection_handle,
            },
            {
                id:data.rental_4?.[0]?.collection_mapping_id,
                image:data.rental_4?.[0]?.collection_image,
                title:data.rental_4?.[0]?.title,
                handle:data.rental_4?.[0]?.collection_handle,
            },
            {
                id:data.rental_5?.[0]?.collection_mapping_id,
                image:data.rental_5?.[0]?.collection_image,
                title:data.rental_5?.[0]?.title,
                handle:data.rental_5?.[0]?.collection_handle,
            },
            {
                id:data.rental_6?.[0]?.collection_mapping_id,
                image:data.rental_6?.[0]?.collection_image,
                title:data.rental_6?.[0]?.title,
                handle:data.rental_6?.[0]?.collection_handle,
            },
            {
                id:data.rental_7?.[0]?.collection_mapping_id,
                image:data.rental_7?.[0]?.collection_image,
                title:data.rental_7?.[0]?.title,
                handle:data.rental_7?.[0]?.collection_handle,
            },
            {
                id:data.rental_8?.[0]?.collection_mapping_id,
                image:data.rental_8?.[0]?.collection_image,
                title:data.rental_8?.[0]?.title,
                handle:data.rental_8?.[0]?.collection_handle,
            },
        ]
    }

    return (
        <div className="wow fadeIn animated">
            <h3 className="section-title text-center mb-20 title-underline">
                Women's Rental Wear
            </h3>
            {/* <div className="rental-banner mt-15 mt-md-5">
                <div
                    className="rental-category-card-full image-press wow fadeIn animated"
                >
                    <Link href={`/collection/${rentalCollectionData.banner.handle}`} >
                    <img src={rentalCollectionData.banner.image} alt={rentalCollectionData.banner.title} />
                    </Link>
                </div>
            </div> */}
            {/* <div className="rental-collection-grid mt-20">
                {
                    rentalCollectionData.grid.map((collection)=>(
                        <div key={collection.id}
                            className="rental-collection-card-img wow fadeIn image-press animated"
                        >
                        <Link href={`/collection/${collection.handle}`}>
                            <img src={collection.image} alt={collection.title} />
                        </Link>
                        </div>
                        
                    ))
                }
            </div> */}
            <div className="overlay-grid-banner">
                <div className="overlay-image">
                    <div className="img-wrapper">
                        <div className="img"style={{
                    backgroundImage: `url('${rentalCollectionData.banner.image}')`}}></div>
                    </div>
                </div>
                <div className="d-flex container">
                    <div className="left-content col-6 px-5">
                        <div className="title">Women's Rentals</div>
                        <p>A Spectacular assortment of <br></br>
                        minimal yet alluring styles</p>
                        <Link href={`/collection/${rentalCollectionData.banner.handle}`}>
                            <div className="collection-btn">Shop Now <span><FaArrowRight /></span></div>
                        </Link>
                    </div>
                    <div className="right-grid col-6 px-5">
                        {
                            rentalCollectionData.grid.slice(0,4).map((collection)=>(
                                <div key={collection.id}
                                    className="right-grid-overlay cursor_pointer wow fadeIn animated"
                                >
                                <Link href={`/collection/${collection.handle}`}>
                                    <img src={collection.image} alt={collection.title} />
                                </Link>
                                </div>
                                
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
