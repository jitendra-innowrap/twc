import { useState } from 'react';
import { useRouter } from 'next/router';

const CategoryProduct = ({ sub_categories, mobile, setselectedSub_category, selectedSub_category }) => {
  const router = useRouter();
  const [visibleCategories, setVisibleCategories] = useState(5);

  const selectCategory = (e, sub_category) => {
    e.preventDefault();
    const { category } = router.query;
    if(mobile){
      setselectedSub_category(sub_category);
    }else{
      router.push(`/products/${category}/${sub_category}`);
    }
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
        {sub_categories?.slice(0, visibleCategories)?.map((sub_category, i) =>
        
        (
          <li key={i} className={`${selectedSub_category == sub_category?.handle ? 'active' : ''}`}
          data2={selectedSub_category}
          data={sub_category?.name?.toLowerCase()}
          onClick={(e) => selectCategory(e, `${sub_category.handle}`)}
          >
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
