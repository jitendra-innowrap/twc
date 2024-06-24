import { useRouter } from "next/router";
import { connect } from "react-redux";
import { updateProductCategory } from "../../redux/action/productFiltersAction";

const CategoryProduct = ({ updateProductCategory, sub_categories }) => {
    const router = useRouter();

    const removeSearchTerm = () => {
        // router.push({
        //     pathname: "/products",
        // });
    };

    const selectCategory = (e, sub_category) => {
        e.preventDefault();
        removeSearchTerm();
        // updateProductCategory(category);
        const {category} = router.query;
        console.log(router)
        router.push(`/${category}/${sub_category}`)
    };
    return (
        <>
            <ul className="categories">
                <li onClick={(e) => selectCategory(e, "")}>
                    <a>All</a>
                </li>
                {
                    sub_categories.map((sub_category, i) => (
                        <li onClick={(e) => selectCategory(e, `${sub_category.handle}`)}>
                            <a>{sub_category.name}</a>
                        </li>
                    ))
                }
            </ul>
        </>
    );
};

export default connect(null, { updateProductCategory })(CategoryProduct);
