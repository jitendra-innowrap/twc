import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { IoCloseCircleSharp } from 'react-icons/io5'
import storage from '../../../util/localStorage'
import Popup from 'reactjs-popup'

export default function Location({ cities, closeSidebar }) {
    const [selectedCity, SelectCity] = useState(cities?.[0])
    useEffect(() => {
        let selected = storage.get("preferred_location");
        if (selected) {
            SelectCity(selected)
        }else{
            SelectCity(cities?.[0])
        }
    }, [cities])

    const handleSelect = (region) => {
        SelectCity(region);
        let preferred_location = cities.find(city => city.id == region.id);
        storage.set("preferred_location", preferred_location);
    }
    return (

        <Popup
            trigger={<a className="language-dropdown-active" onClick={closeSidebar}>
                <i className="fi-rs-marker mr-5"></i>
                {selectedCity?.region_name}
                <i className="fi-rs-angle-small-down"></i>
            </a>}
            modal
            className='location'
            lockScroll
            onOpen={() => closeSidebar()} // Close sidebar when popup opens
            position="right center"
        >
            {
                (close) => (
                    <div className='location-container'>
                        <div className="section-close p-1 cursor_pointer" onClick={close}><IoCloseCircleSharp color='#808080' size={24} /></div>
                        <div className="location-wrapper">
                            <h3 className="title text-center">Please Select Your City</h3>
                            <div className="d-flex city-layout">
                                {
                                    cities?.map((region, i) => (
                                        <div className={`city-card ${region?.id === selectedCity?.id && 'selected'}`} key={i} onClick={() => handleSelect(region)}>
                                            <div className="city-image">
                                                <Image
                                                    src={region?.image}
                                                    // src='https://innowrap.s3.ap-south-1.amazonaws.com/twc/images/collection_mapping/event-category-3.jpg'
                                                    width={100}
                                                    height={100}
                                                    className='city-icon'
                                                    quality={80}
                                                />
                                                {region?.id === selectedCity?.id && <div className="check"><FaCheckCircle color="#39b4ac" size={20} /></div>}
                                            </div>
                                            <div className="city-name">{region?.region_name}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </Popup>

    )
}
