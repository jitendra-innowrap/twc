const siteUrl = 'https://www.thepartycafe.com';
module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            { userAgent: "*", disallow: ["/checkout-fail", "/checkout-success", "/my-orders/*", "/my-profile", "/shop-cart", "/shop-wishlist"] },
            { userAgent: "*", allow: "/" }
        ],
        additionalSitemaps: [`${siteUrl}/servser.sitemap.xml`]
    },
    exclude: [
        "/checkout-fail",
        "/checkout-success",
        "/my-orders/*",
        "/my-profile",
        "/shop-cart",
        "/shop-wishlist",
    ]
}