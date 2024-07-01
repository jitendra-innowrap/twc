import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateProductFilters } from "../../redux/action/productFiltersAction";
import { useRouter } from "next/router";

const SizeFilter = () => {
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
      setActive(size)
    }, [router.query])
    

    const handleClick = (size) => {
        setActive(prev => active == prev ? "all" : size);
        router.replace({
            query: { ...router.query, size: size === active ? "all" : size, page:1 },
        });
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



const mapDidpatchToProps = {
    updateProductFilters,
};

export default connect(null, mapDidpatchToProps)(SizeFilter);
