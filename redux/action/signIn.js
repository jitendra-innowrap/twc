import * as Types from '../constants/actionTypes'

export const logIN = data => dispatch => {
    dispatch({
        type: Types.ADD_TO_CART,
        payload: { data } 
    })
}


export const updateToken = token => dispatch => {
    dispatch({
        type: Types.DELETE_FROM_CART,
        payload: { token }
    })
}


export const logOut = () => dispatch => {
    dispatch({
        type: Types.DELETE_FROM_CART,
    })
}

