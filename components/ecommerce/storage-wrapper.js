import React, { useEffect } from "react";
import storage from "../../util/localStorage";



const StorageWrapper = ({children}) => {
    const saveStoredItems = (storedItems) => (dispatch) => {
        dispatch({
            type: Types.INIT_LOCALSTORAGE,
            payload: { ...storedItems },
        });
    };
    useEffect(() => {
        const cart = storage.get("dokani_cart") || [];
        const wishlist = storage.get("dokani_wishlist") || [];
        const compare = storage.get("dokani_compare") || [];
        const user = storage.get("dokani_user") || {token:"randometoken"};

        saveStoredItems({ cart, wishlist, compare, user });
    }, []);

    return <>{children}</>;
};

export default StorageWrapper;
