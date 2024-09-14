import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getSearchProducts } from "../../util/api";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import useClickOutside from "../../util/outsideClick";

const SearchMobile = ({toggleSearch}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const [highlightedIndex, setHighlightedIndex] = useState(-1); // Track the highlighted index
    const [searchList, setsearchList] = useState([]);
    const [openSearchList, setOpenSearchList] = useState(false)

    const handleInput = (e) => {
        setSearchTerm(e.target.value)
        if(!openSearchList){
            setOpenSearchList(true);
        }
        fetchSearchlist();
        if (e.key === "Enter") {
            e.preventDefault(); 
            // handleSearch();
        }else if (e.key === "ArrowDown") {
            // Move down the list
            setHighlightedIndex((prevIndex) => 
                prevIndex < searchList?.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === "ArrowUp") {
            // Move up the list
            setHighlightedIndex((prevIndex) => 
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        }
    };

    const handleSearch=(handle)=>{
        router.push({
            pathname: `/products/detail/${handle}`,
        });
        toggleSearch();
        // setSearchTerm("")
        setOpenSearchList(false)
    }

    const fetchSearchlist = async (keyword)=>{
        try {
            const res = await getSearchProducts(keyword);
            console.log(res);
            setsearchList(res.result)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(searchTerm) fetchSearchlist(searchTerm);
        
      router.replace({
        query: { ...router.query, keyword:searchTerm },
        });
    }, [searchTerm]);

    let domNode = useClickOutside(() => {
        toggleSearch();
        console.log('search out')
    });
    
    return (
        <>
            <div className="mobile-search search-style-3 mobile-header-border" style={{paddingBottom:'7px'}} ref={domNode}>
                            <form action="#" onSubmit={(e)=>{e.preventDefault();}}>
                                <button type="button" style={{left:'0', width:'min-content'}} onClick={toggleSearch}><BsArrowLeft /></button>
                                <input 
                                    value={searchTerm}
                                    onChange={(e) => handleInput(e)}
                                    type="text" placeholder="Search for items…" 
                                    style={{paddingLeft:'40px'}} 
                                />
                                <button type="submit">
                                    <i className="fi-rs-search"></i>
                                </button>
                            </form>
                            {searchTerm.length > 0 &&<ul className={`${openSearchList?'open':""}`}>
                    {searchList?.map((item, index)=>{
                        return<li onClick={()=>{handleSearch(item?.handle)}}>
                        <div className={`search-item $ ${highlightedIndex===index?'highlighted':''}`}>
                            <img 
                                width={32}
                                height={32}
                                src={item?.product_images?.file}
                                quality={100}
                            />
                            <div className="right">
                                <h3>{item?.name}</h3>
                                <p>{item?.category_name}</p>
                            </div>
                        </div>
                    </li>
                    })}
                </ul>}
                        </div>
        </>
    );
};

export default SearchMobile;
