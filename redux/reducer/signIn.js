import storage from "../../util/localStorage";
import * as Types from "../constants/actionTypes";

let initialState = {
    auth_token: "",
    user: {

    },
    isLoggedIn:false,
}
export default (state = initialState, action) => {
    let index = null;

    switch (action.type) {
        case Types.INIT_LOCALSTORAGE:
            return {
                ...action.payload.user
            };

        case Types.SIGN_IN:
            storage.set("dokani_user", action.payload);
            alert('saved', action.payload.auth_token)
            return {...action.payload};

        case Types.LOG_OUT:
            storage.set("dokani_user", {});
            return 

        default:
            return state;
    }
};
