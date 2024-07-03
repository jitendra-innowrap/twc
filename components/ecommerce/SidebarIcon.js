
const SideBarIcons = ({
    totalCartItems='1',
    totalCompareItems='1',
    totalWishlistItems='1',
}) => {
    return (
        <>
            <div className="right-sidebar-popup-btn">
                <div className="popup-btn cart" >
                    {/* <i className="icofont-basket"></i>  */}
                    Cart
                    <span> {totalCartItems}</span>
                </div>
                <div className="popup-btn wishlist">
                    {/* <i className="icofont-heart"></i> */}
                    Wishlist
                    <span> {totalWishlistItems}</span>
                </div>

                <div
                    className="popup-btn compare"
                    style={{ top: "60%" }}
                >
                    {/* <i className="icofont-binoculars"></i>  */}
                    compare
                    <span> {totalCompareItems}</span>
                </div>
            </div>
        </>
    );
};

export default SideBarIcons;
