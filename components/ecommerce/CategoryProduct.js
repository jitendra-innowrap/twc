import { useState } from 'react';
import { useRouter } from 'next/router';

const CategoryProduct = ({ sub_categories }) => {
  const router = useRouter();
  const [visibleCategories, setVisibleCategories] = useState(5);

  const selectCategory = (e, sub_category) => {
    e.preventDefault();
    const { category } = router.query;
    router.push(`/${category}/${sub_category}`);
  };

  const handleSeeMore = () => {
    setVisibleCategories((prevVisibleCategories) => prevVisibleCategories + 5);
  };

  const handleSeeLess = () => {
    setVisibleCategories(5);
  };

  return (
    <>
      <ul className="categories">
        {/* <li onClick={(e) => selectCategory(e, '')}>
          <a>All</a>
        </li> */}
        {sub_categories?.slice(0, visibleCategories)?.map((sub_category, i) => (
          <li key={i} onClick={(e) => selectCategory(e, `${sub_category.handle}`)}>
            <a>{sub_category.name}</a>
          </li>
        ))}
      </ul>
      {sub_categories?.length > 5 && (
        <div className="see-more-container">
          {visibleCategories < sub_categories.length ? (
            <button className="see-more-btn" onClick={handleSeeMore}>
              See More
            </button>
          ) : (
            <button className="see-less-btn" onClick={handleSeeLess}>
              See Less
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default CategoryProduct;
