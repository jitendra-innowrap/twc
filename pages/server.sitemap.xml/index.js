import { getServerSideSitemap, getServerSideSitemapLegacy } from "next-sitemap"
import { getAllCategory } from "../../util/api";
const siteUrl = 'https://www.thepartycafe.com';

export const getServerSideProps = async ( ctx )=>{
    const response = await getAllCategory();
    const menu = (response.data.result);
    const fields = menu.flatMap((menuItem) => {
        console.log(menuItem);
        return menuItem.categories?.flatMap((category, i) => {
            console.log(category);
            return category?.sub_categories.map((sub_category, i2) => {
                console.log(`${siteUrl}/products/${category.handle}/${sub_category.handle}`);
                return {
                    loc: `${siteUrl}/products/${category.handle}/${sub_category.handle}`,
                    lastmod: new Date().toISOString(),
                };
            }) || []; // In case sub_categories is undefined
        }) || []; // In case categories is undefined
    });
    
    console.log(fields);
    
    return getServerSideSitemapLegacy(ctx, fields)
}
export default function Site(){}