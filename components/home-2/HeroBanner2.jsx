import React from 'react'
import HeroSearch from '../ecommerce/HeroSearch'

export default function HeroBanner2({data}) {
    return (
        <div className="hero-slider-1 dot-style-1 dot-style-1-position-1 position-relative">
            <img
                className="animated slider-1-1"
                src={data[0]?.image?data[0]?.image:"/assets/imgs/home-page/hero_banner.png"}
                alt={data[0]?.title}
            />
            <div className="search-style-2 hero-search position-absolute">
            <img src="/assets/imgs/home-page/hero-title.png" className="hero_title_image"/>
                <HeroSearch />
            </div>
        </div>
    )
}
