import { combineReducers } from 'redux'
import products from './product'
import cart from './cart'
import wishlist from './wishlist'
import quickView from './quickView'
import compare from './compare'
import productFilters from './productFilters'
import signIn from './signIn'

const rootReducer = combineReducers({
    products,
    cart,
    wishlist,
    quickView,
    compare,
    productFilters,
    signIn
})

export default rootReducer