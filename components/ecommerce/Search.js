import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getSearchProducts } from "../../util/api";
import Image from "next/image";
import Link from "next/link";
import useClickOutside from "../../util/outsideClick";

const Search = () => {
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
            router.replace({
                query: { ...router.query, keyword:searchTerm },
            });
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
        setSearchTerm("")
        setOpenSearchList(false)
    }

    const fetchSearchlist = async (keyword)=>{
        try {
            const res = await getSearchProducts(keyword);
            setsearchList(res.result)
            console.log(res.result)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      fetchSearchlist(searchTerm);
        
    }, [searchTerm])
    
    let domNode = useClickOutside(() => {
        setOpenSearchList(false);
    });

    return (
        <>
            <form ref={domNode}>  
                <input
                    value={searchTerm}
                    // onKeyDown={handleInput}
                    onChange={(e) => handleInput(e)}
                    type="text"
                    placeholder="Search for products, events or more"
                />
                {searchTerm.length > 0 &&<ul className={`${openSearchList && 'open'}`}>
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
            </form>
        </>
    );
};

export default Search;
