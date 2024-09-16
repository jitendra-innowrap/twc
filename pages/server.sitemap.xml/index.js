import { getServerSideSitemap, getServerSideSitemapLegacy } from "next-sitemap"
import { getAllCategory } from "../../util/api";
const siteUrl = 'https://www.thepartycafe.com';

export const getServerSideProps = async ( ctx )=>{
    const response = await getAllCategory();
    const menu = (response.data.result);
    const fields = menu.flatMap((menuItem) => {
        return menuItem.categories?.flatMap((category, i) => {
            return category?.sub_categories.map((sub_category, i2) => {
                return {
                    loc: `${siteUrl}/products/${category.handle}/${sub_category.handle}`,
                    lastmod: new Date().toISOString(),
                };
            }) || []; // In case sub_categories is undefined
        }) || []; // In case categories is undefined
    });    
    return getServerSideSitemapLegacy(ctx, fields)
}
export default function Site(){}