import React from 'react'
import Search from '../ecommerce/Search'

export default function HeroBanner2({data}) {
    return (
        <div className="hero-slider-1 dot-style-1 dot-style-1-position-1 position-relative">
            <img
                className="animated slider-1-1"
                src={data[1].image}
                alt={data[1].title}
            />
            <div className="search-style-2 position-absolute">
                <Search />
            </div>
        </div>
    )
}
