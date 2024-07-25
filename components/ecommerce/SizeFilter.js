import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SizeFilter = ({mobile, setFilters}) => {
    const router = useRouter();
    const { size } = router.query;
    const [active, setActive] = useState(size?size:"all");

    const sizes = [
        {value: "all"},
        {value: "s"},
        {value: "m"},
        {value: "l"},
        {value: "xl"},
    ];

    useEffect(() => {
        if(!mobile){
            setActive(size)
        }
    }, [router.query])
    

    const handleClick = (size) => {
        if (mobile) {
            setActive(size)
            setFilters(prev => ({
                ...prev,
                size: size === active ? "all" : size
            }));            
        } else {
            setActive(prev => active == prev ? "all" : size);
            router.replace({
                query: { ...router.query, size: size === active ? "all" : size, page:1 },
            });
        }
    };

    return (
        <>
        <ul className="list-filter size-filter font-small">
        {sizes.map((tag, i) => (
                    <li
                        className={active == tag.value ? "active":""}
                        onClick={() => handleClick(tag.value)}
                        key={i}
                    >
                        <a>
                        {/* {i == 0 ? "All" : `${tag.value}`} */}
                        {tag.value}
                        </a>
                    </li>
                ))}
        </ul>
            
        </>
    );
};


export default SizeFilter;
